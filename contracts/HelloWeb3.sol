// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title HelloWeb3
 * @dev 你的第一个 Solidity 智能合约
 * @notice 这是一个简单的合约，用于学习 Solidity 基础
 */
contract HelloWeb3 {
    // 状态变量 - 存储在区块链上
    string public message;
    address public owner;
    uint256 public messageCount;

    // 事件 - 用于记录重要操作
    event MessageUpdated(address indexed sender, string newMessage, uint256 timestamp);

    // 构造函数 - 部署时执行一次
    constructor(string memory _initialMessage) {
        message = _initialMessage;
        owner = msg.sender;
        messageCount = 0;
    }

    // 修改器 - 用于权限控制
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    /**
     * @dev 更新消息
     * @param _newMessage 新的消息内容
     */
    function updateMessage(string memory _newMessage) public {
        message = _newMessage;
        messageCount++;
        emit MessageUpdated(msg.sender, _newMessage, block.timestamp);
    }

    /**
     * @dev 获取当前消息
     * @return 当前存储的消息
     */
    function getMessage() public view returns (string memory) {
        return message;
    }

    /**
     * @dev 获取合约信息
     * @return _message 当前消息
     * @return _owner 合约所有者
     * @return _count 消息更新次数
     */
    function getContractInfo() public view returns (
        string memory _message,
        address _owner,
        uint256 _count
    ) {
        return (message, owner, messageCount);
    }

    /**
     * @dev 转移所有权 (仅限 owner)
     * @param _newOwner 新的所有者地址
     */
    function transferOwnership(address _newOwner) public onlyOwner {
        require(_newOwner != address(0), "New owner cannot be zero address");
        owner = _newOwner;
    }
}
