import Web3 from "web3";
// import { abi as stakingAbi } from './Staking.json'; // Import the ABI of the staking contract
const UNIV2_ADDRESS = '0xCB37089fC6A6faFF231B96e000300a6994d7a625';
// import Pool from '../src/app/abis/pool.json'
import univV2 from '../abis/approveUNIV2.json'
export const walletBalance = async () => {
        const web3 = new Web3(window.ethereum);
        const uniV2Contract = new web3.eth.Contract(univV2,UNIV2_ADDRESS );
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        try {
            const balance = await uniV2Contract.methods.balanceOf(account).call();
            console.log(`Balance: ${balance}`);
        } catch (error) {
            console.error(error);
        }

};