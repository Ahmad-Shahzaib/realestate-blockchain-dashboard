import React from "react";

export type Referral = {
    level: number;
    percentage: number;
    description: string;
    isActive: boolean;
};

type Props = {
    referrals: Referral[];
};


const ReferralTable: React.FC<Props> = ({ referrals }) => {
    return (
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
                                        {ref.status ? "Active" : "Inactive"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReferralTable;
