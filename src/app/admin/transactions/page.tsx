"use client";

import React, { useState, useEffect } from "react";
import { Building2, Search } from "lucide-react";
import Table from "@/common/Table";
import SearchInput from "@/common/Input";
import TransactionService, { TransactionWithProperty, TransactionResponse } from "@/services/transaction.service";

const columns = [
    {
        key: "name",
        label: "Project Name",
        render: (row: TransactionWithProperty) =>
            row.propertyId?.name ?? row.propertyId?.location?.address ?? "N/A",
    },
    {
        key: "address",
        label: "Address",
        render: (row: TransactionWithProperty) =>
            row.propertyId?.address ?? row.propertyId?.location?.address ?? "N/A",
    },
    {
        key: "totalPrice",
        label: "Total Price",
        render: (row: TransactionWithProperty) => `PKR ${row.totalPrice?.toLocaleString() ?? 0}`,
    },
    {
        key: "totalSquareFeet",
        label: "Square Feet",
        render: (row: TransactionWithProperty) => `${row.totalSquareFeet ?? 0} sq ft`,
    },
    {
        key: "type",
        label: "Type",
        render: (row: TransactionWithProperty) => row.type ?? "N/A",
    },
    {
        key: "status",
        label: "Status",
        render: (row: TransactionWithProperty) => (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : row.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
            >
                {row.status ?? "N/A"}
            </span>
        ),
    },
];

const TransactionManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [transactions, setTransactions] = useState<TransactionWithProperty[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<{
        total: number;
        page: number;
        limit: number;
        pages: number;
    } | null>(null);

    const itemsPerPage = 10; // Matches API's default limit

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            setError(null);
            try {
                const response: TransactionResponse = await TransactionService.getAllTransactions(
                    currentPage,
                    itemsPerPage,
                    searchTerm
                );

                // Extract transactions and pagination from API response
                const transactionData = response?.data?.transactions || [];
                const paginationData = response?.data?.pagination || {
                    total: transactionData.length,
                    page: 1,
                    limit: itemsPerPage,
                    pages: Math.ceil(transactionData.length / itemsPerPage),
                };

                setTransactions(transactionData);
                setPagination(paginationData);
            } catch (err: any) {
                console.error("API Error:", err);
                setError(err.message || "Failed to fetch transactions");
                setTransactions([]);
                setPagination(null);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [currentPage, searchTerm]);

    // Ensure currentPage is within bounds
    useEffect(() => {
        if (pagination && currentPage > pagination.pages && pagination.pages > 0) {
            setCurrentPage(pagination.pages);
        }
    }, [pagination, currentPage]);

    // Reset to first page when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return (
        <div className="min-h-screen bg-[#F5F7FA] dark:bg-dark">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-[#ECF0F1] dark:bg-dark-2 dark:border-dark-4">
                <div className="mx-auto px-6 py-6">
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#00B894] p-2 rounded-lg">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#2C3E50] dark:text-gray-2">
                                Transaction Management
                            </h1>
                            <p className="text-[#34495E] dark:text-gray-4 mt-1">
                                Manage and view all transaction records
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Search */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 dark:bg-dark-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1 max-w-md">
                            <SearchInput
                                placeholder="Search by project, address, price, type, or status..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<Search className="h-5 w-5 text-[#34495E] dark:text-gray-3" />}
                            />
                        </div>
                    </div>
                </div>

                {/* Transaction Table */}
                <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-dark-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2">
                            Transactions ({pagination?.total || 0})
                        </h2>
                    </div>

                    {loading && (
                        <div className="flex items-center justify-center py-8">
                            <p className="text-[#34495E] dark:text-gray-4">Loading transactions...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <p className="text-red-600 font-medium">Error: {error}</p>
                        </div>
                    )}

                    {!loading && !error && transactions.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-[#34495E] dark:text-gray-4">No transactions found.</p>
                        </div>
                    )}

                    {!loading && !error && transactions.length > 0 && (
                        <div className="overflow-x-auto">
                            <Table data={transactions} columns={columns} />
                            {/* Pagination */}
                            {pagination && pagination.total > 0 && (
                                <div className="flex items-center justify-between mt-6">
                                    <p className="text-sm text-[#34495E] dark:text-gray-3">
                                        Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{" "}
                                        <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of{" "}
                                        <span className="font-medium">{pagination.total}</span> results
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="px-3 py-2 text-sm border border-[#ECF0F1] dark:border-dark-4 rounded-lg hover:bg-[#ECF0F1] dark:hover:bg-dark-3 disabled:opacity-50 text-[#34495E] dark:text-gray-3"
                                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                        {Array.from({ length: pagination.pages }, (_, i) => (
                                            <button
                                                key={i + 1}
                                                className={`px-3 py-2 text-sm rounded-lg ${currentPage === i + 1
                                                    ? "bg-[#00B894] text-white"
                                                    : "border border-[#ECF0F1] dark:border-dark-4 hover:bg-[#ECF0F1] dark:hover:bg-dark-3 text-[#34495E] dark:text-gray-3"
                                                    }`}
                                                onClick={() => setCurrentPage(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            className="px-3 py-2 text-sm border border-[#ECF0F1] dark:border-dark-4 rounded-lg hover:bg-[#ECF0F1] dark:hover:bg-dark-3 disabled:opacity-50 text-[#34495E] dark:text-gray-3"
                                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.pages))}
                                            disabled={currentPage === pagination.pages || pagination.pages === 0}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionManagement;