"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Building2, MapPin, Calendar, Filter, Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import SearchInput from '@/common/Input';
import { TransactionPayment } from "@/redux/transactionPaymentSlice";
import Table from '@/common/Table';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTransactionsByCustomer } from '@/redux/reducers/customerslice/customerTransactionsSlice';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchTransactionPayments, approveTransaction } from "@/redux/transactionPaymentSlice";
import { toast } from 'react-toastify'; // Optional: for notifications; replace with your preferred method if needed

const Page = () => {
    const searchParams = useSearchParams();
    const userInfo: any = useSelector((state: RootState) => state.userInfo);
    const customerId = userInfo?.user?._id || searchParams.get("customerId") || "";

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionPayment | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8;
    const { transactions, loading, error, pagination } = useAppSelector((state: any) => state.transactionPayment);
    const dispatch = useAppDispatch();
    const totalCount = pagination?.total ?? (Array.isArray(transactions) ? transactions.length : 0);

    console.log("Transactions from Redux:", transactions);
    useEffect(() => {
        dispatch(fetchTransactionPayments({ customerId, page: currentPage, limit: recordsPerPage }));
        // Only run when customerId or currentPage changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerId, currentPage]);

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    }, []);

    // Defensive: ensure transactions is always an array
    const safeTransactions = useMemo(() => Array.isArray(transactions) ? transactions : [], [transactions]);

    // Memoized filter logic for new API structure
    const filteredTransactions = useMemo(() => {
        const search = searchQuery.trim().toLowerCase();
        return safeTransactions.filter((transaction) => {
            const propertyName = transaction?.propertyName || "";
            const status = transaction?.status || "";
            const matchesSearch =
                propertyName.toLowerCase().includes(search) ||
                status.toLowerCase().includes(search);
            const matchesStatus = statusFilter === "All" || status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [safeTransactions, searchQuery, statusFilter]);

    // Pagination logic: use backend totalCount and backend-paginated transactions
    const totalPages = useMemo(() => Math.max(1, Math.ceil(totalCount / recordsPerPage)), [totalCount, recordsPerPage]);
    // Since backend paginates, filteredTransactions is already paginated
    const paginatedTransactions = filteredTransactions;

    const handlePageChange = useCallback((page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }, [totalPages]);

    // Handle Approve button click
    const handleApprove = useCallback(async (transactionId: string) => {
        try {
            await dispatch(approveTransaction({ transactionId })).unwrap();
            toast.success('Transaction approved successfully!', { position: 'top-right' });
            // Optionally refetch transactions to ensure UI reflects the latest state
            dispatch(fetchTransactionPayments({ customerId, page: currentPage, limit: recordsPerPage }));
            // Close modal if approving from modal
            if (selectedTransaction?.transactionId === transactionId) {
                setSelectedTransaction(null);
            }
        } catch (error: any) {
            toast.error(error || 'Failed to approve transaction', { position: 'top-right' });
        }
    }, [dispatch, customerId, currentPage, recordsPerPage, selectedTransaction]);

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
                                        type="button"
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
                        <Table
                            data={paginatedTransactions.map((transaction: any) => {
                                const propertyName = transaction.propertyName || "-";
                                const propertyInitial = propertyName[0] || "?";
                                const propertyAddress = transaction.propertyLocation?.address || "-";
                                const seller = transaction.customerName || transaction.customerEmail || transaction.customerId || "-";
                                const buyer = transaction.userName || transaction.userEmail || transaction.userId || "-";
                                const totalPrice = transaction.totalPrice ? transaction.totalPrice.toLocaleString() : "-";
                                const status = transaction.status || "-";
                                const createdAt = transaction.createdAt ? new Date(transaction.createdAt).toLocaleDateString() : "-";
                                return {
                                    id: transaction.transactionId,
                                    property: { propertyInitial, propertyName },
                                    propertyAddress,
                                    totalPrice,
                                    buyer,
                                    seller,
                                    paymentSlip: transaction?.payments?.[0]?.paymentSlip || null,
                                    status,
                                    createdAt,
                                    transaction,
                                    actions: "",
                                };
                            })}
                            columns={[
                                {
                                    key: 'property',
                                    label: 'Property',
                                    render: (row: any) => (
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-[#00B894] rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                                                {row.property.propertyInitial}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[#2C3E50] dark:text-gray-2">
                                                    {row.property.propertyName}
                                                </p>
                                            </div>
                                        </div>
                                    ),
                                },
                                {
                                    key: 'propertyAddress',
                                    label: 'Address',
                                },
                                {
                                    key: 'totalPrice',
                                    label: 'Price',
                                    render: (row: any) => (
                                        <span className="font-medium text-[#2C3E50] dark:text-gray-2">PKR {row.totalPrice}</span>
                                    ),
                                },
                                {
                                    key: 'buyer',
                                    label: 'Buyer',
                                },
                                {
                                    key: 'seller',
                                    label: 'Seller',
                                },
                                {
                                    key: 'paymentSlip',
                                    label: 'Payment Slip',
                                    render: (row: any) => {
                                        const slip = row.transaction?.payments?.[0]?.paymentSlip;
                                        return slip ? (
                                            <a href={slip} target="_blank" rel="noopener noreferrer">
                                                <img src={slip} alt="Payment Slip" className="w-16 h-10 object-cover rounded shadow border border-gray-200 dark:border-dark-4" />
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 dark:text-gray-500">-</span>
                                        );
                                    },
                                },
                                {
                                    key: 'status',
                                    label: 'Status',
                                    render: (row: any) => (
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${row.status === "Completed"
                                                ? "bg-[#E8F8F5] text-[#27AE60] dark:bg-green-600/20 dark:text-green-400"
                                                : row.status === "Pending"
                                                    ? "bg-[#E8F8F5] text-[#3498DB] dark:bg-blue-600/20 dark:text-blue-400"
                                                    : "bg-[#F5F7FA] text-red-600 dark:bg-dark-3 dark:text-red-400"
                                                }`}
                                        >
                                            {row.status}
                                        </span>
                                    ),
                                },
                                {
                                    key: 'createdAt',
                                    label: 'Date',
                                },
                                {
                                    key: 'actions',
                                    label: 'Actions',
                                    render: (row: any) => (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedTransaction(row.transaction)}
                                                className="bg-[#E8F8F5] dark:bg-dark-3 dark:text-white text-[#3498DB] px-3 py-1 rounded-lg text-sm hover:bg-[#D1F2EB] dark:hover:bg-dark-4 transition-colors"
                                            >
                                                <Eye className="h-4 w-4 inline mr-1" /> View
                                            </button>
                                            {row.status === "pending" && row.paymentSlip && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(row.transaction.transactionId)}
                                                        className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-lg text-sm hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        // TODO: Implement decline logic
                                                        className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-lg text-sm hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                                                    >
                                                        Decline
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    )}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6">
                            <p className="text-sm text-[#34495E] dark:text-gray-4">
                                Showing {totalCount === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1} to {Math.min(currentPage * recordsPerPage, totalCount)} of {totalCount} transactions
                            </p>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-lg ${currentPage === 1
                                        ? "text-[#A1B1C3] dark:text-gray-5 cursor-not-allowed"
                                        : "text-[#2C3E50] dark:text-gray-2 hover:bg-[#ECF0F1] dark:hover:bg-dark-3"
                                        }`}
                                    type="button"
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
                                        type="button"
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
                                    type="button"
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
                                            {selectedTransaction.propertyName?.[0] || '?'}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-[#2C3E50] dark:text-gray-2">{selectedTransaction.propertyName}</h2>
                                            <p className="text-[#34495E] dark:text-gray-3 mt-1 text-sm">
                                                <span className="font-semibold">Transaction ID:</span> {selectedTransaction.transactionId || '-'}
                                            </p>
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
                                            PKR {selectedTransaction.totalPrice?.toLocaleString?.() ?? '-'}
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
                                                    <span className="font-semibold">Address:</span> {selectedTransaction.propertyLocation?.address || '-'}
                                                </p>
                                                <p className="text-[#34495E] dark:text-gray-3">
                                                    <span className="font-semibold">Date:</span> {selectedTransaction.createdAt ? new Date(selectedTransaction.createdAt).toLocaleDateString() : '-'}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-[#34495E] dark:text-gray-3">
                                                    <span className="font-semibold">Buyer:</span> {selectedTransaction.customerName || selectedTransaction.customerEmail || selectedTransaction.customerId || '-'}
                                                </p>
                                                <p className="text-[#34495E] dark:text-gray-3">
                                                    <span className="font-semibold">Seller:</span> {selectedTransaction.userName || selectedTransaction.userEmail || selectedTransaction.userId || '-'}
                                                </p>
                                            </div>
                                            {/* Payments Section */}
                                            {selectedTransaction.payments && selectedTransaction.payments.length > 0 && (
                                                <div className="mt-4">
                                                    <h5 className="font-semibold mb-2">Payments</h5>
                                                    <ul className="space-y-2">
                                                        {selectedTransaction.payments.map((payment: any) => (
                                                            <li key={payment.paymentId} className="bg-white dark:bg-dark-4 rounded p-3 border border-[#ECF0F1] dark:border-dark-4">
                                                                <div className="flex justify-between items-center">
                                                                    <span className="font-medium">{payment.paymentType} - {payment.status}</span>
                                                                    <span className="text-sm">{payment.amount?.toLocaleString?.()} {payment.currency}</span>
                                                                </div>
                                                                <div className="flex justify-between items-center mt-1">
                                                                    <span className="text-xs text-gray-500">{payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : '-'}</span>
                                                                    {payment.paymentSlip && (
                                                                        <a href={payment.paymentSlip} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-xs">View Slip</a>
                                                                    )}
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end space-x-4">
                                    {selectedTransaction.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() => handleApprove(selectedTransaction.transactionId)}
                                                className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-6 py-2 rounded-lg font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                // TODO: Implement decline logic for modal
                                                className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-6 py-2 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                                            >
                                                Decline
                                            </button>
                                        </>
                                    )}
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