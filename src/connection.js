import { ethers, BrowserProvider, formatUnits, parseUnits } from "ethers";
const contractAddr = "0x996D9fF111D150CbaF1eB5400B344c413440d75B";
export let contract = null;
const contractAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "choice",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "result",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CoinFlipped",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "choice",
        type: "bool",
      },
    ],
    name: "flipCoin",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [],
    name: "getLastFlipResult",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastResult",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const connectWallet = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
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
      const balanceReq = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });
      balance = formatUnits(balanceReq, "ether");
      const signer = await provider.getSigner();
      contract = new ethers.Contract(contractAddr, contractAbi, signer);
      account = accounts[0];
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

export async function flipCoin(betAmount, choice) {
  if (contract == null) {
    return ["No result", "Something went wrong with contract connection"];
  }
  const bet = parseUnits(betAmount, "ether");
  const tx = await contract.flipCoin(choice === "Heads", {
    value: bet,
  });
  const result = await contract.getLastFlipResult();
  const msg = "";
  return [result, tx];
}
