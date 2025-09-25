"use client";

import React, { useState } from 'react';
import { Building2, Filter, Search } from 'lucide-react';
import SearchInput from '@/common/Input';

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

const transactions: TransactionDetail[] = [
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

type Transaction = typeof transactions[number];

const TransactionDetailPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch =
            transaction.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.seller.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-[#F5F7FA] dark:bg-dark">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-[#ECF0F1] dark:bg-dark-2 dark:border-dark-4">
                <div className="mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-[#00B894] p-2 rounded-lg">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-[#2C3E50] dark:text-gray-2">Transaction Details</h1>
                                <p className="text-[#34495E] dark:text-gray-4 mt-1">
                                    Manage and monitor all your transaction records
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 dark:bg-dark-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1 max-w-md">
                            <SearchInput
                                placeholder="Search by property, address, buyer, or seller..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<Search className="h-5 w-5 text-[#34495E] dark:text-gray-3" />}
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <Filter className="h-5 w-5 text-[#34495E] dark:text-gray-3" />
                            <div className="flex bg-[#ECF0F1] dark:bg-dark-3 rounded-lg p-1">
                                {['All', 'Pending', 'Completed', 'Cancelled'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${statusFilter === status
                                            ? 'bg-white dark:bg-dark-4 text-[#3498DB] shadow-sm'
                                            : 'text-[#34495E] dark:text-gray-3 hover:text-[#2C3E50] dark:hover:text-gray-2'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-dark-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2">
                            Transactions ({filteredTransactions.length})
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#ECF0F1] dark:border-dark-4">
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                        Property
                                    </th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                        Address
                                    </th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                        Price
                                    </th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                        Buyer
                                    </th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                        Seller
                                    </th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                        Status
                                    </th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#ECF0F1] dark:divide-dark-4">
                                {filteredTransactions.length > 0 ? (
                                    filteredTransactions.map((transaction) => (
                                        <tr
                                            key={transaction.id}
                                            className="hover:bg-[#ECF0F1] dark:hover:bg-dark-3 transition-colors"
                                        >
                                            <td className="py-4 px-2">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-[#00B894] rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                                                        {transaction.propertyName[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-[#2C3E50] dark:text-gray-2">{transaction.propertyName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{transaction.address}</td>
                                            <td className="py-4 px-2 font-semibold text-[#2C3E50] dark:text-gray-2">
                                                ${transaction.price.toLocaleString()}
                                            </td>
                                            <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{transaction.buyer}</td>
                                            <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{transaction.seller}</td>
                                            <td className="py-4 px-2">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${transaction.status === 'completed'
                                                        ? 'bg-[#E8F8F5] text-[#27AE60] dark:bg-green-600/20 dark:text-green-400'
                                                        : transaction.status === 'pending'
                                                            ? 'bg-[#F5F7FA] text-[#3498DB] dark:bg-dark-3 dark:text-blue-400'
                                                            : 'bg-[#F5F7FA] text-red-600 dark:bg-dark-3 dark:text-red-400'
                                                        }`}
                                                >
                                                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{transaction.date}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="py-4 px-2 text-center text-[#34495E] dark:text-gray-4">
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