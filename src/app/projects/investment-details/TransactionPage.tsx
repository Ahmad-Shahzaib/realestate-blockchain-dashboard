"use client"; // 👈 must be the first line

import React from 'react';
import { useRouter, useSearchParams } from "next/navigation"; // ✅ import searchParams
import Button from '@/common/Button';

interface InvestmentInterfaceProps {
    project: any
}

export default function InvestmentInterface({ project }: InvestmentInterfaceProps) {
    const router = useRouter();
    const searchParams = useSearchParams(); // ✅ get query params

    const totalInvestment = searchParams.get("totalInvestment");
    const totalArea = searchParams.get("totalArea");

    const currentDate = new Date();
    const dueDate = new Date(currentDate);
    dueDate.setDate(currentDate.getDate() + 7);

    const handleClick = () => {
        // Pass totalInvestment and totalArea as query parameters
        router.push(`/projects/investment-details/explore-investment?totalInvestment=${totalInvestment}&totalArea=${totalArea}`);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className=" dark:bg-gray-900  flex justify-center items-start py-6">
            <div className="w-full max-w-7xl px-4">
                {/* Header */}
                <div className="flex justify-end items-center mb-10 gap-6">
                    <Button
                        onClick={handleClick}
                        className=" text-white px-8 py-3 rounded-full font-semibold text-lg transition-all shadow-md hover:shadow-lg">
                        Explore Investments
                    </Button>
                </div>

                {/* Main Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b-2 border-gray-100 dark:border-gray-700 pb-3">
                        Investment Overview
                    </h2>

                    {/* Top Section */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">
                                Project
                            </h3>
                            <p className="text-gray-900 dark:text-white font-semibold text-base">{project.category}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">
                                Amount
                            </h3>
                            <p className="text-gray-900 dark:text-white font-semibold text-base">
                                {totalInvestment ? `${Number(totalInvestment).toLocaleString()} PKR` : "N/A"}
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">
                                Status
                            </h3>
                            <p className="text-red-600 font-semibold text-base">{project.status}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">
                                Due Date
                            </h3>
                            <p className="text-red-600 font-semibold text-base">{formatDate(dueDate)}</p>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">
                                Pledge Date
                            </h3>
                            <p className="text-gray-900 dark:text-white font-semibold text-base">{formatDate(currentDate)}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">
                                Area Pledged
                            </h3>
                            <p className="text-gray-900 dark:text-white font-semibold text-base">
                                {totalArea ? `${Number(totalArea).toLocaleString()} sq. ft.` : "N/A"}
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">
                                Price/SQFT
                            </h3>
                            <p className="text-gray-900 dark:text-white font-semibold text-base">22,000 PKR</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}