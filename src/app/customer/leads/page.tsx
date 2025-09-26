"use client";

import React, { useState } from "react";
import { Building2, Search, Filter, ChevronLeft, ChevronRight, Eye, Mail, Phone, Calendar, User } from "lucide-react";
import SearchInput from "@/common/Input";

type Lead = {
    id: number;
    projectName: string;
    userName: string;
    email: string;
    phone: string;
    joinDate: string;
    status: string;
};

const Page = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8;

    const leads: Lead[] = [
        {
            id: 1,
            projectName: "Sunset Villa",
            userName: "Alice Brown",
            email: "alice.brown@example.com",
            phone: "+1 (555) 123-4567",
            joinDate: "2025-08-15",
            status: "Active",
        },
        {
            id: 2,
            projectName: "Downtown Loft",
            userName: "Charlie Davis",
            email: "charlie.davis@example.com",
            phone: "+1 (555) 987-6543",
            joinDate: "2025-09-10",
            status: "Pending",
        },
        {
            id: 3,
            projectName: "Countryside Cottage",
            userName: "David Lee",
            email: "david.lee@example.com",
            phone: "+1 (555) 456-7890",
            joinDate: "2025-07-20",
            status: "Inactive",
        },
        {
            id: 4,
            projectName: "Oceanview Condo",
            userName: "Emma Wilson",
            email: "emma.wilson@example.com",
            phone: "+1 (555) 234-5678",
            joinDate: "2025-06-12",
            status: "Active",
        },
        {
            id: 5,
            projectName: "Mountain Retreat",
            userName: "Frank Miller",
            email: "frank.miller@example.com",
            phone: "+1 (555) 345-6789",
            joinDate: "2025-05-18",
            status: "Pending",
        },
        {
            id: 6,
            projectName: "Urban Penthouse",
            userName: "Grace Taylor",
            email: "grace.taylor@example.com",
            phone: "+1 (555) 456-7890",
            joinDate: "2025-04-22",
            status: "Active",
        },
    ];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const filteredLeads = leads.filter(
        (lead) =>
            (lead.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                lead.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                lead.phone.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (statusFilter === "All" || lead.status === statusFilter)
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredLeads.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedLeads = filteredLeads.slice(startIndex, startIndex + recordsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "Pending":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            case "Inactive":
                return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-[#00B894] p-2 rounded-lg">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-[#2C3E50] dark:text-gray-2">Leads</h1>
                                <p className="text-[#34495E] dark:text-gray-4 mt-1">
                                    View and manage lead records
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex-1 max-w-2xl">
                            <div className="relative">
                                <SearchInput
                                    placeholder="Search by project, name, email, or phone"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    icon={<Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />}
                                    className="pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                />

                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                                <Filter className="h-5 w-5" />
                                <span className="font-medium">Filter:</span>
                            </div>
                            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                                {["All", "Active", "Pending", "Inactive"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${statusFilter === status
                                            ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                                            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leads Table */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Lead Information
                            </h2>
                            <span className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                                {filteredLeads.length} records
                            </span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Project
                                    </th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Details
                                    </th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Join Date
                                    </th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {paginatedLeads.length > 0 ? (
                                    paginatedLeads.map((lead) => (
                                        <tr
                                            key={lead.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                                        >
                                            <td className="py-4 px-6">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 bg-[#00B894] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                                                        {lead.projectName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 dark:text-white">{lead.projectName}</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">ID: #{lead.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{lead.userName}</p>
                                                    <div className="flex items-center space-x-3 mt-1">
                                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                            <Mail className="h-4 w-4 mr-1" />
                                                            <span>{lead.email}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <Phone className="h-4 w-4 mr-2" />
                                                    <span>{lead.phone}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <Calendar className="h-4 w-4 mr-2" />
                                                    <span>{lead.joinDate}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                                                    {lead.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button
                                                    onClick={() => setSelectedLead(lead)}
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/50 transition-colors duration-150"
                                                >
                                                    <Eye className="h-4 w-4 mr-1" /> View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-12 px-6 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                                    <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No leads found</h3>
                                                <p className="text-gray-500 dark:text-gray-400">
                                                    Try adjusting your search or filter criteria
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                                <span className="font-medium">
                                    {Math.min(startIndex + recordsPerPage, filteredLeads.length)}
                                </span>{" "}
                                of <span className="font-medium">{filteredLeads.length}</span> leads
                            </p>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-lg ${currentPage === 1
                                        ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let page;
                                    if (totalPages <= 5) {
                                        page = i + 1;
                                    } else if (currentPage <= 3) {
                                        page = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        page = totalPages - 4 + i;
                                    } else {
                                        page = currentPage - 2 + i;
                                    }
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-10 h-10 rounded-lg ${currentPage === page
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-lg ${currentPage === totalPages
                                        ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Lead Detail Modal */}
                {selectedLead && (
                    <div className="fixed inset-0  flex items-center justify-center p-4 z-50 ">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-[#00B894] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                            {selectedLead.projectName.charAt(0)}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedLead.projectName}</h2>
                                            <p className="text-gray-600 dark:text-gray-300">Lead ID: #{selectedLead.id}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedLead(null)}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-2xl leading-none"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200 dark:border-gray-600">
                                        <div className="flex items-center mb-3">
                                            <User className="h-5 w-5 text-blue-500 mr-2" />
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h3>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                                                <p className="font-medium text-gray-900 dark:text-white">{selectedLead.userName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                                <div className="flex items-center">
                                                    <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                                                    <p className="font-medium text-gray-900 dark:text-white">{selectedLead.email}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                                <div className="flex items-center">
                                                    <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                                                    <p className="font-medium text-gray-900 dark:text-white">{selectedLead.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200 dark:border-gray-600">
                                        <div className="flex items-center mb-3">
                                            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Details</h3>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Project Name</p>
                                                <p className="font-medium text-gray-900 dark:text-white">{selectedLead.projectName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Join Date</p>
                                                <p className="font-medium text-gray-900 dark:text-white">{selectedLead.joinDate}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedLead.status)}`}>
                                                    {selectedLead.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={() => setSelectedLead(null)}
                                        className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors duration-150"
                                    >
                                        Close
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;