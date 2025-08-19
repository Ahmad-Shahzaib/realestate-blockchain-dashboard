"use client"
import React, { useState } from 'react'
import { Users, Building2, Mail, TrendingUp, Search, Filter, MoreVertical, MapPin, DollarSign } from 'lucide-react'

// Enhanced mock data for users and their property investments
const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'AJ',
    totalInvestment: 25000,
    returns: '8.5%',
    status: 'Active',
    joinDate: '2023-01-15',
    projects: [
      { id: 101, name: 'Green Valley Apartments', amount: 15000, returns: '7.2%', status: 'Active' },
      { id: 102, name: 'Sunset Villas', amount: 10000, returns: '9.8%', status: 'Completed' },
    ],
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'BS',
    totalInvestment: 18000,
    returns: '7.3%',
    status: 'Active',
    joinDate: '2023-03-22',
    projects: [
      { id: 103, name: 'Downtown Lofts', amount: 18000, returns: '7.3%', status: 'Active' },
    ],
  },
  {
    id: 3,
    name: 'Carol Lee',
    email: 'carol@example.com',
    avatar: 'CL',
    totalInvestment: 32000,
    returns: '8.9%',
    status: 'Active',
    joinDate: '2022-11-08',
    projects: [
      { id: 101, name: 'Green Valley Apartments', amount: 12000, returns: '7.2%', status: 'Active' },
      { id: 104, name: 'Oceanview Condos', amount: 20000, returns: '10.1%', status: 'Active' },
    ],
  },
  {
    id: 4,
    name: 'David Chen',
    email: 'david@example.com',
    avatar: 'DC',
    totalInvestment: 45000,
    returns: '9.2%',
    status: 'Premium',
    joinDate: '2022-08-12',
    projects: [
      { id: 105, name: 'Luxury Towers', amount: 25000, returns: '8.8%', status: 'Active' },
      { id: 106, name: 'Riverside Plaza', amount: 20000, returns: '9.6%', status: 'Active' },
    ],
  },
  {
    id: 5,
    name: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: 'EW',
    totalInvestment: 15000,
    returns: '6.8%',
    status: 'Active',
    joinDate: '2023-05-10',
    projects: [
      { id: 107, name: 'Garden Heights', amount: 15000, returns: '6.8%', status: 'Active' },
    ],
  },
]

type User = typeof users[number];

const UsersInvestmentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const totalUsers = users.length
  const totalInvestment = users.reduce((sum, user) => sum + user.totalInvestment, 0)
  const avgReturns = (users.reduce((sum, user) => sum + parseFloat(user.returns), 0) / users.length).toFixed(1)
  const activeUsers = users.filter(user => user.status === 'Active' || user.status === 'Premium').length

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-background/90 shadow-sm border-border">
        <div className=" mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Users Investment Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage and monitor all user investments and performance</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* View toggle button removed */}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter */}
        <div className="bg-background/80 rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['All', 'Active', 'Premium'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${statusFilter === status
                      ? 'bg-background text-blue-400 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Users Display */}
        <div className="bg-background/80 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Investment Users ({filteredUsers.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">User</th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Investment</th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Returns</th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Status</th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Projects</th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 font-semibold text-gray-900">${user.totalInvestment.toLocaleString()}</td>
                    <td className="py-4 px-2 font-semibold text-green-600">{user.returns}</td>
                    <td className="py-4 px-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === 'Premium'
                        ? 'bg-purple-100 text-purple-800'
                        : user.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                        }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="space-y-1">
                        {user.projects.slice(0, 2).map((project) => (
                          <div key={project.id} className="text-sm text-gray-700">
                            {project.name}
                          </div>
                        ))}
                        {user.projects.length > 2 && (
                          <p className="text-xs text-blue-600">+{user.projects.length - 2} more</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm hover:bg-blue-100 transition-colors"
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

        {/* User Detail Modal */}
        {selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-background/90 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white">
              <div className="p-6 bg-gray-100 rounded-t-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {selectedUser.avatar}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h2>
                      <p className="text-gray-600">{selectedUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Total Investment</p>
                    <p className="text-2xl font-bold text-gray-900">${selectedUser.totalInvestment.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Average Returns</p>
                    <p className="text-2xl font-bold text-green-600">{selectedUser.returns}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Projects</h3>
                  <div className="space-y-3">
                    {selectedUser.projects.map((project) => (
                      <div key={project.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{project.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${project.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                            }`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600">Amount: <span className="font-semibold">${project.amount.toLocaleString()}</span></p>
                          <p className="text-green-600 font-semibold">{project.returns} returns</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Member since: {new Date(selectedUser.joinDate).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => setSelectedUser(null)}
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

export default UsersInvestmentDashboard