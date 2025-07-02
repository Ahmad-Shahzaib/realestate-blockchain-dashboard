"use client";
import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Mail, Phone, MapPin, Star, Plus, Eye, Edit, Trash2 } from 'lucide-react';

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample customer data
  const customers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      status: 'active',
      orders: 24,
      totalSpent: '$3,240',
      joinDate: '2023-01-15',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      location: 'Los Angeles, CA',
      status: 'active',
      orders: 18,
      totalSpent: '$2,890',
      joinDate: '2023-03-22',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'm.chen@email.com',
      phone: '+1 (555) 456-7890',
      location: 'San Francisco, CA',
      status: 'inactive',
      orders: 7,
      totalSpent: '$1,120',
      joinDate: '2023-06-08',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 321-0987',
      location: 'Chicago, IL',
      status: 'active',
      orders: 31,
      totalSpent: '$4,560',
      joinDate: '2022-11-12',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.w@email.com',
      phone: '+1 (555) 654-3210',
      location: 'Miami, FL',
      status: 'pending',
      orders: 2,
      totalSpent: '$340',
      joinDate: '2024-01-05',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@email.com',
      phone: '+1 (555) 789-0123',
      location: 'Seattle, WA',
      status: 'active',
      orders: 15,
      totalSpent: '$2,180',
      joinDate: '2023-08-30',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
    }
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filter/search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusDot = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
              <p className="text-gray-600 mt-1">Manage your customer relationships</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus size={20} />
              Add Customer
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter size={20} />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Contact</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Location</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Orders</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Total Spent</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Join Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={customer.avatar}
                          alt={customer.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{customer.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={14} className="text-gray-400" />
                          <span className="truncate max-w-48">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={14} className="text-gray-400" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={14} className="text-gray-400" />
                        <span>{customer.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
                        <span className={`w-2 h-2 rounded-full mr-1.5 ${getStatusDot(customer.status)}`}></span>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-gray-900">{customer.orders}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-gray-900">{customer.totalSpent}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">{customer.joinDate}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                          <Eye size={14} className="text-gray-500" />
                        </button>
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