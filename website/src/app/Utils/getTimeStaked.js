import Web3 from "web3";
// import { abi as stakingAbi } from './Staking.json'; // Import the ABI of the staking contract
const UNIV2_ADDRESS = '0xCB37089fC6A6faFF231B96e000300a6994d7a625';
// import Pool from '../src/app/abis/pool.json'
//import Pool from '@gysr/core/abis/Pool.json'
import contractABI from '../abis/aiusBalance.json'
export const getTimeStaked = async (connected_address) => {
    const web3 = new Web3(window.ethereum);
    const pool = new web3.eth.Contract(contractABI, UNIV2_ADDRESS );
    //const accounts = await web3.eth.getAccounts();
    const account = connected_address//accounts[0];
    const events = await pool.getPastEvents('Transfer', {
        filter: {from: account, to: "0x12A1165b8784C9d322Ef2c4787d8f161FD8f551C"},
        fromBlock: 0,
        toBlock: 'latest'
    })

    let earliestTime = Infinity;

    for (let event of events) {
            const block = await web3.eth.getBlock(event.blockNumber);
            if (block.timestamp < earliestTime) {
                earliestTime = block.timestamp;
            }
        }
    if (earliestTime === Infinity) {
        return 0;
    } else {
        const now = Math.floor(Date.now() / 1000); // Current time in UNIX format
        const diffInSeconds = now - earliestTime;
        console.log(diffInSeconds, "DIFF SECONDS")
        const diffInDays = Math.round(diffInSeconds / (24 * 60 * 60)); // Convert seconds to days
        return diffInDays;
    }
}