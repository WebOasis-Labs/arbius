"use client"
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import fetchData from "../../../Utils/getGysrData";
import Tabs from "@/app/components/Stake/GYSR/Tabs";
import TopHeaderSection from "@/app/components/Stake/GYSR/TopHeaderSection";
import { useSwitchNetwork, useAccount } from 'wagmi';

const Middleware = () => {
    const [data, setData] = useState(null)
    const { address, isConnected } = useAccount();

    const CHAIN = process?.env?.NEXT_PUBLIC_AIUS_ENV === "dev" ? 1 : 1;
    const { switchNetwork: switchNetworkMainnet } = useSwitchNetwork({
      chainId:CHAIN,
    });

    useEffect(() => {
      const getData = async () => {
        try {
          const result = await fetchData(address);
          setData(result.data)
          // setData(result);
          const check = await window.ethereum.request({ method: 'eth_accounts' }); // Request account access if needed
          if(check.length){
            await window.ethereum.request({ method: 'eth_requestAccounts' });
          }
        } catch (error) {
          console.log(error, " while fetching data")
          // setError(error);
        }
      };
  
      getData();
      switchNetworkMainnet?.();

  }, [switchNetworkMainnet]);
  return (
    <div>
      <div className="relative" id="body">
        <TopHeaderSection data={data} />
        <Tabs data={data} />
      </div>
    </div>
  )
}

export default Middleware