"use client";

import React, { useState, useEffect } from 'react';
import { EyeIcon, Pencil, Trash2, Users } from 'lucide-react';
import SearchInput from '@/common/Input';
import {
    getUsersInfo,
    updateUserByAdmin,
    deleteUser,
    UserDetails,
    UserProfile,
} from '@/services/user.services';
import { getAxiosInstance } from "@/lib/axios";
import { getRequest } from "@/app/utils/requests";
import Button from '@/common/Button';

interface ComponentUser {
    kycStatus: string;
    id: number | string;
    name: string;
    email: string;
    joinDate: string;
    bankDetails?: string;
    notes?: string;
}

const ManageUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<ComponentUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [editUser, setEditUser] = useState<ComponentUser | null>(null);
    const [editForm, setEditForm] = useState({ firstName: '', lastName: '', email: '', kycStatus: '', notes: '' });
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState<string | null>(null);

    const [viewUser, setViewUser] = useState<UserProfile | null>(null);
    const [viewLoading, setViewLoading] = useState(false);
    const [viewError, setViewError] = useState<string | null>(null);

    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const itemsPerPage = 10; // Matches the API's default limit

    // ✅ Fetch users with pagination and search
    const fetchUsers = async (page: number = 1) => {
        try {
            setLoading(true);
            const response = await getUsersInfo(page, itemsPerPage, searchTerm);

            const formattedUsers: ComponentUser[] = response.data.users.map((user: UserDetails) => ({
                id: user.id || user._id || `user-${Math.random()}`,
                name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown User',
                email: user.email || 'N/A',
                joinDate: user.createdAt || new Date().toISOString(),
                kycStatus: user.kycStatus || 'N/A',
                notes: user.notes || '',
            }));

            setUsers(formattedUsers);
            setTotalPages(response.data.pagination.totalPages);
            setTotalUsers(response.data.pagination.totalUsers);
            setCurrentPage(response.data.pagination.currentPage);
            setError(null);
        } catch (err) {
            setError('Failed to fetch users. Please try again later.');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch single user details
    const fetchUserDetails = async (userId: string | number) => {
        try {
            setViewLoading(true);
            setViewError(null);
            const response = await getRequest(getAxiosInstance('/api'), `/api/admin/users/${userId}?_=${Date.now()}`);
            setViewUser(response.data.user);
        } catch (err) {
            setViewError('Failed to fetch user details. Please try again.');
            console.error('Error fetching user details:', err);
        } finally {
            setViewLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage, searchTerm]);

    // ✅ Open edit modal
    const handleEdit = (user: ComponentUser) => {
        setEditUser(user);
        const [firstName, ...lastNameParts] = user.name.split(' ');
        setEditForm({
            firstName: firstName || '',
            lastName: lastNameParts.join(' ') || '',
            email: user.email || '',
            kycStatus: user.kycStatus || '',
            notes: user.notes || '',
        });
    };

    // ✅ Update user
    const handleUpdate = async () => {
        if (!editUser) return;
        try {
            setEditLoading(true);
            setEditError(null);

            const userData: Partial<UserProfile> = {
                firstName: editForm.firstName,
                lastName: editForm.lastName,
                email: editForm.email,
                kycStatus: editForm.kycStatus,
                notes: editForm.notes,
            };

            await updateUserByAdmin(editUser.id.toString(), userData);

            setUsers(users.map(u =>
                u.id === editUser.id
                    ? { ...u, name: `${editForm.firstName} ${editForm.lastName}`.trim(), email: editForm.email, kycStatus: editForm.kycStatus, notes: editForm.notes }
                    : u
            ));

            setEditUser(null);
        } catch (err) {
            setEditError('Failed to update user. Please try again.');
            console.error('Error updating user:', err);
        } finally {
            setEditLoading(false);
        }
    };

    // ✅ Delete user
    const handleDelete = async (userId: string | number) => {
        const userIdStr = String(userId);
        if (!confirm(`Are you sure you want to delete user with ID ${userIdStr}?`)) return;
        try {
            setDeleteLoading(userIdStr);
            await deleteUser(userIdStr);

            // Refetch users to ensure pagination is updated
            await fetchUsers(currentPage);
            setError(null);
        } catch (err) {
            setError('Failed to delete user. Please try again later.');
            console.error('Error deleting user:', err);
        } finally {
            setDeleteLoading(null);
        }
    };

    const formatDate = (dateString: string | number | Date) =>
        new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div className="min-h-screen bg-[#F5F7FA] dark:bg-dark">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-[#ECF0F1] dark:bg-dark-2 dark:border-dark-4">
                <div className="mx-auto px-6 py-6">
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#00B894] p-2 rounded-lg">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#2C3E50] dark:text-gray-2">FracProp User Management</h1>
                            <p className="text-[#34495E] dark:text-gray-4 mt-1">
                                Manage your FracProp members and permissions
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Search */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 dark:bg-dark-2">
                    <SearchInput
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<Users className="h-5 w-5 text-[#34495E] dark:text-gray-3" />}
                    />
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-dark-2">
                    <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2 mb-6">
                        Users ({totalUsers})
                    </h2>

                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="text-center text-[#34495E] dark:text-gray-3">Loading...</div>
                        ) : error ? (
                            <div className="text-center text-red-600 dark:text-red-400">
                                {error}
                                <button onClick={() => fetchUsers(currentPage)} className="ml-4 px-4 py-2 bg-[#3498DB] text-white rounded-md">
                                    Retry
                                </button>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[#ECF0F1] dark:border-dark-4">
                                        <th className="text-left py-4 px-2">ID</th>
                                        <th className="text-left py-4 px-2">Name</th>
                                        <th className="text-left py-4 px-2">Email</th>
                                        <th className="text-left py-4 px-2">Join Date</th>
                                        <th className="text-left py-4 px-2">Kyc</th>
                                        <th className="text-left py-4 px-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#ECF0F1] dark:divide-dark-4">
                                    {users.length > 0 ? (
                                        users.map((user, index) => (
                                            <tr key={user.id} className="hover:bg-[#ECF0F1] dark:hover:bg-dark-3">
                                                <td className="py-4 px-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                <td className="py-4 px-2">{user.name}</td>
                                                <td className="py-4 px-2">{user.email}</td>
                                                <td className="py-4 px-2">{formatDate(user.joinDate)}</td>
                                                <td className="py-4 px-2">{user.kycStatus}</td>
                                                <td className="py-4 px-2 flex space-x-2">
                                                    <button
                                                        onClick={() => fetchUserDetails(user.id)}
                                                        className="p-2 text-blue-500 hover:text-blue-700"
                                                        disabled={deleteLoading === user.id || viewLoading}
                                                    >
                                                        {viewLoading && viewUser?.id === user.id ? (
                                                            <span className="animate-pulse">Loading...</span>
                                                        ) : (
                                                            <EyeIcon className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                    {
                                                        user.kycStatus.toLowerCase() !== 'not_submitted' && (
                                                            <button
                                                                onClick={() => handleEdit(user)}
                                                                className="p-2 text-green-500 hover:text-green-700"
                                                                disabled={deleteLoading === user.id}
                                                            >
                                                                <Pencil className="w-4 h-4" />
                                                            </button>
                                                        )
                                                    }

                                                    {/* <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="p-2 text-red-500 hover:text-red-700"
                                                        disabled={deleteLoading === user.id}
                                                    >
                                                        {deleteLoading === user.id ? (
                                                            <span className="animate-pulse">Deleting...</span>
                                                        ) : (
                                                            <Trash2 className="w-4 h-4" />
                                                        )}
                                                    </button> */}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="py-4 text-center text-gray-500">
                                                No users found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                        {/* Pagination */}
                        {users.length > 0 && (
                            <div className="flex items-center justify-between mt-6">
                                <p className="text-sm text-[#34495E] dark:text-gray-3">
                                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                                    <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalUsers)}</span> of{' '}
                                    <span className="font-medium">{totalUsers}</span> results
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="px-3 py-2 text-sm border border-[#ECF0F1] dark:border-dark-4 rounded-lg hover:bg-[#ECF0F1] dark:hover:bg-dark-3 disabled:opacity-50 text-[#34495E] dark:text-gray-3"
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i + 1}
                                            className={`px-3 py-2 text-sm rounded-lg ${currentPage === i + 1
                                                ? 'bg-[#00B894] text-white'
                                                : 'border border-[#ECF0F1] dark:border-dark-4 hover:bg-[#ECF0F1] dark:hover:bg-dark-3 text-[#34495E] dark:text-gray-3'
                                                }`}
                                            onClick={() => setCurrentPage(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        className="px-3 py-2 text-sm border border-[#ECF0F1] dark:border-dark-4 rounded-lg hover:bg-[#ECF0F1] dark:hover:bg-dark-3 disabled:opacity-50 text-[#34495E] dark:text-gray-3"
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages || totalPages === 0}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editUser && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-dark-2 rounded-lg p-6 w-1/2">
                        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                        {editError && <div className="text-red-600 mb-4">{editError}</div>}

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <select
                                        value={editForm.kycStatus}
                                        onChange={(e) => setEditForm({ ...editForm, kycStatus: e.target.value })}
                                        className="w-full p-2 border rounded-md"
                                        disabled={editLoading}
                                    >
                                        <option value="approved">Approved</option>
                                        <option value="pending">Pending</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                                {editForm.kycStatus === 'rejected' && (
                                    <div>
                                        <textarea
                                            placeholder="Reason for KYC status change (optional)"
                                            className="w-full p-2 border rounded-md"
                                            disabled={editLoading}
                                            onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                                            value={editForm.notes || ''}


                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-2">
                            <button onClick={() => setEditUser(null)} className="px-4 py-2 bg-gray-200 rounded-md">
                                Cancel
                            </button>
                            <Button
                                onClick={handleUpdate}
                                className="px-4 py-2  text-white rounded-md"
                                disabled={editLoading}
                            >
                                {editLoading ? 'Updating...' : 'Save'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* View User Modal */}
            {viewUser && (
                <div className="fixed inset-0 top-9 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-dark-2 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 w-[60%] max-h-[85vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">User Details</h2>

                        {viewError && (
                            <div className="text-red-600 mb-4 text-center bg-red-100 dark:bg-red-900/40 py-2 rounded-md">
                                {viewError}
                            </div>
                        )}

                        {viewLoading ? (
                            <div className="text-center text-gray-600 dark:text-gray-3 font-medium">
                                Loading user details...
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-y-6 gap-x-12 text-gray-700 dark:text-gray-3">
                                {/* Personal Information Section */}
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                                        <span className="mr-2">👤</span> Personal Information
                                    </h3>
                                    {/* Date of Birth */}
                                    <div>
                                        <p className="text-sm font-semibold">Date of Birth</p>
                                        <p className="mt-1 text-base">{viewUser.createdAt ? formatDate(viewUser.createdAt) : "N/A"}</p>
                                    </div>
                                    {/* Gender */}
                                    <div>
                                        <p className="text-sm font-semibold">Gender</p>
                                        <p className="mt-1 text-base">{viewUser.gender || "N/A"}</p>
                                    </div>
                                    {/* Nationality */}
                                    <div>
                                        <p className="text-sm font-semibold">Nationality</p>
                                        <p className="mt-1 text-base">{viewUser.nationality || "N/A"}</p>
                                    </div>
                                    {/* National ID */}
                                    <div>
                                        <p className="text-sm font-semibold">National ID</p>
                                        <p className="mt-1 text-base">{viewUser.nationalId || "N/A"}</p>
                                    </div>
                                </div>

                                {/* Contact Information Section */}
                                <div>
                                    <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                                        <span className="mr-2">📞</span> Contact Information
                                    </h3>
                                    {/* Email */}
                                    <div>
                                        <p className="text-sm font-semibold">Email</p>
                                        <p className="mt-1 text-base">{viewUser.email || "N/A"}</p>
                                    </div>
                                    {/* Phone Number */}
                                    <div>
                                        <p className="text-sm font-semibold">Phone Number</p>
                                        <p className="mt-1 text-base">{viewUser.phoneNumber || "N/A"}</p>
                                    </div>
                                    {/* Preferred Contact */}
                                    <div>
                                        <p className="text-sm font-semibold">Preferred Contact</p>
                                        <p className="mt-1 text-base">{viewUser.preferredContact || "WhatsApp"}</p>
                                    </div>
                                    {/* Primary Address */}
                                    <div>
                                        <p className="text-sm font-semibold">Primary Address</p>
                                        <p className="mt-1 text-base">{viewUser.primaryAddress || "Consequatur suscipi"}</p>
                                    </div>
                                    {/* Secondary Address */}
                                    <div>
                                        <p className="text-sm font-semibold">Secondary Address</p>
                                        <p className="mt-1 text-base">{viewUser.secondaryAddress || "Labore porro conset"}</p>
                                    </div>
                                </div>



                                {/* ID Card Images */}
                                <div>
                                    <p className="text-sm font-semibold">ID Card Front</p>
                                    <div className="mt-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-3 flex items-center justify-center shadow-md hover:shadow-lg transition-all">
                                        <img
                                            src={viewUser.idCardFront || "/placeholder-front.png"}
                                            alt="ID Card Front"
                                            className="w-full h-44 object-contain rounded-md"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">ID Card Back</p>
                                    <div className="mt-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-3 flex items-center justify-center shadow-md hover:shadow-lg transition-all">
                                        <img
                                            src={viewUser.idCardBack || "/placeholder-back.png"}
                                            alt="ID Card Back"
                                            className="w-full h-44 object-contain rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Close Button */}
                        <div className="mt-8 flex justify-end">
                            <Button

                                onClick={() => setViewUser(null)}
                                className="px-6 py-2.5 rounded-xltext-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ManageUsers;