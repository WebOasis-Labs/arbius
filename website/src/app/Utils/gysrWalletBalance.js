import Web3 from "web3";
import contractABI from '../abis/aiusBalance.json'
export default async function getGYSRBalance() {
  // Connect to MetaMask
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access if needed
      const web3 = new Web3(window.ethereum);
      const gysrTokenAddress = '0xCB37089fC6A6faFF231B96e000300a6994d7a625'; // Replace with the actual GYSR token contract address from Etherscan
      const contract = new web3.eth.Contract(contractABI, gysrTokenAddress);

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0]; // Get the current account

      const balance = await contract.methods.balanceOf(account).call();

      // Convert the balance from Wei to the token's decimal format (assuming GYSR has 18 decimals)
      const decimals = 18;
      const adjustedBalance = balance / (10 ** decimals);

      localStorage.setItem("gysrBalance",adjustedBalance);
      return adjustedBalance;
    } catch (error) {
      console.error('Error fetching AIUS balance:', error);
    }
  } else {
    console.error('MetaMask is not installed.');
  }
}