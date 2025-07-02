"use client"
import React, { useState } from 'react'
import { Building2, TrendingUp, DollarSign, MapPin, Calendar, Eye, Filter } from 'lucide-react'

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

const PropertyInvestmentDashboard = () => {
  const [filter, setFilter] = useState('All')
  const [view, setView] = useState('grid')

  const totalInvested = investments.reduce((sum, inv) => sum + parseFloat(inv.amount.replace('$', '').replace(',', '')), 0)
  const avgReturns = (investments.reduce((sum, inv) => sum + parseFloat(inv.returns.replace('%', '')), 0) / investments.length).toFixed(1)
  const activeInvestments = investments.filter(inv => inv.status === 'Active').length

  const filteredInvestments = filter === 'All' ? investments : investments.filter(inv => inv.status === filter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className=" mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Investment Portfolio</h1>
                <p className="text-gray-600 mt-1">Overview of your property investment details and performance</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>{view === 'grid' ? 'List View' : 'Grid View'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">My Total Investment</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${totalInvested.toLocaleString()}</p>
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

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">My Avg Returns</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{avgReturns}%</p>
                <p className="text-blue-600 text-sm mt-1">Exceeding expectations</p>
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-3 rounded-xl">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">My Active Properties</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeInvestments}</p>
                <p className="text-purple-600 text-sm mt-1">Generating income for you</p>
              </div>
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-xl">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">My Properties</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{investments.length}</p>
                <p className="text-orange-600 text-sm mt-1">Your diversified portfolio</p>
              </div>
              <div className="bg-gradient-to-r from-orange-400 to-red-500 p-3 rounded-xl">
                <MapPin className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Investment Details</h2>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['All', 'Active', 'Completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === status
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Properties Grid/List */}
          {view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInvestments.map((investment) => (
                <div key={investment.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${investment.status === 'Active'
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}>
                        {investment.status}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium opacity-90">{investment.type}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{investment.name}</h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{investment.location}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Investment</p>
                        <p className="text-lg font-bold text-gray-900">{investment.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Returns</p>
                        <p className="text-lg font-bold text-green-600">{investment.returns}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{investment.duration}</span>
                      </div>
                      <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors">
                        My Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Property</th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Location</th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Investment</th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Returns</th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Status</th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredInvestments.map((investment) => (
                    <tr key={investment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-2">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mr-3"></div>
                          <div>
                            <p className="font-semibold text-gray-900">{investment.name}</p>
                            <p className="text-sm text-gray-500">{investment.type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-gray-600">{investment.location}</td>
                      <td className="py-4 px-2 font-semibold text-gray-900">{investment.amount}</td>
                      <td className="py-4 px-2 font-semibold text-green-600">{investment.returns}</td>
                      <td className="py-4 px-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${investment.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                          }`}>
                          {investment.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-gray-600">{investment.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Performance Chart Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Investment Performance</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">6M</button>
              <button className="px-4 py-2 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">1Y</button>
              <button className="px-4 py-2 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">All</button>
            </div>
          </div>

          <div className="h-64 flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-700 mb-2">Your Investment Growth Chart</p>
              <p className="text-gray-500">Track your personal investment performance and returns over time</p>
              <button className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors">
                View My Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyInvestmentDashboard