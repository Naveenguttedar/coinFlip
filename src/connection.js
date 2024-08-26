import { ethers, BrowserProvider, formatUnits } from "ethers";
export const connectWallet = async () => {
  let isWalletConnected = false,
    account = "",
    balance = "0";
  try {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      isWalletConnected = true;
      const balanceres = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });
      account = accounts[0];
      balance = formatUnits(balanceres, "ether");
      return { isWalletConnected, account, balance };
    } else {
      alert(
        "MetaMask is not installed. Please install MetaMask and try again.",
      );
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
};
