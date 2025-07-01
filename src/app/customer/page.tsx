"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCustomers } from "@/redux/reducers/customerSlice";

export default function CustomerListPage() {
  const dispatch = useAppDispatch();
  const { customers, loading, error } = useAppSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No customers found</h3>
      <p className="text-gray-500 max-w-sm mx-auto">Get started by adding your first customer to see them listed here.</p>
    </div>
  );

  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'inactive':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getInitials = (name: string) => {
    return name
      ?.split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2) || '??';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Customer Directory
              </h1>
              <p className="text-gray-600 mt-2">Manage and view all your customers in one place</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                <span className="text-sm text-gray-500">Total Customers</span>
                <div className="text-2xl font-bold text-gray-900">{customers?.length || 0}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : customers && customers.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="col-span-3">ID</div>
                    <div className="col-span-6">Email</div>
                    <div className="col-span-3">Status</div>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {customers.map((customer, idx) => (
                    <div
                      key={customer._id || idx}
                      className="grid grid-cols-12 gap-4 p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
                    >
                      <div className="col-span-3 flex items-center">
                        <span className="text-gray-500 font-mono text-sm">
                          #{customer._id ? String(customer._id).slice(-6) : String(idx + 1).padStart(6, '0')}
                        </span>
                      </div>
                      <div className="col-span-6 flex items-center">
                        <span className="text-gray-600">{customer.email}</span>
                      </div>
                      <div className="col-span-3 flex items-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(customer.accountStatus)}`}>
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            customer.accountStatus?.toLowerCase() === 'active' ? 'bg-emerald-500' :
                            customer.accountStatus?.toLowerCase() === 'inactive' ? 'bg-red-500' :
                            'bg-amber-500'
                          }`}></div>
                          {customer.accountStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {customers.map((customer, idx) => (
                <div
                  key={customer._id || idx}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">ID: #{customer._id ? String(customer._id).slice(-6) : String(idx + 1).padStart(6, '0')}</h3>
                      <p className="text-gray-500 text-sm mt-1">{customer.email}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(customer.accountStatus)}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                        customer.accountStatus?.toLowerCase() === 'active' ? 'bg-emerald-500' :
                        customer.accountStatus?.toLowerCase() === 'inactive' ? 'bg-red-500' :
                        'bg-amber-500'
                      }`}></div>
                      {customer.accountStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
            <EmptyState />
          </div>
        )}
      </div>
    </div>
  );
}