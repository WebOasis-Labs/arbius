import Web3 from "web3";

const POOL_ADDRESS = '0xF0148B59D7F31084Fb22FF969321FDfAfA600C02';

import Pool from '@gysr/core/abis/Pool.json'
const eth_wei = 1000000000000000000;
export const convertGYSRToBytes32=(gysrAmount)=> {
       
        const ethWei = eth_wei 
        const weiGysr = gysrAmount * ethWei;
        console.log()
        const bytes32Value = Web3.utils.padLeft(Web3.utils.toHex(weiGysr), 64);
        
        return bytes32Value;
    }
    
export const unstakeTokens = async (amount, rewards, connected_address) => {
        if(amount){
                const web3 = new Web3(window.ethereum);
                const pool = new web3.eth.Contract(Pool,POOL_ADDRESS );
                console.log(amount,rewards,"unstake")
                //const accounts = await web3.eth.getAccounts();
                const account = connected_address//accounts[0];
               
                try{
                        let getRewards

                        if(rewards){
                                getRewards = convertGYSRToBytes32(rewards).toString()
                        }
                        else{
                                getRewards = []
                        }
                        console.log(getRewards, "THESE getRewards")
                        const res = await pool.methods.unstake(amount.toString(), [], getRewards).send({ from: account });
                        return res
                }
                catch(err){
                        console.log(err)
                        return false
                }
        }
        else{
                return false
        }
}