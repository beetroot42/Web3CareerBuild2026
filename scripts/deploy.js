const hre = require("hardhat");

async function main() {
    console.log("正在部署 HelloWeb3 合约...\n");

    const [deployer] = await hre.ethers.getSigners();
    console.log("部署账户:", deployer.address);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("账户余额:", hre.ethers.formatEther(balance), "ETH\n");

    const initialMessage = "Hello, Web3! 这是我的第一个合约!";
    const HelloWeb3 = await hre.ethers.getContractFactory("HelloWeb3");
    const helloWeb3 = await HelloWeb3.deploy(initialMessage);

    await helloWeb3.waitForDeployment();
    const contractAddress = await helloWeb3.getAddress();

    console.log("✅ HelloWeb3 部署成功!");
    console.log("📍 合约地址:", contractAddress);
    console.log("💬 初始消息:", initialMessage);
    console.log("\n在 Etherscan 查看:");
    console.log(`https://sepolia.etherscan.io/address/${contractAddress}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("部署失败:", error);
        process.exit(1);
    });
