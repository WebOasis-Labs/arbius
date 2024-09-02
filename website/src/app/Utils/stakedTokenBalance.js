import Web3 from "web3";
// import { abi as stakingAbi } from './Staking.json'; // Import the ABI of the staking contract
const POOL_ADDRESS = '0xF0148B59D7F31084Fb22FF969321FDfAfA600C02';
// import Pool from '../src/app/abis/pool.json'
import Pool from '@gysr/core/abis/Pool.json'
export const stakeTokenBalance = async (connected_address) => {
        const web3 = new Web3(window.ethereum);
        const pool = new web3.eth.Contract(Pool,POOL_ADDRESS );
        //const accounts = await web3.eth.getAccounts();
        const account = connected_address//accounts[0];
       
        try{
                const balance = await pool.methods.stakingBalances(account).call();
                const balance2 = await pool.methods.stakingTotals().call();
                const balance3 = await pool.methods.usage().call();
                console.log(balance3, "stakingTotals")
                return {
                        "userStake": balance[0],
                        "totalStake": balance2[0]
                }
        }
        catch(err){
             return err;
        }

};