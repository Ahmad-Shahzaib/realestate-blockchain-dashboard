"use client"
import React, { useState } from 'react'
import { Building2, TrendingUp, DollarSign, MapPin, Filter, Search } from 'lucide-react'

const investments = [
  {
    id: 1,
    name: 'Green Valley Estate',
    amount: '$10,000',
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
    amount: '$5,000',
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
    amount: '$7,500',
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
    amount: '$12,000',
    returns: '9.1%',
    status: 'Active',
    location: 'New York, USA',
    type: 'Commercial',
    duration: '36 months',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop'
  }
]

type Investment = typeof investments[number];

const PropertyInvestmentDashboard = () => {
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null)

  const totalInvested = investments.reduce((sum, inv) => sum + parseFloat(inv.amount.replace('$', '').replace(',', '')), 0)
  const avgReturns = (investments.reduce((sum, inv) => sum + parseFloat(inv.returns.replace('%', '')), 0) / investments.length).toFixed(1)
  const activeInvestments = investments.filter(inv => inv.status === 'Active').length

  const filteredInvestments = investments.filter(inv => {
    const matchesSearch = inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filter === 'All' || inv.status === filter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-dark dark:via-dark dark:to-dark">
      {/* Header */}
      <div className="bg-white shadow-sm border-b dark:bg-dark dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Investment Portfolio</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Overview of your property investment details and performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-dark rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">My Total Investment</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">${totalInvested.toLocaleString()}</p>
                <p className="text-green-600 text-sm mt-1 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12.3% from last month
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-xl">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">My Avg Returns</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{avgReturns}%</p>
                <p className="text-blue-600 text-sm mt-1">Exceeding expectations</p>
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-3 rounded-xl">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">My Active Properties</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{activeInvestments}</p>
                <p className="text-purple-600 text-sm mt-1">Generating income for you</p>
              </div>
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-xl">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">My Properties</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{investments.length}</p>
                <p className="text-orange-600 text-sm mt-1">Your diversified portfolio</p>
              </div>
              <div className="bg-gradient-to-r from-orange-400 to-red-500 p-3 rounded-xl">
                <MapPin className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-dark rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search investments by name, location, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {['All', 'Active', 'Completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === status
                      ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Investment Details Table */}
        <div className="bg-white dark:bg-dark rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Investment Details ({filteredInvestments.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  {['Property', 'Location', 'Investment', 'Returns', 'Status', 'Duration', 'Actions'].map((head) => (
                    <th key={head} className="text-left py-4 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredInvestments.map((investment) => (
                  <tr key={investment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="py-4 px-2">
                      <div className="flex items-center">
                        <img
                          src={investment.image}
                          alt={investment.name}
                          className="w-12 h-12 rounded-lg mr-3 object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{investment.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{investment.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-gray-600 dark:text-gray-300">{investment.location}</td>
                    <td className="py-4 px-2 font-semibold text-gray-900 dark:text-white">{investment.amount}</td>
                    <td className="py-4 px-2 font-semibold text-green-600">{investment.returns}</td>
                    <td className="py-4 px-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${investment.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                        {investment.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-gray-600 dark:text-gray-300">{investment.duration}</td>
                    <td className="py-4 px-2">
                      <button
                        onClick={() => setSelectedInvestment(investment)}
                        className="bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg text-sm hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
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
          <div className="fixed inset-0 flex items-center justify-center p-4 ">
            <div className="bg-white dark:bg-dark rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-t-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedInvestment.image}
                      alt={selectedInvestment.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedInvestment.name}</h2>
                      <p className="text-gray-600 dark:text-gray-400">{selectedInvestment.type}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedInvestment(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Investment Amount</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedInvestment.amount}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Returns</p>
                    <p className="text-2xl font-bold text-green-600">{selectedInvestment.returns}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Investment Details</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-600 dark:text-gray-300">Location: <span className="font-semibold">{selectedInvestment.location}</span></p>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedInvestment.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                        {selectedInvestment.status}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">Duration: <span className="font-semibold">{selectedInvestment.duration}</span></p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Investment Type: {selectedInvestment.type}</p>
                  <button
                    onClick={() => setSelectedInvestment(null)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors"
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

export default PropertyInvestmentDashboard
