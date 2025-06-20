import { Metadata } from 'next';
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export const metadata: Metadata = {
    title: "Users List",
};

// Mock user data (replace with your actual data source)
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

const Page = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Users List</h1>
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
                        {users.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 text-sm ">{user.id}</td>
                                <td className="py-2 px-4 text-sm ">{user.name}</td>
                                <td className="py-2 px-4 text-sm ">{user.email}</td>
                                <td className="py-2 px-4 text-sm  flex space-x-2">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        aria-label={`Edit user ${user.name}`}
                                    >
                                        <Pencil className="w-5 h-5" />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        aria-label={`Delete user ${user.name}`}
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