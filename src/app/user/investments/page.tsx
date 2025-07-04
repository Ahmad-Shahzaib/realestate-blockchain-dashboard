"use client"
import React, { useState } from 'react'
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Filter, 
  Search, 
  TrendingUp, 
  Eye, 
  X,
  DollarSign,
  Clock,
  BarChart3,
  ArrowUpRight,
  Star,
  Shield,
  Wallet,
  Activity
} from 'lucide-react'

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
    invested: '2023-01-15',
    currentValue: 11200,
    monthlyReturn: 85,
    riskLevel: 'Low',
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
    invested: '2022-06-10',
    currentValue: 5325,
    monthlyReturn: 45,
    riskLevel: 'Medium',
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
    invested: '2023-03-20',
    currentValue: 8100,
    monthlyReturn: 62,
    riskLevel: 'High',
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
    invested: '2023-02-05',
    currentValue: 13100,
    monthlyReturn: 95,
    riskLevel: 'Medium',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop'
  }
]

type Investment = typeof investments[number];

const FuturisticInvestmentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null)

  const filteredInvestments = investments.filter(inv => {
    const matchesSearch = inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalReturns = totalCurrentValue - totalInvestment
  const averageReturn = ((totalReturns / totalInvestment) * 100).toFixed(1)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Active: { color: "bg-green-500/20 text-green-400 border-green-500/30", icon: Activity },
      Completed: { color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: Shield },
      Pending: { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Clock }
    }
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.Active
  }

  const getRiskBadge = (risk: string) => {
    const riskConfig = {
      Low: { color: "bg-green-500/20 text-green-400 border-green-500/30" },
      Medium: { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      High: { color: "bg-red-500/20 text-red-400 border-red-500/30" }
    }
    return riskConfig[risk as keyof typeof riskConfig] || riskConfig.Medium
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Enhanced Animated Background Elements with Glassmorphism */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large glassmorphism shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-cyan-500/20 rounded-full blur-3xl animate-pulse backdrop-blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-tl from-purple-500/25 via-pink-500/15 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000 backdrop-blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-tr from-cyan-500/20 via-blue-500/15 to-indigo-500/25 rounded-full blur-3xl animate-pulse delay-500 backdrop-blur-3xl"></div>
        
        {/* Additional floating glassmorphism elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/15 rounded-3xl blur-2xl animate-pulse delay-700 backdrop-blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-tl from-purple-400/15 to-cyan-400/10 rounded-3xl blur-2xl animate-pulse delay-1500 backdrop-blur-xl"></div>
        <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-gradient-to-r from-cyan-400/20 to-blue-400/15 rounded-2xl blur-xl animate-pulse delay-300 backdrop-blur-lg"></div>
        
        {/* Floating geometric shapes with glassmorphism */}
        <div className="absolute top-20 left-1/3 w-16 h-16 bg-white/5 backdrop-blur-md rounded-xl rotate-45 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-blue-500/10 backdrop-blur-lg rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-purple-500/15 backdrop-blur-sm rounded-lg rotate-12 animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
        
        {/* Larger ambient glassmorphism layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent backdrop-blur-[2px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-purple-500/3 to-transparent backdrop-blur-[1px] animate-pulse delay-1000" style={{ animationDuration: '10s' }}></div>
      </div>

      {/* Enhanced Grid Pattern Overlay with glassmorphism */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40 backdrop-blur-[0.5px]"></div>
      
      {/* Additional glassmorphism overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 backdrop-blur-[1px]"></div>

      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  My Investments
                </h1>
                <p className="text-slate-400 text-lg">Monitor and manage your blockchain real estate portfolio</p>
              </div>
            </div>
          </div>

          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <DollarSign className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-slate-300 font-medium">Total Invested</span>
              </div>
              <div className="text-2xl font-bold text-white">${totalInvestment.toLocaleString()}</div>
              <div className="text-slate-400 text-sm mt-1">Across {investments.length} properties</div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-slate-300 font-medium">Current Value</span>
              </div>
              <div className="text-2xl font-bold text-white">${totalCurrentValue.toLocaleString()}</div>
              <div className="text-green-400 text-sm mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" />
                +${totalReturns.toLocaleString()}
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-slate-300 font-medium">Avg. Returns</span>
              </div>
              <div className="text-2xl font-bold text-white">{averageReturn}%</div>
              <div className="text-slate-400 text-sm mt-1">Portfolio performance</div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                  <Building2 className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-slate-300 font-medium">Active Projects</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {investments.filter(inv => inv.status === 'Active').length}
              </div>
              <div className="text-slate-400 text-sm mt-1">Currently earning</div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search investments by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Filter className="h-5 w-5 text-slate-400" />
                <div className="flex bg-slate-800/50 rounded-xl p-1">
                  {['All', 'Active', 'Completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${statusFilter === status
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
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
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Investment Portfolio</h2>
                <span className="text-slate-400">({filteredInvestments.length} investments)</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wide">Property</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wide">Investment</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wide">Current Value</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wide">Returns</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wide">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wide">Duration</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {filteredInvestments.map((inv) => {
                    const statusConfig = getStatusBadge(inv.status)
                    const riskConfig = getRiskBadge(inv.riskLevel)
                    
                    return (
                      <tr key={inv.id} className="hover:bg-slate-800/30 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                              {inv.name[0]}
                            </div>
                            <div>
                              <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                                {inv.name}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-slate-400">{inv.type}</span>
                                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${riskConfig.color}`}>
                                  {inv.riskLevel}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3 text-slate-500" />
                                <span className="text-xs text-slate-500">{inv.location}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-white text-lg">${inv.amount.toLocaleString()}</div>
                          <div className="text-slate-400 text-sm">Initial amount</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-green-400 text-lg">${inv.currentValue.toLocaleString()}</div>
                          <div className="text-slate-400 text-sm">
                            +${(inv.currentValue - inv.amount).toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-green-400 text-lg">{inv.returns}</div>
                          <div className="text-slate-400 text-sm">${inv.monthlyReturn}/month</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-2 w-fit ${statusConfig.color}`}>
                            <statusConfig.icon className="w-3 h-3" />
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-white font-medium">{inv.duration}</div>
                          <div className="text-slate-400 text-sm">Since {new Date(inv.invested).toLocaleDateString()}</div>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => setSelectedInvestment(inv)}
                            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Investment Detail Modal */}
          {selectedInvestment && (
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/50 backdrop-blur-sm">
              <div className="bg-background/95 backdrop-blur-xl border border-border rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto text-white">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                        {selectedInvestment.name[0]}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">{selectedInvestment.name}</h2>
                        <p className="text-slate-400 text-lg">{selectedInvestment.type} • {selectedInvestment.location}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedInvestment(null)}
                      className="p-2 hover:bg-background/60 rounded-xl transition-colors"
                    >
                      <X className="w-6 h-6 text-white/60 hover:text-white" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-background/40 rounded-2xl p-6 text-white">
                      <div className="text-slate-400 text-sm mb-2">Initial Investment</div>
                      <div className="text-3xl font-bold text-white">${selectedInvestment.amount.toLocaleString()}</div>
                    </div>
                    <div className="bg-background/40 rounded-2xl p-6 text-white">
                      <div className="text-slate-400 text-sm mb-2">Current Value</div>
                      <div className="text-3xl font-bold text-green-400">${selectedInvestment.currentValue.toLocaleString()}</div>
                    </div>
                    <div className="bg-background/40 rounded-2xl p-6 text-white">
                      <div className="text-slate-400 text-sm mb-2">Total Returns</div>
                      <div className="text-3xl font-bold text-green-400">{selectedInvestment.returns}</div>
                    </div>
                    <div className="bg-background/40 rounded-2xl p-6 text-white">
                      <div className="text-slate-400 text-sm mb-2">Monthly Income</div>
                      <div className="text-3xl font-bold text-blue-400">${selectedInvestment.monthlyReturn}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Investment Overview</h3>
                      <div className="space-y-4">
                        <div className="bg-background/20 rounded-xl p-4 text-white">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400">Property Type</span>
                            <span className="text-white font-semibold">{selectedInvestment.type}</span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400">Risk Level</span>
                            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getRiskBadge(selectedInvestment.riskLevel).color}`}>
                              {selectedInvestment.riskLevel}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400">Duration</span>
                            <span className="text-white font-semibold">{selectedInvestment.duration}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Investment Date</span>
                            <span className="text-white font-semibold">{new Date(selectedInvestment.invested).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Performance Metrics</h3>
                      <div className="space-y-4">
                        <div className="bg-background/20 rounded-xl p-4 text-white">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400">Status</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(selectedInvestment.status).color}`}>
                              {selectedInvestment.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400">Total Profit/Loss</span>
                            <span className="text-green-400 font-semibold">
                              +${(selectedInvestment.currentValue - selectedInvestment.amount).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400">ROI</span>
                            <span className="text-green-400 font-semibold">{selectedInvestment.returns}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Monthly Yield</span>
                            <span className="text-blue-400 font-semibold">${selectedInvestment.monthlyReturn}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-4">
                    <button
                      onClick={() => setSelectedInvestment(null)}
                      className="px-6 py-3 bg-background/70 hover:bg-background/80 text-white rounded-xl transition-all"
                    >
                      Close
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all">
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FuturisticInvestmentDashboard