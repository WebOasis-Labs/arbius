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
import fetchData from "../../../Utils/getGysrData";

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
    const [userStaked, setUserStaked] = useState(false);
    const [calculatedRewards, setCalculatedRewards] = useState(0);
    const [realTimeClaimableRewards, setRealTimeClaimableRewards] = useState(0);

    const [inputValue, setInputValue] = useState({
        univ2: '',
        unstake: '',
        gysr: ''
    });
    const [successText, setSuccessText] = useState("");
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
            const result = await fetchData(address);
            let data5 = await getTimeStaked(result?.data?.position?.stakes?.[0].timestamp)
            let data6 = await gysrTokenBalance(address)
            let data7 = await gysrAllowance(address)
            let data8 = await getGysrMultiplier(1, 0, address) // time multiplier comes with the same function - passing sample amount for unstake and gysr
            let rewardWithFixed
            let data1_1 = 0;
            if (data1.userStake !== "0") {
                setUserStaked(true)
            }
            if (data1?.totalStake) {
                setTotalStaked((Number(data1?.totalStake) / eth_wei).toFixed(2))
            }
            if (data1?.userStake) {
                data1_1 = (Number(data1?.userStake) / eth_wei).toFixed(5)
            }
            if (data2) {
                rewardWithFixed = data2
                data2 = Number(data2).toFixed(5)
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
            if (data8) {
                if (data8?.[1]) {
                    setTimeMultiplier((data8[1] / eth_wei).toFixed(2))
                }
            }
            setData({
                unstake: {
                    rewards: data2,
                    balance: data1_1,
                    balanceFull: data1?.userStake,
                    rewardsFull: rewardWithFixed
                }
            })

            setRealTimeClaimableRewards(rewardWithFixed)

            /*const tMultiplier = calculateBonusMultiplier(data5, data1_1)
            if (tMultiplier) {
                setTimeMultiplier(tMultiplier.toFixed(2))
            }*/
            console.log(data1_1, data2, data3, data4, data5, data6, data7, data8, "kokokokokokok")
        }
        const getAccountsData = async () => {
            let data1 = await getGYSRBalance(address);
            let data2 = await stakeTokenBalance(address)
            console.log(data1, data2, "balances")
            if (data1) {
                data1 = data1
            }
            if (data2) {
                data2 = Number(data2?.userStake) / eth_wei
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
    }, [address, isConnected, showPopUp])

    useEffect(() => {
        const getMult = async () => {
            const unstakeAmount = Number(inputValue.unstake)
            const gysrAmount = Number(inputValue.gysr)
            console.log(totalStaked, "TST")
            if (unstakeAmount) {
                console.log("COMING IN")
                let gysrM = await getGysrMultiplier(unstakeAmount * eth_wei * 1000000, gysrAmount * eth_wei, address)
                if (gysrM?.[2]) {
                    console.log(gysrM)
                    setGysrMultiplier(gysrM[2] / eth_wei)
                }
                if (gysrM?.[0]) {
                    console.log(gysrM[0], "00000rew")
                    setCalculatedRewards(gysrM[0] / eth_wei)
                }
            } else {
                setCalculatedRewards(0)
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
                const stakedTokens = await stakeTokens(inputValue.univ2, address);
                if (stakedTokens) {
                    const newStakedTokens = await stakeTokenBalance()
                    setWalletBalance({ ...walletBalance, stakedUniv2: newStakedTokens })
                    setSuccessText(`You have successfully staked ${Number.isInteger(Number(inputValue.univ2)) ? Number(inputValue.univ2) : Number(inputValue.univ2).toFixed(6)} UNI-V2`)
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
            const claimed = await claimTokens(data?.unstake?.balanceFull, gysr, address)
            console.log(claimed, "CLAIMED")
            let wait = await claimed.wait();
            console.log(wait, "waited")
            if (claimed) {
                let _claimableRewards = data?.unstake?.rewards
                setSuccessText(`You have successfully earned ${Number.isInteger(Number(_claimableRewards)) ? Number(_claimableRewards) : Number(_claimableRewards).toFixed(6)} AIUS`)
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
            let _claimableRewards = await getGysrMultiplier(amount * eth_wei * 1000000, Number(gysr), address)
            _claimableRewards = _claimableRewards[0]
            console.log(_claimableRewards, "UNSTAKE CLAIMABLE")
            console.log(_claimableRewards / eth_wei)

            const unstaked = await unstakeTokens(amount * eth_wei, gysr, address)
            console.log(unstaked, "unstaked")
            //let rewardData = 0;

            if (unstaked) {
                //rewardData = unstaked?.events?.RewardsDistributed?.returnValues?.amount;

                setSuccessText(`You have successfully unstaked ${Number.isInteger(Number(amount)) ? Number(amount) : Number(amount).toFixed(6)} UNI-V2 and earned ${(_claimableRewards / eth_wei).toFixed(8)} AIUS. `)
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

    function convertNumber(num) {
        num = parseFloat(num);

        if (num === 0) {
            return "0.00";
        }

        else if (num < 1) {
            return Number(num.toFixed(5));
        }
        else {
            return Math.round(num * 10) / 10;
        }
    }


const [realtimeInterval, setRealtimeInterval] = useState(null);

const handleRealtimeClaimableRewards = async (mouseOver) => {
    if (address === null || data?.unstake?.rewardsFull === null || data?.unstake?.rewardsFull === undefined || data?.unstake?.rewardsFull === 0) {
        return;
    }

    console.log({ mouseOver });

    if (!mouseOver) {
        console.log("realtime stopped");
        console.log("realtime",{ realtimeInterval });
        
        clearInterval(realtimeInterval);
        // interval = null; 
        setRealtimeInterval(null);
    } else {
        console.log("realtime started");

        
        if (realtimeInterval) {
            clearInterval(realtimeInterval);
        }

        let _realTimeRewards = await claimableRewards(address);
    
        _realTimeRewards = Number(_realTimeRewards).toFixed(5);
        // _realTimeRewards = 0.0000004;

        setRealTimeClaimableRewards(_realTimeRewards.toFixed(10));

        let _interval = setInterval(() => {
            console.log("realtime interval");
            
            _realTimeRewards = Number(_realTimeRewards) + 0.0000000001;
            setRealTimeClaimableRewards(_realTimeRewards.toFixed(10));
            console.log({ _realTimeRewards });
        }, 1000);
        setRealtimeInterval(_interval);
    }
};

    return (
        <>
            {showPopUp !== false && (
                <>
                    <PopUp setShowPopUp={setShowPopUp} >
                        {showPopUp === ("Success") && (<SuccessChildren setShowPopUp={setShowPopUp} text={successText} />)}
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
                                        <h1 className="text-[25px] xl:text-[30px] font-medium text-purple-text">{walletBalance.totalUniv2 ? convertNumber(walletBalance.totalUniv2) : 0}</h1>
                                        <p className="text-para ml-2 text-black-text ">UNI-V2</p>
                                    </div>
                                    <h1 className="text-[8px] lg:text-[13px] font-medium text-black-text">Wallet Balance</h1>

                                </div>


                                <div className='mt-6 w-1/2 shadow-none p-6 py-4 rounded-[10px] max-h-[150px] transition-all hover:shadow-stats hover:cursor-pointer bg-[#F9F6FF] flex flex-col justify-center text-[#101010] relative' id="BonusPeriod">
                                    <div className="flex justify-start items-baseline" >
                                        <h1 className="text-[25px] xl:text-[30px] font-medium text-purple-text">90</h1>
                                        <p className="text-para ml-2 text-black-text">Days</p>
                                    </div>

                                    <h1 className="text-[8px] lg:text-[13px] font-medium text-black-text ">Bonus Period</h1>
                                    <div className='flex justify-center w-[80%] absolute'>
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

                            </div>
                            <div className="rounded-[25px]  flex justify-center w-[100%] mt-6 text-[#101010]">
                                <div className="p-2 lg:p-3 px-2  rounded-l-[25px] rounded-r-none  border-[1px] w-[30%] border-l-0 bg-[#E6DFFF] flex justify-center gap-2 lg:gap-2 items-center">

                                    <h1 className="text-[10px] lg:text-[14px] font-medium">UNI-V2</h1>

                                </div>
                                <div className="p-1 lg:p-1 border-[1.5px] border-l-0 rounded-r-[25px] rounded-l-none w-[75%] focus:outline-none bg-original-white flex flex-row justify-between">
                                    <div className='w-[80%]'>
                                        <input

                                            className='w-[100%] placeholder:text-sm outline-none border-0 bg-white-background'
                                            placeholder="Amount of UNI-V2 to stake"
                                            value={inputValue.univ2}
                                            type='number'
                                            onChange={(e) => handleInputChange(e, "univ2")} />
                                    </div>
                                    <div
                                        onClick={() => handleMaxClick("univ2", walletBalance.totalUniv2)}
                                        className=" maxButtonHover  rounded-full m-[0.5rem] px-3 py-[1px] text-original-white flex items-center">
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
                                    <div className="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                                <div className={Number(inputValue.univ2) && allowance > Number(inputValue.univ2) ? "absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500" : "absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full  opacity-0  transition-opacity duration-500"}></div>
                                <p className={`relative z-10 ${Number(inputValue.univ2) && allowance > Number(inputValue.univ2) ? "text-original-white" : "text-[#101010] opacity-30"} text-[15px] `}>Stake</p>
                            </button>
                        </div>

                    </div>

                    <div className="rounded-2xl p-6 lg:p-10 flex flex-col justify-between h-[auto] bg-white-background stake-card" >

                        <div>
                            <h1 className="text-[15px] lg:text-[20px] text-[#4A28FF] font-medium">Unstake</h1>
                            <div className="flex justify-start items-end mt-6 mb-8 gap-6 text-[#101010]">

                                <div className='mt-6 w-1/2 shadow-none p-6 py-4 rounded-[10px] max-h-[150px] transition-all hover:shadow-stats hover:cursor-pointer bg-[#F9F6FF] flex flex-col justify-center text-[#101010]' id="unstakeBalance" >
                                    <div className="flex justify-start items-baseline h-[50px] w-full relative">
                                        <h1 className="text-[25px] xl:text-[30px] font-medium text-purple-text">{data?.unstake?.balance ? convertNumber(data?.unstake?.balance) : 0.00}&nbsp;</h1>
                                        <p className="text-[14px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px]  text-black-text  whitespace-nowrap">UNI-V2</p>
                                        <div className='flex justify-center w-full absolute'>
                                            <HintBox
                                                content={"Total UNI-V2 you have staked in this Pool"}
                                                customStyle={{ marginBottom: "20px" }}
                                                link={null}
                                                boxStyle={{ width: '200px', top: '50%', zIndex: 10 }}
                                                hoverId={"unstakeBalance"}
                                                currentHoverId={currentHoverId}
                                                setCurrentHoverId={setCurrentHoverId}
                                            />

                                        </div>
                                    </div>
                                    <h1 className="text-[10px] xl:text-[13px] font-medium">Staked</h1>
                                </div>


                                <div className='mt-6 w-1/2 shadow-none p-6 py-4 rounded-[10px]  max-h-[150px] transition-all hover:shadow-stats hover:cursor-pointer bg-[#F9F6FF] flex flex-col justify-center text-[#101010]' id="claimableRewards">
                                    <div className="flex justify-start items-baseline  h-[50px] w-full relative">

                                        <div className="h-[45px] min-w-[90px] group" onMouseEnter={()=>{
                                            // setMouseOverClaimableRewards(true)
                                            handleRealtimeClaimableRewards(true)
                                        }} onMouseLeave={()=>{
                                            // setMouseOverClaimableRewards(false)
                                            console.log("mouse leave")
                                            
                                            handleRealtimeClaimableRewards(false)
                                        }}>
                                            <h1 className="text-[25px] xl:text-[30px] font-medium text-purple-text group-hover:hidden ">
                                                {data?.unstake.rewards ? convertNumber(data?.unstake.rewards) : 0}&nbsp;
                                                <span className="text-[12px] xl:text-[14px] ">AIUS</span>
                                            </h1>
                                            <h1 className={realTimeClaimableRewards?.toString().length > 10 ? "text-[12px] xl:text-[12px] font-medium text-purple-text hidden group-hover:block mt-4" : "text-[12px] xl:text-[24px] font-medium text-purple-text hidden group-hover:block mt-1"}>
                                                {realTimeClaimableRewards ? realTimeClaimableRewards : 0.00}&nbsp;
                                                {/* <span className={data?.unstake?.rewardsFull?.toString().length > 10 ?"text-[10px] xl:text-[10px] " : "text-[12px] xl:text-[14px] "}>AIUS</span> */}
                                            </h1>
                                        </div>

                                        <div className='flex justify-center w-full absolute'>
                                            <HintBox
                                                content={"Your estimated rewards if you unstake now"}
                                                customStyle={{ marginBottom: "20px" }}
                                                link={null}
                                                boxStyle={{ width: '200px', top: '50%', zIndex: 10 }}
                                                hoverId={"claimableRewards"}
                                                currentHoverId={currentHoverId}
                                                setCurrentHoverId={setCurrentHoverId}
                                            />

                                        </div>
                                    </div>
                                    <h1 className=" text-[#101010] text-[10px] xl:text-[13px] font-medium">Claimable Rewards</h1>


                                </div>


                            </div>

                            <hr className="opacity-10" />

                            <div className="flex justify-center gap-[50px] lg:gap-[30px] xl:gap-[50px] mt-4 text-[#101010] ">
                                <div id='globalAIUS' className="h-[80px]" >

                                    <div className='flex flex-row gap-1  '>
                                        <h1 className="text-[25px] lato-bold text-[#4A28FF]" id=''>{globalUnlockedValue}  <span className='text-[14px] '>AIUS</span></h1>

                                    </div>
                                    <h2 className="text-[15px] font-medium" id="">Global Unlocked</h2>
                                    {/* <HintBox
                                        content={"Total AIUS currently unlocked for entire pool. This number is important to keep an eye on for timing your unstakes."}
                                        customStyle={{ 'arrowLeft': '50%', 'marginBottom': '' }}
                                        link={null}
                                        boxStyle={{ width: '200px', top: '0%', zIndex: 10 }}
                                        hoverId={"globalUnlocked"}
                                        currentHoverId={currentHoverId}
                                        setCurrentHoverId={setCurrentHoverId}
                                    /> */}
                                    <HintBox
                                        content={"Total AIUS currently unlocked for entire pool. This number is important to keep an eye on for timing your unstakes."}
                                        customStyle={{ arrowLeft: "50%", 'marginBottom': '70px', 'marginLeft': "30px" }}
                                        link={null}
                                        boxStyle={{ width: '200px', top: '0%', zIndex: 10 }}
                                        hoverId={"globalAIUS"}
                                        currentHoverId={currentHoverId}
                                        setCurrentHoverId={setCurrentHoverId}
                                    />
                                </div>
                                <div className='h-[60px] w-[1px] bg-[#5E40FD1A] '>

                                </div>
                                <div id='mult' className="h-[80px]">

                                    <div className='flex flex-row gap-1 text-[#101010] ' >
                                        <h1 className="text-[25px] lato-bold text-[#4A28FF]">{userStaked ? timeMultiplier : "-"}</h1>
                                        <h1 className='text-[14px] self-end mb-1'>{userStaked ? "X" : null}</h1>
                                    </div>
                                    <h2 className="text-[15px] font-medium">Time mult.</h2>
                                    <HintBox
                                        content={"The multiplier on your stake will increase from 1.00x to 3.00x over 90 days."}
                                        customStyle={{ arrowLeft: "50%", 'marginBottom': '70px', 'marginLeft': "20px" }}
                                        link={null}
                                        boxStyle={{ width: '200px', top: '0%', zIndex: 10 }}
                                        hoverId={"mult"}
                                        currentHoverId={currentHoverId}
                                        setCurrentHoverId={setCurrentHoverId}
                                    />

                                </div>

                                <div className='h-[60px] w-[1px] bg-[#5E40FD1A] '>

                                </div>
                                <div id='timeStaked' className="h-[80px]" >

                                    <div className='flex flex-row gap-1 '>
                                        <h1 className="text-[25px] lato-bold text-[#4A28FF]">{userStaked ? daysStaked : "-"}</h1>
                                        <h1 className='text-[14px] self-end mb-1'>{userStaked ? daysStaked == 1 ? " day" : " days" : null}</h1>
                                    </div>
                                    <h2 className="text-[15px] font-medium">Time Staked</h2>
                                    <HintBox
                                        content={"Number of days you have been staked in this pool."}
                                        customStyle={{ arrowLeft: "50%", 'marginBottom': '70px', 'marginLeft': "20px" }}
                                        link={null}
                                        boxStyle={{ width: '200px', top: '-10%', zIndex: 10 }}
                                        hoverId={"timeStaked"}
                                        currentHoverId={currentHoverId}
                                        setCurrentHoverId={setCurrentHoverId}
                                    />

                                </div>
                            </div>
                            <div className="rounded-[25px]  flex justify-center w-[100%] mt-6 text-[#101010]">
                                <div className="p-2 lg:p-3 px-2  rounded-l-[25px] rounded-r-none  border-[1px] w-[25%] border-l-0 bg-[#E6DFFF] flex justify-center gap-2 lg:gap-2 items-center">

                                    <h1 className="text-[10px] lg:text-[14px] font-medium">UNI-V2</h1>

                                </div>
                                <div className="p-1 lg:p-1 border-[1.5px] border-l-0 rounded-r-[25px] rounded-l-none w-[75%] focus:outline-none bg-original-white flex flex-row justify-between">
                                    <div className='w-[80%]'>
                                        <input
                                            className='w-[100%] placeholder:text-sm outline-none border-0 bg-white-background'
                                            placeholder="Amount of UNI-V2 to unstake"
                                            value={inputValue.unstake}
                                            type='number'
                                            onChange={(e) => handleInputChange(e, "unstake")}
                                        />
                                    </div>
                                    <div
                                        onClick={() => handleMaxClick("unstake", walletBalance.stakedUniv2)}
                                        className=" maxButtonHover  rounded-full m-[0.5rem] px-3 py-[1px] text-original-white flex items-center">
                                        <p className="text-[6px] lg:text-[11px] pb-[1px]">max</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-2 lg:gap-1 xl:gap-2 text-[#101010] mt-6">
                                <div className="w-[50%]  flex justify-between items-end gap-0">
                                    <div className="rounded-[25px]  flex justify-center w-[100%] ">
                                        <div className="p-2 lg:p-3 px-2  rounded-l-[25px] rounded-r-none  border-[1px] w-[60%] border-l-0 bg-[#E6DFFF] flex justify-center gap-1 lg:gap-1 items-center">

                                            <h1 className="text-[10px] lg:text-[14px] font-medium ">GYSR</h1>

                                        </div>
                                        <div className="p-1 lg:p-1 border-[1.5px] border-l-0 rounded-r-[25px] rounded-l-none w-[65%] focus:outline-none bg-original-white flex flex-row justify-between">
                                            <div className='w-[80%]'>
                                                <input
                                                    className='w-[100%] placeholder:text-sm outline-none border-0 bg-white-background'
                                                    placeholder="0.00"
                                                    type='number'
                                                    value={inputValue.gysr}
                                                    onChange={(e) => handleInputChange(e, "gysr")}
                                                />
                                            </div>
                                            <div className=" maxButtonHover  rounded-full m-[0.5rem] px-3 py-[1px] text-original-white flex items-center"
                                                onClick={() => handleMaxClick("gysr", gysrBalance)}>
                                                <p className="text-[6px] lg:text-[11px] pb-[1px]">max</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="multiplyQuotient">
                                    <h1 className="text-[18px] lg:text-[12px] xl:text-[16px] font-semibold 2xl:text-[22px] whitespace-nowrap  text-[#000]">{gysrMultiplier.toFixed(2)} x</h1>
                                </div>
                                <HintBox
                                    content={"By spending GYSR you will multiply the number of share seconds that you have accrued"}
                                    customStyle={{ arrowLeft: '35%' }}
                                    link={null}
                                    boxStyle={{ width: '200px', top: '50%', zIndex: 10 }}
                                    hoverId={"multiplyQuotient"}
                                    currentHoverId={currentHoverId}
                                    setCurrentHoverId={setCurrentHoverId}
                                />
                                <div className='flex justify-center gap-1 items-center rounded-full p-4 px-2 py-3 xl:py-3 border-2 border-[#4A28FF] w-[40%]   xl:w-[38%]' id="">


                                    <div className="text-[#101010] text-[8px] xl:text-[10px]">
                                        <h1 className="text-[#777777] text-[10px] md:text-[12px] xl:text-[14px] 2xl:text-[16px] whitespace-pre "><span className='block text-center'>You&apos;ll Receive</span> <span className='text-purple-text text-[10px] md:text-[16px] lg:text-[10px] xl:text-[15px] 2xl:text-[18px] lato-bold'>{Number(calculatedRewards).toFixed(5)} <span className='text-[10px] md:text-[14px] lg:text-[9px] xl:text-[13px] 2xl:text-[16px]'>AIUS</span></span></h1>
                                    </div>
                                </div>



                            </div>
                            <div className="flex justify-start items-center mt-0 opacity-40 text-[12px] text-original-black ">
                                <span className='font-Geist-SemiBold '>Available GYSR:&nbsp;</span>{gysrBalance.toFixed(2)}
                            </div>

                            <div className="flex justify-end items-center gap-4 mt-6">
                                {(inputValue.gysr && gysrAllowance < inputValue.gysr) && data?.unstake.rewardsFull > 0 && data?.unstake.balance > 0 ?
                                    <button type="button" className={`relative group bg-[#121212] py-2 px-8 rounded-full flex items-center gap-3`}
                                        onClick={() => handleGYSRApprove()}>
                                        <div className="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <p className={`relative z-10 text-original-white text-[15px] mb-[1px]`}>Approve GYSR</p>
                                    </button> : null}

                                <button type="button" className={`${data?.unstake.rewardsFull > 0 ? "" : " bg-opacity-5"} relative group bg-[#121212] py-2 px-8 rounded-full flex items-center gap-3`}
                                    onClick={() => { data?.unstake.rewardsFull > 0 ? handleClaimTokens(inputValue.gysr > 0 ? inputValue.gysr : null) : null }}>
                                    <div className={data?.unstake.rewardsFull > 0 ? "absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500" : "absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full  opacity-0  transition-opacity duration-500"}></div>
                                    <p className={`relative z-10 ${data?.unstake.rewardsFull > 0 ? "text-original-white" : "text-[#101010] opacity-30"} text-[15px] mb-[1px]`}>Claim</p>
                                </button>

                                <button type="button" className={`${data?.unstake.balance > 0 && inputValue.unstake ? "" : "bg-opacity-5"} relative group bg-[#121212] py-2  px-8 rounded-full flex items-center  gap-3`}
                                    onClick={() => { data?.unstake.balance > 0 && inputValue.unstake ? handleUnstake(inputValue?.unstake > 0 ? inputValue.unstake : null, inputValue.gysr > 0 ? inputValue.gysr : null) : null }}>
                                    <div className={data?.unstake.balance > 0 && inputValue.unstake ? "absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500" : "absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full  opacity-0  transition-opacity duration-500"}></div>
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
                                <div className="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                                <div className="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-8 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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