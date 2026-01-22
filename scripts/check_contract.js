const hre = require("hardhat");

async function main() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    console.log(`Checking contract at ${contractAddress}...`);

    const code = await hre.ethers.provider.getCode(contractAddress);

    if (code === "0x") {
        console.error("❌ No contract found at this address!");
        // Try to find if there was a deployment
        // But we can't easily iterate all addresses.
        // It's likely the node restarted and the address changed if it wasn't the first tx?
        // Or if the node is not running.
    } else {
        console.log("✅ Contract code found!");

        // Try to interact
        const MessageBoard = await hre.ethers.getContractFactory("MessageBoard");
        const contract = MessageBoard.attach(contractAddress);

        try {
            const [signer] = await hre.ethers.getSigners();
            const count = await contract.getMessageCount(signer.address);
            console.log(`✅ Interaction successful. Message count for deployer: ${count}`);
        } catch (e) {
            console.error("❌ Interaction failed:", e.message);
        }
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
