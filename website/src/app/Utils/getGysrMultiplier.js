import Web3 from "web3";
import Pool from '../abis/ERC20CompetitiveRewardModule.json'
// import Pool from '@gysr/core/abis/Pool.json'
function padAddress(address) {
    // Remove the '0x' prefix from the address
    const strippedAddress = address.slice(2);

    // Calculate the number of zeros to pad
    const padLength = 64 - strippedAddress.length;

    // Pad the address with zeros
    const paddedAddress = '0x' + '0'.repeat(padLength) + strippedAddress;

    return paddedAddress;
}


export const getGysrMultiplier = async (amount, gysr, connected_address) => {
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
            let account = connected_address//accounts[0];
            account = padAddress(account)
            console.log(account, amount, gysr)
            // Call the unlocked function
            const reward = await pool.methods.preview('0xA8f103eEcfb619358C35F98c9372B31c64d3f4A1', account, amount.toString(), gysr.toString()).call();

            return reward;
        } catch (error) {
            console.error("Error fetching claimable rewards:", error);
            return null;
        }
    };
//poolInfo method as 2nd option
