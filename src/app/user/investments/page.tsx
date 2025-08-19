"use client"
import React, { useState } from 'react'
import DynamicTable, { DynamicTableColumn } from '@/components/ui/dynamic-table'
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* ...existing code... */}
      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-black">
                  My Investments
                </h1>
                <p className="text-black text-lg">Monitor and manage your blockchain real estate portfolio</p>
              </div>
            </div>
          </div>

          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Portfolio Cards - all colors from tailwind.config */}
            <div className="bg-background border-2 border-themebgColor rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-background rounded-lg border-2 border-themebgColor">
                  <DollarSign className="w-5 h-5 text-black" />
                </div>
                <span className="text-black font-medium">Total Invested</span>
              </div>
              <div className="text-2xl font-bold text-black">${totalInvestment.toLocaleString()}</div>
              <div className="text-black text-sm mt-1">Across {investments.length} properties</div>
            </div>

            <div className="bg-background border-2 border-themebgColor rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-background rounded-lg border-2 border-themebgColor">
                  <TrendingUp className="w-5 h-5 text-black" />
                </div>
                <span className="text-black font-medium">Current Value</span>
              </div>
              <div className="text-2xl font-bold text-black">${totalCurrentValue.toLocaleString()}</div>
              <div className="text-black text-sm mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4 text-black" />
                +${totalReturns.toLocaleString()}
              </div>
            </div>

            <div className="bg-background border-2 border-themebgColor rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-background rounded-lg border-2 border-themebgColor">
                  <BarChart3 className="w-5 h-5 text-black" />
                </div>
                <span className="text-black font-medium">Avg. Returns</span>
              </div>
              <div className="text-2xl font-bold text-black">{averageReturn}%</div>
              <div className="text-black text-sm mt-1">Portfolio performance</div>
            </div>

            <div className="bg-background border-2 border-themebgColor rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-background rounded-lg border-2 border-themebgColor">
                  <Building2 className="w-5 h-5 text-black" />
                </div>
                <span className="text-black font-medium">Active Projects</span>
              </div>
              <div className="text-2xl font-bold text-black">
                {investments.filter(inv => inv.status === 'Active').length}
              </div>
              <div className="text-black text-sm mt-1">Currently earning</div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-background  rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
                  <input
                    type="text"
                    placeholder="Search investments by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-background border-2 border-themebgColor rounded-xl text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Filter className="h-5 w-5 text-black" />
                <div className="flex bg-background rounded-xl p-1">
                  {['All', 'Active', 'Completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${statusFilter === status
                        ? 'bg-black text-background shadow-lg'
                        : 'text-black hover:text-background hover:bg-black/10'
                        }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Investments Table - using DynamicTable */}
          <div className="bg-background  rounded-2xl overflow-hidden">
            <div className="p-6 border-b themebgColor">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-black">Investment Portfolio</h2>
                <span className="text-black">({filteredInvestments.length} investments)</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <DynamicTable
                data={filteredInvestments}
                columns={[
                  {
                    key: 'property',
                    label: 'Property',
                    render: (inv) => (
                      <div className="flex items-center gap-4 rounded-xl p-2">
                        <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center text-black font-bold">
                          {inv.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-black">{inv.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-black">{inv.type}</span>
                            <span className="px-2 py-1 rounded-md text-xs font-medium border-2 border-themebgColor text-black">
                              {inv.riskLevel}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3 text-black" />
                            <span className="text-xs text-black">{inv.location}</span>
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: 'amount',
                    label: 'Investment',
                    render: (inv) => (
                      <div className="border-2 border-themebgColor rounded-xl p-2">
                        <div className="font-bold text-black text-lg">${inv.amount.toLocaleString()}</div>
                        <div className="text-black text-sm">Initial amount</div>
                      </div>
                    ),
                  },
                  {
                    key: 'currentValue',
                    label: 'Current Value',
                    render: (inv) => (
                      <div className=" rounded-xl p-2">
                        <div className="font-bold text-black text-lg">${inv.currentValue.toLocaleString()}</div>
                        <div className="text-black text-sm">
                          +${(inv.currentValue - inv.amount).toLocaleString()}
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: 'returns',
                    label: 'Returns',
                    render: (inv) => (
                      <div className=" rounded-xl p-2">
                        <div className="font-bold text-black text-lg">{inv.returns}</div>
                        <div className="text-black text-sm">${inv.monthlyReturn}/month</div>
                      </div>
                    ),
                  },
                  {
                    key: 'status',
                    label: 'Status',
                    render: (inv) => (
                      <span className="px-3 py-1 rounded-full text-xs font-medium border-2 border-themebgColor text-black flex items-center gap-2 w-fit">
                        {inv.status}
                      </span>
                    ),
                  },
                  {
                    key: 'duration',
                    label: 'Duration',
                    render: (inv) => (
                      <div className=" rounded-xl p-2">
                        <div className="text-black font-medium">{inv.duration}</div>
                        <div className="text-black text-sm">Since {new Date(inv.invested).toLocaleDateString()}</div>
                      </div>
                    ),
                  },
                ]}
                actions={(inv) => (
                  <button
                    onClick={() => setSelectedInvestment(inv)}
                    className="bg-black/10 hover:bg-black/20 text-black border-2 border-themebgColor px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                )}
                itemsPerPage={5}
              />
            </div>
          </div>

          {/* Investment Detail Modal */}
          {selectedInvestment && (
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-background/80 backdrop-blur-sm">
              <div className="bg-background border-2 border-themebgColor rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto text-black">
                <div className="p-8 border-2 border-themebgColor rounded-2xl">
                  <div className="flex items-center justify-between mb-8 border-b themebgColor pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-background border-2 border-themebgColor rounded-2xl flex items-center justify-center text-black font-bold text-2xl">
                        {selectedInvestment.name[0]}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-black">{selectedInvestment.name}</h2>
                        <p className="text-black text-lg">{selectedInvestment.type} • {selectedInvestment.location}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedInvestment(null)}
                      className="p-2 hover:bg-background/60 rounded-xl transition-colors border-2 border-themebgColor"
                    >
                      <X className="w-6 h-6 text-black/60 hover:text-black" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-background  rounded-2xl p-6 text-black">
                      <div className="text-black text-sm mb-2">Initial Investment</div>
                      <div className="text-3xl font-bold text-black">${selectedInvestment.amount.toLocaleString()}</div>
                    </div>
                    <div className="bg-background rounded-2xl p-6 text-black">
                      <div className="text-black text-sm mb-2">Current Value</div>
                      <div className="text-3xl font-bold text-black">${selectedInvestment.currentValue.toLocaleString()}</div>
                    </div>
                    <div className="bg-background rounded-2xl p-6 text-black">
                      <div className="text-black text-sm mb-2">Total Returns</div>
                      <div className="text-3xl font-bold text-black">{selectedInvestment.returns}</div>
                    </div>
                    <div className="bg-background rounded-2xl p-6 text-black">
                      <div className="text-black text-sm mb-2">Monthly Income</div>
                      <div className="text-3xl font-bold text-black">${selectedInvestment.monthlyReturn}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-black mb-4">Investment Overview</h3>
                      <div className="space-y-4">
                        <div className="bg-background  rounded-xl p-4 text-black">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-black">Property Type</span>
                            <span className="text-black font-semibold">{selectedInvestment.type}</span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-black">Risk Level</span>
                            <span className={`px-2 py-1 rounded-md text-xs font-medium  text-black`}>
                              {selectedInvestment.riskLevel}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-black">Duration</span>
                            <span className="text-black font-semibold">{selectedInvestment.duration}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-black">Investment Date</span>
                            <span className="text-black font-semibold">{new Date(selectedInvestment.invested).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-black mb-4">Performance Metrics</h3>
                      <div className="space-y-4">
                        <div className="bg-background border border-themebgColor rounded-xl p-4 text-black">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-black">Status</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border-2 border-themebgColor text-black`}>
                              {selectedInvestment.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-black">Total Profit/Loss</span>
                            <span className="text-black font-semibold">
                              +${(selectedInvestment.currentValue - selectedInvestment.amount).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-black">ROI</span>
                            <span className="text-black font-semibold">{selectedInvestment.returns}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-black">Monthly Yield</span>
                            <span className="text-black font-semibold">${selectedInvestment.monthlyReturn}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-4">
                    <button
                      onClick={() => setSelectedInvestment(null)}
                      className="px-6 py-3 bg-background hover:bg-background/80 text-black rounded-xl transition-all border-2 border-themebgColor"
                    >
                      Close
                    </button>
                    <button className="px-6 py-3 bg-black hover:bg-black/80 text-background rounded-xl font-semibold transition-all border-2 border-themebgColor">
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