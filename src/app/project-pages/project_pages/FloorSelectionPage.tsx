"use client";

import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, TrendingUp, Layers, Info } from "lucide-react";
import { motion } from "framer-motion";

// Floor data
const floors = [
    { name: "Floor 1", totalArea: 1850 },
    { name: "Floor 2", totalArea: 1900 },
    { name: "Floor 3", totalArea: 2100 },
    { name: "Floor 4", totalArea: 1800 },
    { name: "Floor 5", totalArea: 2000 },
    { name: "Floor 6", totalArea: 1950 },
];

const PRICE_PER_SQFT = 16000; // PKR price
const TOTAL_AREA = 624000;
const LOCKED_AREA = 163933;
const AVAILABLE_AREA = TOTAL_AREA - LOCKED_AREA; // 460,067

const FloorAreaSelectionPage: NextPage = () => {
    const [selectedFloor, setSelectedFloor] = useState(floors[0].name);
    const [sliderArea, setSliderArea] = useState(0);
    const router = useRouter();

    // Toggle floor selection
    const toggleFloor = (floorName: string) => {
        setSelectedFloor(floorName);
        setSliderArea(0); // Reset slider when switching floors
    };

    // Handle slider change
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value);
        setSliderArea(value);
    };

    // Calculate total area and investment
    const totalArea = sliderArea;
    const totalInvestment = totalArea * PRICE_PER_SQFT;

    // Animation variants
    const panelVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };
    const cardVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    };

    const handleProceed = () => {
        router.push("/project-pages/investment-details");
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Left Panel - Floor & Area Selection */}
            <motion.div
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 lg:p-8"
            >
                <div className="flex items-center gap-2 mb-6">
                    <Layers className="w-5 h-5 text-[#00D2B6]" />
                    <h3 className="text-xl lg:text-2xl font-bold text-[#003049] dark:text-white">
                        Select Floor
                    </h3>
                </div>

                {/* Floor Selection */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {floors.map((floor) => (
                        <div
                            key={floor.name}
                            onClick={() => toggleFloor(floor.name)}
                            className={`cursor-pointer p-4 rounded-xl border transition ${selectedFloor === floor.name
                                ? "bg-[#00B894]/10 border-[#00B894] shadow-md"
                                : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow"
                                }`}
                        >
                            <p className="font-semibold text-[#003049] dark:text-white">
                                {floor.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {floor.totalArea} sq. ft.
                            </p>
                        </div>
                    ))}
                </div>

                {/* Area Slider */}
                <div className="mt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-[#003049] dark:text-white">
                                Select Area
                            </h3>
                            <Info className="w-4 h-4 text-[#00D2B6]" />
                        </div>
                        <div className="bg-[#00B894]/10 text-[#00B894] px-3 py-1 rounded-full text-sm font-medium">
                            {PRICE_PER_SQFT.toLocaleString()} PKR / sq. ft.
                        </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                        Move the slider to pledge area.
                    </p>
                    <div className="relative">
                        <input
                            type="range"
                            min="0"
                            max={AVAILABLE_AREA}
                            value={sliderArea}
                            onChange={handleSliderChange}
                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, #00B894 0%, #00B894 ${(sliderArea / AVAILABLE_AREA) * 100
                                    }%, #e5e7eb ${(sliderArea / AVAILABLE_AREA) * 100}%, #e5e7eb 100%)`,
                            }}
                        />
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                            <span>0 Sq. ft.</span>
                            <span className="text-right">
                                {AVAILABLE_AREA.toLocaleString()} Sq. ft.
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Right Panel - Investment Summary */}
            <motion.div
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 lg:p-8"
            >
                <h3 className="text-xl lg:text-2xl font-bold text-[#003049] dark:text-white mb-6">
                    Investment Summary
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div
                        variants={cardVariants}
                        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-transform transform hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-[#00B894] rounded-lg flex items-center justify-center">
                                <Building2 className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium text-[#003049] dark:text-white text-sm lg:text-base">
                                Total Selected Area
                            </span>
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-[#003049] dark:text-white">
                            {totalArea.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">sq. ft.</div>
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-transform transform hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-[#00B894] rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium text-[#003049] dark:text-white text-sm lg:text-base">
                                Total Investment
                            </span>
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-[#003049] dark:text-white">
                            {totalInvestment.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">PKR</div>
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-transform transform hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-[#00B894] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">%</span>
                            </div>
                            <span className="font-medium text-[#003049] dark:text-white text-sm lg:text-base">
                                Ownership Percentage
                            </span>
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-[#003049] dark:text-white">
                            {((totalArea / TOTAL_AREA) * 100).toFixed(2)}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">of total project</div>
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4"
                    >
                        <div className="text-sm font-medium text-[#003049] dark:text-white mb-3">
                            Selected Area Preview
                        </div>
                        <div className="mb-4">
                            <div
                                className="grid grid-cols-20 gap-[0.5px] bg-gray-100 dark:bg-gray-700 p-2 rounded-lg"
                                style={{ width: "100%", height: "120px" }}
                            >
                                {Array.from({ length: 400 }, (_, i) => (
                                    <div
                                        key={i}
                                        className={`rounded-sm ${i < Math.floor((totalArea / AVAILABLE_AREA) * 400)
                                            ? "bg-[#00B894]"
                                            : "bg-gray-200 dark:bg-gray-600"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>{totalArea.toLocaleString()} sq. ft.</span>
                            <span>{AVAILABLE_AREA.toLocaleString()} sq. ft.</span>
                        </div>
                    </motion.div>
                </div>

                <div className="pt-4 border-t dark:border-gray-700">
                    <button
                        onClick={handleProceed}
                        disabled={totalArea === 0}
                        className="w-full bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white py-3 rounded-xl font-semibold text-lg hover:from-[#00A383] hover:to-[#00BFA5] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {totalArea === 0
                            ? "Select Area to Proceed"
                            : "Proceed to Investment"}
                    </button>
                </div>
            </motion.div>

            <style jsx>{`
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #00b894;
                    cursor: pointer;
                    border: 3px solid white;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                }
                input[type="range"]::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #00b894;
                    cursor: pointer;
                    border: 3px solid white;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    -moz-appearance: none;
                }
            `}</style>
        </div>
    );
};

export default FloorAreaSelectionPage;