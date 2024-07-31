
import axios from 'axios';

export const getTransactions = async () => {
    const url = `https://gateway-arbitrum.network.thegraph.com/api/3cf022c3bc3bb0a1c88c5439792c82c4/subgraphs/id/Bmkv8LV6Jxau2sdpDWPQAQ87QgNMgAW6wYhDeq1kDP8y`;

  try {
    const response = await axios.post(url, {
        "operationName": "TRANSACTIONS",
        "variables": {
            "poolId": "0xf0148b59d7f31084fb22ff969321fdfafa600c02",
            "first": 10,
            "skip": 0,
            "orderBy": "timestamp",
            "orderDirection": "desc"
        },
        "query": "query TRANSACTIONS($poolId: String!, $first: Int!, $skip: Int!, $orderBy: Transaction_orderBy!, $orderDirection: OrderDirection!) {\n  transactions(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n    where: {pool: $poolId}\n  ) {\n    id\n    type\n    timestamp\n    user {\n      id\n      __typename\n    }\n    amount\n    earnings\n    gysrSpent\n    __typename\n  }\n}\n"
    });
    console.log(response.data)
    return response.data.data.transactions;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};
