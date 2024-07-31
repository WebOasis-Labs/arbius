import Web3 from "web3";
const POOL_ADDRESS = process.env.NEXT_PUBLIC_POOL_ADDRESS;
import Pool from '@gysr/core/abis/Pool.json'
export const claimTokens = async () => {
        const web3 = new Web3(window.ethereum);
        const pool = new web3.eth.Contract(Pool,POOL_ADDRESS );
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
       
        await pool.methods.claim(Web3.utils.toWei('100', amount), [], []).send({ from: account });

};