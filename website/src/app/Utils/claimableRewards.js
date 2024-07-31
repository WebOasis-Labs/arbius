import Web3 from "web3";
const POOL_ADDRESS=process.env.NEXT_PUBLIC_POOL_ADDRESS
const POOL_INFO_ADDRESS = '0xF75beABb45EE2A81686821C3D0bD26856b9f6952';
import Pool from '../abis/poolInfo.json'
export const claimableRewards = async (amount) => {
        const web3 = new Web3(window.ethereum);
        const pool = new web3.eth.Contract(Pool,POOL_INFO_ADDRESS );
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const reward= await pool.methods.rewards(POOL_ADDRESS,account,'0x0000000000000000000000000000000000000000000000000000000000000000','0x0000000000000000000000000000000000000000000000000000000000000000').call();
        console.log(reward,"rewardss")
        return reward;
};
