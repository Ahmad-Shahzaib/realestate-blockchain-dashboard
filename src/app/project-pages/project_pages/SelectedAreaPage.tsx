"use client"

import type { NextPage } from 'next';
import { useState } from "react"
import { Info } from "lucide-react"
const SelectedAreaPage: NextPage = () => {
    const PRICE_PER_SQFT = 16000; // Price per square foot in PKR
    const [sliderValue, setSliderValue] = useState(0)
    const [pledgeArea, setPledgeArea] = useState(0)
    const totalArea = 6000; // Define the total area in sq.ft.
    const totalPrice = pledgeArea * PRICE_PER_SQFT;

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value)
        setSliderValue(value)
        setPledgeArea(value)
    }
    return (
        <div>
            <div className=" mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Section - Select Area */}
                    <div className=" rounded-lg p-6 custom-border  h-64 ">
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-semibold ">Select Area</h2>
                                    <Info className="w-4 h-4 " />
                                </div>
                                <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
                                    16,000 PKR / sq.ft.
                                </span>
                            </div>
                            <div className="flex items-center gap-2  text-sm">
                                <span>Move the slider to pledge remaining area.</span>
                                <Info className="w-4 h-4 " />
                            </div>
                        </div>

                        {/* Slider Value Display */}
                        <div className="mb-6">
                            <div className="bg-slate-800 text-white px-4 py-2 rounded-full inline-block text-sm font-medium">
                                {sliderValue}
                            </div>
                        </div>

                        {/* Slider */}
                        <div className="mb-4">
                            <div className="relative">
                                <label htmlFor="area-slider" className="sr-only">
                                    Select area to pledge (slider)
                                </label>
                                <input
                                    id="area-slider"
                                    type="range"
                                    min="0"
                                    max="6000"
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                    title="Select area to pledge"
                                />
                                <div className="flex justify-between text-sm  mt-2">
                                    <span>1 Sq. ft.</span>
                                    <span>6,000 Sq. ft.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Area to Pledge */}
                    <div className=" rounded-lg p-6 border custom-border">
                        {/* Area to Pledge */}
                        <div className="mb-6">
                            <div className=" text-sm mb-2 uppercase tracking-wide">AREA TO PLEDGE</div>
                            <div className="flex items-baseline justify-between border-b border-gray-200 pb-4">
                                <span className="text-3xl font-bold ">{pledgeArea.toLocaleString()}</span>
                                <span className=" text-sm">sq. ft.</span>
                            </div>
                        </div>

                        {/* Selected Area Preview */}
                        <div className="mb-6">
                            <div className=" text-sm mb-4 uppercase tracking-wide">SELECTED AREA PREVIEW</div>

                            {/* Grid Visualization */}
                            <div className="mb-4 custom-border">
                                <div
                                    className="grid grid-cols-20 gap-[0.5px] bg-gray-100 p-1 rounded"
                                    style={{ width: '100%', height: '150px' }}
                                >
                                    {Array.from({ length: 400 }, (_, i) => (
                                        <div
                                            key={i}
                                            className={` rounded-sm ${i < Math.floor((pledgeArea / totalArea) * 400) ? "bg-teal-300" : "bg-gray-200"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between text-sm  border-b border-gray-200 pb-4">
                                <span className="font-bold">{pledgeArea.toLocaleString()} sq. ft.</span>
                                <span>{totalArea.toLocaleString()} sq.ft.</span>
                            </div>
                        </div>

                        {/* Total Price */}
                        <div className="mb-6">
                            <div className=" text-sm mb-2 uppercase tracking-wide">TOTAL PRICE</div>
                            <div className="flex items-baseline justify-between mb-2">
                                <span className="text-3xl font-bold ">{totalPrice.toLocaleString()}</span>
                                <span className=" text-sm">PKR</span>
                            </div>
                            <div className=" text-sm">
                                {totalPrice === 0 ? "zero (PKR)" : `${totalPrice.toLocaleString()} (PKR)`}
                            </div>
                        </div>

                        {/* Proceed Button */}
                        <button className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                            Proceed
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default SelectedAreaPage;