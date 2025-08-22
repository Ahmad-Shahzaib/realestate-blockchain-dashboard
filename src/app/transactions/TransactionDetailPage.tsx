"use client"; // Mark as client component for Next.js

import React from 'react';
import Image from 'next/image';

interface TransactionDetail {
    id: string;
    propertyName: string;
    address: string;
    price: number;
    status: 'pending' | 'completed' | 'cancelled';
    date: string;
    buyer: string;
    seller: string;
}

const TransactionDetailPage = () => {
    // Mock data - replace with actual data fetching
    const transaction: TransactionDetail = {
        id: "TX123456",
        propertyName: "Luxury Villa",
        address: "123 Palm Street, Beverly Hills, CA 90210",
        price: 1250000,
        status: "completed",
        date: "2024-01-15",
        buyer: "John Doe",
        seller: "Jane Smith",
    };

    return (
        <div className="min-h-screen bg-[#F5F7FA] dark:bg-dark p-6">
            <div className="rounded-2xl shadow-md bg-white dark:bg-dark border border-gray-100 dark:border-gray-700">
                {/* Header */}
                <div className="p-6 bg-[#00D2B6] dark:bg-dark rounded-t-2xl">
                    <h1 className="text-2xl font-bold text-white">Transaction Details</h1>
                    <p className="text-gray-200">Transaction ID: {transaction.id}</p>
                </div>

                {/* Transaction Table */}
                <div className="p-6">
                    <h2 className="text-xl font-bold text-[#003049] dark:text-white mb-4">Transaction Information</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#F5F7FA] dark:bg-dark text-[#003049] dark:text-gray-200">
                                    <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Property</th>
                                    <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Address</th>
                                    <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Price</th>
                                    <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Status</th>
                                    <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Date</th>
                                    <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Buyer</th>
                                    <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Seller</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50 dark:hover:bg-[#2A2A2A]">
                                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{transaction.propertyName}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{transaction.address}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">${transaction.price.toLocaleString()}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${transaction.status === 'completed'
                                                ? 'bg-[#F5F7FA] dark:bg-[#2A2A2A] text-[#00B894]'
                                                : transaction.status === 'pending'
                                                    ? 'bg-[#F5F7FA] dark:bg-[#2A2A2A] text-[#0277BD]'
                                                    : 'bg-[#F5F7FA] dark:bg-[#2A2A2A] text-red-600'
                                                }`}
                                        >
                                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{transaction.date}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{transaction.buyer}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{transaction.seller}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-6 flex justify-end space-x-4 rounded-b-2xl">
                    <button
                        className="px-4 py-2 rounded-lg border border-gray-100 dark:border-gray-700 shadow-md text-[#003049] dark:text-white font-semibold bg-white dark:bg-[#2A2A2A] hover:bg-gray-100 dark:hover:bg-[#333] transition"
                    >
                        Download Details
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg bg-[#00D2B6] dark:bg-dark border text-white font-semibold shadow-md hover:opacity-90 transition focus:ring-2 focus:ring-[#00B894] focus:ring-offset-2"
                    >
                        Contact Support
                    </button>
                </div>
            </div>
        </div>

    );
};

export default TransactionDetailPage;