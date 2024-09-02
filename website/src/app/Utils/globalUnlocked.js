import Web3 from "web3";
import Pool from '../abis/ERC20CompetitiveRewardModule.json'
// import Pool from '@gysr/core/abis/Pool.json'
export const globalUnlocked = async () => {
        try {
            // Connect to the Web3 provider (MetaMask)
            const web3 = new Web3(window.ethereum);
            
            // Ensure MetaMask is enabled
            await window.ethereum.enable();
    
            // Create a new contract instance
            const pool = new web3.eth.Contract(Pool, '0xeFE16a20dee30e61872E30D050ED0AD659055307');
            
            // Get the list of accounts from MetaMask
            //const accounts = await web3.eth.getAccounts();
            
            // Use the first account
            //const account = connected_address//accounts[0];
            
            // Call the unlocked function
            const reward = await pool.methods.unlocked('0xA8f103eEcfb619358C35F98c9372B31c64d3f4A1').call();
            return reward;
        } catch (error) {
            console.error("Error fetching claimable rewards:", error);
            return null;
        }
    };
//poolInfo method as 2nd option
