"use client";

import React from 'react'
import Table from '@/common/Table';

interface SupportTicket {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    category: string;
    userName: string;
    createdAt: string;
    updatedAt: string;
}


const columns = [
    { key: 'id' as keyof SupportTicket, label: 'Ticket ID' },
    { key: 'title' as keyof SupportTicket, label: 'Title' },
    { key: 'description' as keyof SupportTicket, label: 'Description' },
    { key: 'userName' as keyof SupportTicket, label: 'User Name' },
    { key: 'category' as keyof SupportTicket, label: 'Category' },
    { key: 'priority' as keyof SupportTicket, label: 'Priority', render: (row: SupportTicket) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.priority === 'high' ? 'bg-red-100 text-red-800' :
            row.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
        }`}>
            {row.priority.charAt(0).toUpperCase() + row.priority.slice(1)}
        </span>
    ) },
    { key: 'status' as keyof SupportTicket, label: 'Status', render: (row: SupportTicket) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.status === 'closed' ? 'bg-green-100 text-green-800' :
            row.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
        }`}>
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
    ) },
    { key: 'createdAt' as keyof SupportTicket, label: 'Created At', render: (row: SupportTicket) => new Date(row.createdAt).toLocaleDateString() }
];

const dummySupportTickets: SupportTicket[] = [
    {
        id: '1',
        title: 'Login Issue',
        description: 'User unable to log in to the platform',
        status: 'open',
        priority: 'high',
        category: 'Technical',
        userName: 'John Doe',
        createdAt: '2023-09-01T10:00:00Z',
        updatedAt: '2023-09-01T10:00:00Z'
    },
    {
        id: '2',
        title: 'Billing Question',
        description: 'Inquiry about monthly charges',
        status: 'in-progress',
        priority: 'medium',
        category: 'Billing',
        userName: 'Jane Smith',
        createdAt: '2023-09-02T11:00:00Z',
        updatedAt: '2023-09-02T11:00:00Z'
    },
    {
        id: '3',
        title: 'Feature Request',
        description: 'Request for new dashboard feature',
        status: 'closed',
        priority: 'low',
        category: 'General',
        userName: 'Bob Johnson',
        createdAt: '2023-09-03T12:00:00Z',
        updatedAt: '2023-09-03T12:00:00Z'
    }
];

const page = () => {
    return (
        <div className='py-4 px-6'>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Support Tickets</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and view all support ticket records</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <Table data={dummySupportTickets} columns={columns} />
            </div>
        </div>
    )
}

export default page