import React, { useEffect } from 'react'
import { useState } from 'react'
import walletImage from '../../../assets/images/ion_wallet-outline.png'
import Image from 'next/image'
import Popup from './Popup'
import HintBox from '../../HintBox/Hintbox'
import { approveUNIV2 } from '../../../Utils/approveUniv2'
import { stakeTokens } from '../../../Utils/staking'
//import { connectWalletHandler } from '../../../Utils/connectWallet'
import { claimTokens } from '../../../Utils/claim'
//import ConnectWallet from '@/components/ConnectWallet'; // main arbius component
import { useWeb3Modal } from '@web3modal/react'; // main arbius component
import {
    useAccount,
} from 'wagmi';
import { unstakeTokens } from '../../../Utils/unstake'
import { claimableRewards } from '../../../Utils/claimableRewards'
import { stakeTokenBalance } from '../../../Utils/stakedTokenBalance'
import getAIUSBalance from '../../../Utils/aiusWalletBalance'
import getGYSRBalance from '../../../Utils/gysrWalletBalance'
import gysrTokenBalance from '../../../Utils/gysrTokenBalance'
import { UNIV2_allowance } from '../../../Utils/getAllowanceGYSR'
import { globalUnlocked } from '../../../Utils/globalUnlocked'
import { getTimeStaked } from '../../../Utils/getTimeStaked'
import { calculateBonusMultiplier } from '../../../Utils/timeMultiplier'
import { getGysrMultiplier } from '../../../Utils/getGysrMultiplier'
import { approveGYSR } from '../../../Utils/approveGYSR'
import { gysrAllowance } from '../../../Utils/checkGYSRAllowance'

import PopUp from '../AIUS/PopUp'
import { SuccessChildren, ErrorPopUpChildren, StepTwoChildren } from './PopupStages'

