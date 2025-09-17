"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, MoreVertical, Mail, Phone, MapPin, Star, Plus, Edit, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomers } from '@/redux/reducers/customerslice/customerSlice';

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const dispatch = useAppDispatch();
  const { customers, loading, error } = useAppSelector((state) => state.customer || { customers: [], loading: false, error: null });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // // derived customers list from store
  // Normalize incoming customers to a predictable shape and memoize
  const normalizedCustomers = useMemo(() => {
    // customers from the store might be an array or an object wrapper { data: { customers: [] } } or { customers: [] }
    const src: any = customers as any;
    const listSource = Array.isArray(src)
      ? src
      : (src && Array.isArray(src.customers))
      ? src.customers
      : (src && src.data && Array.isArray(src.data.customers))
      ? src.data.customers
      : [];

    return (listSource || []).map((c: any) => {
      const name = c.name || [c.firstName, c.lastName].filter(Boolean).join(' ') || c.email || '';
      const email = c.email || c.emailAddress || '';
      const phone = c.phone || c.phoneNumber || c.contact || '';
      const location = c.location || c.primaryAddress || [c.city, c.state, c.country].filter(Boolean).join(', ') || '';
      const statusRaw = (c.status || c.accountStatus || 'inactive');
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

  // derived customers list from store (search + filter)
  const filteredCustomers = useMemo(() => {
    const term = (searchTerm || '').toLowerCase().trim();
    return normalizedCustomers.filter((customer: any) => {
      const name = (customer.name || '').toLowerCase();
      const email = (customer.email || '').toLowerCase();
      const matchesSearch = !term || name.includes(term) || email.includes(term);
      const matchesFilter = filterStatus === 'all' || (customer.status || 'inactive') === filterStatus.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [normalizedCustomers, searchTerm, filterStatus]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  
  // Ensure currentPage is within bounds when filtered data changes
  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  // Compute display indices for "Showing X to Y of Z"
  const startIndex = filteredCustomers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredCustomers.length);

  // Reset to first page when filter/search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  // fetch customers on mount
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
                <p className="text-gray-600 mt-1">Manage your customer relationships</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors flex items-center gap-2">
                <Plus size={20} />
                Add Customer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['all', 'active', 'inactive', 'pending'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterStatus === status
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Customers ({filteredCustomers.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Customer</th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Contact</th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Location</th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Status</th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Join Date</th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(paginatedCustomers as any).map((customer: any) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                          <img
                            src={customer.profilePicture ? (typeof customer.profilePicture === 'string' ? customer.profilePicture : '/images/user.png') : '/images/user.png'}
                            alt={customer.name || 'User'}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        <div>
                          <p className="font-semibold text-gray-900">{customer.name || customer.email}</p>
                          <p className="text-sm text-gray-500">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={14} className="text-gray-400" />
                            <span className="truncate max-w-48">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={14} className="text-gray-400" />
                            <span>{customer.phone || '—'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={14} className="text-gray-400" />
                        <span>{customer.location || '—'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(customer.status)}`}>
                        {(customer.status || 'inactive').charAt(0).toUpperCase() + (customer.status || 'inactive').slice(1)}
                      </span>
                    </td>
                   
                    
                    <td className="py-4 px-2">
                      <span className="text-sm text-gray-600">{customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : '—'}</span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-1">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                          <Edit size={14} className="text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                          <Trash2 size={14} className="text-red-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={14} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginatedCustomers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredCustomers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredCustomers.length)}</span> of{' '}
            <span className="font-medium">{filteredCustomers.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-2 text-sm rounded-lg ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;