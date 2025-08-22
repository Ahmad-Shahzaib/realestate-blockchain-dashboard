"use client"
import React, { useState } from 'react'
import { Building2, MapPin, Calendar, Filter, Search } from 'lucide-react'

const investments = [
  {
    id: 1,
    name: 'Green Valley Estate',
    amount: 10000,
    returns: '8.2%',
    status: 'Active',
    location: 'California, USA',
    type: 'Residential',
    duration: '18 months',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop'
  },
  {
    id: 2,
    name: 'Sunrise Apartments',
    amount: 5000,
    returns: '6.5%',
    status: 'Completed',
    location: 'Texas, USA',
    type: 'Commercial',
    duration: '12 months',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop'
  },
  {
    id: 3,
    name: 'Oceanview Villas',
    amount: 7500,
    returns: '7.8%',
    status: 'Active',
    location: 'Florida, USA',
    type: 'Luxury',
    duration: '24 months',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=200&fit=crop'
  },
  {
    id: 4,
    name: 'Downtown Plaza',
    amount: 12000,
    returns: '9.1%',
    status: 'Active',
    location: 'New York, USA',
    type: 'Commercial',
    duration: '36 months',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop'
  }
]

type Investment = typeof investments[number];

const InvestmentDashboardTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null)

  const filteredInvestments = investments.filter(inv => {
    const matchesSearch = inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
                <h1 className="text-3xl font-bold text-[#2C3E50] dark:text-gray-2">My Investments</h1>
                <p className="text-[#34495E] dark:text-gray-4 mt-1">
                  Manage and monitor all your property investments and performance
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
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#34495E] dark:text-gray-3" />
                <input
                  type="text"
                  placeholder="Search investments by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#ECF0F1] rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-[#3498DB] text-[#34495E] dark:border-dark-4 dark:bg-dark-3 dark:text-gray-2"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-[#34495E] dark:text-gray-3" />
              <div className="flex bg-[#ECF0F1] dark:bg-dark-3 rounded-lg p-1">
                {['All', 'Active', 'Completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${statusFilter === status
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

        {/* Investments Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-dark-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2">
              My Investments ({filteredInvestments.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#ECF0F1] dark:border-dark-4">
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Property
                  </th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Location
                  </th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Investment
                  </th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Returns
                  </th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Duration
                  </th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECF0F1] dark:divide-dark-4">
                {filteredInvestments.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-[#ECF0F1] dark:hover:bg-dark-3 transition-colors"
                  >
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#00B894] rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                          {inv.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-[#2C3E50] dark:text-gray-2">{inv.name}</p>
                          <p className="text-sm text-[#34495E] dark:text-gray-4">{inv.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{inv.location}</td>
                    <td className="py-4 px-2 font-semibold text-[#2C3E50] dark:text-gray-2">
                      ${inv.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 font-semibold text-[#27AE60]">{inv.returns}</td>
                    <td className="py-4 px-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${inv.status === 'Active'
                          ? 'bg-[#E8F8F5] text-[#27AE60] dark:bg-green-600/20 dark:text-green-400'
                          : 'bg-[#F5F7FA] text-[#34495E] dark:bg-dark-3 dark:text-gray-3'
                          }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{inv.duration}</td>
                    <td className="py-4 px-2">
                      <button
                        onClick={() => setSelectedInvestment(inv)}
                        className="bg-[#E8F8F5] dark:bg-dark-3 text-[#3498DB] px-3 py-1 rounded-lg text-sm hover:bg-[#D1F2EB] dark:hover:bg-dark-4 transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Investment Detail Modal */}
        {selectedInvestment && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-dark-2 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 rounded-t-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-[#00B894] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      {selectedInvestment.name[0]}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#2C3E50] dark:text-gray-2">{selectedInvestment.name}</h2>
                      <p className="text-[#34495E] dark:text-gray-3">{selectedInvestment.type}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedInvestment(null)}
                    className="text-[#34495E] dark:text-gray-3 hover:text-[#2C3E50] dark:hover:text-gray-2 text-xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#F5F7FA] dark:bg-dark-3 rounded-lg p-4">
                    <p className="text-sm text-[#34495E] dark:text-gray-3 mb-1">Investment Amount</p>
                    <p className="text-2xl font-bold text-[#2C3E50] dark:text-gray-2">
                      ${selectedInvestment.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-[#F5F7FA] dark:bg-dark-3 rounded-lg p-4">
                    <p className="text-sm text-[#34495E] dark:text-gray-3 mb-1">Returns</p>
                    <p className="text-2xl font-bold text-[#27AE60]">{selectedInvestment.returns}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-gray-2 mb-4">Investment Details</h3>
                  <div className="space-y-3">
                    <div className="bg-[#F5F7FA] dark:bg-dark-3 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[#2C3E50] dark:text-gray-2">{selectedInvestment.name}</h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedInvestment.status === 'Active'
                            ? 'bg-[#E8F8F5] text-[#27AE60] dark:bg-green-600/20 dark:text-green-400'
                            : 'bg-[#F5F7FA] text-[#34495E] dark:bg-dark-3 dark:text-gray-3'
                            }`}
                        >
                          {selectedInvestment.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[#34495E] dark:text-gray-3">
                          Location: <span className="font-semibold">{selectedInvestment.location}</span>
                        </p>
                        <p className="text-[#34495E] dark:text-gray-3">
                          Duration: <span className="font-semibold">{selectedInvestment.duration}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#34495E] dark:text-gray-4">{/* optional details */}</p>
                  <button
                    onClick={() => setSelectedInvestment(null)}
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

  )
}

export default InvestmentDashboardTable