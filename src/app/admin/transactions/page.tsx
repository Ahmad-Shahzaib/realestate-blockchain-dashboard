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
    const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [viewError, setViewError] = useState<string | null>(null);
    const [viewLoading, setViewLoading] = useState(false);
    console.log("Transactions:", transactions);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            setError(null);

            try {
                // ✅ Pass searchTerm correctly (trim & encode)
                const response: TransactionResponse = await TransactionService.getAllTransactions(
                    currentPage,
                    itemsPerPage,
                    searchTerm.trim()
                );

                // ✅ Normalize data safely
                const transactionData = response?.data?.transactions || [];
                const paginationData =
                    response?.data?.pagination || {
                        total: transactionData.length,
                        page: 1,
                        limit: itemsPerPage,
                        pages: Math.ceil(transactionData.length / itemsPerPage),
                    };

                // ✅ Apply local filtering (fallback if API doesn’t handle search)
                const filtered = transactionData.filter((t: any) => {
                    const query = searchTerm.trim().toLowerCase();
                    if (!query) return true;

                    return (
                        t?.propertyId?.name?.toLowerCase().includes(query) ||
                        t?.propertyId?.location?.address?.toLowerCase().includes(query) ||
                        t?.type?.toLowerCase().includes(query) ||
                        t?.status?.toLowerCase().includes(query) ||
                        t?.totalPrice?.toString().includes(query)
                    );
                });

                setTransactions(filtered);
                setPagination({
                    ...paginationData,
                    total: filtered.length,
                    pages: Math.ceil(filtered.length / itemsPerPage),
                });
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
                            <div className="space-y-6">
                                {/* Transaction Details */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-[#34495E] dark:text-gray-3">Transaction Details</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-[#34495E] dark:text-gray-3">
                                        <p><strong>Transaction ID:</strong> {selectedTransaction._id}</p>
                                        <p><strong>Status:</strong> <span className={`px-2 py-1 rounded ${selectedTransaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{selectedTransaction.status}</span></p>
                                        <p><strong>Type:</strong> {selectedTransaction.type}</p>
                                        <p><strong>Payment Success:</strong> {selectedTransaction.paymentSuccess ? "✓ Yes" : "✗ No"}</p>
                                        <p><strong>Total Price:</strong> PKR {selectedTransaction.totalPrice?.toLocaleString()}</p>
                                        <p><strong>Square Feet:</strong> {selectedTransaction.totalSquareFeet} sq ft</p>
                                        <p><strong>Price per Sq Ft:</strong> PKR {(selectedTransaction.totalPrice / selectedTransaction.totalSquareFeet).toFixed(2)}</p>
                                        <p><strong>Floor ID:</strong> {selectedTransaction.floorId}</p>
                                        <p><strong>Created:</strong> {new Date(selectedTransaction.createdAt).toLocaleString()}</p>
                                        <p><strong>Updated:</strong> {new Date(selectedTransaction.updatedAt).toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Property Details */}
                                {selectedTransaction.propertyId && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 text-[#34495E] dark:text-gray-3">Property Information</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm text-[#34495E] dark:text-gray-3">
                                            <p><strong>Property Name:</strong> {selectedTransaction.propertyId.name}</p>
                                            <p><strong>Category:</strong> {selectedTransaction.propertyId.category}</p>
                                            <p><strong>Subcategory:</strong> {selectedTransaction.propertyId.subcategory}</p>
                                            <p><strong>Status:</strong> {selectedTransaction.propertyId.status}</p>
                                            <p><strong>Featured:</strong> {selectedTransaction.propertyId.featured ? "Yes" : "No"}</p>
                                            <p><strong>Total Area:</strong> {selectedTransaction.propertyId.totalArea} sq ft</p>
                                            <p><strong>Sellable Area:</strong> {selectedTransaction.propertyId.sellableArea} sq ft</p>
                                            <p><strong>Total Units:</strong> {selectedTransaction.propertyId.totalUnits}</p>
                                            <p><strong>Available Units:</strong> {selectedTransaction.propertyId.availableUnits}</p>
                                            <p><strong>Sold Units:</strong> {selectedTransaction.propertyId.soldUnits}</p>
                                            <p><strong>Reserved Units:</strong> {selectedTransaction.propertyId.reservedUnits}</p>
                                            <p><strong>Start Date:</strong> {new Date(selectedTransaction.propertyId.startDate).toLocaleDateString()}</p>
                                            <p><strong>Completion Date:</strong> {new Date(selectedTransaction.propertyId.completionDate).toLocaleDateString()}</p>
                                            <p className="col-span-2"><strong>Description:</strong> {selectedTransaction.propertyId.description}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Location Details */}
                                {selectedTransaction.propertyId?.location && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 text-[#34495E] dark:text-gray-3">Location</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm text-[#34495E] dark:text-gray-3">
                                            <p><strong>Address:</strong> {selectedTransaction.propertyId.location.address}</p>
                                            <p><strong>City:</strong> {selectedTransaction.propertyId.location.city}</p>
                                            <p><strong>State:</strong> {selectedTransaction.propertyId.location.state}</p>
                                            <p><strong>Country:</strong> {selectedTransaction.propertyId.location.country}</p>
                                            <p><strong>Coordinates:</strong> {selectedTransaction.propertyId.location.coordinates.latitude}, {selectedTransaction.propertyId.location.coordinates.longitude}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Developer Details */}
                                {selectedTransaction.propertyId?.developer && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 text-[#34495E] dark:text-gray-3">Developer</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm text-[#34495E] dark:text-gray-3">
                                            <p><strong>Name:</strong> {selectedTransaction.propertyId.developer.name}</p>
                                            <p><strong>Website:</strong> <a href={selectedTransaction.propertyId.developer.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedTransaction.propertyId.developer.website}</a></p>
                                            <p className="col-span-2"><strong>Description:</strong> {selectedTransaction.propertyId.developer.description}</p>
                                        </div>
                                    </div>
                                )}

                                {/* User Details */}
                                {selectedTransaction.userId && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 text-[#34495E] dark:text-gray-3">User Information</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm text-[#34495E] dark:text-gray-3">
                                            <p><strong>Name:</strong> {selectedTransaction.userId.firstName} {selectedTransaction.userId.lastName}</p>
                                            <p><strong>Email:</strong> {selectedTransaction.userId.email}</p>
                                            <p><strong>Phone:</strong> {selectedTransaction.userId.phoneNumber}</p>
                                            <p><strong>Role:</strong> {selectedTransaction.userId.role}</p>
                                            <p><strong>Wallet Address:</strong> <span className="text-xs break-all">{selectedTransaction.userId.walletAddress}</span></p>
                                            <p><strong>KYC Status:</strong> {selectedTransaction.userId.kycStatus}</p>
                                            <p><strong>Account Status:</strong> {selectedTransaction.userId.accountStatus}</p>
                                            <p><strong>City:</strong> {selectedTransaction.userId.city}</p>
                                            <p><strong>Address:</strong> {selectedTransaction.userId.address}</p>
                                            <p><strong>Country:</strong> {selectedTransaction.userId.country}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Customer/Company Details */}
                                {selectedTransaction.customerId && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 text-[#34495E] dark:text-gray-3">Company Information</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm text-[#34495E] dark:text-gray-3">
                                            <p><strong>Name:</strong> {selectedTransaction.customerId.firstName} {selectedTransaction.customerId.lastName}</p>
                                            <p><strong>Email:</strong> {selectedTransaction.customerId.email}</p>
                                            <p><strong>Phone:</strong> {selectedTransaction.customerId.phoneNumber}</p>
                                            <p><strong>Wallet Address:</strong> <span className="text-xs break-all">{selectedTransaction.customerId.walletAddress}</span></p>
                                            <p><strong>Gender:</strong> {selectedTransaction.customerId.gender}</p>
                                            <p><strong>Date of Birth:</strong> {new Date(selectedTransaction.customerId.dateOfBirth).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Bank Details */}
                                {selectedTransaction.propertyId?.bankDetails && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 text-[#34495E] dark:text-gray-3">Bank Details</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm text-[#34495E] dark:text-gray-3">
                                            <p><strong>Bank Name:</strong> {selectedTransaction.propertyId.bankDetails.bankName}</p>
                                            <p><strong>Account Number:</strong> {selectedTransaction.propertyId.bankDetails.accountNumber}</p>
                                            <p><strong>Account Title:</strong> {selectedTransaction.propertyId.bankDetails.accountTitle}</p>
                                            <p><strong>IBAN:</strong> {selectedTransaction.propertyId.bankDetails.iban}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Floor Details */}
                                {selectedTransaction.propertyId?.floors?.[0] && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 text-[#34495E] dark:text-gray-3">Floor Details</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm text-[#34495E] dark:text-gray-3">
                                            <p><strong>Floor Name:</strong> {selectedTransaction.propertyId.floors[0].name}</p>
                                            <p><strong>Floor Number:</strong> {selectedTransaction.propertyId.floors[0].floorNumber}</p>
                                            <p><strong>Total Square Footage:</strong> {selectedTransaction.propertyId.floors[0].totalSquareFootage} sq ft</p>
                                            <p><strong>Price per Sq Ft:</strong> PKR {selectedTransaction.propertyId.floors[0].pricePerSqFt}</p>
                                            <p><strong>Min Price:</strong> PKR {selectedTransaction.propertyId.floors[0].minPrice}</p>
                                            <p><strong>Max Price:</strong> PKR {selectedTransaction.propertyId.floors[0].maxPrice}</p>
                                            <p><strong>Total Units:</strong> {selectedTransaction.propertyId.floors[0].totalUnits}</p>
                                            <p><strong>Available Units:</strong> {selectedTransaction.propertyId.floors[0].availableUnits}</p>
                                            <p className="col-span-2"><strong>Description:</strong> {selectedTransaction.propertyId.floors[0].description}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Token Details */}
                                {selectedTransaction.propertyId?.token && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 text-[#34495E] dark:text-gray-3">Token Information</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm text-[#34495E] dark:text-gray-3">
                                            <p><strong>Token Name:</strong> {selectedTransaction.propertyId.token.name}</p>
                                            <p><strong>Symbol:</strong> {selectedTransaction.propertyId.token.symbol}</p>
                                            <p><strong>Supply:</strong> {selectedTransaction.propertyId.token.supply}</p>
                                            <p><strong>Price per Token:</strong> PKR {selectedTransaction.propertyId.token.pricePerToken}</p>
                                            <p><strong>Wallet Address:</strong> {selectedTransaction.propertyId.token.walletAddress}</p>
                                            <p><strong>Blockchain:</strong> {selectedTransaction.propertyId.blockchainNetwork}</p>
                                            <p><strong>Tokenization Enabled:</strong> {selectedTransaction.propertyId.tokenizationEnabled ? "Yes" : "No"}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionManagement;
