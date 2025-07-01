"use client";
import * as React from 'react';
import { Pencil, Trash2, Users, Search, Filter } from 'lucide-react';
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
                            <div className="flex space-x-2">
                                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const EmptyState = () => (
        <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500 max-w-sm mx-auto">Get started by adding your first user to see them listed here.</p>
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="mb-6 lg:mb-0">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                User Management
                            </h1>
                            <p className="text-gray-600 mt-2">Manage and view all system users</p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                                <span className="text-sm text-gray-500">Total Users</span>
                                <div className="text-2xl font-bold text-gray-900">{users.length}</div>
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
                ) : users && users.length > 0 ? (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden lg:block">
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                                    <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        <div className="col-span-2">ID</div>
                                        <div className="col-span-4">User</div>
                                        <div className="col-span-4">Email</div>
                                        <div className="col-span-2">Actions</div>
                                    </div>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {users.map((user, idx) => (
                                        <div
                                            key={user.id || user._id}
                                            className="grid grid-cols-12 gap-4 p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
                                        >
                                            <div className="col-span-2 flex items-center">
                                                <span className="text-gray-500 font-mono text-sm">
                                                    #{getUserId(user)}
                                                </span>
                                            </div>
                                            <div className="col-span-4 flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                                                    {getInitials(user)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                                        {getFullName(user)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-4 flex items-center">
                                                <span className="text-gray-600">{user.email || 'No email provided'}</span>
                                            </div>
                                            <div className="col-span-2 flex items-center space-x-2">
                                                <button
                                                    className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group/btn"
                                                    aria-label={`Edit user ${getFullName(user)}`}
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setIsEditModalOpen(true);
                                                    }}
                                                >
                                                    <Pencil className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                </button>
                                                <button
                                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 group/btn"
                                                    aria-label={`Delete user ${getFullName(user)}`}
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
                            {users.map((user, idx) => (
                                <div
                                    key={user.id || user._id}
                                    className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                                                {getInitials(user)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-lg">{getFullName(user)}</h3>
                                                <p className="text-gray-500 text-sm">
                                                    ID: #{getUserId(user)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm">{user.email || 'No email provided'}</span>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2 pt-4 border-t border-gray-100">
                                        <button
                                            className="flex-1 flex items-center justify-center px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 group/btn"
                                            aria-label={`Edit user ${getFullName(user)}`}
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setIsEditModalOpen(true);
                                            }}
                                        >
                                            <Pencil className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                            <span className="text-sm font-medium">Edit</span>
                                        </button>
                                        <button
                                            className="flex-1 flex items-center justify-center px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 group/btn"
                                            aria-label={`Delete user ${getFullName(user)}`}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                            <span className="text-sm font-medium">Delete</span>
                                        </button>
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

                <EditUserModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    user={selectedUser}
                />
            </div>
        </div>
    );
};

export default Page;