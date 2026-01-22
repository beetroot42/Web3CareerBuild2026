import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import abiFile from './abis/MessageBoard.json';
import { CONTRACT_ADDRESS, SEPOLIA_CHAIN_ID, LOCAL_CHAIN_ID } from './config';

const ContractABI = abiFile.abi;

function App() {
  const [currentMessage, setCurrentMessage] = useState("Loading...");
  const [newMessage, setNewMessage] = useState("");
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); // "" | "error" | "success"
  const [statusText, setStatusText] = useState("");

  const checkNetwork = (chainIdStr) => {
    // Accept Sepolia, Hardhat Local, or Standard Localhost
    return chainIdStr === SEPOLIA_CHAIN_ID || chainIdStr === LOCAL_CHAIN_ID || chainIdStr === "1337";
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected", accounts[0]);
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchMessage = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);

        // Check Network
        const network = await provider.getNetwork();
        const chainId = network.chainId.toString();
        console.log("Current network chainId:", chainId);

        if (!checkNetwork(chainId)) {
          setCurrentMessage(`Wrong Network. Connected to: ${chainId}. Please connect to Sepolia (${SEPOLIA_CHAIN_ID}).`);
          return;
        }

        const signer = await provider.getSigner();
        const messageBoardContract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, provider);

        if (!account) {
          setCurrentMessage("Connect wallet to view your last message.");
          return;
        }

        console.log("Fetching message for:", account);
        const count = await messageBoardContract.getMessageCount(account);
        console.log("Message count:", count);

        if (count > 0) {
          const index = Number(count) - 1;
          const msg = await messageBoardContract.messages(account, index);
          setCurrentMessage(msg);
        } else {
          setCurrentMessage("No messages yet.");
        }

      } else {
        console.log("Ethereum object doesn't exist!");
        setCurrentMessage("Ethereum unavailable");
      }
    } catch (error) {
      console.log(error);
      let displayError = "Error fetching message";
      if (error && error.code === "BAD_DATA") displayError = "Wrong Network / Contract not deployed";
      if (error && error.code === "CALL_EXCEPTION") displayError = "Contract Call Failed (Check Address/Network)";
      if (error && error.code === "NETWORK_ERROR") displayError = "Network Connection Error";

      setCurrentMessage(`${displayError}: ${error && error.message ? error.message.slice(0, 50) : ""}...`);
    }
  }

  const updateMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setStatusText("");

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const network = await provider.getNetwork();
        const chainId = network.chainId.toString();

        if (!checkNetwork(chainId)) {
          alert(`Please connect to Sepolia! (Current Chain ID: ${chainId})`);
          setLoading(false);
          return;
        }

        const signer = await provider.getSigner();
        const messageBoardContract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, signer);

        console.log("Going to pop wallet now to pay gas...");
        let tx = await messageBoardContract.leaveMessage(newMessage);

        setStatusText("Mining...");
        console.log("Mining...", tx.hash);
        await tx.wait();

        console.log("Mined -- ", tx.hash);
        setStatus("success");
        setStatusText("Message updated!");
        setNewMessage("");

        // Refresh message
        await fetchMessage();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      setStatus("error");
      setStatusText(`Transaction failed: ${error.message ? error.message.slice(0, 30) : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  useEffect(() => {
    if (account) {
      fetchMessage();

      // Set up listener
      let contract;
      const onNewMessage = (sender, message) => {
        console.log("NewMessage event:", sender, message);
        if (account && sender.toLowerCase() === account.toLowerCase()) {
          setCurrentMessage(message);
        }
      };

      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, provider);
        // We should only listen if on correct network, but keep it simple
        contract.on("NewMessage", onNewMessage);
      }

      return () => {
        if (contract) {
          contract.off("NewMessage", onNewMessage);
        }
      };
    } else {
      setCurrentMessage("Connect wallet to interact.");
    }
  }, [account]);

  return (
    <div className="app-container">
      <div className="glass-card">
        <h1 className="title">EtherBoard</h1>

        <div className="connect-section">
          {!account ? (
            <button className="btn-primary" onClick={connectWallet}>
              Connect Wallet
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <button className="btn-primary" disabled>
                Connected: {account.slice(0, 6)}...{account.slice(-4)}
              </button>
              {/* Check if on correct network? */}
            </div>

          )}
        </div>

        <div className="message-display">
          <p className="current-label">Your Latest Message</p>
          <p className="current-message">"{currentMessage}"</p>
          {currentMessage && currentMessage.includes("Wrong Network") && (
            <button
              className="btn-primary"
              style={{ marginTop: '1rem', background: '#eab308' }}
              onClick={switchNetwork}
            >
              Switch to Localhost
            </button>
          )}
        </div>

        <form className="input-group" onSubmit={updateMessage}>
          <input
            type="text"
            className="input-field"
            placeholder="Type a new message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!account || loading}
          />
          <button
            type="submit"
            className="btn-primary"
            disabled={!account || loading || !newMessage}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Sending...
              </>
            ) : "Update Message"}
          </button>
        </form>

        {statusText && (
          <div className={`status-msg ${status}`}>
            {statusText}
          </div>
        )}
      </div>

      <footer>
        <p>Built with React, Vite & Hardhat</p>
      </footer>
    </div>
  )
}

export default App
