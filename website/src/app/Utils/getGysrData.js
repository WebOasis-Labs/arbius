// graphqlApi.js
import axios from 'axios';

const fetchData = async (connected_address) => {
  const url = `https://gateway-arbitrum.network.thegraph.com/api/3cf022c3bc3bb0a1c88c5439792c82c4/subgraphs/id/Bmkv8LV6Jxau2sdpDWPQAQ87QgNMgAW6wYhDeq1kDP8y`;

  try {
    const response = await axios.post(url, {
    "operationName": "POOL",
    "variables": {
        "poolId": "0xf0148b59d7f31084fb22ff969321fdfafa600c02",
        "positionId": "0xf0148b59d7f31084fb22ff969321fdfafa600c02_0x000000000000000000000000"+connected_address.split('x')[1].toLowerCase()
    },
    "query": "query POOL($poolId: String!, $positionId: String!) {  pool(id: $poolId) {    id    name    description    website    staked    funded    rewards    distributed    apr    tvl    stakingSharesPerToken    rewardSharesPerToken    start    end    operations    createdTimestamp    state    volume    poolType    sharesPerSecond    fundings(orderBy: start, orderDirection: asc) {      id      start      end      sharesPerSecond      token {        id        symbol        __typename      }      __typename    }    stakingToken {      id      symbol      alias      decimals      type      underlying {        id        __typename      }      __typename    }    rewardToken {      id      symbol      alias      decimals      type      __typename    }    stakingTokens {      id      token {        id        symbol        alias        decimals        type        underlying {          id          __typename        }        __typename      }      amount      sharesPerToken      __typename    }    rewardTokens {      id      token {        id        symbol        alias        decimals        type        __typename      }      amount      apr      sharesPerSecond      sharesPerToken      __typename    }    __typename  }  position(id: $positionId) {    id    stakes(first: 1, orderBy: timestamp, orderDirection: asc) {      id      timestamp      __typename    }    __typename  }}",
    });
    console.log(response, "POOL RESPONSE", connected_address.split('x')[1])
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};

export default fetchData;