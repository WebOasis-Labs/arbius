import React from 'react'
import { useEffect,useState } from 'react'
import gysr_logo from "../../../assets/images/gysr_logo_without_name.png"
import wallet_icon from "../../../assets/images/ion_wallet-outline.png"
import up_icon from "../../../assets/images/amount_up.png"
import sort_icon from "../../../assets/images/sort.png"
import gift_icon from "../../../assets/images/gift.png"
import time_icon from "../../../assets/images/time.png"
import arrow_icon from "../../../assets/images/rounded_arrow.png"
import Image from 'next/image'
import Loader from '../../Loader/loader'
import { getUserTransactions } from '../../../Utils/getUserActivity'


function ActivityTable({data}) {
    const [paginatedData, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = data?.pool?.operations ? Math.ceil(data?.pool.operations / 10) : 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getUserTransactions(itemsPerPage, (currentPage-1)*10)
                console.log(fetchedData,"transactions")
                //const paginatedData = data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
                setData(fetchedData);

            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error as needed
            }
        };

        fetchData(); // Call fetchData function on component mount (similar to componentDidMount)
    }, [currentPage]);

    const handleClickNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleClickPrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleClickTab = (pageNum) => {
        setCurrentPage(pageNum);
    };

    function timeSince(timestamp) {
        const now = Date.now(); // Current time in milliseconds since epoch
        timestamp = Number(timestamp);

    // Check if the timestamp is in milliseconds or seconds and convert if necessary
        if (timestamp.toString().length === 10) {
            timestamp *= 1000; // Convert seconds to milliseconds
        }

        const diffMs = now - timestamp; // Difference in milliseconds between now and the timestamp
    
        // Calculate time differences in days, hours, and minutes
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
        // Construct the time ago string based on the largest time unit that is nonzero
        if (diffDays > 0) {
            return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
        } else if (diffHours > 0) {
            return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
        } else {
            return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
        }
    }
    function hexToDecimal(hexString) {
        
        return formatNumber(hexString)
    }
    function formatNumber(number) {
        const symbols = ['', 'k', 'M', 'B', 'T']; // Add more as needed for larger numbers
        const tier = Math.floor(Math.log10(number) / 3);
    
        if (tier === 0) return number.toString(); // Less than 1000, no abbreviation needed
    
        const suffix = symbols[tier];
        const scale = Math.pow(10, tier * 3);
    
        const scaledNumber = number / scale;
        const formattedNumber = scaledNumber.toFixed(1); // Adjust decimals as needed
    
        return formattedNumber ;
    }
    function cropAddress(address) {
        var start = window.innerWidth > '786' ? address.substring(0, 6) : address.substring(0, 2); // Change the numbers to adjust the length of the beginning part you want to keep
        var end = address.substring(address.length - 4, address.length); // Change the numbers to adjust the length of the end part you want to keep
        return start + "..." + end;
    }
    // Output: e.g., "2 days ago", "1 hour ago", "5 minutes ago", etc.
    function convertNumber(num , convertLarg) {
        num = parseFloat(num);
        
        if (num === 0) {
            return "0.00";
        }
        
        if (num < 0.001 && convertLarg) {
            // Use toExponential to get the scientific notation with 2 significant figures
            return num.toExponential(2);
        }
        else if(num < 0.001){
            return Number(num.toFixed(8));
        }
         else {
            return Math.round(num * 10) / 10;
        }
    }


    const getPageNumbers = () => {
        const pages = [];
        const addPage = (page) => pages.push({ page, key: `page_${page}` });
        const addEllipsis = () => pages.push({ page: '...', key: `ellipsis_${pages.length}` });

        addPage(1);

        if (currentPage <= 4) {
            for (let i = 2; i <= Math.min(5, totalPages - 1); i++) {
                addPage(i);
            }
            if (totalPages > 6) addEllipsis();
        } else if (currentPage >= totalPages - 3) {
            if (totalPages > 6) addEllipsis();
            for (let i = totalPages - 4; i < totalPages; i++) {
                addPage(i);
            }
        } else {
            addEllipsis();
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                addPage(i);
            }
            addEllipsis();
        }

        if (totalPages > 1) addPage(totalPages);

        return pages;
    };

    
    return (
        <div className=''>
            <div className="flex flex-col bg-white-background table-gysr px-6 py-4 text-[#101010]">
                <div className=" overflow-x-auto ">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                        {
                            paginatedData ?
                            <table className="min-w-full ">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-center text-[12px] lg:text-[15px] font-medium text-gray-500 ">
                                            <div className=' flex justify-center'><Image width={15} height={15} src={sort_icon} alt="" /></div>

                                            <h1>Action</h1>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-[12px] lg:text-[15px] font-medium text-gray-500 ">
                                            <div className=' flex justify-center'><Image width={15} height={15} src={up_icon} alt="" /></div>

                                            <h1>Amount</h1>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-[12px] lg:text-[15px] font-medium text-gray-500 ">
                                            <div className=' flex justify-center'><Image width={15} height={15} src={gift_icon} alt="" /></div>

                                            <h1>Earnings</h1>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-[12px] lg:text-[15px] font-medium text-gray-500">
                                            <div className=' flex justify-center'><Image width={15} height={15} src={gysr_logo} alt="" className='table-icon' /></div>

                                            <h1>GYSR Spent</h1>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-[12px] lg:text-[15px] font-medium text-gray-500 ">
                                            <div className='flex justify-center'><Image width={15} height={15} src={wallet_icon} alt="" className='table-icon' /></div>

                                            <h1>Account</h1>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-[12px] lg:text-[15px] font-medium text-gray-500 ">
                                            <div className=' flex justify-center'><Image width={15} height={15} src={time_icon} alt="" /></div>

                                            <h1>Time</h1>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-[#101010]">
                                    {
                                    paginatedData ? paginatedData?.map((item, key) => {
                                       return <>
                                            <tr key={key} className='text-[#101010]'>
                                                <td className="px-6 py-4 whitespace-nowrap text-[#101010] text-center text-[12px] lg:text-[15px] font-medium ">{item?.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-[#101010] text-center text-[12px] lg:text-[15px] ">{convertNumber(item?.amount,false)} UNI-V2</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-[#101010] text-center text-[12px] lg:text-[15px] ">{item?.type == "Stake" ?"-" : `${convertNumber(item?.earnings,true)} AIUS`}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-[#101010] text-center text-[12px] lg:text-[15px] ">{item?.type == "Stake" ?"-": `${convertNumber(item?.gysrSpent)} GYSR`}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-[#101010] text-center text-[12px] lg:text-[15px] ">
                                                    <a target="_blank" href={`https://etherscan.io/address/${item?.user.id}`}>{cropAddress(item?.user.id)}</a>
                                                </td>                                               
                                                <td className="px-6 py-4 whitespace-nowrap text-[#101010] text-center text-[12px] lg:text-[15px] ">{timeSince(item?.timestamp)}</td>
                                            </tr> 
                                        </>
                                    }):null}


                                </tbody>
                                <thread className='w-[100%] flex justify-center items-center'></thread>
                            </table>
                            : <div className='w-[100%] flex justify-center'>
                                <Loader/>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>



            <div className='flex justify-end mt-6 text-[#101010]'>
                <div className='bg-white-background flex flex-wrap gap-4 justify-center items-center p-3 rounded-md'>
                    <button className='p-1 rotate-180 w-[50px]'onClick={()=>handleClickPrev()}>
                        <Image src={arrow_icon} width={20} height={20} alt="" />
                    </button>
                    {/*
                        Array(totalPages).fill(null).map((item, key) => {
                            return <button className={`p-1 ${currentPage === (key + 1) && 'text-purple-text font-bold'}`} onClick={()=>handleClickTab(key+1)}>{key+1}</button>
                        })
                    */}
                    {/*getPageNumbers().map((pageNumber, index) => (
                        <React.Fragment key={index}>
                        {
                            typeof pageNumber === 'number' ? (
                                <button className={`p-1 ${currentPage === (index + 1) && 'text-purple-text font-bold'}`} onClick={()=>handleClickTab(index+1)}>{index+1}</button>
                            )
                            : pageNumber
                        }
                        </React.Fragment>
                    ))}
                    {currentPage*/}
                    {getPageNumbers().map(({ page, key }) => (
                        <button key={key} onClick={() => page !== '...' && handleClickTab(page)} className={`px-3 py-1 rounded-md
                        ${ currentPage === page ? 'text-purple-text font-bold'
                            : page === '...' ? 'cursor-default' : 'hover:bg-purple-background hover:text-original-white'
                        }`}
                        disabled={page === '...'}>
                        {page}
                        </button>
                    ))}
                    {/*<button className={`p-1 ${currentPage ===1 && 'text-purple-text font-bold'}`} onClick={()=>handleClickTab(1)}>1</button>
                    <button className={`p-1 ${currentPage ===2 && 'text-purple-text font-bold'}`} onClick={()=>handleClickTab(2)}>2</button>
                    <button className={`p-1 ${currentPage ===3 && 'text-purple-text font-bold'}`} onClick={()=>handleClickTab(3)}>3</button>
                    <button className={`p-1 ${currentPage ===4 && 'text-purple-text font-bold'}`} onClick={()=>handleClickTab(4)}>4</button>
                    <button className={`p-1 ${currentPage ===5 && 'text-purple-text font-bold'}`} onClick={()=>handleClickTab(5)}>5</button>
                    <button className={`p-1 ${currentPage ===6 && 'text-purple-text font-bold'}`} onClick={()=>handleClickTab(6)}>6</button>
                    <button className={`p-1 ${currentPage ===7 && 'text-purple-text font-bold'}`} onClick={()=>handleClickTab(7)}>7</button>*/}
                    <button className='p-1 w-[50px]' onClick={()=>handleClickNext()}>
                        <Image src={arrow_icon} width={20} height={20} alt="" />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ActivityTable