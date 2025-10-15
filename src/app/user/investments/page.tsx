"use client";

import React, { useState, useEffect } from 'react';
import { Building2, Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import SearchInput from '@/common/Input';
import { TransactionService } from '@/services/transaction.service';
import Button from '@/common/Button';

interface Property {
  name?: string;
  location?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  developer?: {
    name?: string;
  };
}

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface Transaction {
  _id: string;
  propertyId: Property;
  customerId: User;
  userId: User;
  totalPrice: number;
  totalSquareFeet: number;
  status: string;
  type: string;
  paymentSuccess: boolean;
  createdAt: string;
  updatedAt: string;
}

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

const InvestmentDashboardTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState<TransactionDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recordsPerPage = 8;

  // Map API Transaction to TransactionDetail
  const mapTransactionToDetail = (transaction: Transaction): TransactionDetail => ({
    id: transaction._id || 'N/A',
    propertyName: transaction.propertyId?.name || 'Unknown Property',
    address: transaction.propertyId?.location?.address || 'N/A',
    price: transaction.totalPrice || 0,
    status: (transaction.status as 'pending' | 'completed' | 'cancelled') || 'pending',
    date: transaction.createdAt ? transaction.createdAt.split('T')[0] : 'N/A',
    buyer: transaction.customerId?.firstName
      ? `${transaction.customerId.firstName} ${transaction.customerId.lastName || ''}`.trim()
      : 'Unknown Buyer',
    seller: transaction.userId?.firstName
      ? `${transaction.userId.firstName} ${transaction.userId.lastName || ''}`.trim()
      : transaction.propertyId?.developer?.name || 'Unknown Seller',
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await TransactionService.getUserTransactions();
        const transactionData = response.data?.transactions || [];
        const completedTransactions = transactionData
          .filter((transaction: Transaction) => transaction.status === 'completed')
          .map(mapTransactionToDetail);
        setTransactions(completedTransactions);
      } catch (err: any) {
        console.error('API Error:', err);
        setError(err.message || 'Failed to fetch user transactions');
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTransactions.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + recordsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openModal = (transaction: TransactionDetail) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
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
                <h1 className="text-3xl font-bold text-[#2C3E50] dark:text-gray-2">
                  Completed Transactions
                </h1>
                <p className="text-[#34495E] dark:text-gray-4 mt-1">
                  View all completed transaction records
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 dark:bg-dark-2">
          <div className="flex-1 max-w-md">
            <SearchInput
              placeholder="Search by property, address, buyer, or seller..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="h-5 w-5 text-[#34495E] dark:text-gray-3" />}
            />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-dark-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2">
              Completed Transactions ({filteredTransactions.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-4 text-[#34495E] dark:text-gray-4">
                Loading transactions...
              </div>
            ) : error ? (
              <div className="text-center py-4 text-red-600 dark:text-red-400">
                {error}
              </div>
            ) : (
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
                      Date
                    </th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="text-right py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECF0F1] dark:divide-dark-4">
                  {paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="hover:bg-[#ECF0F1] dark:hover:bg-dark-3 transition-colors"
                      >
                        <td className="py-4 px-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#00B894] rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                              {transaction.propertyName[0] || 'N/A'}
                            </div>
                            <div>
                              <p className="font-semibold text-[#2C3E50] dark:text-gray-2">{transaction.propertyName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{transaction.address}</td>
                        <td className="py-4 px-2 font-semibold text-[#2C3E50] dark:text-gray-2">
                          PKR {transaction.price.toLocaleString()}
                        </td>
                        <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{transaction.buyer}</td>
                        <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{transaction.seller}</td>
                        <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{transaction.date}</td>
                        <td className="py-4 px-2">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F8F5] text-[#27AE60] dark:bg-green-600/20 dark:text-green-400">
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>

                        <td className="py-4 px-2 text-right">
                          <button
                            onClick={() => openModal(transaction)}
                            className="text-[#3498DB] hover:text-[#2980B9] dark:text-blue-400 dark:hover:text-blue-300 transition"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-4 px-2 text-center text-[#34495E] dark:text-gray-4">
                        No completed transactions found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-[#34495E] dark:text-gray-4">
                Showing {startIndex + 1} to {Math.min(startIndex + recordsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg ${currentPage === 1
                    ? 'text-[#A1B1C3] dark:text-gray-5 cursor-not-allowed'
                    : 'text-[#2C3E50] dark:text-gray-2 hover:bg-[#ECF0F1] dark:hover:bg-dark-3'
                    }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === page
                      ? 'bg-[#3498DB] text-white'
                      : 'text-[#34495E] dark:text-gray-3 hover:bg-[#ECF0F1] dark:hover:bg-dark-3'
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg ${currentPage === totalPages
                    ? 'text-[#A1B1C3] dark:text-gray-5 cursor-not-allowed'
                    : 'text-[#2C3E50] dark:text-gray-2 hover:bg-[#ECF0F1] dark:hover:bg-dark-3'
                    }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Transaction Detail */}
      {isModalOpen && selectedTransaction && (
        <div className="fixed inset-0   flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-2 rounded-xl shadow-xl p-6 w-[90%] max-w-lg">
            <h3 className="text-xl font-semibold mb-4 text-[#2C3E50] dark:text-gray-2">
              Transaction Details
            </h3>
            <div className="space-y-2 text-[#34495E] dark:text-gray-3">
              <p><strong>Property:</strong> {selectedTransaction.propertyName}</p>
              <p><strong>Address:</strong> {selectedTransaction.address}</p>
              <p><strong>Buyer:</strong> {selectedTransaction.buyer}</p>
              <p><strong>Seller:</strong> {selectedTransaction.seller}</p>
              <p><strong>Price:</strong> PKR {selectedTransaction.price.toLocaleString()}</p>
              <p><strong>Date:</strong> {selectedTransaction.date}</p>
              <p><strong>Status:</strong> {selectedTransaction.status}</p>


            </div>
            <div className="mt-6 flex justify-end">
              <Button
                onClick={closeModal}
                className="  text-white px-4 py-2 rounded-md   transition"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentDashboardTable;
