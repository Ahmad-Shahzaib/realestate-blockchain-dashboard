"use client"; // 👈 must be the first line

import React from 'react';
import { useRouter } from "next/navigation";
import Button from '@/common/Button';

interface InvestmentInterfaceProps {
    project: any
}


export default function InvestmentInterface({ project }: InvestmentInterfaceProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push("/projects/investment-details/explore-investment");
    };

    return (
        <div className=" bg-gray-100 dark:bg-gray-900 flex justify-center items-start py-2">
            <div className="w-full max-w-6xl px-4">
                {/* Header */}
                <div className="flex justify-end items-center mb-10 gap-6">

                    <Button
                        onClick={handleClick}
                        className=" text-white px-8 py-3 rounded-full font-semibold text-lg transition-all shadow-md hover:shadow-lg">
                        Explore Investments
                    </Button>
                </div>

                {/* Main Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-10 transition-all hover:shadow-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                        Investment Overview
                    </h2>

                    {/* Top Section */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
                        {/* Elements Residencia */}
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium uppercase tracking-wide mb-2">
                                Elements Residencia
                            </h3>
                            <p className="text-gray-800 dark:text-white font-semibold text-lg">Ticket #13592</p>
                        </div>

                        {/* Amount */}
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium uppercase tracking-wide mb-2">Amount</h3>
                            <p className="text-gray-800 dark:text-white font-semibold text-lg">22,110,000 PKR</p>
                        </div>

                        {/* Status */}
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium uppercase tracking-wide mb-2">Status</h3>
                            <p className="text-red-500 font-semibold text-lg">Pending</p>
                        </div>

                        {/* Due Date */}
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium uppercase tracking-wide mb-2">Due Date</h3>
                            <p className="text-red-500 font-semibold text-lg">Next 7 days (Sep 17, 2025)</p>
                        </div>

                        {/* Mode */}

                    </div>

                    {/* Bottom Section */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {/* Pledge Date & Time */}
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium uppercase tracking-wide mb-2">
                                Pledge Date & Time
                            </h3>
                            <p className="text-gray-800 dark:text-white font-semibold text-lg">Sep 10, 2025</p>
                        </div>

                        {/* Area Pledged */}
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium uppercase tracking-wide mb-2">
                                Area Pledged
                            </h3>
                            <p className="text-gray-800 dark:text-white font-semibold text-lg">1,005 sq. ft.</p>
                        </div>

                        {/* Price/SQFT */}
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium uppercase tracking-wide mb-2">
                                Price/SQFT
                            </h3>
                            <p className="text-gray-800 dark:text-white font-semibold text-lg">22,000 PKR</p>
                        </div>


                    </div>
                </div>
            </div>
        </div>

    );
}