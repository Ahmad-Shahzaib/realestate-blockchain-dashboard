"use client";
import React, { useState } from 'react';
import DynamicTable from "@/components/ui/dynamic-table";
import { Search, Filter, MoreVertical, Mail, Phone, MapPin, Star, Plus, Edit, Trash2 } from 'lucide-react';

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

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Use DynamicTable for reusable table rendering

  return (
    <div className="min-h-screen bg-background text-black">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-background">
                <Star className="h-6 w-6 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-black">Customers</h1>
                <p className="text-black/70 mt-1">Manage your customer relationships</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-background text-black px-6 py-2 rounded-lg font-medium border border-black flex items-center gap-2">
                <Plus size={20} />
                Add Customer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Customer Table (Dynamic & Reusable) */}
        <div className="bg-background rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-black">Customers ({filteredCustomers.length})</h2>
          </div>
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-black/40" size={24} />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">No customers found</h3>
              <p className="text-black/70">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <DynamicTable
              data={filteredCustomers}
              columns={[
                {
                  key: "avatar",
                  label: "Avatar",
                  render: (row) => (
                    <img
                      src={row.avatar}
                      alt={row.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ),
                },
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
                { key: "phone", label: "Phone" },
                { key: "location", label: "Location" },
                {
                  key: "status",
                  label: "Status",
                  render: (row) => (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(row.status)}`}>
                      {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                    </span>
                  ),
                }
              ]}
              actions={(row) => (
                <div className="flex gap-2">
                  <button className="p-2 rounded hover:bg-black/10" title="Edit">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 rounded hover:bg-black/10" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
              itemsPerPage={5}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerList;