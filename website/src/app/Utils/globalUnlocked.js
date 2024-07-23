import Web3 from "web3";
import Pool from '../abis/ercReward.json'
// import Pool from '@gysr/core/abis/Pool.json'
export const globalUnlocked = async (amount) => {
        try {
            // Connect to the Web3 provider (MetaMask)
            const web3 = new Web3(window.ethereum);
            
            // Ensure MetaMask is enabled
            await window.ethereum.enable();
    
            // Create a new contract instance
            const pool = new web3.eth.Contract(Pool, '0xeFE16a20dee30e61872E30D050ED0AD659055307');
            
            // Get the list of accounts from MetaMask
            const accounts = await web3.eth.getAccounts();
            
            // Use the first account
            const account = accounts[0];
            
            // Call the unlocked function
            const reward = await pool.methods.unlocked('0xA8f103eEcfb619358C35F98c9372B31c64d3f4A1').call();
            const aius = web3.utils.fromWei(reward.toString(), 'ether'); // converting from 10^18 smaller unit to AIUs
            return aius;
        } catch (error) {
            console.error("Error fetching claimable rewards:", error);
            return null;
        }
    };
//poolInfo method as 2nd option
