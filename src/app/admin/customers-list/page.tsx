"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Building2, Edit, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomers, resetPage } from '@/redux/reducers/customerslice/customerSlice';
import SearchInput from '@/common/Input';

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();
  const { customers, pagination, loading, error } = useAppSelector((state) => state.customer || {
    customers: [],
    pagination: null,
    loading: false,
    error: null,
  });

  const itemsPerPage = 20; // Matches API's default limit

  // Normalize incoming customers to a predictable shape and memoize
  const normalizedCustomers = useMemo(() => {
    const safeCustomers = Array.isArray(customers) ? customers : [];
    return safeCustomers.map((c: any) => {
      const name = c.name || [c.firstName, c.lastName].filter(Boolean).join(' ') || c.email || '';
      const email = c.email || c.emailAddress || '';
      const phone = c.phone || c.phoneNumber || c.contact || '';
      const location = c.location || c.primaryAddress || [c.city, c.state, c.country].filter(Boolean).join(', ') || '';
      const statusRaw = c.status || c.accountStatus || c.kycStatus || 'inactive';
      const status = typeof statusRaw === 'string' ? statusRaw.toLowerCase() : String(statusRaw).toLowerCase();
      const createdAt = c.createdAt || c.dateOfRegistration || c.date || null;
      return {
        ...c,
        id: c._id || c.id,
        name,
        email,
        phone,
        location,
        status,
        createdAt,
        profilePicture: c.profilePicture || c.profileImage || c.avatar || c.profileImageUrl || null,
      };
    });
  }, [customers]);

  // Fetch customers when page, search, or filter changes
  useEffect(() => {
    dispatch(fetchCustomers({ page: currentPage, limit: itemsPerPage, search: searchTerm, status: filterStatus }));
  }, [dispatch, currentPage, searchTerm, filterStatus]);

  // Reset page to 1 when search or filter changes
  useEffect(() => {
    dispatch(resetPage());
    setCurrentPage(1);
  }, [searchTerm, filterStatus, dispatch]);

  // Ensure currentPage is within bounds
  useEffect(() => {
    if (pagination && currentPage > pagination.pages && pagination.pages > 0) {
      setCurrentPage(pagination.pages);
    }
  }, [pagination, currentPage]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
        return 'bg-[#E8F8F5] text-[#27AE60] dark:bg-green-600/20 dark:text-green-400';
      case 'inactive':
      case 'rejected':
        return 'bg-[#F5F7FA] text-red-600 dark:bg-dark-3 dark:text-red-400';
      case 'pending':
        return 'bg-[#F5F7FA] text-[#3498DB] dark:bg-dark-3 dark:text-blue-400';
      default:
        return 'bg-[#F5F7FA] text-gray-600 dark:bg-dark-3 dark:text-gray-400';
    }
  };

  if (loading) return <div className="p-6 text-[#34495E] dark:text-gray-4">Loading...</div>;
  if (error) return <div className="p-6 text-red-600 dark:text-red-400">{error}</div>;

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
              <h1 className="text-3xl font-bold text-[#2C3E50] dark:text-gray-2">Customer Management</h1>
              <p className="text-[#34495E] dark:text-gray-4 mt-1">Manage and monitor all customer records</p>
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
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-5 w-5 text-[#34495E] dark:text-gray-3" />}
              />
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-[#34495E] dark:text-gray-3" />
              <div className="flex bg-[#ECF0F1] dark:bg-dark-3 rounded-lg p-1">
                {['All', 'Active', 'Pending', 'Inactive'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status.toLowerCase())}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterStatus === status.toLowerCase()
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

        {/* Customer Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-dark-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2">
              Customers ({pagination?.total || 0})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#ECF0F1] dark:border-dark-4">
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Customer
                  </th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Contact
                  </th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Location
                  </th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Join Date
                  </th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECF0F1] dark:divide-dark-4">
                {normalizedCustomers.length > 0 ? (
                  normalizedCustomers.map((customer: any, index: number) => (
                    <tr key={customer.id} className="hover:bg-[#ECF0F1] dark:hover:bg-dark-3 transition-colors">
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-3">
                          <img
                            src={
                              customer.profilePicture
                                ? typeof customer.profilePicture === 'string'
                                  ? customer.profilePicture
                                  : '/images/user.png'
                                : '/images/user.png'
                            }
                            alt={customer.name || 'User'}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-[#2C3E50] dark:text-gray-2">{customer.name || customer.email}</p>
                            <p className="text-sm text-[#34495E] dark:text-gray-3">{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                            <Mail size={14} className="text-[#34495E] dark:text-gray-3" />
                            <span className="truncate max-w-48">{customer.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                            <Phone size={14} className="text-[#34495E] dark:text-gray-3" />
                            <span>{customer.phone || '—'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                          <MapPin size={14} className="text-[#34495E] dark:text-gray-3" />
                          <span>{customer.location || '—'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(customer.status)}`}>
                          {(customer.status || 'inactive').charAt(0).toUpperCase() + (customer.status || 'inactive').slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">
                        <span>{customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : '—'}</span>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-1">
                          <button
                            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-dark-4 rounded-lg transition-all duration-200"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          {/* Uncomment when delete functionality is implemented */}
                          {/* <button
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-dark-4 rounded-lg transition-all duration-200"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-4 px-2 text-center text-[#34495E] dark:text-gray-4">
                      No customers found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {pagination && pagination.total > 0 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-[#34495E] dark:text-gray-3">
              Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
              <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of{' '}
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
                    ? 'bg-[#00B894] text-white'
                    : 'border border-[#ECF0F1] dark:border-dark-4 hover:bg-[#ECF0F1] dark:hover:bg-dark-3 text-[#34495E] dark:text-gray-3'
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
    </div>
  );
};

export default CustomerList;