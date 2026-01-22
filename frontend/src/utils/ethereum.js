import { ethers } from 'ethers';

export const getEthereumObject = () => window.ethereum;

export const findMetaMaskAccount = async () => {
    try {
        const ethereum = getEthereumObject();

        if (!ethereum) {
            console.error("Make sure you have Metamask!");
            return null;
        }

        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            return account;
        } else {
            console.error("No authorized account found");
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const connectWallet = async () => {
    try {
        const ethereum = getEthereumObject();
        if (!ethereum) {
            alert("Get MetaMask!");
            return null;
        }

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        return accounts[0];
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getProvider = () => {
    if (window.ethereum) {
        return new ethers.BrowserProvider(window.ethereum);
    }
    return null;
}
