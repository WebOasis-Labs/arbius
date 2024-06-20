import React from "react"
export default function Steps() {
    const steps = [
        "Select the amount of AIUS you want to lock.",
        "Select the duration, the minimum lock time is one week, and the maximum lock time is two years.",
        "Confirm the lock duration.",
        "Details about your lock will be available inside the dashboard."
      ];
    return (
        <div className="bg-white-background lg:h-[270px] h-auto stake-box-shadow rounded-2xl p-8 box-border flex justify-start items-start">
            <div className="container mt-2">
                <div className="steps-container">
                {steps.map((step, index) => (
                    <div key={index} className="step-item">
                        <div className="step-circle">{index + 1}
                            
                        </div>
                        <p className="step-text">{step}</p>
                </div>
                ))}
                </div>
            </div>
        </div>
    )
}