"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Building2, Filter, Search, Eye, Edit2, X } from 'lucide-react';
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

const SupportTicketManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [tickets, setTickets] = useState<ComponentSupportTicket[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTicket, setSelectedTicket] = useState<ComponentSupportTicket | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [newStatus, setNewStatus] = useState('');
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

    const handleViewDetails = (ticket: ComponentSupportTicket) => {
        setSelectedTicket(ticket);
        setShowDetailsModal(true);
    };

    const handleStatusUpdate = (ticket: ComponentSupportTicket) => {
        setSelectedTicket(ticket);
        setNewStatus(ticket.status);
        setShowStatusModal(true);
    };

    const saveStatusUpdate = async () => {
        if (selectedTicket) {
            try {
                // Call the updateSupportTicket API to update the status
                const updatedTicket = await SupportService.updateSupportTicket(selectedTicket.id, {
                    status: newStatus,
                });

                // Update the local state with the updated ticket
                setTickets(tickets.map(t =>
                    t.id === selectedTicket.id
                        ? {
                            ...t,
                            status: updatedTicket.status,
                            updatedAt: updatedTicket.updatedAt,
                        }
                        : t
                ));

                setShowStatusModal(false);
                setSelectedTicket(null);
                setError(null);
            } catch (err: any) {
                setError('Failed to update ticket status. Please try again later.');
                console.error('Error updating ticket status:', err);
            }
        }
    };

    const columns = [
        {
            key: 'displayId' as keyof ComponentSupportTicket,
            label: 'Ticket ID',
            render: (row: any) => row.displayId,
        },
        { key: 'title' as keyof ComponentSupportTicket, label: 'Title' },
        {
            key: 'description' as keyof ComponentSupportTicket, label: 'Description',
            render: (row: ComponentSupportTicket) => (
                <span className="truncate max-w-xs block">{row.description}</span>
            )
        },
        // { key: 'userName' as keyof ComponentSupportTicket, label: 'User Name' },
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
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${row.status === 'closed' || row.status === 'resolved'
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
        {
            key: 'actions' as keyof ComponentSupportTicket,
            label: 'Actions',
            render: (row: ComponentSupportTicket) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleViewDetails(row)}
                        className="p-2 text-[#3498DB] hover:bg-[#F5F7FA] dark:hover:bg-dark-3 rounded-lg transition-colors"
                        title="View Details"
                    >
                        <Eye className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => handleStatusUpdate(row)}
                        className="p-2 text-[#00B894] hover:bg-[#F5F7FA] dark:hover:bg-dark-3 rounded-lg transition-colors"
                        title="Update Status"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    const filteredTickets = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        return tickets.filter((ticket) => {
            // Normalize all fields safely
            const title = ticket?.title?.toLowerCase() || '';
            const desc = ticket?.description?.toLowerCase() || '';
            const user = ticket?.userName?.toLowerCase() || '';
            const id = ticket?.id?.toLowerCase() || '';
            const category = ticket?.category?.toLowerCase() || '';
            const status = ticket?.status?.toLowerCase() || '';

            // Search: checks multiple fields
            const matchesSearch =
                query === '' ||
                title.includes(query) ||
                desc.includes(query) ||
                user.includes(query) ||
                id.includes(query) ||
                category.includes(query) ||
                status.includes(query);

            // Filter: matches by status button
            const matchesFilter =
                filterStatus.toLowerCase() === 'all' || // Show all tickets if "All" is selected
                status === filterStatus.toLowerCase().replace(' ', '-'); // Handle multi-word statuses like "In Progress"

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
                                {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterStatus === status
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
            {/* View Details Modal */}
            {showDetailsModal && selectedTicket && (
                <div className="fixed inset-0 top-9 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-dark-2 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-[#ECF0F1] dark:border-dark-4">
                            <h3 className="text-2xl font-bold text-[#2C3E50] dark:text-gray-2">Ticket Details</h3>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="p-2 hover:bg-[#F5F7FA] dark:hover:bg-dark-3 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5 text-[#34495E] dark:text-gray-3" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-[#34495E] dark:text-gray-3">Ticket ID</label>
                                <p className="text-[#2C3E50] dark:text-gray-2 mt-1">{selectedTicket.id}</p>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-[#34495E] dark:text-gray-3">Title</label>
                                <p className="text-[#2C3E50] dark:text-gray-2 mt-1">{selectedTicket.title}</p>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-[#34495E] dark:text-gray-3">Description</label>
                                <p className="text-[#2C3E50] dark:text-gray-2 mt-1">{selectedTicket.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {/* <div>
                                    <label className="text-sm font-semibold text-[#34495E] dark:text-gray-3">User Name</label>
                                    <p className="text-[#2C3E50] dark:text-gray-2 mt-1">{selectedTicket.userName}</p>
                                </div> */}
                                <div>
                                    <label className="text-sm font-semibold text-[#34495E] dark:text-gray-3">Category</label>
                                    <p className="text-[#2C3E50] dark:text-gray-2 mt-1">{selectedTicket.category}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-[#34495E] dark:text-gray-3">Priority</label>
                                    <p className="mt-1">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedTicket.priority === 'high'
                                            ? 'bg-[#F5F7FA] text-red-600 dark:bg-dark-3 dark:text-red-400'
                                            : selectedTicket.priority === 'medium'
                                                ? 'bg-[#F5F7FA] text-yellow-600 dark:bg-dark-3 dark:text-yellow-400'
                                                : 'bg-[#E8F8F5] text-[#27AE60] dark:bg-green-600/20 dark:text-green-400'
                                            }`}>
                                            {selectedTicket.priority.charAt(0).toUpperCase() + selectedTicket.priority.slice(1)}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-[#34495E] dark:text-gray-3">Status</label>
                                    <p className="mt-1">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedTicket.status === 'closed' || selectedTicket.status === 'resolved'
                                            ? 'bg-[#E8F8F5] text-[#27AE60] dark:bg-green-600/20 dark:text-green-400'
                                            : selectedTicket.status === 'in-progress'
                                                ? 'bg-[#F5F7FA] text-yellow-600 dark:bg-dark-3 dark:text-yellow-400'
                                                : 'bg-[#F5F7FA] text-[#3498DB] dark:bg-dark-3 dark:text-blue-400'
                                            }`}>
                                            {selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-[#34495E] dark:text-gray-3">Created At</label>
                                    <p className="text-[#2C3E50] dark:text-gray-2 mt-1">
                                        {new Date(selectedTicket.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-[#34495E] dark:text-gray-3">Updated At</label>
                                    <p className="text-[#2C3E50] dark:text-gray-2 mt-1">
                                        {new Date(selectedTicket.updatedAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 p-6 border-t border-[#ECF0F1] dark:border-dark-4">
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="px-4 py-2 border border-[#ECF0F1] dark:border-dark-4 rounded-lg text-[#34495E] dark:text-gray-3 hover:bg-[#F5F7FA] dark:hover:bg-dark-3 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Status Modal */}
            {showStatusModal && selectedTicket && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-dark-2 rounded-2xl shadow-xl max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b border-[#ECF0F1] dark:border-dark-4">
                            <h3 className="text-xl font-bold text-[#2C3E50] dark:text-gray-2">Update Status</h3>
                            <button
                                onClick={() => setShowStatusModal(false)}
                                className="p-2 hover:bg-[#F5F7FA] dark:hover:bg-dark-3 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5 text-[#34495E] dark:text-gray-3" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-[#34495E] dark:text-gray-3 block mb-2">
                                    Ticket: {selectedTicket.title}
                                </label>
                                <label className="text-sm font-semibold text-[#34495E] dark:text-gray-3 block mb-2">
                                    Select New Status
                                </label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="w-full px-4 py-2 border border-[#ECF0F1] dark:border-dark-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B894] dark:bg-dark-3 dark:text-gray-2"
                                >
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 p-6 border-t border-[#ECF0F1] dark:border-dark-4">
                            <button
                                onClick={() => setShowStatusModal(false)}
                                className="px-4 py-2 border border-[#ECF0F1] dark:border-dark-4 rounded-lg text-[#34495E] dark:text-gray-3 hover:bg-[#F5F7FA] dark:hover:bg-dark-3 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveStatusUpdate}
                                className="px-4 py-2 bg-[#00B894] text-white rounded-lg hover:bg-[#00A383] transition-colors"
                            >
                                Update Status
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupportTicketManagement;