const hre = require("hardhat");

async function main() {
    console.log("正在部署 MessageBoard 合约...\n");

    const [deployer] = await hre.ethers.getSigners();
    console.log("部署账户:", deployer.address);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("账户余额:", hre.ethers.formatEther(balance), "ETH\n");

    // 部署 MessageBoard 合约
    const MessageBoard = await hre.ethers.getContractFactory("MessageBoard");
    const messageBoard = await MessageBoard.deploy();

    await messageBoard.waitForDeployment();
    const contractAddress = await messageBoard.getAddress();

    console.log("✅ MessageBoard 部署成功!");
    console.log("📍 合约地址:", contractAddress);
    console.log("\n在 Etherscan 查看:");
    console.log(`https://sepolia.etherscan.io/address/${contractAddress}`);

    // 验证部署后的初始状态
    const count = await messageBoard.getMessageCount(deployer.address);
    console.log("\n📝 部署者留言数量:", count.toString());

    if (count > 0) {
        const firstMessage = await messageBoard.getMessage(deployer.address, 0);
        console.log("💬 第一条留言:", firstMessage);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("部署失败:", error);
        process.exit(1);
    });
