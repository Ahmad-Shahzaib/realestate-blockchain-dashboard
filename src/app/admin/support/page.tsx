"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Building2, Filter, Search } from 'lucide-react';
import Table from '@/common/Table';
import SearchInput from '@/common/Input';
import SupportService, { SupportTicket } from '@/services/support.service';

interface ComponentSupportTicket {
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
    {
        key: 'displayId' as keyof ComponentSupportTicket,
        label: 'Ticket ID',
        render: (row: any) => row.displayId,
    },
    { key: 'title' as keyof ComponentSupportTicket, label: 'Title' },
    { key: 'description' as keyof ComponentSupportTicket, label: 'Description' },
    { key: 'userName' as keyof ComponentSupportTicket, label: 'User Name' },
    { key: 'category' as keyof ComponentSupportTicket, label: 'Category' },
    {
        key: 'priority' as keyof ComponentSupportTicket,
        label: 'Priority',
        render: (row: ComponentSupportTicket) => (
            <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${row.priority === 'high'
                    ? 'bg-[#F5F7FA] text-red-600 dark:bg-dark-3 dark:text-red-400'
                    : row.priority === 'medium'
                        ? 'bg-[#F5F7FA] text-yellow-600 dark:bg-dark-3 dark:text-yellow-400'
                        : 'bg-[#E8F8F5] text-[#27AE60] dark:bg-green-600/20 dark:text-green-400'
                    }`}
            >
                {row.priority.charAt(0).toUpperCase() + row.priority.slice(1)}
            </span>
        ),
    },
    {
        key: 'status' as keyof ComponentSupportTicket,
        label: 'Status',
        render: (row: ComponentSupportTicket) => (
            <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${row.status === 'closed'
                    ? 'bg-[#E8F8F5] text-[#27AE60] dark:bg-green-600/20 dark:text-green-400'
                    : row.status === 'in-progress'
                        ? 'bg-[#F5F7FA] text-yellow-600 dark:bg-dark-3 dark:text-yellow-400'
                        : 'bg-[#F5F7FA] text-[#3498DB] dark:bg-dark-3 dark:text-blue-400'
                    }`}
            >
                {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
            </span>
        ),
    },
    {
        key: 'createdAt' as keyof ComponentSupportTicket,
        label: 'Created At',
        render: (row: ComponentSupportTicket) => new Date(row.createdAt).toLocaleDateString(),
    },
];

const SupportTicketManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [tickets, setTickets] = useState<ComponentSupportTicket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Fetch support tickets on component mount
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setLoading(true);
                const apiTickets = await SupportService.getSupportTickets();

                // Map API response to component's expected ticket format
                const formattedTickets: ComponentSupportTicket[] = apiTickets.map((ticket) => ({
                    id: ticket._id,
                    title: ticket.title,
                    description: ticket.description,
                    status: ticket.status,
                    priority: ticket.priority || 'low', // Default priority if not provided
                    category: ticket.category,
                    userName: ticket.userId, // Assuming userId is used as userName; adjust if needed
                    createdAt: ticket.createdAt,
                    updatedAt: ticket.updatedAt,
                }));

                setTickets(formattedTickets);
                setError(null);
            } catch (err: any) {
                setError('Failed to fetch support tickets. Please try again later.');
                console.error('Error fetching tickets:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const filteredTickets = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();
        return tickets.filter((ticket) => {
            const matchesSearch =
                ticket.title.toLowerCase().includes(term) ||
                ticket.description.toLowerCase().includes(term) ||
                ticket.userName.toLowerCase().includes(term) ||
                ticket.id.toLowerCase().includes(term) ||
                ticket.category.toLowerCase().includes(term);
            const matchesFilter =
                filterStatus === 'all' || ticket.status.toLowerCase() === filterStatus.toLowerCase();
            return matchesSearch && matchesFilter;
        });
    }, [searchTerm, filterStatus, tickets]);

    // Pagination logic
    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
    const startIndex = filteredTickets.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, filteredTickets.length);
    const paginatedTickets = filteredTickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((ticket, index) => ({
        ...ticket,
        displayId: startIndex + index, // Add displayId for sequential ID
    }));

    // Ensure currentPage is within bounds
    useEffect(() => {
        if (totalPages === 0) {
            setCurrentPage(1);
        } else if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    // Reset to first page when search or filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterStatus]);

    return (
        <div className="min-h-screen bg-[#F5F7FA] dark:bg-dark">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-[#ECF0F1] dark:bg-dark-2 dark:border-dark-4">
                <div className="mx-auto px-6 py-6">
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#00B894] p-2 rounded-lg">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#2C3E50] dark:text-gray-2">
                                Support Ticket Management
                            </h1>
                            <p className="text-[#34495E] dark:text-gray-4 mt-1">
                                Manage and view all support ticket records
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 dark:bg-dark-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1 max-w-md">
                            <SearchInput
                                placeholder="Search by title, description, user, ID, or category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<Search className="h-5 w-5 text-[#34495E] dark:text-gray-3" />}
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <Filter className="h-5 w-5 text-[#34495E] dark:text-gray-3" />
                            <div className="flex bg-[#ECF0F1] dark:bg-dark-3 rounded-lg p-1">
                                {['All', 'Open', 'In-progress', 'Closed'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status.toLowerCase())}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterStatus === status.toLowerCase()
                                            ? 'bg-white dark:bg-dark-4 text-[#3498DB] shadow-sm'
                                            : 'text-[#34495E] dark:text-gray-3 hover:text-[#2C3E50] dark:hover:text-gray-2'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Support Ticket Table */}
                <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-dark-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2">
                            Support Tickets ({filteredTickets.length})
                        </h2>
                    </div>
                    {loading ? (
                        <div className="text-center text-[#34495E] dark:text-gray-3">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-red-600 dark:text-red-400">{error}</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table data={paginatedTickets} columns={columns} />
                            {/* Pagination */}
                            {paginatedTickets.length > 0 && (
                                <div className="flex items-center justify-between mt-6">
                                    <p className="text-sm text-[#34495E] dark:text-gray-3">
                                        Showing <span className="font-medium">{startIndex}</span> to <span className="font-medium">{endIndex}</span> of{' '}
                                        <span className="font-medium">{filteredTickets.length}</span> results
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default SupportTicketManagement;