function Stake() {
    const eth_wei = 1000000000000000000;
    const { address, isConnected } = useAccount()
    console.log(isConnected, "IS CONNECT")
    const { open: openWeb3Modal } = useWeb3Modal()

    const [walletConnected, setWalletConnected] = useState(false);
    const [loadingWeb3Modal, setLoadingWeb3Modal] = useState(false);

    //useEffect(() => {
    //    setWalletConnected(isConnected);
    //}, [isConnected]);

    function clickConnect() {
        async function f() {
            setLoadingWeb3Modal(true);
            await openWeb3Modal();
            setLoadingWeb3Modal(false)
        }
        f();
    }

    const [currentHoverId, setCurrentHoverId] = useState(null);

    const [aprroved, setaprroved] = useState(false)
    const [allowance, setAllowance] = useState(0);
    const [globalUnlockedValue, setGlobalUnlocked] = useState(0);
    const [daysStaked, setDaysStaked] = useState(0);
    const [timeMultiplier, setTimeMultiplier] = useState(1);
    const [totalStaked, setTotalStaked] = useState(0);
    const [gysrMultiplier, setGysrMultiplier] = useState(1);
    const [gysrBalance, setGYSRBalance] = useState(0);
    const [gysrAllowanceValue, setGYSRAllowanceValue] = useState(0);

    const [inputValue, setInputValue] = useState({
        univ2: '',
        unstake: '',
        gysr: ''
    });
    const [walletBalance, setWalletBalance] = useState({
        totalUniv2: 0,
        stakedUniv2: 0,
    })
    const [showPopUp, setShowPopUp] = useState(false)
    const [data, setData] = useState({
        unstake: {
            rewards: null,
            balance: null,
            rewardsFull: null
        }
    });

    const [error, setError] = useState(null);
    useEffect(() => {
        const getData = async () => {
            let data1 = await stakeTokenBalance(address)
            let data2 = await claimableRewards(address)
            let data3 = await UNIV2_allowance(address)
            let data4 = await globalUnlocked()
            let data5 = await getTimeStaked(address)
            let data6 = await gysrTokenBalance(address)
            let data7 = await gysrAllowance(address)
            let rewardWithFixed
            let data1_1 = 0;

            if (data1?.totalStake) {
                setTotalStaked((Number(data1?.totalStake) / eth_wei).toFixed(2))
            }
            if (data1?.userStake) {
                data1_1 = (Number(data1?.userStake) / eth_wei).toFixed(4)
            }
            if (data2) {
                rewardWithFixed = data2
                data2 = Number(data2).toFixed(4)
            }
            if (data3) {
                data3 = Number(data3) / eth_wei
                setAllowance(data3)
            }
            if (data4) {
                data4 = (Number(data4) / eth_wei).toFixed(0)
                setGlobalUnlocked(data4)
            }
            if (data5) {
                setDaysStaked(data5)
            }
            if (data6) {
                setGYSRBalance(data6)
            }
            if (data7) {
                data7 = Number(data7) / eth_wei
                setGYSRAllowanceValue(data7)
            }
            setData({
                unstake: {
                    rewards: data2,
                    balance: data1_1,
                    rewardsFull: rewardWithFixed
                }
            })

            const tMultiplier = calculateBonusMultiplier(data5, data1_1)
            if (tMultiplier) {
                setTimeMultiplier(tMultiplier.toFixed(2))
            }
            console.log(data1_1, data2, data3, data4, data5, data6, data7, "kokokokokokok")
        }
        const getAccountsData = async () => {
            let data1 = await getGYSRBalance();
            let data2 = await stakeTokenBalance()
            console.log(data1, data2, "balances")
            if (data1) {
                data1 = data1.toFixed(3)
            }
            if (data2) {
                data2 = (Number(data2?.userStake) / eth_wei).toFixed(4)
            }
            setWalletBalance({
                totalUniv2: data1,
                stakedUniv2: data2
            })
        }
        if (isConnected) {
            getData()
            getAccountsData()
        }
    }, [address, isConnected])

    useEffect(() => {
        const getMult = async () => {
            const unstakeAmount = Number(inputValue.unstake)
            const gysrAmount = Number(inputValue.gysr)
            console.log(totalStaked, "TST")
            if (unstakeAmount && gysrAmount) {
                let gysrM = await getGysrMultiplier(unstakeAmount * eth_wei, gysrAmount * eth_wei, address)
                if (gysrM?.[2]) {
                    console.log(gysrM)
                    setGysrMultiplier(gysrM[2] / eth_wei)
                }
            }
        }
        getMult()
    }, [inputValue.unstake, inputValue.gysr])

    // function clickConnect() {
    //   async function f() {
    //     setLoadingWeb3Modal(true);

    //     try {
    //       await openWeb3Modal();
    //       setLoadingWeb3Modal(false)
    //       localStorage.setItem("walletConnected", "true");
    //       return true;
    //   } catch (error) {
    //       console.error("User denied account access");
    //       localStorage.removeItem("walletConnected");
    //       return false;
    //   }
    //   //   return true;
    //   }
    //   f();
    // }
    function formatNumber(value) {
        // Ensure the value is a number and not undefined or null
        if (typeof value !== 'number' || isNaN(value)) {
            return '0'; // Return an empty string or handle invalid input as needed
        }
        
        // Check if the value is a whole number
        if (value % 1 === 0) {
            return value.toString(); // Return as a whole number
        } else {
            return value.toFixed(4); // Return with 4 decimal places
        }
    }
    const handleApproveClick = async () => {
        setShowPopUp("2")
        const approved = await approveUNIV2(address)
        if (approved) {
            setShowPopUp("Success")
        } else {
            setShowPopUp("Error")
        }
    }
    const handleStake = async () => {
        if (Number(inputValue.univ2) && allowance > Number(inputValue.univ2)) {
            try {
                setShowPopUp("2")
                const stakedTokens = await stakeTokens(inputValue.univ2);
                if (stakedTokens) {
                    const newStakedTokens = await stakeTokenBalance()
                    setWalletBalance({ ...walletBalance, stakedUniv2: newStakedTokens })
                    setShowPopUp("Success")
                } else {
                    setShowPopUp("Error")
                }
            }
            catch (err) {
                console.log(err)
                setShowPopUp("Error")
            }
        }
    }

    const handleClaimTokens = async (gysr) => {
        try {
            setShowPopUp("2")
            const claimed = await claimTokens(gysr, address)
            if (claimed) {
                setShowPopUp("Success")
            } else {
                setShowPopUp("Error")
            }
        } catch (err) {
            console.log(err)
            setShowPopUp("Error")
        }
    }

    const handleUnstake = async (amount, gysr) => {
        try {
            setShowPopUp("2")
            const unstaked = await unstakeTokens(amount, gysr, address)
            if (unstaked) {
                setShowPopUp("Success")
            } else {
                setShowPopUp("Error")
            }
        } catch (err) {
            console.log(err)
            setShowPopUp("Error")
        }
    }

    const handleGYSRApprove = async () => {
        try {
            setShowPopUp("2")
            const approved = await approveGYSR(address)
            if (approved) {
                setShowPopUp("Success")
            } else {
                setShowPopUp("Error")
            }
        } catch (err) {
            console.log(err)
            setShowPopUp("Error")
        }
    }

    function convertLargeNumber(numberStr) {
        // Convert the string to a BigInt
        let number = BigInt(0);

        // Divide the large number by 10^20 and convert it to a floating-point number
        let scaledNumber = (Number(number) / 1e20).toFixed(2);

        return scaledNumber;
    }


    // Function to handle changes in the input field
    const handleInputChange = (e, key) => {
        console.log(key)
        setInputValue({ ...inputValue, [key]: e.target.value });
    };

    // Function to handle the "max" button click
    const handleMaxClick = (value, key) => {
        console.log(key)
        setInputValue({ ...inputValue, [value]: key });
    };



    return (
        <>
            {showPopUp !== false && (
                <>
                    <PopUp setShowPopUp={setShowPopUp} >
                        {showPopUp === ("Success") && (<SuccessChildren setShowPopUp={setShowPopUp} />)}
                        {showPopUp === ("Error") && (<ErrorPopUpChildren setShowPopUp={setShowPopUp} />)}
                        {showPopUp === ("2") && (<StepTwoChildren setShowPopUp={setShowPopUp} isError={false} noChildren={true} repeat={false} />)}
                    </PopUp>
                </>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-mobile-section-width lg:w-section-width m-[auto] pt-8 pb-8 max-w-center-width">

                {isConnected ? (<>
                    <div className="rounded-2xl p-6 lg:p-10 flex flex-col justify-between h-[auto] bg-white-background stake-card">
                        <div>
                            <h1 className="text-[15px] lg:text-[20px] font-medium text-[#4A28FF]">Stake</h1>
                            <div className="flex justify-between items-end mt-6 gap-6">

                                <div className="mt-6 w-1/2 shadow-none p-6 py-4 rounded-[10px] max-h-[150px] transition-all  bg-[#F9F6FF]">
                                    <div className="flex justify-start items-baseline">
                                        <h1 className="text-[25px] xl:text-[38px] font-medium text-purple-text">{walletBalance.totalUniv2 ? walletBalance.totalUniv2 : 0}</h1>
                                        <p className="text-para ml-2 text-black-text ">Uni-V2</p>
                                    </div>
                                    <h1 className="text-[8px] lg:text-[13px] font-medium text-black-text">Wallet Balance</h1>

                                </div>


                                <div className='mt-6 w-1/2 shadow-none p-6 py-4 rounded-[10px] max-h-[150px] transition-all hover:shadow-stats hover:cursor-pointer bg-[#F9F6FF] flex flex-col justify-center text-[#101010]'>
                                    <div className="flex justify-start items-baseline" id="BonusPeriod">
                                        <h1 className="text-[25px] xl:text-[38px] font-medium text-purple-text">90</h1>
                                        <p className="text-para ml-2 text-black-text">Days</p>
                                    </div>

                                    <h1 className="text-[8px] lg:text-[13px] font-medium text-black-text ">Bonus Period</h1>
                                    <HintBox
                                        content={"The multiplier on your stake will increase from 1.00x to 3.00x over 90 days"}
                                        customStyle={{}}
                                        link={null}
                                        boxStyle={{ width: '200px', top: '50%', zIndex: 10 }}
                                        hoverId={"BonusPeriod"}
                                        currentHoverId={currentHoverId}
                                        setCurrentHoverId={setCurrentHoverId}
                                    />
                                </div>

                            </div>
                            <div className="rounded-[25px]  flex justify-center w-[100%] mt-6 text-[#101010]">
                                <div className="p-2 lg:p-3 px-2  rounded-l-[25px] rounded-r-none  border-[1px] w-[30%] border-l-0 bg-[#E6DFFF] flex justify-center gap-2 lg:gap-2 items-center">

                                    <h1 className="text-[10px] lg:text-[14px] font-medium">UNI-V2</h1>

                                </div>
                                <div className="p-2 lg:p-3 border-[1.5px] border-l-0 rounded-r-[25px] rounded-l-none w-[75%] focus:outline-none bg-original-white flex flex-row justify-between">
                                    <div className='w-[80%]'>
                                        <input

                                            className='w-[100%] outline-none bg-white-background'
                                            placeholder="Amount of UNI-V2 to stake"
                                            value={inputValue.univ2}
                                            onChange={(e) => handleInputChange(e, "univ2")} />
                                    </div>
                                    <div
                                        onClick={() => handleMaxClick("univ2", walletBalance.totalUniv2)}
                                        className=" maxButtonHover  rounded-full px-3 py-[1px] text-original-white flex items-center">
                                        <p className="text-[6px] lg:text-[11px] pb-[2px]">max</p>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className="flex justify-end items-center gap-4 mt-4 md:mb-0 text-[#101010]">
                            {allowance > Number(inputValue.univ2) ? null
                                : <button type="button" className="relative group bg-black-background py-2  px-8 rounded-full flex items-center  gap-3"
                                    id={"approveUniV2"}
                                    onClick={() => {
                                        handleApproveClick()
                                    }}>
                                    <div class="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <p className="relative z-10 text-original-white text-[13px] ">Approve $UNI-V2</p>
                                    <HintBox
                                        content={"Approve the Pool to access $UNI-V2 in your wallet in order to stake"}
                                        customStyle={{ 'arrowLeft': '40%' }}
                                        link={null}
                                        boxStyle={{ width: '200px', top: '50%', zIndex: 10 }}
                                        hoverId={"approveUniV2"}
                                        currentHoverId={currentHoverId}
                                        setCurrentHoverId={setCurrentHoverId}
                                    />
                                </button>}

                            <button type="button" className={`relative group ${Number(inputValue.univ2) && allowance > Number(inputValue.univ2) ? "bg-black-background" : "bg-[#121212] bg-opacity-5"} py-2 px-8 rounded-full flex items-center  gap-3`} onClick={() => handleStake()}>
                                <div className="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full  opacity-0  transition-opacity duration-500"></div>
                                <p className={`relative z-10 ${Number(inputValue.univ2) && allowance > Number(inputValue.univ2) ? "text-original-white" : "text-[#101010] opacity-30"} text-[15px] `}>Stake</p>
                            </button>
                        </div>

                    </div>

                    <div className="rounded-2xl p-6 lg:p-10 flex flex-col justify-between h-[auto] bg-white-background stake-card">

                        <div>
                            <h1 className="text-[15px] lg:text-[20px] text-[#4A28FF] font-medium">Unstake</h1>
                            <div className="flex justify-start items-end mt-6 mb-8 gap-6 text-[#101010]">

                                <div className='mt-6 w-1/2 shadow-none p-6 py-4 rounded-[10px] max-h-[150px] transition-all hover:shadow-stats hover:cursor-pointer bg-[#F9F6FF] flex flex-col justify-center text-[#101010]' >
                                    <div id="unstakeBalance" className="flex justify-start items-baseline h-[50px]">
                                        <h1 className="text-[25px] xl:text-[38px] font-medium text-purple-text">{data?.unstake ? formatNumber(data?.unstake.balance) : 0}&nbsp;</h1>
                                        <p className="text-para  text-black-text  ">Uni-V2</p>
                                        <HintBox
                                            content={"Total UNI-V2 you have staked in this Pool"}
                                            customStyle={{}}
                                            link={null}
                                            boxStyle={{ width: '200px', top: '50%', zIndex: 10 }}
                                            hoverId={"unstakeBalance"}
                                            currentHoverId={currentHoverId}
                                            setCurrentHoverId={setCurrentHoverId}
                                        />
                                    </div>
                                    <h1 className="text-[8px] lg:text-[13px] font-medium">Staked</h1>
                                </div>


                                <div className='mt-6 w-1/2 shadow-none p-6 py-4 rounded-[10px] max-h-[150px] transition-all hover:shadow-stats hover:cursor-pointer bg-[#F9F6FF] flex flex-col justify-center text-[#101010]'>
                                    <div id="claimableRewards" className="flex justify-start items-baseline  h-[50px]">

                                        <div className="group flex align-bottom">
                                            <h1 className="text-[25px] xl:text-[38px] font-medium text-purple-text group-hover:hidden">
                                                {data?.unstake.rewards ? data?.unstake.rewards : 0}&nbsp;
                                            </h1>
                                            <h1 className="text-[12px] xl:text-[24px] font-medium text-purple-text hidden group-hover:block">
                                                {data?.unstake.rewardsFull ? data?.unstake.rewardsFull : 0.00}&nbsp;
                                            </h1>
                                        </div>
                                        <p className="text-para ">AIUS</p>
                                        <HintBox
                                            content={"Your estimated rewards if you unstake now"}
                                            customStyle={{}}
                                            link={null}
                                            boxStyle={{ width: '200px', top: '50%', zIndex: 10 }}
                                            hoverId={"claimableRewards"}
                                            currentHoverId={currentHoverId}
                                            setCurrentHoverId={setCurrentHoverId}
                                        />
                                    </div>
                                    <h1 className=" text-[#101010] text-[8px] lg:text-[13px] font-medium">Claimable Rewards</h1>


                                </div>


                            </div>

                            <hr className="opacity-10" />

                            <div className="flex justify-center gap-[50px] mt-4 text-[#101010] ">
                                <div >

                                    <div className='flex flex-row gap-1  '>
                                        <h1 className="text-[25px] lato-bold text-[#4A28FF]">{globalUnlockedValue}</h1>
                                        <h1 className='text-[14px] self-end mb-1'>AIUS</h1>
                                    </div>
                                    <h2 className="text-[15px] font-medium" id="globalUnlocked">Global Unlocked</h2>
                                    <HintBox
                                        content={"Total AIUS currently unlocked for entire pool. This number is important to keep an eye on for timing your unstakes."}
                                        customStyle={{ 'arrowLeft': '50%', 'marginBottom': '' }}
                                        link={null}
                                        boxStyle={{ width: '200px', top: '0%', zIndex: 10 }}
                                        hoverId={"globalUnlocked"}
                                        currentHoverId={currentHoverId}
                                        setCurrentHoverId={setCurrentHoverId}
                                    />
                                </div>
                                <div className='h-[60px] w-[1px] bg-[#5E40FD1A] '>

                                </div>
                                <div >

                                    <div className='flex flex-row gap-1 text-[#101010] '>
                                        <h1 className="text-[25px] lato-bold text-[#4A28FF]">{timeMultiplier}</h1>
                                        <h1 className='text-[14px] self-end mb-1'>X</h1>
                                    </div>
                                    <h2 className="text-[15px] font-medium">Time mult.</h2>

                                </div>

                                <div className='h-[60px] w-[1px] bg-[#5E40FD1A] '>

                                </div>
                                <div >

                                    <div className='flex flex-row gap-1 '>
                                        <h1 className="text-[25px] lato-bold text-[#4A28FF]">{daysStaked}</h1>
                                        <h1 className='text-[14px] self-end mb-1'>{daysStaked == 1 ? " day" : " days"}</h1>
                                    </div>
                                    <h2 className="text-[15px] font-medium">Time Staked</h2>

                                </div>
                            </div>
                            <div className="rounded-[25px]  flex justify-center w-[100%] mt-6 text-[#101010]">
                                <div className="p-2 lg:p-3 px-2  rounded-l-[25px] rounded-r-none  border-[1px] w-[25%] border-l-0 bg-[#E6DFFF] flex justify-center gap-2 lg:gap-2 items-center">

                                    <h1 className="text-[10px] lg:text-[14px] font-medium">UNI-V2</h1>

                                </div>
                                <div className="p-2 lg:p-3 border-[1.5px] border-l-0 rounded-r-[25px] rounded-l-none w-[75%] focus:outline-none bg-original-white flex flex-row justify-between">
                                    <div className='w-[80%]'>
                                        <input
                                            className='w-[100%] outline-none bg-white-background'
                                            placeholder="Amount of UNI-V2 to unstake"
                                            value={inputValue.unstake}
                                            onChange={(e) => handleInputChange(e, "unstake")}
                                        />
                                    </div>
                                    <div
                                         onClick={() => handleMaxClick("unstake", walletBalance.stakedUniv2)}
                                        className=" maxButtonHover  rounded-full px-3 py-[1px] text-original-white flex items-center">
                                        <p className="text-[6px] lg:text-[11px] pb-[1px]">max</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-2 text-[#101010] mt-6">
                                <div className="w-[50%] flex justify-between items-end gap-0">
                                    <div className="rounded-[25px]  flex justify-center w-[100%] ">
                                        <div className="p-2 lg:p-3 px-2  rounded-l-[25px] rounded-r-none  border-[1px] w-[60%] border-l-0 bg-[#E6DFFF] flex justify-center gap-1 lg:gap-1 items-center">

                                            <h1 className="text-[10px] lg:text-[14px] font-medium ">GYSR</h1>

                                        </div>
                                        <div className="p-2 lg:p-3 border-[1.5px] border-l-0 rounded-r-[25px] rounded-l-none w-[65%] focus:outline-none bg-original-white flex flex-row justify-between">
                                            <div className='w-[80%]'>
                                                <input
                                                    className='w-[100%] outline-none bg-white-background'
                                                    placeholder="0.00"
                                                    value={inputValue.gysr}
                                                    onChange={(e) => handleInputChange(e, "gysr")}
                                                />
                                            </div>
                                            <div className=" maxButtonHover  rounded-full px-3 py-[1px] text-original-white flex items-center"
                                                onClick={() => handleMaxClick("gysr", gysrBalance)}>
                                                <p className="text-[6px] lg:text-[11px] pb-[1px]">max</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center gap-1 items-center rounded-full p-4 px-3 shadow-stats inner-shdadow w-[50%]' id="inner-shdadow">
                                    <div id="multiplyQuotient">
                                        <h1 className="text-[16px]  text-[#777777]">{gysrMultiplier.toFixed(2)} x</h1>
                                    </div>
                                    <HintBox
                                        content={"By spending GYSR you will multiply the number of share seconds that you have accrued"}
                                        customStyle={{ 'arrowLeft': '35%' }}
                                        link={null}
                                        boxStyle={{ width: '200px', top: '50%', zIndex: 10 }}
                                        hoverId={"multiplyQuotient"}
                                        currentHoverId={currentHoverId}
                                        setCurrentHoverId={setCurrentHoverId}
                                    />
                                    <div className="text-[#101010] text-[8px] xl:text-[10px] ">
                                        <h1 className="text-[#777777]">You&apos;ll Receive <span className='text-purple-text  text-[12px] xl:text-[16px] lato-bold'>{formatNumber(gysrMultiplier * inputValue?.unstake)} AIUS</span></h1>

                                    </div>
                                </div>



                            </div>
                            <div className="flex justify-start items-center gap-4 mt-4 opacity-40 text-[14px] ml-2 text-original-black ">
                                <span className='font-Geist-SemiBold '>Available GYSR:</span>{gysrBalance}
                            </div>

                            <div className="flex justify-end items-center gap-4 mt-6">
                                {(inputValue.gysr && gysrAllowance < inputValue.gysr) && data?.unstake.rewardsFull > 0 && data?.unstake.balance > 0 ?
                                    <button type="button" className={`relative group bg-[#121212] py-2 px-8 rounded-full flex items-center gap-3`}
                                        onClick={() => handleGYSRApprove()}>
                                        <div class="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full  opacity-0  transition-opacity duration-500"></div>
                                        <p className={`relative z-10 text-original-white text-[15px] mb-[1px]`}>Approve GYSR</p>
                                    </button> : null}

                                <button type="button" className={`${data?.unstake.rewardsFull > 0 ? "" : " bg-opacity-5"} relative group bg-[#121212] py-2 px-8 rounded-full flex items-center gap-3`}
                                    onClick={() => { data?.unstake.rewardsFull > 0 ? handleClaimTokens(inputValue.gysr > 0 ? inputValue.gysr : null) : null }}>
                                    <div class="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full  opacity-0  transition-opacity duration-500"></div>
                                    <p className={`relative z-10 ${data?.unstake.rewardsFull > 0 ? "text-original-white" : "text-[#101010] opacity-30"} text-[15px] mb-[1px]`}>Claim</p>
                                </button>

                                <button type="button" className={`${data?.unstake.balance > 0 && inputValue.unstake ? "" : "bg-opacity-5"} relative group bg-[#121212] py-2  px-8 rounded-full flex items-center  gap-3`}
                                    onClick={() => { data?.unstake.balance > 0 && inputValue.unstake ? handleUnstake(inputValue?.unstake > 0 ? inputValue.unstake : null, inputValue.gysr > 0 ? inputValue.gysr : null) : null }}>
                                    <div class={`absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full ${data?.unstake.balance > 0 ? "bg-buy-hover group-hover:opacity-100" : ""} opacity-0 transition-opacity duration-500`}></div>
                                    <p className={`relative z-10 ${data?.unstake.balance > 0 && inputValue.unstake ? "text-original-white" : "text-[#101010] opacity-30"} text-[15px] mb-[1px]`}>Unstake & Claim</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </>) : (<>
                    <div className="rounded-2xl p-6 lg:p-10 flex flex-col justify-between h-[350px] lg:h-[auto] bg-white-background stake-card">
                        <div>
                            <h1 className="text-[15px] lg:text-[20px] font-medium">Stake</h1>
                            <p className="text-[11px] lg:text-para mt-6">Please connect a wallet to interact with this pool!</p>
                        </div>


                        <div className="flex justify-center items-center lg:mt-16 lg:mb-16">

                            <div className="relative w-[100px] h-[100px] lg:w-[100px] lg:h-[100px]">

                                <Image src={walletImage} alt="" />

                            </div>

                        </div>
                        <div className="flex justify-center lg:justify-end">

                            <button type="button" className="relative group bg-black-background py-2  px-8 rounded-full flex items-center  gap-3 w-[100%] lg:w-[auto]" onClick={() => clickConnect()}>
                                <div class="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <p className="relative z-10 text-original-white  mb-1 w-[100%] lg:w-[auto]">Connect Wallet</p>

                            </button>

                        </div>

                    </div>

                    <div className="rounded-2xl p-6 lg:p-10 flex flex-col justify-between h-[350px] lg:h-[auto] bg-white-background stake-card">
                        <div>
                            <h1 className="text-[15px] lg:text-[20px] font-medium">Unstake</h1>
                            <p className="text-[11px] lg:text-para mt-6">Please connect a wallet to interact with this pool!</p>
                        </div>


                        <div className="flex justify-center items-center lg:mt-16 lg:mb-16">

                            <div className="relative w-[100px] h-[100px] lg:w-[100px] lg:h-[100px]">

                                <Image src={walletImage} alt="" />

                            </div>

                        </div>
                        <div className="flex justify-center lg:justify-end">

                            <button type="button" className="relative group bg-black-background py-2  px-8 rounded-full flex items-center  gap-3 w-[100%] lg:w-[auto]" onClick={() => clickConnect()}>
                                <div class="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <p className="relative z-10 text-original-white  mb-1 w-[100%] lg:w-[auto]">Connect Wallet</p>

                            </button>

                        </div>

                    </div>
                </>)}


            </div>

        </>
    )
}

export default Stake