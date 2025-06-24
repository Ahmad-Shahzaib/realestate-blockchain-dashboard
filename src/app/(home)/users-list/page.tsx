"use client";
import * as React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Users List</h1>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full  border border-gray-200">
                        <thead>
                            <tr className=" border-b">
                                <th className="py-2 px-4 text-left text-sm font-medium ">ID</th>
                                <th className="py-2 px-4 text-left text-sm font-medium ">Name</th>
                                <th className="py-2 px-4 text-left text-sm font-medium ">Email</th>
                                <th className="py-2 px-4 text-left text-sm font-medium ">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, idx) => (
                                <tr key={user.id || user._id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4 text-sm ">{user.id || user._id || ''}</td>
                                    <td className="py-2 px-4 text-sm ">{user.firstName || user.name || ''} {user.lastName || ''}</td>
                                    <td className="py-2 px-4 text-sm ">{user.email || ''}</td>
                                    <td className="py-2 px-4 text-sm  flex space-x-2">
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            aria-label={`Edit user ${user.firstName || user.name || ''}`}
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setIsEditModalOpen(true);
                                            }}
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            aria-label={`Delete user ${user.firstName || user.name || ''}`}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <EditUserModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={selectedUser}
            />
        </div>
    );
};

export default Page;