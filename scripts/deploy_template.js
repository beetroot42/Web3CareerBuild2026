/**
 * 通用部署模板
 * 使用方式: npx hardhat run scripts/deploy_template.js --network sepolia
 * 
 * 只需修改下面的 CONTRACT_NAME 和构造函数参数
 */
const hre = require("hardhat");

// ============ 修改这里 ============
const CONTRACT_NAME = "MessageBoard";
const CONSTRUCTOR_ARGS = [];  // 构造函数参数，如 ["Hello", 100]
// ==================================

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("部署者:", deployer.address);
    console.log("余额:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(deployer.address)), "ETH\n");

    const Contract = await hre.ethers.getContractFactory(CONTRACT_NAME);
    const contract = await Contract.deploy(...CONSTRUCTOR_ARGS);
    await contract.waitForDeployment();

    const addr = await contract.getAddress();
    console.log(`✅ ${CONTRACT_NAME} 部署成功!`);
    console.log(`📍 地址: ${addr}`);
    console.log(`🔗 Etherscan: https://sepolia.etherscan.io/address/${addr}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
