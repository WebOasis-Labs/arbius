import Web3 from "web3";
import Pool from '../abis/ercReward.json';

export const globalUnlocked = async () => {
    try {
        // Connect to the Web3 provider (MetaMask)
        const web3 = new Web3(window.ethereum);
        
        // Ensure MetaMask is enabled
        await window.ethereum.enable();
        
        // Create a new contract instance
        const pool = new web3.eth.Contract(Pool, '0x12CA522CE3220A4F34633DeD7064e871Ea676C83');
        
        // Get the list of accounts from MetaMask
        const accounts = await web3.eth.getAccounts();
        
        // Use the first account
        const account = accounts[0];
        
        // Call the unlocked function
        const reward = await pool.methods.unlocked('0xA80481E3f9098602954B2E5cf306e6dEE053EF3E').call();
        console.log("Reward (in Wei):", reward);
        
        const aius = web3.utils.fromWei(reward.toString(), 'ether'); // Converting from Wei to Ether
        console.log("Reward (in AIUs):", aius);
        
        return aius;
    } catch (error) {
        console.error("Error fetching claimable rewards:", error);
        return null;
    }
};
