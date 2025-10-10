"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Building2, Edit, Trash2, Mail, Phone, MapPin, Eye, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomers, resetPage } from '@/redux/reducers/customerslice/customerSlice';
import SearchInput from '@/common/Input';
import { updateUserByAdmin } from '@/services/user.services';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  address: string | null;
  status: string;
  createdAt: string | null;
  profilePicture: string | null;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  status: string;
}

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<UserProfile>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { customers, pagination, loading, error } = useAppSelector((state) => state.customer || {
    customers: [],
    pagination: null,
    loading: false,
    error: null,
  });

  const itemsPerPage = 20;

  const normalizedCustomers = useMemo(() => {
    const safeCustomers = Array.isArray(customers) ? customers : [];
    return safeCustomers.map((c: any) => {
      const firstName = c.firstName || '';
      const lastName = c.lastName || '';
      const email = c.email || c.emailAddress || '';
      const phoneNumber = c.phoneNumber || c.phoneNumber || c.contact || null;
      const address = c.address || c.primaryAddress || [c.city, c.state, c.country].filter(Boolean).join(', ') || null;
      const status = (c.kycStatus || c.status || 'inactive').toLowerCase();
      const createdAt = c.createdAt || c.dateOfRegistration || c.date || null;
      return {
        id: c._id || c.id,
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        status,
        createdAt,
        profilePicture: c.profilePicture || c.profileImage || c.avatar || c.profileImageUrl || null,
      };
    });
  }, [customers]);

  useEffect(() => {
    dispatch(fetchCustomers({ page: currentPage, limit: itemsPerPage, search: searchTerm, status: filterStatus }));
  }, [dispatch, currentPage, searchTerm, filterStatus]);

  useEffect(() => {
    dispatch(resetPage());
    setCurrentPage(1);
  }, [searchTerm, filterStatus, dispatch]);

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

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewModalOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEditFormData({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phoneNumber: customer.phoneNumber || '',
      address: customer.address || '',
      status: customer.status,
    });
    setIsEditModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedCustomer(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCustomer(null);
    setEditFormData({});
    setSubmitError(null);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await updateUserByAdmin(selectedCustomer.id, editFormData);
      // Update the local customer list to reflect changes immediately
      const updatedCustomer = {
        ...selectedCustomer,
        firstName: editFormData.firstName || selectedCustomer.firstName,
        lastName: editFormData.lastName || selectedCustomer.lastName,
        email: editFormData.email || selectedCustomer.email,
        phoneNumber: editFormData.phoneNumber || selectedCustomer.phoneNumber,
        address: editFormData.address || selectedCustomer.address,
        status: editFormData.status || selectedCustomer.status,
      };
      // Dispatch action to refresh the customer list
      dispatch(fetchCustomers({ page: currentPage, limit: itemsPerPage, search: searchTerm, status: filterStatus }));
      setSelectedCustomer(updatedCustomer); // Update selected customer for view modal
      closeEditModal();
    } catch (error) {
      setSubmitError('Failed to update customer. Please try again.');
      console.error('Update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-6 text-[#34495E] dark:text-gray-4">Loading...</div>;
  if (error) return <div className="p-6 text-red-600 dark:text-red-400">{error}</div>;

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-dark">
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
                    Address
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
                  normalizedCustomers.map((customer: Customer) => (
                    <tr key={customer.id} className="hover:bg-[#ECF0F1] dark:hover:bg-dark-3 transition-colors">
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-3">
                          <img
                            src={customer.profilePicture || '/images/user.png'}
                            alt={`${customer.firstName} ${customer.lastName}` || 'User'}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-[#2C3E50] dark:text-gray-2">
                              {[customer.firstName, customer.lastName].filter(Boolean).join(' ') || customer.email}
                            </p>
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
                            <span>{customer.phoneNumber || '—'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                          <MapPin size={14} className="text-[#34495E] dark:text-gray-3" />
                          <span>{customer.address || '—'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(customer.status)}`}>
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">
                        <span>{customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : '—'}</span>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-1">
                          <button
                            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-dark-4 rounded-lg transition-all duration-200"
                            title="View Details"
                            onClick={() => handleViewDetails(customer)}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-dark-4 rounded-lg transition-all duration-200"
                            title="Edit"
                            onClick={() => handleEdit(customer)}
                          >
                            <Edit size={14} />
                          </button>
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

        {/* View Modal for Customer Details */}
        {isViewModalOpen && selectedCustomer && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-dark-2 rounded-2xl shadow-lg p-6 w-full max-w-lg relative">
              <button
                className="absolute top-4 right-4 text-[#34495E] dark:text-gray-3 hover:text-[#2C3E50] dark:hover:text-gray-2"
                onClick={closeViewModal}
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-semibold text-[#2C3E50] dark:text-gray-2 mb-6">Customer Details</h2>
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={selectedCustomer.profilePicture || '/images/user.png'}
                  alt={`${selectedCustomer.firstName} ${selectedCustomer.lastName}` || 'User'}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-semibold text-[#2C3E50] dark:text-gray-2">
                    {[selectedCustomer.firstName, selectedCustomer.lastName].filter(Boolean).join(' ') || selectedCustomer.email}
                  </p>
                  <p className="text-sm text-[#34495E] dark:text-gray-3">{selectedCustomer.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                  <Mail size={16} className="text-[#34495E] dark:text-gray-3" />
                  <span>Email: {selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                  <Phone size={16} className="text-[#34495E] dark:text-gray-3" />
                  <span>Phone: {selectedCustomer.phoneNumber || '—'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                  <MapPin size={16} className="text-[#34495E] dark:text-gray-3" />
                  <span>Location: {selectedCustomer.address || '—'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedCustomer.status)}`}>
                    Status: {selectedCustomer.status.charAt(0).toUpperCase() + selectedCustomer.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                  <span>Join Date: {selectedCustomer.createdAt ? new Date(selectedCustomer.createdAt).toLocaleDateString() : '—'}</span>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  className="px-4 py-2 bg-[#00B894] text-white rounded-lg hover:bg-[#019077] transition-colors"
                  onClick={closeViewModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal for Customer Details */}
        {isEditModalOpen && selectedCustomer && (
          <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="bg-white dark:bg-dark-2 rounded-2xl shadow-lg p-6 w-full max-w-lg relative">
              <button
                className="absolute top-4 right-4 text-[#34495E] dark:text-gray-3 hover:text-[#2C3E50] dark:hover:text-gray-2"
                onClick={closeEditModal}
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-semibold text-[#2C3E50] dark:text-gray-2 mb-6">Edit Customer</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editFormData.firstName || ''}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editFormData.lastName || ''}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email || ''}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Phone</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={editFormData.phoneNumber || ''}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Location</label>
                  <input
                    type="text"
                    name="address"
                    value={editFormData.address || ''}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                  />
                </div>

                {submitError && (
                  <p className="text-red-600 dark:text-red-400 text-sm">{submitError}</p>
                )}
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 dark:bg-dark-4 text-[#34495E] dark:text-gray-2 rounded-lg hover:bg-gray-400 dark:hover:bg-dark-3 transition-colors"
                    onClick={closeEditModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#00B894] text-white rounded-lg hover:bg-[#019077] transition-colors disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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