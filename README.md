# Web3 学习与实践 - 链上留言板 (MessageBoard DApp)

本项目是 Web3 学习计划的一部分，旨在实践智能合约的开发、部署以及全栈 DApp 的构建。

主要完成的任务包括：
1.  **智能合约开发**: 编写 `MessageBoard.sol`，实现用户留言、查询留言等核心功能。
2.  **本地环境搭建**: 使用 Hardhat 配置本地开发网络，进行合约的编译与模拟部署。
3.  **测试网部署**: 将智能合约成功部署到 **Sepolia** 测试网，并验证了链上数据。
4.  **前端 DApp 开发**: 基于 React + Vite 构建用户界面 "EtherBoard"，实现了全栈交互。
    - **钱包连接**: 支持 Metamask 连接，并自动识别网络（Localhost/Sepolia）。
    - **实时交互**: 实现了写留言（发送交易）和读留言（监听链上事件）的功能。

**相关链接**:
- **Sepolia 合约地址**: [`0x37401611CF65FC6B5dd852D15d6c95404e9dae94`](https://sepolia.etherscan.io/address/0x37401611CF65FC6B5dd852D15d6c95404e9dae94)

---
*Environment: Hardhat, React, Ethers.js v6, Sepolia Testnet*
