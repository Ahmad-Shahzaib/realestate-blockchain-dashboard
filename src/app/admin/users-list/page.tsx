"use client";
import * as React from 'react';
import { Pencil, Trash2, Users, Search, Filter, Mail, UserCheck, Activity } from 'lucide-react';
import { getUsersInfo } from '@/services/user.services';
import EditUserModal from '@/components/EditUserModal';

const Page = () => {
    const [users, setUsers] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState<any>(null);

    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getUsersInfo();
                let usersData = res.data.users;
                if (!Array.isArray(usersData)) {
                    usersData = usersData ? [usersData] : [];
                }
                usersData = usersData.filter(
                    (user: any) => user && (user.id !== undefined || user._id !== undefined)
                );
                setUsers(usersData);
            } catch (err: any) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const LoadingSkeleton = () => (
        <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                        <div className="flex items-center space-x-4 relative z-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full shadow-inner"></div>
                            <div className="flex-1 space-y-3">
                                <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-1/3"></div>
                                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-1/2"></div>
                            </div>
                            <div className="flex space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl shadow-inner"></div>
                                <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl shadow-inner"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const EmptyState = () => (
        <div className="text-center py-20">
            <div className="relative mx-auto w-32 h-32 mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-blue-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
                No users found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                Your user directory is empty. Start building your community by adding your first user to see them listed here.
            </p>
        </div>
    );

    const getInitials = (user: any) => {
        const firstName = user.firstName || user.name || '';
        const lastName = user.lastName || '';
        const name = `${firstName} ${lastName}`.trim();
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2) || '??';
    };

    const getFullName = (user: any) => {
        const firstName = user.firstName || user.name || '';
        const lastName = user.lastName || '';
        return `${firstName} ${lastName}`.trim() || 'Unknown User';
    };

    const getUserId = (user: any) => {
        const id = user.id || user._id || '';
        return typeof id === 'string' && id.length > 8 ? id.slice(-8) : id;
    };

    const getAvatarGradient = (index: number) => {
        const gradients = [
            'from-blue-500 to-cyan-500',
            'from-purple-500 to-pink-500',
            'from-green-500 to-emerald-500',
            'from-orange-500 to-red-500',
            'from-indigo-500 to-purple-500',
            'from-teal-500 to-blue-500',
            'from-rose-500 to-pink-500',
            'from-amber-500 to-orange-500',
        ];
        return gradients[index % gradients.length];
    };

    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f1f5f9\' fill-opacity=\'0.4\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                {/* Enhanced Header Section */}
                <div className="mb-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="mb-8 lg:mb-0">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-600 bg-clip-text text-transparent">
                                        User Management
                                    </h1>
                                    <p className="text-gray-600 mt-1 text-lg">Manage and view all system users</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {/* Enhanced Stats Cards */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/20 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                            <UserCheck className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">Total Users</span>
                                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                {users.length}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/20 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                            <Activity className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">Active</span>
                                            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                                {users.length}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Error State */}
                {error && (
                    <div className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                                    <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-red-800">Error Loading Users</h3>
                                <p className="text-red-700 mt-1">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content */}
                {loading ? (
                    <LoadingSkeleton />
                ) : users && users.length > 0 ? (
                    <>
                        {/* Enhanced Desktop Table View */}
                        <div className="hidden lg:block">
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-indigo-500/5"></div>
                                
                                <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-b border-gray-200/50 relative z-10">
                                    <div className="grid grid-cols-12 gap-6 text-sm font-bold text-gray-700 uppercase tracking-wider">
                                        <div className="col-span-2 flex items-center">
                                            <span className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span>ID</span>
                                            </span>
                                        </div>
                                        <div className="col-span-4 flex items-center">
                                            <span className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                                <span>User</span>
                                            </span>
                                        </div>
                                        <div className="col-span-4 flex items-center">
                                            <span className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                <span>Email</span>
                                            </span>
                                        </div>
                                        <div className="col-span-2 flex items-center">
                                            <span className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span>Actions</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="divide-y divide-gray-100/50 relative z-10">
                                    {users.map((user, idx) => (
                                        <div
                                            key={user.id || user._id}
                                            className="grid grid-cols-12 gap-6 p-8 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 group relative"
                                        >
                                            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            <div className="col-span-2 flex items-center">
                                                <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-2 rounded-xl">
                                                    <span className="text-gray-600 font-mono text-sm font-semibold">
                                                        #{getUserId(user)}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <div className="col-span-4 flex items-center space-x-4">
                                                <div className={`w-12 h-12 bg-gradient-to-br ${getAvatarGradient(idx)} rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white/50 group-hover:scale-110 transition-transform duration-300`}>
                                                    {getInitials(user)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors text-lg">
                                                        {getFullName(user)}
                                                    </div>
                                                    <div className="text-gray-500 text-sm">User Profile</div>
                                                </div>
                                            </div>
                                            
                                            <div className="col-span-4 flex items-center">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                                                        <Mail className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <span className="text-gray-700 font-medium">{user.email || 'No email provided'}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="col-span-2 flex items-center space-x-3">
                                                <button
                                                    className="p-3 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200 group/btn shadow-sm hover:shadow-md"
                                                    aria-label={`Edit user ${getFullName(user)}`}
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setIsEditModalOpen(true);
                                                    }}
                                                >
                                                    <Pencil className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                                </button>
                                                <button
                                                    className="p-3 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 group/btn shadow-sm hover:shadow-md"
                                                    aria-label={`Delete user ${getFullName(user)}`}
                                                >
                                                    <Trash2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Mobile Card View */}
                        <div className="lg:hidden space-y-6">
                            {users.map((user, idx) => (
                                <div
                                    key={user.id || user._id}
                                    className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full -translate-y-10 translate-x-10"></div>
                                    
                                    <div className="flex items-start justify-between mb-6 relative z-10">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-16 h-16 bg-gradient-to-br ${getAvatarGradient(idx)} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-xl ring-4 ring-white/50`}>
                                                {getInitials(user)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-xl mb-1">{getFullName(user)}</h3>
                                                <div className="flex items-center space-x-2">
                                                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 rounded-lg">
                                                        <span className="text-gray-600 text-sm font-mono font-semibold">
                                                            ID: #{getUserId(user)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-6 relative z-10">
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                                            <div className="flex items-center text-gray-700">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                                                    <Mail className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="font-medium">{user.email || 'No email provided'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3 pt-4 border-t border-gray-100 relative z-10">
                                        <button
                                            className="flex-1 flex items-center justify-center px-6 py-3 text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-2xl transition-all duration-200 group/btn font-semibold shadow-sm hover:shadow-md"
                                            aria-label={`Edit user ${getFullName(user)}`}
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setIsEditModalOpen(true);
                                            }}
                                        >
                                            <Pencil className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            className="flex-1 flex items-center justify-center px-6 py-3 text-red-600 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 rounded-2xl transition-all duration-200 group/btn font-semibold shadow-sm hover:shadow-md"
                                            aria-label={`Delete user ${getFullName(user)}`}
                                        >
                                            <Trash2 className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5"></div>
                        <div className="relative z-10">
                            <EmptyState />
                        </div>
                    </div>
                )}

                <EditUserModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    user={selectedUser}
                />
            </div>
        </div>
        </>
    );
};

export default Page;