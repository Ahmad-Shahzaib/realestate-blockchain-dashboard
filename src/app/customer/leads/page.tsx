"use client";

import React, { useEffect, useState } from "react";
import { Building2, Search, Filter, ChevronLeft, ChevronRight, Eye, Mail, Phone, Calendar, User } from "lucide-react";
import SearchInput from "@/common/Input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchLeads } from "@/redux/leadsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";


import type { Transaction, Pagination } from '@/redux/leadsSlice';
import Table from '@/common/Table';

const Page = () => {

    const { transactions, loading, error, pagination } = useAppSelector((state) => state.leads);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedLead, setSelectedLead] = useState<Transaction | null>(null);
    const dispatch = useAppDispatch();
    const userInfo: any = useSelector((state: RootState) => state.userInfo);

    console.log("Transactions from Redux:", userInfo);

    // Fetch leads with pagination
    useEffect(() => {
        if (userInfo?.user?._id) {
            dispatch(fetchLeads({ customerId: JSON.parse(userInfo.user._id), page: pagination?.page || 1 }));
        }
        if(userInfo?.user?.id){
            dispatch(fetchLeads({ customerId: JSON.parse(userInfo.user.id), page: pagination?.page || 1 }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, userInfo?.user?._id, pagination?.page, userInfo?.user?.id]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        // Optionally, reset to first page
        // dispatch(fetchLeads({ customerId: userInfo.user._id, page: 1 }));
    };

    // Filter transactions by search and status
    const filteredTransactions = Array.isArray(transactions)
        ? transactions.filter((tx) => {
            const projectName = tx.propertyId?.name || "";
            const userName = `${tx.userId?.firstName || ''} ${tx.userId?.lastName || ''}`.trim();
            const email = tx.userId?.email || "";
            const phone = tx.userId?.phoneNumber || "";
            const status = tx.status || "";
            const search = searchQuery.toLowerCase();
            return (
                (projectName.toLowerCase().includes(search) ||
                    userName.toLowerCase().includes(search) ||
                    email.toLowerCase().includes(search) ||
                    phone.toLowerCase().includes(search)) &&
                (statusFilter === "All" || status === statusFilter)
            );
        })
        : [];

    // Use API pagination
    const totalPages = pagination?.pages || 1;
    const currentPage = pagination?.page || 1;
    const recordsPerPage = pagination?.limit || 8;
    // If API paginates, filteredTransactions is already paginated
    const paginatedLeads = filteredTransactions;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && userInfo?.user?._id) {
            dispatch(fetchLeads({ customerId: userInfo.user._id, page }));
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

    // Define columns for the common Table component
    const columns = [
        {
            key: 'project',
            label: 'Project',
            render: (tx: Transaction) => {
                const projectName = tx.propertyId?.name || "-";
                return (
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#00B894] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {projectName.charAt(0)}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{projectName}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">ID: #{tx.id || tx._id}</p>
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'contact',
            label: 'Contact',
            render: (tx: Transaction) => {
                const userName = `${tx.userId?.firstName || ''} ${tx.userId?.lastName || ''}`.trim();
                const email = tx.userId?.email || "-";
                return (
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">{userName}</p>
                        <div className="flex items-center space-x-3 mt-1">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Mail className="h-4 w-4 mr-1" />
                                <span>{email}</span>
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'details',
            label: 'Details',
            render: (tx: Transaction) => {
                const phone = tx.userId?.phoneNumber || "-";
                return (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{phone}</span>
                    </div>
                );
            },
        },
        {
            key: 'joinDate',
            label: 'Join Date',
            render: (tx: Transaction) => {
                const joinDate = tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : "-";
                return (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{joinDate}</span>
                    </div>
                );
            },
        },
        // {
        //     key: 'status',
        //     label: 'Status',
        //     render: (tx: Transaction) => {
        //         const status = tx.status || "-";
        //         return (
        //             <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
        //                 {status}
        //             </span>
        //         );
        //     },
        // },
        {
            key: 'actions',
            label: 'Actions',
            render: (tx: Transaction) => (
                <button
                    onClick={() => setSelectedLead(tx)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/50 transition-colors duration-150"
                >
                    <Eye className="h-4 w-4 mr-1" /> View
                </button>
            ),
        },
    ];

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
                                {paginatedLeads.length} records
                            </span>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {paginatedLeads.length > 0 ? (
                            <Table
                                data={paginatedLeads.map(tx => ({ ...tx, id: String(tx.id || tx._id) }))}
                                columns={columns as any}
                            />
                        ) : (
                            <div className="py-12 px-6 text-center">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                        <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No leads found</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Try adjusting your search or filter criteria
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Showing <span className="font-medium">{(currentPage - 1) * recordsPerPage + 1}</span> to{" "}
                                <span className="font-medium">
                                    {Math.min(currentPage * recordsPerPage, pagination?.total || 0)}
                                </span>{" "}
                                of <span className="font-medium">{pagination?.total || 0}</span> leads
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
                    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 ">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-[#00B894] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                            {selectedLead.propertyId?.name?.charAt(0) || "-"}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedLead.propertyId?.name || "-"}</h2>
                                            <p className="text-gray-600 dark:text-gray-300">Lead ID: #{selectedLead.id || selectedLead._id}</p>
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
                                                <p className="font-medium text-gray-900 dark:text-white">{`${selectedLead.userId?.firstName || ''} ${selectedLead.userId?.lastName || ''}`.trim()}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                                <div className="flex items-center">
                                                    <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                                                    <p className="font-medium text-gray-900 dark:text-white">{selectedLead.userId?.email || '-'}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                                <div className="flex items-center">
                                                    <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                                                    <p className="font-medium text-gray-900 dark:text-white">{selectedLead.userId?.phoneNumber || '-'}</p>
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
                                                <p className="font-medium text-gray-900 dark:text-white">{selectedLead.propertyId?.name || '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Join Date</p>
                                                <p className="font-medium text-gray-900 dark:text-white">{selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleDateString() : '-'}</p>
                                            </div>
                                            {/* <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedLead.status)}`}>
                                                    {selectedLead.status || '-'}
                                                </span>
                                            </div> */}
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