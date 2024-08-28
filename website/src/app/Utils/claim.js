import Web3 from "web3";
const POOL_ADDRESS = '0xF0148B59D7F31084Fb22FF969321FDfAfA600C02';
import Pool from '@gysr/core/abis/Pool.json'
import { convertGYSRToBytes32 } from "./unstake";
export const claimTokens = async (amount,rewards) => {
        const web3 = new Web3(window.ethereum);
        const pool = new web3.eth.Contract(Pool,POOL_ADDRESS );
        console.log(amount,rewards,"claim")
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        let getRewards
        
        if(rewards){
                getRewards=convertGYSRToBytes32(rewards)
        }
        else{
                getRewards=[]
        }
        try{
                await pool.methods.claim(Web3.utils.toWei('100', amount), [],getRewards).send({ from: account });
        }
        catch(err){
                return err
        }

};