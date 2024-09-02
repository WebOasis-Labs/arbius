import Web3 from 'web3';
import GYSR_TOKEN_ABI from '../abis/gysrToken.json'
// Assuming you have the ABI and address of the UNI-V2 token contract

const GYSR_TOKEN = '0xbEa98c05eEAe2f3bC8c3565Db7551Eb738c8CCAb';
const POOL_ADDRESS = '0xF0148B59D7F31084Fb22FF969321FDfAfA600C02';

export const gysrAllowance = async (connected_address) => {
    if (window.ethereum) {
        // Initialize web3
        const web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();

            // Get the user's accounts
            //const accounts = await web3.eth.getAccounts();
            const account = connected_address//accounts[0];

            // Create the contract instance
            const gysrTokenContract = new web3.eth.Contract(GYSR_TOKEN_ABI, GYSR_TOKEN);

            // Set the amount to approve (use max uint256 value for unlimited approval)
            const res = await gysrTokenContract.methods.allowance(account, POOL_ADDRESS).call();
            // Call the approve function
            return res
        } catch (error) {
            return false
        }
    } else {
        return false
    }
};
