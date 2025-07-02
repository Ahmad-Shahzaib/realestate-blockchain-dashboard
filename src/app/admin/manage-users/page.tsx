import { Metadata } from 'next';
import React from 'react';
import { Pencil, Trash2, Shield, Users, Crown, UserCheck } from 'lucide-react';

export const metadata: Metadata = {
    title: "Manage Users",
};

// Mock user data for DAO members (replace with your actual data source)
const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@dao.org', role: 'Admin', status: 'Active', joinDate: '2023-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@dao.org', role: 'Member', status: 'Active', joinDate: '2023-02-20' },
    { id: 3, name: 'Carol Williams', email: 'carol@dao.org', role: 'Moderator', status: 'Active', joinDate: '2023-01-28' },
    { id: 4, name: 'David Brown', email: 'david@dao.org', role: 'Member', status: 'Inactive', joinDate: '2023-03-10' },
];

const Page = () => {
    const getRoleIcon = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return <Crown className="w-4 h-4" />;
            case 'moderator':
                return <Shield className="w-4 h-4" />;
            case 'member':
                return <UserCheck className="w-4 h-4" />;
            default:
                return <Users className="w-4 h-4" />;
        }
    };

    const getRoleColor = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'moderator':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'member':
                return 'bg-green-50 text-green-700 border-green-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getStatusColor = (status: string) => {
        return status.toLowerCase() === 'active' 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-red-50 text-red-700 border-red-200';
    };

    const getInitials = (name: string) => {
        return name
            ?.split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2) || '??';
    };

    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    const getAvatarColor = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return 'from-purple-500 to-indigo-600';
            case 'moderator':
                return 'from-blue-500 to-cyan-600';
            case 'member':
                return 'from-green-500 to-emerald-600';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    const roleStats = {
        admin: users.filter(u => u.role.toLowerCase() === 'admin').length,
        moderator: users.filter(u => u.role.toLowerCase() === 'moderator').length,
        member: users.filter(u => u.role.toLowerCase() === 'member').length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="mb-6 lg:mb-0">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                DAO User Management
                            </h1>
                            <p className="text-gray-600 mt-2">Manage your DAO members, roles, and permissions</p>
                        </div>
                        
                        {/* Stats Cards */}
                        <div className="flex flex-wrap gap-4">
                            <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200 min-w-[120px]">
                                <div className="flex items-center space-x-2">
                                    <Crown className="w-5 h-5 text-purple-600" />
                                    <div>
                                        <div className="text-sm text-gray-500">Admins</div>
                                        <div className="text-xl font-bold text-gray-900">{roleStats.admin}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200 min-w-[120px]">
                                <div className="flex items-center space-x-2">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <div className="text-sm text-gray-500">Moderators</div>
                                        <div className="text-xl font-bold text-gray-900">{roleStats.moderator}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200 min-w-[120px]">
                                <div className="flex items-center space-x-2">
                                    <UserCheck className="w-5 h-5 text-green-600" />
                                    <div>
                                        <div className="text-sm text-gray-500">Members</div>
                                        <div className="text-xl font-bold text-gray-900">{roleStats.member}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                            <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                <div className="col-span-1">ID</div>
                                <div className="col-span-3">User</div>
                                <div className="col-span-3">Email</div>
                                <div className="col-span-2">Role</div>
                                <div className="col-span-1">Status</div>
                                <div className="col-span-2">Actions</div>
                            </div>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className="grid grid-cols-12 gap-4 p-6 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200 group"
                                >
                                    <div className="col-span-1 flex items-center">
                                        <span className="text-gray-500 font-mono text-sm">
                                            #{String(user.id).padStart(3, '0')}
                                        </span>
                                    </div>
                                    <div className="col-span-3 flex items-center space-x-3">
                                        <div className={`w-10 h-10 bg-gradient-to-br ${getAvatarColor(user.role)} rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg`}>
                                            {getInitials(user.name)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                                                {user.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Joined {formatDate(user.joinDate)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-3 flex items-center">
                                        <span className="text-gray-600">{user.email}</span>
                                    </div>
                                    <div className="col-span-2 flex items-center">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getRoleColor(user.role)}`}>
                                            {getRoleIcon(user.role)}
                                            <span className="ml-1">{user.role}</span>
                                        </span>
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(user.status)}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                                                user.status.toLowerCase() === 'active' ? 'bg-emerald-500' : 'bg-red-500'
                                            }`}></div>
                                            {user.status}
                                        </span>
                                    </div>
                                    <div className="col-span-2 flex items-center space-x-2">
                                        <button
                                            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group/btn"
                                            aria-label={`Edit user ${user.name}`}
                                        >
                                            <Pencil className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                        <button
                                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 group/btn"
                                            aria-label={`Remove user ${user.name}`}
                                        >
                                            <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-4">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${getAvatarColor(user.role)} rounded-full flex items-center justify-center text-white font-semibold shadow-lg`}>
                                        {getInitials(user.name)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">{user.name}</h3>
                                        <p className="text-gray-500 text-sm">
                                            ID: #{String(user.id).padStart(3, '0')} • Joined {formatDate(user.joinDate)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getRoleColor(user.role)}`}>
                                        {getRoleIcon(user.role)}
                                        <span className="ml-1">{user.role}</span>
                                    </span>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(user.status)}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                                            user.status.toLowerCase() === 'active' ? 'bg-emerald-500' : 'bg-red-500'
                                        }`}></div>
                                        {user.status}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <div className="flex items-center text-gray-600 mb-2">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm">{user.email}</span>
                                </div>
                            </div>

                            <div className="flex space-x-2 pt-4 border-t border-gray-100">
                                <button
                                    className="flex-1 flex items-center justify-center px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 group/btn"
                                    aria-label={`Edit user ${user.name}`}
                                >
                                    <Pencil className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                    <span className="text-sm font-medium">Edit</span>
                                </button>
                                <button
                                    className="flex-1 flex items-center justify-center px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 group/btn"
                                    aria-label={`Remove user ${user.name}`}
                                >
                                    <Trash2 className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                    <span className="text-sm font-medium">Remove</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;