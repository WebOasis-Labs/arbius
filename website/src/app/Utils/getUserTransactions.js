import axios from 'axios';

const totalProfit=(amt,earn)=>{
    return earn-amt/amt*100;
}
export const getUserTransactions = async (userId) => {
    const url = `https://gateway-arbitrum.network.thegraph.com/api/3cf022c3bc3bb0a1c88c5439792c82c4/subgraphs/id/Bmkv8LV6Jxau2sdpDWPQAQ87QgNMgAW6wYhDeq1kDP8y`;

    try {
        const response = await axios.post(url, {
            "operationName": "TRANSACTIONS",
            "variables": {
                "poolId": "0xf0148b59d7f31084fb22ff969321fdfafa600c02",
              
                "skip": 0,
                "orderBy": "timestamp",
                "orderDirection": "desc",
                "userId": "0xf21aed47f2b14874e834cbc58c63fcc60563e5f0"
            },
            "query": `
                query TRANSACTIONS($poolId: String!, $skip: Int!, $orderBy: Transaction_orderBy!, $orderDirection: OrderDirection!, $userId: String!) {
                    transactions(
                        first: $first
                        skip: $skip
                        orderBy: $orderBy
                        orderDirection: $orderDirection
                        where: {pool: $poolId, user: $userId}
                    ) {
                        id
                        type
                        timestamp
                        user {
                            id
                            __typename
                        }
                        amount
                        earnings
                        gysrSpent
                        __typename
                    }
                }
            `
        });
        console.log(response.data)
        // return response.data.data.transactions;
        const unstakeTransactions=response.data.data.transactions.filter(trs=>trs.type=="Stake");
        let totalEarnings=0
        let totalUnstaked=0
        for(let i=0;i<unstakeTransactions.length;i++){
            totalEarnings+=unstakeTransactions[i].earnings;
            totalUnstaked+=unstakeTransactions[i].amount;
        }
        return totalProfit(totalUnstaked,totalEarnings)

    } catch (error) {
        console.error('There was a problem with the axios operation:', error);
        throw error;
    }
};
