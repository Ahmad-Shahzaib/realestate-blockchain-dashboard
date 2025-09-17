"use client";

import React from 'react'
import Table from '@/common/Table';

interface Transaction {
    id: string;
    propertyId: string;
    userId: string;
    customerId: string;
    totalPrice: number;
    totalSquareFeet: number;
    status: string;
    type: string;
    paymentSuccess: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    customerName: string;
    projectName: string;
    userName: string;
}

const dummyTransactions: Transaction[] = [
    {
        id: "68c3b2cfcf7bbd74a9dced61",
        propertyId: "68c3af8d544d6d2c0d5116be",
        userId: "68c00f19e793efdf89b70ea4",
        customerId: "68c3b12ee63636836f38076e",
        totalPrice: 175000,
        totalSquareFeet: 200,
        status: "pending",
        type: "chosen",
        paymentSuccess: false,
        createdAt: "2025-09-12T05:42:40.007+00:00",
        updatedAt: "2025-09-12T05:42:40.007+00:00",
        __v: 0,
        customerName: "John Doe",
        projectName: "Luxury Apartments",
        userName: "Admin User"
    },
    {
        id: "68c3b2cfcf7bbd74a9dced62",
        propertyId: "68c3af8d544d6d2c0d5116bf",
        userId: "68c00f19e793efdf89b70ea5",
        customerId: "68c3b12ee63636836f38076f",
        totalPrice: 250000,
        totalSquareFeet: 300,
        status: "completed",
        type: "auction",
        paymentSuccess: true,
        createdAt: "2025-09-10T10:30:00.000+00:00",
        updatedAt: "2025-09-11T14:20:00.000+00:00",
        __v: 0,
        customerName: "Jane Smith",
        projectName: "Commercial Plaza",
        userName: "Manager Bob"
    },
    {
        id: "68c3b2cfcf7bbd74a9dced63",
        propertyId: "68c3af8d544d6d2c0d5116c0",
        userId: "68c00f19e793efdf89b70ea6",
        customerId: "68c3b12ee63636836f380770",
        totalPrice: 320000,
        totalSquareFeet: 400,
        status: "processing",
        type: "direct",
        paymentSuccess: false,
        createdAt: "2025-09-08T08:15:00.000+00:00",
        updatedAt: "2025-09-09T12:45:00.000+00:00",
        __v: 0,
        customerName: "Alice Johnson",
        projectName: "Residential Complex",
        userName: "Agent Carol"
    }
];

const columns = [
    { key: 'id' as keyof Transaction, label: 'Transaction ID' },
    { key: 'customerName' as keyof Transaction, label: 'Customer Name' },
    { key: 'projectName' as keyof Transaction, label: 'Project Name' },
    { key: 'userName' as keyof Transaction, label: 'User Name' },
    { key: 'totalPrice' as keyof Transaction, label: 'Total Price', render: (row: Transaction) => `$${row.totalPrice.toLocaleString()}` },
    { key: 'totalSquareFeet' as keyof Transaction, label: 'Square Feet', render: (row: Transaction) => `${row.totalSquareFeet} sq ft` },
    { key: 'status' as keyof Transaction, label: 'Status', render: (row: Transaction) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.status === 'completed' ? 'bg-green-100 text-green-800' :
            row.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
        }`}>
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
    ) },
    { key: 'type' as keyof Transaction, label: 'Type' },
    { key: 'paymentSuccess' as keyof Transaction, label: 'Payment', render: (row: Transaction) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.paymentSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
            {row.paymentSuccess ? 'Success' : 'Failed'}
        </span>
    ) },
    { key: 'createdAt' as keyof Transaction, label: 'Created At', render: (row: Transaction) => new Date(row.createdAt).toLocaleDateString() }
];

const page = () => {
    return (
        <div className='py-4 px-6'>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transactions</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and view all transaction records</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <Table data={dummyTransactions} columns={columns} />
            </div>
        </div>
    )
}

export default page