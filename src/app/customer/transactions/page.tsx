"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Building2, MapPin, Calendar, Filter, Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import SearchInput from '@/common/Input';
import { TransactionService, Transaction } from "@/services/transaction.service";

const Page = () => {
    const searchParams = useSearchParams();
    const customerId = searchParams.get("customerId") || ""; // get customerId from URL

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8;

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        if (!customerId) return;
        setLoading(true);
        setError(null);
        TransactionService.getTransactionsByCustomerId(customerId, currentPage, recordsPerPage)
            .then((res) => {
                setTransactions(res.data.transactions || []);
                setTotalCount(res.data.pagination?.total || 0);
            })
            .catch((err) => {
                setError(err.message || "Failed to fetch transactions.");
            })
            .finally(() => setLoading(false));
    }, [customerId, currentPage]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const filteredTransactions = transactions.filter(
        (transaction) =>
            (
                (typeof transaction.propertyId === "object" && transaction.propertyId?.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (typeof transaction.propertyId === "string" && transaction.propertyId.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (transaction.status && transaction.status.toLowerCase().includes(searchQuery.toLowerCase()))
            ) &&
            (statusFilter === "All" || transaction.status === statusFilter)
    );

    // Pagination logic
    const totalPages = Math.ceil((totalCount || filteredTransactions.length) / recordsPerPage);
    // const startIndex = (currentPage - 1) * recordsPerPage;
    // const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + recordsPerPage);
    // Since backend paginates, use filteredTransactions directly
    const paginatedTransactions = filteredTransactions;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

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
                                    View and manage transaction records
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
                                placeholder="Search by property, address, buyer, or seller"
                                value={searchQuery}
                                onChange={handleSearch}
                                icon={<Search className="h-5 w-5 text-[#34495E] dark:text-gray-3" />}
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <Filter className="h-5 w-5 text-[#34495E] dark:text-gray-3" />
                            <div className="flex bg-[#ECF0F1] dark:bg-dark-3 rounded-lg p-1">
                                {["All", "Completed", "Pending", "Cancelled"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${statusFilter === status
                                            ? "bg-white dark:bg-dark-4 text-[#3498DB] shadow-sm"
                                            : "text-[#34495E] dark:text-gray-3 hover:text-[#2C3E50] dark:hover:text-gray-2"
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction Table */}
                <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-dark-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2">
                            Transaction Information ({filteredTransactions.length})
                        </h2>
                    </div>

                    {loading ? (
                        <div className="py-8 text-center text-[#34495E] dark:text-gray-4">Loading transactions...</div>
                    ) : error ? (
                        <div className="py-8 text-center text-red-600 dark:text-red-400">{error}</div>
                    ) : (
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
                                        <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#ECF0F1] dark:divide-dark-4">
                                    {paginatedTransactions.length > 0 ? (
                                        paginatedTransactions.map((transaction) => (
                                            <tr
                                                key={transaction._id}
                                                className="hover:bg-[#ECF0F1] dark:hover:bg-dark-3 transition-colors"
                                            >
                                                <td className="py-4 px-2">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 bg-[#00B894] rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                                                            {typeof transaction.propertyId === "object"
                                                                ? transaction.propertyId?.name?.[0] || "?"
                                                                : transaction.propertyId?.[0] || "?"}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-[#2C3E50] dark:text-gray-2">
                                                                {typeof transaction.propertyId === "object"
                                                                    ? transaction.propertyId?.name
                                                                    : transaction.propertyId}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">
                                                    {typeof transaction.propertyId === "object"
                                                        ? transaction.propertyId?.address || transaction.propertyId?.location?.address || "-"
                                                        : "-"}
                                                </td>
                                                <td className="py-4 px-2 font-medium text-[#2C3E50] dark:text-gray-2">
                                                    PKR {transaction.totalPrice?.toLocaleString?.() ?? "-"}
                                                </td>
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{transaction.customerId}</td>
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{transaction.userId || "-"}</td>
                                                <td className="py-4 px-2">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${transaction.status === "Completed"
                                                            ? "bg-[#E8F8F5] text-[#27AE60] dark:bg-green-600/20 dark:text-green-400"
                                                            : transaction.status === "Pending"
                                                                ? "bg-[#E8F8F5] text-[#3498DB] dark:bg-blue-600/20 dark:text-blue-400"
                                                                : "bg-[#F5F7FA] text-red-600 dark:bg-dark-3 dark:text-red-400"
                                                            }`}
                                                    >
                                                        {transaction.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">
                                                    {transaction.createdAt ? new Date(transaction.createdAt).toLocaleDateString() : "-"}
                                                </td>
                                                <td className="py-4 px-2">
                                                    <button
                                                        onClick={() => setSelectedTransaction(transaction)}
                                                        className="bg-[#E8F8F5] dark:bg-dark-3 dark:text-white text-[#3498DB] px-3 py-1 rounded-lg text-sm hover:bg-[#D1F2EB] dark:hover:bg-dark-4 transition-colors"
                                                    >
                                                        <Eye className="h-4 w-4 inline mr-1" /> View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={8} className="py-4 px-2 text-center text-[#34495E] dark:text-gray-4">
                                                No transactions found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6">
                            <p className="text-sm text-[#34495E] dark:text-gray-4">
                                Showing {(currentPage - 1) * recordsPerPage + 1} to {Math.min(currentPage * recordsPerPage, totalCount)} of {totalCount} transactions
                            </p>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-lg ${currentPage === 1
                                        ? "text-[#A1B1C3] dark:text-gray-5 cursor-not-allowed"
                                        : "text-[#2C3E50] dark:text-gray-2 hover:bg-[#ECF0F1] dark:hover:bg-dark-3"
                                        }`}
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === page
                                            ? "bg-[#3498DB] text-white"
                                            : "text-[#34495E] dark:text-gray-3 hover:bg-[#ECF0F1] dark:hover:bg-dark-3"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-lg ${currentPage === totalPages
                                        ? "text-[#A1B1C3] dark:text-gray-5 cursor-not-allowed"
                                        : "text-[#2C3E50] dark:text-gray-2 hover:bg-[#ECF0F1] dark:hover:bg-dark-3"
                                        }`}
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Transaction Detail Modal */}
                {selectedTransaction && (
                    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
                        <div className="bg-white dark:bg-dark-2 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 rounded-t-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-16 h-16 bg-[#00B894] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                            {selectedTransaction.propertyName[0]}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-[#2C3E50] dark:text-gray-2">{selectedTransaction.propertyName}</h2>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedTransaction(null)}
                                        className="text-[#34495E] dark:text-gray-3 hover:text-[#2C3E50] dark:hover:text-gray-2 text-xl"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-[#F5F7FA] dark:bg-dark-3 rounded-lg p-4">
                                        <p className="text-sm text-[#34495E] dark:text-gray-3 mb-1">Price</p>
                                        <p className="text-2xl font-bold text-[#2C3E50] dark:text-gray-2">
                                            PKR {selectedTransaction.price.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="bg-[#F5F7FA] dark:bg-dark-3 rounded-lg p-4">
                                        <p className="text-sm text-[#34495E] dark:text-gray-3 mb-1">Status</p>
                                        <p className={`text-2xl font-bold ${selectedTransaction.status === "Completed"
                                            ? "text-[#27AE60]"
                                            : selectedTransaction.status === "Pending"
                                                ? "text-[#3498DB]"
                                                : "text-red-600"
                                            }`}>
                                            {selectedTransaction.status}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-gray-2 mb-4">Transaction Details</h3>
                                    <div className="space-y-3">
                                        <div className="bg-[#F5F7FA] dark:bg-dark-3 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold text-[#2C3E50] dark:text-gray-2">{selectedTransaction.propertyName}</h4>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedTransaction.status === "Completed"
                                                        ? "bg-[#E8F8F5] text-[#27AE60] dark:bg-green-600/20 dark:text-green-400"
                                                        : selectedTransaction.status === "Pending"
                                                            ? "bg-[#E8F8F5] text-[#3498DB] dark:bg-blue-600/20 dark:text-blue-400"
                                                            : "bg-[#F5F7FA] text-red-600 dark:bg-dark-3 dark:text-red-400"
                                                        }`}
                                                >
                                                    {selectedTransaction.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-[#34495E] dark:text-gray-3">
                                                    Address: <span className="font-semibold">{selectedTransaction.address}</span>
                                                </p>
                                                <p className="text-[#34495E] dark:text-gray-3">
                                                    Date: <span className="font-semibold">{selectedTransaction.date}</span>
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-[#34495E] dark:text-gray-3">
                                                    Buyer: <span className="font-semibold">{selectedTransaction.buyer}</span>
                                                </p>
                                                <p className="text-[#34495E] dark:text-gray-3">
                                                    Seller: <span className="font-semibold">{selectedTransaction.seller}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end space-x-4">
                                    <button
                                        onClick={() => setSelectedTransaction(null)}
                                        className="bg-[#00B894] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#009c7d] transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;