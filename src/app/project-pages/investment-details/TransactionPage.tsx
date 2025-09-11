"use client"; // 👈 must be the first line

import React from 'react';
import { useRouter } from "next/navigation";


export default function InvestmentInterface() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/project-pages/investment-details/explore-investment");
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-end items-center mb-8 gap-4">
                <div className="flex items-center gap-2 text-blue-600">
                    <span className="text-lg">📞</span>
                    <span className="font-medium">Help</span>
                </div>
                <button
                    onClick={handleClick}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
                    Explore Investments
                </button>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-6xl mx-auto">
                {/* Top Section */}
                <div className="grid grid-cols-5 gap-8 mb-8">
                    {/* Elements Residencia */}
                    <div>
                        <h3 className="text-gray-600 text-sm font-medium mb-1">Elements Residencia</h3>
                        <p className="text-gray-800 font-semibold">Ticket #13592</p>
                    </div>

                    {/* Amount */}
                    <div className="border-l border-gray-200 pl-6">
                        <h3 className="text-gray-400 text-sm font-medium mb-1">AMOUNT</h3>
                        <p className="text-gray-800 font-semibold text-lg">22,110,000 PKR</p>
                    </div>

                    {/* Status */}
                    <div className="border-l border-gray-200 pl-6">
                        <h3 className="text-gray-400 text-sm font-medium mb-1">STATUS</h3>
                        <p className="text-red-500 font-semibold">Pending</p>
                    </div>

                    {/* Due Date */}
                    <div className="border-l border-gray-200 pl-6">
                        <h3 className="text-gray-400 text-sm font-medium mb-1">DUE DATE</h3>
                        <p className="text-red-500 font-semibold">Next 7 days (Sep 17, 2025)</p>
                    </div>

                    {/* Mode */}
                    <div className="border-l border-gray-200 pl-6">
                        <h3 className="text-gray-400 text-sm font-medium mb-1">MODE</h3>
                        <p className="text-gray-800 font-semibold">N/A</p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-5 gap-8">
                    {/* Pledge Date & Time */}
                    <div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1">PLEDGE DATE & TIME</h3>
                        <p className="text-gray-800 font-semibold">Sep 10, 2025</p>
                    </div>

                    {/* Area Pledged */}
                    <div className="border-l border-gray-200 pl-6">
                        <h3 className="text-gray-400 text-sm font-medium mb-1">AREA PLEDGED</h3>
                        <p className="text-gray-800 font-semibold">1,005 sq. ft.</p>
                    </div>

                    {/* Price/SQFT */}
                    <div className="border-l border-gray-200 pl-6">
                        <h3 className="text-gray-400 text-sm font-medium mb-1">PRICE/SQFT</h3>
                        <p className="text-gray-800 font-semibold">22,000 PKR</p>
                    </div>

                    {/* Discount */}
                    <div className="border-l border-gray-200 pl-6">
                        <h3 className="text-gray-400 text-sm font-medium mb-1">DISCOUNT</h3>
                        <p className="text-gray-800 font-semibold">0 PKR</p>
                    </div>

                    {/* Empty column for alignment */}
                    <div className="border-l border-gray-200 pl-6"></div>
                </div>
            </div>

        </div>
    );
}