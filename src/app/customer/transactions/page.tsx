"use client";

import React, { useState } from "react";

import { FaEye, FaEdit, } from "react-icons/fa";


type Transaction = {
    id: number;
    propertyName: string;
    address: string;
    price: number;
    buyer: string;
    seller: string;
    status: string;
    date: string;
};

const Page = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [transactions, setTransactions] = useState<Transaction[]>([
        {
            id: 1,
            propertyName: "Sunset Villa",
            address: "123 Ocean Dr, Miami, FL",
            price: 750000,
            buyer: "Alice Brown",
            seller: "Bob Wilson",
            status: "Completed",
            date: "2025-08-15",
        },
        {
            id: 2,
            propertyName: "Downtown Loft",
            address: "456 City Ave, New York, NY",
            price: 1200000,
            buyer: "Charlie Davis",
            seller: "Emma Clark",
            status: "Pending",
            date: "2025-09-10",
        },
        {
            id: 3,
            propertyName: "Countryside Cottage",
            address: "789 Rural Rd, Austin, TX",
            price: 450000,
            buyer: "David Lee",
            seller: "Fiona Adams",
            status: "Cancelled",
            date: "2025-07-20",
        },
    ]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedTransaction, setEditedTransaction] = useState<Transaction | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleDelete = (id: number) => {
        setTransactions(transactions.filter((transaction) => transaction.id !== id));
        setSelectedTransaction(null); // Close modal if open
    };

    const handleView = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsEditMode(false);
    };

    const handleEdit = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setEditedTransaction({ ...transaction });
        setIsEditMode(true);
    };

    const handleSave = () => {
        if (editedTransaction) {
            setTransactions(
                transactions.map((transaction) =>
                    transaction.id === editedTransaction.id ? editedTransaction : transaction
                )
            );
            setSelectedTransaction(null); // Close modal after saving
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (editedTransaction) {
            setEditedTransaction({
                ...editedTransaction,
                [e.target.name]:
                    e.target.name === "price" ? parseFloat(e.target.value) || 0 : e.target.value,
            });
        }
    };

    const filteredTransactions = transactions.filter(
        (transaction) =>
            transaction.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.seller.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F5F7FA] dark:bg-dark-2 p-6">
            <div className="rounded-2xl shadow-md bg-white dark:bg-dark-2 border border-gray-100 dark:border-gray-700">
                {/* Header */}
                <div className="p-6 bg-[#00D2B6] dark:bg-dark-2 rounded-t-2xl">
                    <h1 className="text-2xl font-bold text-white">Transaction Details</h1>
                    <p className="text-gray-200">View and manage transaction records</p>
                </div>

                {/* Search Input */}
                <div className="p-6">
                    <div className="mb-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search by property, address, buyer, or seller..."
                            className="w-1/4 float-end p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-2 text-[#003049] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2B6]"
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
                                    <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.length > 0 ? (
                                    filteredTransactions.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-dark-2">
                                            <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{transaction.propertyName}</td>
                                            <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{transaction.address}</td>
                                            <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">${transaction.price.toLocaleString()}</td>
                                            <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{transaction.buyer}</td>
                                            <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{transaction.seller}</td>
                                            <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${transaction.status === "Completed"
                                                        ? "bg-[#F5F7FA] dark:bg-dark-2 text-[#00B894]"
                                                        : transaction.status === "Pending"
                                                            ? "bg-[#F5F7FA] dark:bg-dark-2 text-[#00D2B6]"
                                                            : "bg-[#F5F7FA] dark:bg-dark-2 text-red-600"
                                                        }`}
                                                >
                                                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{transaction.date}</td>
                                            <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                                <button
                                                    onClick={() => handleView(transaction)}
                                                    className="text-[#00D2B6] hover:text-[#00D2B6] mr-3"
                                                    title="View"
                                                >
                                                    <FaEye className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(transaction)}
                                                    className="text-[#00D2B6] hover:text-[#00D2B6] mr-3"
                                                    title="Edit"
                                                >
                                                    <FaEdit className="w-5 h-5" />
                                                </button>

                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">
                                            No transactions found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Transaction Detail Modal */}
            {selectedTransaction && (
                <div className="fixed inset-0 flex items-center justify-center p-4   bg-opacity-50">
                    <div className="bg-white dark:bg-dark-2 rounded-2xl max-w-2xl w-full max-h-[65vh] overflow-y-auto border border-gray-100 dark:border-gray-700">
                        <div className="p-6 bg-[#F5F7FA] dark:bg-dark-2 rounded-t-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-[#003049] dark:text-white">
                                    {isEditMode ? "Edit Transaction" : "Transaction Details"}
                                </h2>

                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-white dark:bg-dark-2 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Property Name</p>
                                    {isEditMode ? (
                                        <input
                                            type="text"
                                            name="propertyName"
                                            value={editedTransaction?.propertyName || ""}
                                            onChange={handleInputChange}
                                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-2 text-[#003049] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2B6]"
                                        />
                                    ) : (
                                        <p className="text-lg font-semibold text-[#003049] dark:text-white">{selectedTransaction.propertyName}</p>
                                    )}
                                </div>
                                <div className="bg-white dark:bg-dark-2 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Address</p>
                                    {isEditMode ? (
                                        <input
                                            type="text"
                                            name="address"
                                            value={editedTransaction?.address || ""}
                                            onChange={handleInputChange}
                                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-2 text-[#003049] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2B6]"
                                        />
                                    ) : (
                                        <p className="text-lg font-semibold text-[#003049] dark:text-white">{selectedTransaction.address}</p>
                                    )}
                                </div>
                                <div className="bg-white dark:bg-dark-2 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Price</p>
                                    {isEditMode ? (
                                        <input
                                            type="number"
                                            name="price"
                                            value={editedTransaction?.price || ""}
                                            onChange={handleInputChange}
                                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-2 text-[#003049] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2B6]"
                                        />
                                    ) : (
                                        <p className="text-lg font-semibold text-[#003049] dark:text-white">${selectedTransaction.price.toLocaleString()}</p>
                                    )}
                                </div>
                                <div className="bg-white dark:bg-dark-2 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Buyer</p>
                                    {isEditMode ? (
                                        <input
                                            type="text"
                                            name="buyer"
                                            value={editedTransaction?.buyer || ""}
                                            onChange={handleInputChange}
                                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-2 text-[#003049] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2B6]"
                                        />
                                    ) : (
                                        <p className="text-lg font-semibold text-[#003049] dark:text-white">{selectedTransaction.buyer}</p>
                                    )}
                                </div>
                                <div className="bg-white dark:bg-dark-2 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Seller</p>
                                    {isEditMode ? (
                                        <input
                                            type="text"
                                            name="seller"
                                            value={editedTransaction?.seller || ""}
                                            onChange={handleInputChange}
                                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-2 text-[#003049] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2B6]"
                                        />
                                    ) : (
                                        <p className="text-lg font-semibold text-[#003049] dark:text-white">{selectedTransaction.seller}</p>
                                    )}
                                </div>
                                <div className="bg-white dark:bg-dark-2 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                                    {isEditMode ? (
                                        <select
                                            name="status"
                                            value={editedTransaction?.status || ""}
                                            onChange={handleInputChange}
                                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-2 text-[#003049] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2B6]"
                                        >
                                            <option value="Completed">Completed</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    ) : (
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${selectedTransaction.status === "Completed"
                                                ? "bg-[#F5F7FA] dark:bg-dark-2 text-[#00B894]"
                                                : selectedTransaction.status === "Pending"
                                                    ? "bg-[#F5F7FA] dark:bg-dark-2 text-[#00D2B6]"
                                                    : "bg-[#F5F7FA] dark:bg-dark-2 text-red-600"
                                                }`}
                                        >
                                            {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                                        </span>
                                    )}
                                </div>
                                <div className="bg-white dark:bg-dark-2 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date</p>
                                    {isEditMode ? (
                                        <input
                                            type="date"
                                            name="date"
                                            value={editedTransaction?.date || ""}
                                            onChange={handleInputChange}
                                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-2 text-[#003049] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2B6]"
                                        />
                                    ) : (
                                        <p className="text-lg font-semibold text-[#003049] dark:text-white">{selectedTransaction.date}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-4">
                                {isEditMode ? (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            className="bg-[#00D2B6] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#00B894] transition-colors"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setSelectedTransaction(null)}
                                            className="bg-gray-300 text-[#003049] px-6 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setSelectedTransaction(null)}
                                        className="bg-[#00D2B6] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#00B894] transition-colors"
                                    >
                                        Close
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;