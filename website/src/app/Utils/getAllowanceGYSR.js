import Web3 from 'web3';
import UNIV2_ABI from '../../../src/app/abis/approveUNIV2.json'
const UNIV2_ADDRESS = '0xCB37089fC6A6faFF231B96e000300a6994d7a625';
const AIUS_STAKING_CONTRACT_ADDRESS = '0x12A1165b8784C9d322Ef2c4787d8f161FD8f551C'


export const UNIV2_allowance = async () => {
    if (window.ethereum) {
        // Initialize web3
        const web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();

            // Get the user's accounts
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            console.log(account,"ACCOUNT")

            // Create the contract instance
            const uniV2Contract = new web3.eth.Contract(UNIV2_ABI, UNIV2_ADDRESS);
            console.log(uniV2Contract)
            // Set the amount to approve (use max uint256 value for unlimited approval)
            const result = await uniV2Contract.methods.allowance(account, AIUS_STAKING_CONTRACT_ADDRESS).call();
            console.log(result,"result")
            return result;            
        } catch (error) {
            console.error('Approval failed', error);
            return 0
        }
    } else {
        return 0
    }
};