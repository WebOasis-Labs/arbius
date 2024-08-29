import Image from "next/image"
import cross from "../../../assets/images/cross.png"
import powered_by from "../../../assets/images/powered_by.png"
import error_stake from "../../../assets/images/error_stake.png"
import success_stake from "../../../assets/images/success_stake.png"
import CircularProgressBar from "../AIUS/CircularProgressBar"

export const StepTwoChildren = ({ setShowPopUp, isError, noChildren, repeat = true }) => {
    return (
        <div>
            <div className="flex justify-end mt-4">
                <button className="cursor-pointer" onClick={() => setShowPopUp(false)}>
                    <Image src={cross} className="w-[10px]" alt="cross" />
                </button>

            </div>
            <div className="my-12">

                <div className="flex justify-center items-center">
                    <div className="w-40 h-40">
                        <CircularProgressBar valueStart={0} valueEnd={100} duration={4} text={"2/2"} setShowPopUp={setShowPopUp} step={2} isError={isError} noChildren={noChildren} repeat={true} />
                    </div>

                </div>
                <h1 className="text-[20px] mt-4 text-[#000] text-center">Pending transaction confirmation!</h1>
                <h1 className="text-[12px] text-[#8C8C8C] text-center">Confirm this transaction in your wallet.</h1>


            </div>

            <div className="flex justify-center items-center">
                <Image src={powered_by} className="w-auto h-4" alt="powered_by" />
            </div>
        </div>
    )
}

export const SuccessChildren = ({ setShowPopUp }) => {

    return (
        <div>
            <div className="flex justify-end mt-4">
                <button className="cursor-pointer" onClick={() => setShowPopUp(false)}>
                    <Image src={cross} className="w-[10px]" alt="cross" />
                </button>

            </div>
            <div className="my-12">
                <div className="flex justify-center items-center">
                    <div className="w-40 h-40 flex justify-center items-center relative bg-[#FCFCFC] rounded-full">
                        <Image src={success_stake} className=" w-12" alt="error_stake" />

                    </div>
                </div>

                <h1 className="text-[20px] mt-4 text-[#000] text-center">Congrats!</h1>
                <h1 className="text-[12px] text-[#8C8C8C] text-center">Transaction Completed.</h1>


            </div>

            <div className="flex justify-center items-center">
                <Image src={powered_by} className="w-auto h-4" alt="powered_by" />
            </div>
        </div>
    )

}

export const ErrorPopUpChildren = ({ setShowPopUp }) => {
    return (
        <div>
            <div className="flex justify-end mt-4">
                <button className="cursor-pointer" onClick={() => setShowPopUp(false)}>
                    <Image src={cross} className="w-[10px]" alt="cross" />
                </button>

            </div>
            <div className="my-12">
                <div className="flex justify-center items-center">
                    <div className="w-40 h-40 flex justify-center items-center relative bg-[#FCFCFC] rounded-full">
                        <Image src={error_stake} className=" w-40" alt="error_stake" />

                    </div>
                </div>
                <h1 className="text-[20px] mt-4 text-[#000] text-center">Error!</h1>
                <h1 className="text-[12px] text-[#8C8C8C] text-center">Please try again.</h1>

                <div className="flex justify-center items-center">
                    <button
                        onClick={() => setShowPopUp(false)}
                        type="button"
                        className="relative justify-center mt-2 py-2 group bg-black-background py-1 px-6 lg:px-10 rounded-full flex items-center gap-3 "
                    >
                        <div class="absolute w-[100%] h-[100%] left-0 z-0 py-2 px-4 rounded-full bg-buy-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="lato-bold  relative z-10 text-original-white lg:text-[15px]">
                            Continue
                        </div>

                    </button>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <Image src={powered_by} className="w-auto h-4" alt="powered_by" />
            </div>
        </div>
    )
}
