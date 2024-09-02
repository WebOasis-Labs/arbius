import Web3 from "web3";
// import { abi as stakingAbi } from './Staking.json'; // Import the ABI of the staking contract
const POOL_INFO_ADDRESS = '0xF75beABb45EE2A81686821C3D0bD26856b9f6952';
const POOL_ADDRESS='0xF0148B59D7F31084Fb22FF969321FDfAfA600C02'
import Pool from '../abis/poolInfo.json'
// import Pool from '@gysr/core/abis/Pool.json'
export const claimableRewards = async (connected_address) => {
        const web3 = new Web3(window.ethereum);
        const pool = new web3.eth.Contract(Pool,POOL_INFO_ADDRESS );
        //const accounts = await web3.eth.getAccounts();
        const account = connected_address//accounts[0];
        const reward = await pool.methods.RewardsDistributed().send({ from: account,to:POOL_ADDRESS });
        return reward;
};