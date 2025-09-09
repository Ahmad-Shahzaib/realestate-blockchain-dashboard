"use client";
import React, { useEffect, useState } from "react";
import Button from "@/common/Button";
import ReferralModal from "./ReferralModal";
import { ReferralService } from "@/services/referal.service";

export type Referral = {
    level: number;
    percentage: number;
    description: string;
    status: boolean;
};

const Page = () => {
    const [openModal, setOpenModal] = useState(false);
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReferrals = async () => {
            setLoading(true);
            try {
                const res = await ReferralService.getReferralCode();
                console.log("Raw API Response:", res);

                // ✅ use res directly (it’s already an array)
                const mapped = (res || []).map((r: any) => ({
                    level: r.level,
                    percentage: r.percentage,
                    description: r.description,
                    status: r.isActive, // map isActive -> status
                }));

                setReferrals(mapped);
            } catch (err: any) {
                setError(err.message || "Failed to fetch referrals");
            } finally {
                setLoading(false);
            }
        };

        fetchReferrals();
    }, []);


    console.log("Referrals:", referrals);

    return (
        <div className="py-10 px-5">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-black dark:text-white">
                    Referrals Page
                </h1>
                <Button onClick={() => setOpenModal(true)}>Add Referral</Button>
            </div>

            {/* Table */}
            {loading && (
                <p className="text-gray-600 dark:text-gray-300">Loading...</p>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <div className="overflow-x-auto">
                    <div className="shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            {/* Header */}
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Level
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Percentage
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {referrals.map((ref, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                    >
                                        <td className="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {ref.level}
                                        </td>
                                        <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-300">
                                            {ref.percentage}%
                                        </td>
                                        <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
                                            {ref.description}
                                        </td>
                                        <td className="px-6 py-3 text-sm">
                                            <span
                                                className={`px-3 py-1 inline-flex items-center rounded-full text-xs font-medium ${ref.status
                                                    ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                                                    : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                                                    }`}
                                            >
                                                {ref.status
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal */}
            {openModal && <ReferralModal onClose={() => setOpenModal(false)} />}
        </div>
    );
};

export default Page;
