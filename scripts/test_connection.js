const hre = require("hardhat");

async function main() {
    console.log("测试 Sepolia 网络连接...\n");

    try {
        const [signer] = await hre.ethers.getSigners();
        console.log("✅ 钱包地址:", signer.address);

        const balance = await hre.ethers.provider.getBalance(signer.address);
        console.log("✅ 账户余额:", hre.ethers.formatEther(balance), "ETH");

        const network = await hre.ethers.provider.getNetwork();
        console.log("✅ 网络信息: chainId =", network.chainId.toString());

        console.log("\n🎉 连接成功！可以部署合约了。");
    } catch (error) {
        console.error("❌ 连接失败:", error.message);
    }
}

main();
