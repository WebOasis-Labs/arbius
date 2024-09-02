import Web3 from "web3";
import contractABI from '../abis/gysrToken.json'

export default async function gysrTokenBalance(connected_address) {
  // Connect to MetaMask
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access if needed
      const web3 = new Web3(window.ethereum);
      const gysrTokenAddress = '0xbea98c05eeae2f3bc8c3565db7551eb738c8ccab'; // Replace with the actual GYSR token contract address from Etherscan
      const contract = new web3.eth.Contract(contractABI, gysrTokenAddress);

      //const accounts = await web3.eth.getAccounts();
      const account = connected_address//accounts[0]; // Get the current account

      const balance = await contract.methods.balanceOf(account).call();

      // Convert the balance from Wei to the token's decimal format (assuming GYSR has 18 decimals)
      const decimals = 18;
      const adjustedBalance = balance / (10 ** decimals);

      return adjustedBalance;
    } catch (error) {
      console.error('Error fetching AIUS balance:', error);
      return 0
    }
  } else {
    console.error('MetaMask is not installed.');
    return 0
  }
}