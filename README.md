# 🚀 Web3 Solidity 开发环境

本项目使用 Hardhat 作为 Solidity 开发框架，支持本地开发和 Sepolia 测试网部署。

## 📁 项目结构

```
d:\Web3\
├── contracts/          # Solidity 智能合约
│   └── HelloWeb3.sol   # 示例合约
├── test/               # 测试文件
│   └── HelloWeb3.test.js
├── scripts/            # 部署脚本
│   └── deploy.js
├── artifacts/          # 编译产物 (自动生成)
├── cache/              # 缓存 (自动生成)
├── hardhat.config.js   # Hardhat 配置
├── .env.example        # 环境变量模板
└── package.json
```

## 🛠️ 常用命令

```bash
# 编译合约
npx hardhat compile

# 运行测试
npx hardhat test

# 本地部署 (使用 Hardhat 内置节点)
npx hardhat run scripts/deploy.js

# 部署到 Sepolia 测试网
npx hardhat run scripts/deploy.js --network sepolia

# 启动本地区块链节点
npx hardhat node

# 打开 Hardhat 控制台
npx hardhat console
```

## ⚙️ 配置 Sepolia 测试网

1. 复制环境变量模板：
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件，填入：
   - `SEPOLIA_RPC_URL`: 从 [Alchemy](https://alchemy.com) 或 [Infura](https://infura.io) 获取
   - `PRIVATE_KEY`: 你的钱包私钥 (⚠️ 不要用主网钱包!)
   - `ETHERSCAN_API_KEY`: 用于验证合约

3. 获取测试 ETH：
   - [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
   - [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)

## 📝 HelloWeb3 合约说明

这是一个学习用的智能合约，包含以下功能：

| 功能 | 说明 |
|------|------|
| `message` | 存储一条消息 (string) |
| `owner` | 合约所有者地址 |
| `messageCount` | 消息更新次数 |
| `updateMessage()` | 更新消息内容 |
| `transferOwnership()` | 转移所有权 (仅 owner) |

## 🎯 学习路线

1. ✅ 阅读 `contracts/HelloWeb3.sol`，理解基本语法
2. ⬜ 阅读 `test/HelloWeb3.test.js`，学习如何写测试
3. ⬜ 运行 `npx hardhat test` 查看测试结果
4. ⬜ 修改合约，添加新功能
5. ⬜ 部署到 Sepolia 测试网

## 🔗 有用的链接

- [Solidity 文档](https://docs.soliditylang.org/)
- [Hardhat 文档](https://hardhat.org/docs)
- [Sepolia Etherscan](https://sepolia.etherscan.io/)
- [Ethernaut 安全挑战](https://ethernaut.openzeppelin.com/)

---

*环境配置于 2026-01-19*
