"use client";

import React, { useState, useEffect } from "react";
import { Building2, Eye, Search, X } from "lucide-react";
import Table from "@/common/Table";
import SearchInput from "@/common/Input";
import TransactionService, { TransactionResponse, Transaction } from "@/services/transaction.service";

const TransactionManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);

    // ✅ Modal State
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [viewError, setViewError] = useState<string | null>(null);
    const [viewLoading, setViewLoading] = useState(false);

    const itemsPerPage = 10;

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

    useEffect(() => {
        if (pagination && currentPage > pagination.pages && pagination.pages > 0) {
            setCurrentPage(pagination.pages);
        }
    }, [pagination, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // ✅ Function to open modal and fetch transaction by ID
    const handleViewTransaction = async (id: string) => {
        setViewModalOpen(true);
        setSelectedTransaction(null);
        setViewLoading(true);
        setViewError(null);

        try {
            const response = await TransactionService.getTransactionById(id);
            setSelectedTransaction(response.data.transaction || null);
        } catch (err: any) {
            setViewError(err.message || "Failed to load transaction details");
        } finally {
            setViewLoading(false);
        }
    };

    // ✅ Table Columns (with Eye icon click event)
    const columns = [
        {
            key: "name",
            label: "Project Name",
            render: (row: any) =>
                row.propertyId?.name ?? row.propertyId?.location?.address ?? "N/A",
        },
        {
            key: "address",
            label: "Address",
            render: (row: any) =>
                row.propertyId?.address ?? row.propertyId?.location?.address ?? "N/A",
        },
        {
            key: "totalPrice",
            label: "Total Price",
            render: (row: any) => `PKR ${row.totalPrice?.toLocaleString() ?? 0}`,
        },
        {
            key: "totalSquareFeet",
            label: "Square Feet",
            render: (row: any) => `${row.totalSquareFeet ?? 0} sq ft`,
        },
        {
            key: "type",
            label: "Type",
            render: (row: any) => row.type ?? "N/A",
        },
        {
            key: "status",
            label: "Status",
            render: (row: any) => (
                <div className="flex items-center gap-2">
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
                    {/* 👇 Click to open modal */}
                    <button
                        onClick={() => handleViewTransaction(row._id)}
                        className="hover:text-[#00B894]"
                    >
                        <Eye className="h-5 w-5 text-[#34495E] dark:text-gray-3" />
                    </button>
                </div>
            ),
        },
    ];

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
                    <SearchInput
                        placeholder="Search by project, address, price, type, or status..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<Search className="h-5 w-5 text-[#34495E] dark:text-gray-3" />}
                    />
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-dark-2">
                    <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2 mb-6">
                        Transactions ({pagination?.total || 0})
                    </h2>

                    {loading ? (
                        <div className="text-center py-8 text-[#34495E] dark:text-gray-4">
                            Loading transactions...
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <p className="text-red-600 font-medium">Error: {error}</p>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="text-center py-8 text-[#34495E] dark:text-gray-4">
                            No transactions found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table data={transactions} columns={columns} />
                        </div>
                    )}
                </div>
            </div>

            {/* ✅ Modal for viewing transaction details */}
            {viewModalOpen && (
                <div className="fixed inset-0 top-9 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-dark-2 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 w-[60%] max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2">
                                Transaction Details
                            </h2>
                            <button onClick={() => setViewModalOpen(false)}>
                                <X className="h-6 w-6 text-gray-500 hover:text-red-500" />
                            </button>
                        </div>

                        {viewLoading && (
                            <p className="text-[#34495E] dark:text-gray-4">Loading details...</p>
                        )}

                        {viewError && (
                            <p className="text-red-600">Error: {viewError}</p>
                        )}

                        {selectedTransaction && (
                            <div className="grid grid-cols-2 gap-4 text-sm text-[#34495E] dark:text-gray-3">
                                <p><strong>ID:</strong> {selectedTransaction._id}</p>
                                <p><strong>Status:</strong> {selectedTransaction.status}</p>
                                <p><strong>Total Price:</strong> PKR {selectedTransaction.totalPrice?.toLocaleString()}</p>
                                <p><strong>Square Feet:</strong> {selectedTransaction.totalSquareFeet} sq ft</p>
                                <p><strong>Type:</strong> {selectedTransaction.type}</p>
                                <p><strong>Payment Success:</strong> {selectedTransaction.paymentSuccess ? "Yes" : "No"}</p>
                                <p><strong>Created At:</strong> {new Date(selectedTransaction.createdAt).toLocaleString()}</p>
                                <p><strong>Updated At:</strong> {new Date(selectedTransaction.updatedAt).toLocaleString()}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionManagement;
