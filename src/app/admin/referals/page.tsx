
"use client";

import React, { useEffect, useState } from "react";
import { Building2, Filter, Search, Edit, Trash2 } from "lucide-react";
import Button from "@/common/Button";
import SearchInput from "@/common/Input"; // Assuming the same SearchInput component as in TransactionDetailPage
import ReferralModal from "./ReferralModal";
import { ReferralService } from "@/services/referal.service";

export type Referral = {
    level: number;
    percentage: number;
    description: string;
    status: boolean;
    _id?: string;
};

const ReferralManagement = () => {
    const [openModal, setOpenModal] = useState(false);
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [editingReferral, setEditingReferral] = useState<Referral | null>(null);

    useEffect(() => {
        fetchReferrals();
    }, []);

    const fetchReferrals = async () => {
        setLoading(true);
        try {
            const res = await ReferralService.getReferralCode();
            console.log("Raw API Response:", res);

            const mapped = (res || []).map((r: any) => ({
                level: r.level,
                percentage: r.percentage,
                description: r.description,
                status: r.isActive,
                _id: r._id,
            }));

            setReferrals(mapped);
        } catch (err: any) {
            setError(err.message || "Failed to fetch referrals");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await ReferralService.deleteReferral(id);
            setReferrals(referrals.filter((ref: any) => ref._id !== id));
        } catch (err: any) {
            console.error("Delete failed:", err);
            setError("Failed to delete referral");
        }
    };

    const handleUpdate = async (id: string, data: Partial<Referral>) => {
        try {
            const updated = await ReferralService.updateReferral(id, data);
            setReferrals(referrals.map((ref: any) =>
                ref._id === id ? { ...ref, ...updated } : ref
            ));
            setEditingReferral(null);
        } catch (err: any) {
            console.error("Update failed:", err);
            setError("Failed to update referral");
        }
    };

    const filteredReferrals = referrals.filter((ref) =>
        ref.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterStatus === 'all' || (filterStatus === 'active' && ref.status) || (filterStatus === 'inactive' && !ref.status))
    );

    return (
        <div className="min-h-screen bg-[#F5F7FA] dark:bg-dark">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-[#ECF0F1] dark:bg-dark-2 dark:border-dark-4">
                <div className="mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-[#00B894] p-2 rounded-lg">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-[#2C3E50] dark:text-gray-2">Referral Management</h1>
                                <p className="text-[#34495E] dark:text-gray-4 mt-1">
                                    Manage and configure referral levels and rewards
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setOpenModal(true)}
                            className="px-4 py-2 bg-[#00B894] text-white rounded-lg hover:bg-[#00A07A] transition flex items-center gap-2"
                        >
                            <Edit className="w-4 h-4" />
                            Add Referral
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 dark:bg-dark-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1 max-w-md">
                            <SearchInput
                                placeholder="Search by description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<Search className="h-5 w-5 text-[#34495E] dark:text-gray-3" />}
                            />
                        </div>

                    </div>
                </div>

                {/* Referral Table */}
                <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-dark-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2">
                            Referrals ({filteredReferrals.length})
                        </h2>
                    </div>
                    {loading && <div className="p-6 text-[#34495E] dark:text-gray-4">Loading...</div>}
                    {error && <div className="p-6 text-red-600 dark:text-red-400">{error}</div>}
                    {!loading && !error && (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[#ECF0F1] dark:border-dark-4">
                                        <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                            Level
                                        </th>
                                        <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                            Percentage
                                        </th>
                                        <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                            Description
                                        </th>
                                        <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                            Status
                                        </th>
                                        <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#ECF0F1] dark:divide-dark-4">
                                    {filteredReferrals.length > 0 ? (
                                        filteredReferrals.map((ref: any) => (
                                            <tr
                                                key={ref._id}
                                                className="hover:bg-[#ECF0F1] dark:hover:bg-dark-3 transition-colors"
                                            >
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{ref.level}</td>
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{ref.percentage}%</td>
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{ref.description}</td>
                                                <td className="py-4 px-2">
                                                    <span
                                                        className={`px - 3 py - 1 rounded - full text - xs font - semibold ${ref.status
                                                            ? 'bg-[#E8F8F5] text-[#27AE60] dark:bg-green-600/20 dark:text-green-400'
                                                            : 'bg-[#F5F7FA] text-red-600 dark:bg-dark-3 dark:text-red-400'
                                                            } `}
                                                    >
                                                        {ref.status ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-2">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            aria-label="Edit referral"
                                                            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-dark-4 rounded-lg transition-all duration-200"
                                                            onClick={() => setEditingReferral(ref)}
                                                        >
                                                            <Edit size={14} />
                                                        </button>
                                                        <button
                                                            aria-label="Delete referral"
                                                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-dark-4 rounded-lg transition-all duration-200"
                                                            onClick={() => handleDelete(ref._id)}
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="py-4 px-2 text-center text-[#34495E] dark:text-gray-4">
                                                No referrals found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Modals */}
                {openModal && <ReferralModal onClose={() => setOpenModal(false)} refreshTable={fetchReferrals} />}
                {editingReferral && (
                    <ReferralModal
                        onClose={() => setEditingReferral(null)}
                        referral={editingReferral}
                        onSave={(data: Partial<Referral>) => handleUpdate(editingReferral._id, data)}
                        refreshTable={fetchReferrals}
                    />
                )}
            </div>
        </div>
    );
};

export default ReferralManagement;
