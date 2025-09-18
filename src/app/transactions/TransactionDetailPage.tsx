"use client"; // Mark as client component for Next.js

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/common/Button';

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
    const initialTransactions: TransactionDetail[] = [
        {
            id: "TX123456",
            propertyName: "Luxury Villa",
            address: "123 Palm Street, Beverly Hills, CA 90210",
            price: 1250000,
            status: "completed",
            date: "2024-01-15",
            buyer: "John Doe",
            seller: "Jane Smith",
        },
        {
            id: "TX789012",
            propertyName: "Downtown Loft",
            address: "456 Main Street, Los Angeles, CA 90001",
            price: 750000,
            status: "pending",
            date: "2024-02-10",
            buyer: "Alice Johnson",
            seller: "Bob Wilson",
        },
        {
            id: "TX345678",
            propertyName: "Beach House",
            address: "789 Ocean Drive, Malibu, CA 90265",
            price: 2000000,
            status: "cancelled",
            date: "2024-03-05",
            buyer: "Emma Davis",
            seller: "Michael Brown",
        },
    ];

    const [transactions, setTransactions] = useState<TransactionDetail[]>(initialTransactions);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Handle search input change
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter transactions based on search query
        const filtered = initialTransactions.filter(
            (transaction) =>
                transaction.propertyName.toLowerCase().includes(query) ||
                transaction.address.toLowerCase().includes(query) ||
                transaction.buyer.toLowerCase().includes(query) ||
                transaction.seller.toLowerCase().includes(query)
        );
        setTransactions(filtered);
    };

    return (
        <div className="min-h-screen bg-[#F5F7FA] dark:bg-dark-2 p-6">
            <div className="rounded-2xl shadow-md bg-white dark:bg-dark-2 border border-gray-100 dark:border-gray-700">
                {/* Header */}
                <div className="p-6 bg-[#00D2B6] dark:bg-dark-2 rounded-t-2xl">
                    <h1 className="text-2xl font-bold text-white">Transaction Details</h1>
                    <p className="text-gray-200">View and filter transaction records</p>
                </div>

                {/* Search Input */}
                <div className="p-6">
                    <div className="mb-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search by property, address, buyer, or seller..."
                            className="w-1/4 float-end p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2A2A2A] text-[#003049] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2B6]"
                        />
                    </div>

                    {/* Transaction Table */}
                    <h2 className="text-xl font-bold text-[#003049] dark:text-white mb-4">Transaction Information</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#F5F7FA] dark:bg-dark-2 text-[#003049] dark:text-gray-200">
                                    <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Property</th>
                                    <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Address</th>
                                    <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Price</th>
                                    <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Buyer</th>
                                    <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Seller</th>
                                    <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Status</th>
                                    <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length > 0 ? (
                                    transactions.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-[#2A2A2A]">
                                            <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{transaction.propertyName}</td>
                                            <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{transaction.address}</td>
                                            <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">${transaction.price.toLocaleString()}</td>
                                            <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{transaction.buyer}</td>
                                            <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{transaction.seller}</td>
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
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">
                                            No transactions found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetailPage;