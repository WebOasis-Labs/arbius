import React from 'react'
import { useContractRead, useAccount, useContractWrite, usePrepareContractWrite} from 'wagmi'
import { BigNumber } from 'ethers'
import baseTokenV1 from "../../../abis/baseTokenV1.json"
import config from "../../../../sepolia_config.json"
import votingEscrow from "../../../abis/votingEscrow.json"
import veStaking from "../../../abis/veStaking.json"
import Image from "next/image"
import arbius_logo_slider from '@/app/assets/images/arbius_logo_slider.png'
import { AIUS_wei } from "../../../Utils/constantValues";

function StakeCard({idx, tokenID, getAPR, rewardRate, totalSupply, setSelectedStake, setShowPopUp}) {
    console.log(tokenID, "TOKEN ID")
    const {address, isConnected} = useAccount();

    const VOTING_ESCROW_ADDRESS = config.votingEscrowAddress;

    const {data:totalStaked, isLoading: totalStakedIsLoading, isError: totalStakedIsError} = useContractRead({
        address: VOTING_ESCROW_ADDRESS,
        abi: votingEscrow.abi,
        functionName: 'locked',
        args: [
            Number(tokenID?._hex)
        ],
        enabled: isConnected
    })
    console.log(totalStaked, "ttsake")
    const {data:endDate, isLoading: endDateIsLoading, isError: endDateIsError} = useContractRead({
        address: VOTING_ESCROW_ADDRESS,
        abi: votingEscrow.abi,
        functionName: 'locked__end',
        args: [
            Number(tokenID?._hex)
        ],
        enabled: isConnected
    })
    console.log(Number(endDate?._hex), "endDate")
    const {data:stakedOn, isLoading: stakedOnIsLoading, isError: stakedOnIsError} = useContractRead({
        address: VOTING_ESCROW_ADDRESS,
        abi: votingEscrow.abi,
        functionName: 'user_point_history__ts',
        args: [
            Number(tokenID?._hex),
            1
        ],
        enabled: isConnected
    })
    console.log(stakedOn, "stakedOn")
    const {data:governancePower, isLoading: governancePowerIsLoading, isError: governancePowerIsError} = useContractRead({
        address: VOTING_ESCROW_ADDRESS,
        abi: votingEscrow.abi,
        functionName: 'balanceOfNFT',
        args: [
            Number(tokenID?._hex)
        ],
        enabled: isConnected
    })
    
    return (
        <div className='rounded-2xl px-8 py-6  bg-white-background relative'>
            <Image src={arbius_logo_slider} className='absolute top-2 right-2 w-[36px] h-[36px] z-20' alt="" />
            <div className='flex justify-start gap-8 items-start'>
                <div className='flex flex-col gap-3 justify-center items-start'>
                    <div>
                        <h2 className="text-[12px] text-[#8D8D8D] font-semibold">Total Staked</h2>
                        <h2 className='text-[15px] font-semibold'>{totalStaked?.amount?._hex ? (Number(totalStaked.amount._hex) / AIUS_wei).toString() : 0} <span className="text-[11px] font-medium">AIUS</span></h2>
                    </div>
                    <div>
                        <h2 className="text-[12px] text-[#8D8D8D] font-semibold">APR</h2>
                        <h2 className='text-[15px] font-semibold'>{totalSupply?._hex && rewardRate?._hex ? getAPR(rewardRate?._hex, totalSupply?._hex).toFixed(2) : 0}%</h2>
                    </div>
                </div>
                <div className='flex flex-col gap-3 justify-center items-start'>
                    <div>
                        <h2 className="text-[12px] text-[#8D8D8D] font-semibold">Governance Power</h2>
                        <h2 className='text-[15px] font-semibold'>{governancePower?._hex ? (Number(governancePower?._hex) / AIUS_wei).toFixed(2).toString() : 0}%</h2>
                    </div>
                    <div>
                        <h2 className="text-[12px] text-[#8D8D8D] font-semibold">Staked on</h2>
                        <h2 className='text-[15px] font-semibold'>{new Date(Number(stakedOn?._hex) * 1000).toLocaleDateString('en-US')}</h2>
                    </div>
                </div>

            </div>

            <div className='flex justify-start gap-12 items-center mt-3'>
                <div>
                    <h2 className="text-[12px] text-[#8D8D8D] font-semibold">End Date</h2>
                    <h2 className='text-[15px] font-semibold'>{new Date(Number(endDate?._hex) * 1000).toLocaleDateString('en-US')}</h2>
                </div>
            </div>

            <div className='flex justify-between gap-2 items-center mt-4'>
                <div className='w-[32%]'>
                    <button
                        type="button"
                        onClick={() => { setShowPopUp("add"); setSelectedStake(tokenID); }}
                        className="relative justify-center py-2 group bg-[#F3F3F3] py-1 px-3 lg:px-4 rounded-full flex items-center gap-3 w-full"
                    >
                        <div className="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-4 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="lato-bold  relative z-10  text-black-text group-hover:text-original-white opacity-40 group-hover:opacity-100 lg:text-[15px]">
                            Add
                        </div>
                    </button>
                </div>
                <div className='w-[32%]'>
                    <button
                        type="button"
                        onClick={() => { setShowPopUp("extend"); setSelectedStake(tokenID?._hex); }}
                        className="relative justify-center py-2 group bg-[#F3F3F3] py-1 px-3 lg:px-4 rounded-full flex items-center gap-3 w-full"
                    >
                        <div className="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-4 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="lato-bold  relative z-10  text-black-text group-hover:text-original-white opacity-40 group-hover:opacity-100 lg:text-[15px]">
                            Extend
                        </div>
                    </button>
                </div>
                <div className='w-[32%]'>
                    <button
                        type="button"
                        onClick={() => { setShowPopUp("claim"); setSelectedStake(tokenID?._hex); }}
                        className="relative justify-center py-2 group bg-black-background py-1 px-3 lg:px-4 rounded-full flex items-center gap-3 w-full"
                    >
                        <div className="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-4 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="lato-bold  relative z-10 text-original-white lg:text-[15px]">
                            Claim
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StakeCard