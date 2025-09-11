"use client";

import Button from "@/common/Button";
import { useState } from "react";

export default function InvestmentCalculator() {
    const [investmentAmount, setInvestmentAmount] = useState(2000);
    const [annualAppreciation, setAnnualAppreciation] = useState(6);
    const [rentalYield, setRentalYield] = useState(6.71);
    const [investmentPeriod, setInvestmentPeriod] = useState(5);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const calculateReturns = () => {
        const netRentalIncome = (investmentAmount * rentalYield) / 100;
        const capitalAppreciation = investmentAmount * (annualAppreciation / 100) * investmentPeriod;
        const totalReturn = netRentalIncome * investmentPeriod + capitalAppreciation;
        const averageAnnualReturn = (totalReturn / (investmentAmount * investmentPeriod)) * 100;

        return { netRentalIncome, capitalAppreciation, totalReturn, averageAnnualReturn };
    };

    const { netRentalIncome, capitalAppreciation, totalReturn, averageAnnualReturn } = calculateReturns();

    return (
        <div className="mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Investment Calculator</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">How much can you earn on this investment?</p>

            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">Investment Amount</label>
                <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">Expected Annual Appreciation</label>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={annualAppreciation}
                    onChange={(e) => setAnnualAppreciation(Number(e.target.value))}
                    className="w-full accent-blue-500"
                />
                <span className="text-gray-600 dark:text-gray-300">{annualAppreciation}%</span>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">Expected Rental Yield</label>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={rentalYield}
                    onChange={(e) => setRentalYield(Number(e.target.value))}
                    className="w-full accent-blue-500"
                />
                <span className="text-gray-600 dark:text-gray-300">{rentalYield}%</span>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">Investment Period</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={investmentPeriod}
                    onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                    className="w-full accent-blue-500"
                />
                <span className="text-gray-600 dark:text-gray-300">{investmentPeriod} Years</span>
            </div>

            <div className="flex justify-between text-lg font-semibold text-gray-800 dark:text-gray-100">
                <span>Total return on investment</span>
                <span>
                    AED {totalReturn.toFixed(2)} ({((totalReturn / (investmentAmount * investmentPeriod)) * 100).toFixed(2)}% Return On
                    Investment)
                </span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-gray-800 dark:text-gray-100 mt-2">
                <span>Average annualized return</span>
                <span>{averageAnnualReturn.toFixed(2)}%</span>
            </div>

            <div className="mt-4">
                <Button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="  text-white p-2 rounded-lg  transition duration-200"
                >
                    {isCollapsed ? "Show Details" : "Hide Details"}
                </Button>
                {!isCollapsed && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-gray-700">
                            <p className="font-semibold text-gray-700 dark:text-gray-200">Net rental income</p>
                            <p className="text-xl text-blue-600 dark:text-blue-400">AED {netRentalIncome.toFixed(2)}</p>
                        </div>
                        <div className="p-4 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-gray-700">
                            <p className="font-semibold text-gray-700 dark:text-gray-200">Expected capital appreciation</p>
                            <p className="text-xl text-blue-600 dark:text-blue-400">AED {capitalAppreciation.toFixed(2)}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
