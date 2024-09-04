import Web3 from "web3";
const POOL_ADDRESS = '0xF0148B59D7F31084Fb22FF969321FDfAfA600C02';
import Pool from '@gysr/core/abis/Pool.json'
import { convertGYSRToBytes32 } from "./unstake";
import { claimableRewards } from './claimableRewards'

export const claimTokens = async (userStakeAmount, rewards, connected_address) => {
        const eth_wei = 1000000000000000000;
        const web3 = new Web3(window.ethereum);
        const pool = new web3.eth.Contract(Pool,POOL_ADDRESS );

        //const accounts = await web3.eth.getAccounts();
        const account = connected_address//accounts[0];

        let getRewards
        
        if(rewards){
                getRewards=convertGYSRToBytes32(rewards)
        }
        else{
                getRewards=[]
        }
        try{
                console.log(getRewards, rewards, account)
                const res = await pool.methods.claim(userStakeAmount, [], getRewards).send({ from: account });
                return true
        }
        catch(err){
                console.log(err)
                return false
        }
};