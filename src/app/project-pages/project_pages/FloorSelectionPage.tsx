"use client";

import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, TrendingUp, Layers, Info } from "lucide-react";
import { motion } from "framer-motion";
import { TransactionService } from "@/services/transaction.service"; // Adjust the import path as needed

interface FloorAreaSelectionPageProps {
    project: any;
}

const FloorAreaSelectionPage: NextPage<FloorAreaSelectionPageProps> = ({ project }) => {
    const [selectedFloor, setSelectedFloor] = useState(project.floors?.[0]?.name || "");
    const [sliderArea, setSliderArea] = useState(0);
    const router = useRouter();

    // Find the current floor based on selection
    const currentFloor = project.floors.find((f: any) => f.name === selectedFloor);

    // Handle floor toggle
    const toggleFloor = (floorName: string) => {
        setSelectedFloor(floorName);
        setSliderArea(0); // Reset when changing floors
    };

    // Handle slider movement
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value);
        setSliderArea(value);
    };

    // Dynamic values from API
    const PRICE_PER_SQFT = currentFloor?.pricePerSqFt || 0;
    const TOTAL_AREA = project.totalArea || 0;
    const SELLABLE_AREA = project.sellableArea || 0;

    const totalArea = sliderArea;
    const totalInvestment = totalArea * PRICE_PER_SQFT;

    // Animations
    const panelVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };
    const cardVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    };

    const handleProceed = async () => {
        if (!project?._id || totalArea === 0) return; // Safe check

        try {
            // Construct the transaction payload
            const payload = {
                propertyId: project._id,
                customerId: project.customerId, // Replace with actual customer ID (e.g., from auth context or state)
                totalPrice: totalInvestment,
                totalSquareFeet: totalArea,
                type: "chosen", // Adjust based on your API requirements
            };

            // Call the TransactionService.createTransaction API
            const response = await TransactionService.createTransaction(payload);
            console.log("Transaction created successfully:", response);

            // Navigate to the investment details page
            router.push(`/project-pages/project_pages/${project._id}/investment-details`);
        } catch (error) {
            console.error("Failed to create transaction:", error);
        }
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Left Panel */}
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

                {/* Floor Cards */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {project.floors?.map((floor: any) => (
                        <div
                            key={floor._id}
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
                                {floor.pricePerSqFt.toLocaleString()} PKR / sq. ft.
                            </p>
                        </div>
                    ))}
                </div>

                {/* Area Slider */}
                {currentFloor && (
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
                                max={currentFloor.totalSquareFootage}
                                value={sliderArea}
                                onChange={handleSliderChange}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, #00B894 0%, #00B894 ${(sliderArea / currentFloor.totalSquareFootage) * 100
                                        }%, #e5e7eb ${(sliderArea / currentFloor.totalSquareFootage) * 100}%, #e5e7eb 100%)`,
                                }}
                            />
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                                <span>{totalArea.toLocaleString()} Sq. ft.</span>
                                <span className="text-right">
                                    {currentFloor.totalSquareFootage.toLocaleString()} Sq. ft.
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Right Panel */}
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
                    {/* Total Selected Area */}
                    <motion.div variants={cardVariants} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
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

                    {/* Total Investment */}
                    <motion.div variants={cardVariants} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
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

                    {/* Ownership Percentage */}
                    <motion.div variants={cardVariants} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-[#00B894] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">%</span>
                            </div>
                            <span className="font-medium text-[#003049] dark:text-white text-sm lg:text-base">
                                Ownership Percentage
                            </span>
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-[#003049] dark:text-white">
                            {TOTAL_AREA > 0 ? ((totalArea / TOTAL_AREA) * 100).toFixed(2) : "0"}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">of total project</div>
                    </motion.div>

                    {/* Area Preview */}
                    <motion.div variants={cardVariants} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
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
                                        className={`rounded-sm ${i < Math.floor((totalArea / (currentFloor?.totalSquareFootage || 1)) * 400)
                                            ? "bg-[#00B894]"
                                            : "bg-gray-200 dark:bg-gray-600"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>{totalArea.toLocaleString()} sq. ft.</span>
                            <span>{currentFloor?.totalSquareFootage.toLocaleString()} sq. ft.</span>
                        </div>
                    </motion.div>
                </div>

                {/* Proceed Button */}
                <div className="pt-4 border-t dark:border-gray-700">
                    <button
                        onClick={handleProceed}
                        disabled={totalArea === 0}
                        className="w-full bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white py-3 rounded-xl font-semibold text-lg hover:from-[#00A383] hover:to-[#00BFA5] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {totalArea === 0 ? "Select Area to Proceed" : "Proceed to Investment"}
                    </button>
                </div>
            </motion.div>

            {/* Custom Slider Styling */}
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