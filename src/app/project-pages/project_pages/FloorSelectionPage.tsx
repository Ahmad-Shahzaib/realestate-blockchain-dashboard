"use client";

import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, TrendingUp, Layers } from "lucide-react";
import { motion } from "framer-motion";

// Example floor & unit data
const floors = [
    {
        name: "Ground Floor",
        units: [
            { id: "GF-101", label: "Unit A", area: 500 },
            { id: "GF-102", label: "Unit B", area: 650 },
            { id: "GF-103", label: "Unit C", area: 450 },
        ],
    },
    {
        name: "First Floor",
        units: [
            { id: "FF-201", label: "Unit A", area: 700 },
            { id: "FF-202", label: "Unit B", area: 600 },
            { id: "FF-203", label: "Unit C", area: 550 },
        ],
    },
    {
        name: "Second Floor",
        units: [
            { id: "SF-301", label: "Unit A", area: 800 },
            { id: "SF-302", label: "Unit B", area: 650 },
        ],
    },
];

const PRICE_PER_SQFT = 16000; // PKR price

const FloorSelectionPage: NextPage = () => {
    const [selectedFloor, setSelectedFloor] = useState(floors[0].name);
    const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
    const router = useRouter();

    const toggleUnit = (id: string) => {
        setSelectedUnits((prev) =>
            prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
        );
    };

    // Flatten all units for calculations
    const allUnits = floors.flatMap((floor) => floor.units);

    const selectedUnitsData = allUnits.filter((u) =>
        selectedUnits.includes(u.id)
    );
    const totalArea = selectedUnitsData.reduce((sum, u) => sum + u.area, 0);
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

    const handleProceed = () => {
        router.push("/project-pages/investment-details");
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Left Panel - Floor & Unit Selection */}
            <motion.div
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 lg:p-8"
            >
                <div className="flex items-center gap-2 mb-6">
                    <Layers className="w-5 h-5 text-[#00D2B6]" />
                    <h3 className="text-xl lg:text-2xl font-bold text-[#003049] dark:text-white">
                        Select Floor & Units
                    </h3>
                </div>

                {/* Floor Tabs */}
                <div className="flex flex-wrap gap-3 mb-6">
                    {floors.map((floor) => (
                        <button
                            key={floor.name}
                            onClick={() => {
                                setSelectedFloor(floor.name);
                                setSelectedUnits([]); // reset when switching floors
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${selectedFloor === floor.name
                                ? "bg-[#00B894] text-white shadow-md"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                }`}
                        >
                            {floor.name}
                        </button>
                    ))}
                </div>

                {/* Unit Selection */}
                <div className="grid sm:grid-cols-2 gap-4">
                    {floors
                        .find((f) => f.name === selectedFloor)
                        ?.units.map((unit) => (
                            <div
                                key={unit.id}
                                onClick={() => toggleUnit(unit.id)}
                                className={`cursor-pointer p-4 rounded-xl border transition ${selectedUnits.includes(unit.id)
                                    ? "bg-[#00B894]/10 border-[#00B894] shadow-md"
                                    : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow"
                                    }`}
                            >
                                <p className="font-semibold text-[#003049] dark:text-white">
                                    {unit.label}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {unit.area} sq. ft.
                                </p>
                            </div>
                        ))}
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

                <div className="space-y-6">
                    <motion.div
                        variants={cardVariants}
                        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <Building2 className="w-5 h-5 text-[#00B894]" />
                            <span className="font-medium text-[#003049] dark:text-white">
                                Total Selected Area
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-[#003049] dark:text-white">
                            {totalArea.toLocaleString()} sq. ft.
                        </div>
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <TrendingUp className="w-5 h-5 text-[#00B894]" />
                            <span className="font-medium text-[#003049] dark:text-white">
                                Total Investment
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-[#003049] dark:text-white">
                            {totalInvestment.toLocaleString()} PKR
                        </div>
                    </motion.div>

                    <div className="pt-4 border-t dark:border-gray-700">
                        <button
                            onClick={handleProceed}
                            disabled={totalArea === 0}
                            className="w-full bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white py-3 rounded-xl font-semibold text-lg hover:from-[#00A383] hover:to-[#00BFA5] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {totalArea === 0
                                ? "Select Units to Proceed"
                                : "Proceed to Investment"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default FloorSelectionPage;
