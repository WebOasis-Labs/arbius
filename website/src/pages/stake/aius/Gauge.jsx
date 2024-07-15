import React, { useState } from 'react'

import Image from 'next/image'
import polygon from "../../../app/assets/images/polygon.png"
import info_icon from "../../../app/assets/images/info_icon.png"
import kandinsky_icon from "../../../app/assets/images/kandinsky_icon.png"
import kasumi_icon from "../../../app/assets/images/kasumi_l_icon.png"
import llama_icon from "../../../app/assets/images/llama.png"
import search_icon from "../../../app/assets/images/search_icon.png"
import PopUp from './PopUp'
import cross_icon from "../../../app/assets/images/cross_icon.png"
import arbius_logo_without_name from '@/app/assets/images/arbius_logo_without_name.png'
import clock_icon from "../../../app/assets/images/clock_icon.png"
function Gauge() {
    const data = [
        {
            model_name: "kandinsky 2",
            model_id: "arbiusllama3-400b-0703",
            description: "Image Generator",
            emissions: "21.1244%",
            prompts: "121,412",
            icon: kandinsky_icon,


        },
        {
            model_name: "Kasumi 2",
            model_id: "arbiusllama3-400b-0703",
            description: "Image Generator",
            emissions: "21.1244%",
            prompts: "121,412",
            icon: kasumi_icon,



        },
        {
            model_name: "Llama 3-400b",
            model_id: "arbiusllama3-400b-0703",
            description: "Image Generator",
            emissions: "21.1244%",
            prompts: "121,412",
            icon: llama_icon,


        },
        {
            model_name: "Llama 3-120b",
            model_id: "arbiusllama3-400b-0703",
            description: "Image Generator",
            emissions: "21.1244%",
            prompts: "121,412",
            icon: llama_icon,


        }
    ]

    const [selectedModel, setSelectedModel] = useState(null)
    const [showPopUp, setShowPopUp] = useState(false)

    return (
        <div className='lg:w-section-width w-mobile-section-width mx-auto max-w-center-width py-24 text-black-text '>

            {
                showPopUp && selectedModel !== null && (
                    <PopUp setShowPopUp={setShowPopUp}>

                        <>
                            <div className='flex justify-between items-center my-2'>
                                <div className='flex justify-start items-center gap-3'>
                                    <div className='bg-[#4A28FF] p-3  rounded-full '>
                                        <Image src={selectedModel?.icon} className='w-[14px] h-[14px]' />

                                    </div>
                                    <h1>{selectedModel?.model_name}</h1>
                                </div>
                                <div className='cursor-pointer' onClick={() => setShowPopUp(false)}>
                                    <Image src={cross_icon} className='w-[10px] h-[10px]' />
                                </div>

                            </div>

                            <p className='text-xs opacity-60 mb-6'>{selectedModel?.description}</p>

                            <div className='flex justify-start items-center gap-10 my-2'>
                                <div>
                                    <h3 className='opacity-50 text-xs'>Emissions</h3>
                                    <h1 className='mt-1'>{selectedModel?.emissions}</h1>
                                </div>
                                <div>
                                    <h3 className='opacity-50 text-xs'>Alloted Governance Power</h3>
                                    <h1 className='mt-1'>{0}</h1>
                                </div>

                            </div>
                            <div className='flex justify-start items-center gap-10 my-4'>
                                <div>
                                    <h3 className='opacity-50 text-xs'>Total Prompts Requested</h3>
                                    <h1 className='mt-1'>{selectedModel?.prompts}</h1>
                                </div>


                            </div>

                            <div className='flex justify-between items-center my-1 mt-6'>

                                <h1>Add veAIUS</h1>
                                <p className='text-xs'>Available Governance Power 0</p>

                            </div>

                            <div className='my-4'>
                                <div className="border border-[#2F2F2F] rounded-3xl flex items-center">
                                    <div className="bg-stake-input flex items-center gap-2 justify-center rounded-l-3xl  p-1 px-2 box-border">
                                        <div className="bg-white-background w-[30px] h-[30px] rounded-[50%] flex items-center justify-center ">
                                            <Image src={arbius_logo_without_name} width={15} alt="arbius" />
                                        </div>
                                        <p className="pr- text-aius lato-bold text-[12px]">veAIUS</p>
                                    </div>
                                    <div className="w-[94%]">
                                        <input className="w-[100%] border-0 outline-none rounded-r-3xl p-1 px-2 lato-bold text-[15px]" type="number" placeholder="0.0" />
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-end'>
                                <button
                                    type="button"
                                    className="relative group bg-black-background py-1 px-3 lg:px-5 rounded-full flex items-center gap-3 "
                                >
                                    <div class="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-5 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="lato-bold  relative z-10 text-original-white lg:text-[100%]">
                                        Vote
                                    </div>

                                </button>

                            </div>
                        </>
                    </PopUp>
                )
            }

            <div className='hidden lg:flex justify-between items-center w-full '>
                <div className='flex justify-start items-center gap-4 w-full h-auto'>
                    <h1 className='text-[40px] text-[#4A28FF] mb-2 lato-bold'>Gauge</h1>
                    <div className='rounded-md bg-white-background flex  items-center px-2 pr-3 justify-between h-auto w-[70%] stake-box-shadow'>
                        <input placeholder='Search Model name or ID' className='bg-transparent px-3 p-2 py-3 h-full w-full border-0 focus:outline-none ' />
                        <Image src={search_icon} className='h-4 w-4' />
                    </div>
                </div>

                <div className='text-[#4A28FF] text-[14px] w-[30%] gap-2 text-end font-semibold flex justify-end items-center'>
                <Image src={clock_icon} className='h-4 w-4' />
                    <h1>Voting starts in   02 D : 13 Hr : 16 Min</h1>
                </div>

            </div>
            <div className='flex lg:hidden justify-between items-center font-semibold'>
                <h1 className='text-[40px] text-[#4A28FF] mb-2  lato-bold'>Gauge</h1>
                <div className='text-[#4A28FF] text-[.85rem]  text-end flex gap-2 justify-end items-center'>
                    <Image src={clock_icon} className='h-4 w-4' />
                    <h1>Voting starts in   02 D : 13 Hr : 16 Min</h1>
                </div>

            </div>
            <div className='flex lg:hidden rounded-md items-center px-2 pr-3  bg-white-background  justify-between h-auto stake-box-shadow'>
                <input placeholder='Search Model name or ID' className='bg-transparent px-3 p-2 py-3 h-full w-full border-0 focus:outline-none placeholder:lato-regular' />
                <Image src={search_icon} className='h-4 w-4' />
            </div>
            <div className='w-full overflow-x-auto xl:overflow-x-visible'>
                <div className='rounded-lg  p-6 px-10 flex justify-between gap-8 items-center bg-white-background mt-2 mb-4 min-w-[1000px] font-semibold'>
                    <div className='w-[20%]'>
                        <h1>Model Name</h1>
                    </div>
                    <div className='w-[20%]'>
                        <h1>Description</h1>
                    </div>
                    <div className='w-[20%]'>
                        <h1>Emission</h1>
                    </div>
                    <div className='w-[20%]'>
                        <h1>Total Prompts Requested</h1>
                    </div>
                    <div className='w-[20%]'>

                    </div>

                </div>

                {data?.map((item, key) => {
                    return (

                        <div className='rounded-lg  p-4 px-10 flex justify-between gap-8 items-center bg-white-background my-2 relative min-w-[1000px] font-semibold' key={key}>
                            <div className='flex hidden justify-start items-center absolute left-[-110px]  top-[10%] z-20' id={key}>
                                <div className='bg-white-background w-auto p-3 rounded-xl'>
                                    <h1 className='text-[.6rem] mb-1 opacity-40'>Model ID</h1>
                                    <p className='text-[.4rem]'>{item?.model_id}</p>
                                </div>
                                <Image src={polygon} className='-ml-2' />

                            </div>
                            <div className='w-[20%] flex justify-start gap-2 items-center'>
                                <div className='bg-[#4A28FF] p-3  rounded-full '>
                                    <Image src={item?.icon} className='w-[14px] h-[14px]' />

                                </div>
                                <h1>{item?.model_name}</h1>
                                <div className=' cursor-pointer grayscale-[1] opacity-30 hover:grayscale-0 hover:opacity-100' onMouseOver={() => {
                                    document.getElementById(key).style.display = "flex"
                                }}
                                    onMouseLeave={() => {
                                        document.getElementById(key).style.display = "none"
                                    }}
                                >
                                    <Image src={info_icon} height={15} width={15} />
                                </div>
                            </div>
                            <div className='w-[20%]'>
                                <h1>{item?.description}</h1>
                            </div>
                            <div className='w-[20%]'>
                                <h1>{item?.emissions}</h1>
                            </div>
                            <div className='w-[20%]'>
                                <h1>{item?.prompts}</h1>
                            </div>
                            <div className='w-[20%] flex justify-end'>

                                <button className='rounded-full bg-[#F1F0F3] text-[#AFAFB0] p-1 text-sm px-6' onClick={() => {
                                    setSelectedModel(item)
                                    setShowPopUp(true);


                                }}>Vote</button>

                                {/* <button
                                    type="button"
                                    className="relative group bg-black-background py-1 px-3 lg:px-5 rounded-full flex items-center gap-3 "
                                >
                                    <div class="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-5 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="lato-bold  relative z-10 text-original-white lg:text-[100%]">
                                        Add
                                    </div>

                                </button> */}

                            </div>

                        </div>
                    )
                })}

            </div>


        </div>
    )
}

export default Gauge