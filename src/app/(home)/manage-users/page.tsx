import { Metadata } from 'next';
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export const metadata: Metadata = {
    title: "Manage Users",
};

// Mock user data for DAO members (replace with your actual data source)
const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@dao.org', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@dao.org', role: 'Member' },
    { id: 3, name: 'Carol Williams', email: 'carol@dao.org', role: 'Moderator' },
];

const Page = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Manage DAO Users</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 px-4 text-left text-sm font-medium ">ID</th>
                            <th className="py-2 px-4 text-left text-sm font-medium ">Name</th>
                            <th className="py-2 px-4 text-left text-sm font-medium ">Email</th>
                            <th className="py-2 px-4 text-left text-sm font-medium ">Role</th>
                            <th className="py-2 px-4 text-left text-sm font-medium ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 text-sm ">{user.id}</td>
                                <td className="py-2 px-4 text-sm ">{user.name}</td>
                                <td className="py-2 px-4 text-sm ">{user.email}</td>
                                <td className="py-2 px-4 text-sm ">{user.role}</td>
                                <td className="py-2 px-4 text-sm  flex space-x-2">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        aria-label={`Edit user ${user.name}`}
                                    >
                                        <Pencil className="w-5 h-5" />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        aria-label={`Remove user ${user.name}`}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;