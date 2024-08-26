import Web3 from "web3";
// import { abi as stakingAbi } from './Staking.json'; // Import the ABI of the staking contract
const POOL_ADDRESS = '0xF0148B59D7F31084Fb22FF969321FDfAfA600C02';
import Pool from '@gysr/core/abis/Pool.json'
export const stakeTokens = async (amount) => {
        const web3 = new Web3(window.ethereum);
        const pool = new web3.eth.Contract(Pool,POOL_ADDRESS );
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
       try{
        const stakedTokens= await pool.methods.stake(Web3.utils.toWei('0.1', 'ether'), [], []).send({ from: account });
       console.log(stakeTokens,"staked token") 
       return stakedTokens
       }
       catch(err){
        console.log(stakeTokens,"staked token error")
        return err
       }
};