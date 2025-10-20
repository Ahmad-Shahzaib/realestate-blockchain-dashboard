"use client";

import { useState, useEffect } from "react";
import { Copy, Mail, Users, Gift, CheckCircle, Facebook, Twitter, Linkedin, Search } from "lucide-react";
import { toast } from "react-hot-toast";
import ReferralService from "@/services/referal.service";
import { useAppSelector } from "@/redux/hooks";
import SearchInput from "@/common/Input"; // Assuming you have a similar SearchInput component

type Referral = {
    id: string;
    email: string;
    level: number;
    joinedAt: string;
};

export default function ReferralPage() {
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const userProfile = useAppSelector((state) => state.userInfo.user);
    const [stats, setStats] = useState({
        totalReferrals: 0,
        directReferrals: 0,
        indirectReferrals: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchReferrals = async () => {
            try {
                setLoading(true);
                const res = await ReferralService.getReferrals();
                const referralList: Referral[] = Object.values(res.referrals || {}).flat();
                setReferrals(referralList);
                setStats(res.statistics || {});
                setError(null);
            } catch (err: any) {
                setError(err.message || "Failed to load referrals");
            } finally {
                setLoading(false);
            }
        };
        fetchReferrals();
    }, []);

    const filteredReferrals = referrals.filter((referral) =>
        referral.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-6 text-[#34495E] dark:text-gray-4">Loading...</div>;
    if (error) return <div className="p-6 text-red-600 dark:text-red-400">{error}</div>;

    return (
        <div className="min-h-screen bg-[#F5F7FA] dark:bg-dark">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-[#ECF0F1] dark:bg-dark-2 dark:border-dark-4">
                <div className="mx-auto px-6 py-6">
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#00B894] p-2 rounded-lg">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#2C3E50] dark:text-gray-2">My Referral</h1>
                            <p className="text-[#34495E] dark:text-gray-4 mt-1">
                                Manage and track your referral
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats and Search */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 dark:bg-dark-2">


                    {/* Referral Stats */}
                    <div className="grid gap-4 sm:grid-cols-3 mt-6">
                        <div className="bg-white dark:bg-dark-2 p-4 rounded-lg shadow-sm border border-[#ECF0F1] dark:border-dark-4">
                            <div className="flex items-center space-x-3">
                                <Users className="w-5 h-5 text-[#00B894]" />
                                <div>
                                    <p className="font-semibold text-[#2C3E50] dark:text-gray-2">{stats.totalReferrals}</p>
                                    <p className="text-sm text-[#34495E] dark:text-gray-4">Total Referrals</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-dark-2 p-4 rounded-lg shadow-sm border border-[#ECF0F1] dark:border-dark-4">
                            <div className="flex items-center space-x-3">
                                <Gift className="w-5 h-5 text-[#00B894]" />
                                <div>
                                    <p className="font-semibold text-[#2C3E50] dark:text-gray-2">{stats.directReferrals}</p>
                                    <p className="text-sm text-[#34495E] dark:text-gray-4">Direct Referrals</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-dark-2 p-4 rounded-lg shadow-sm border border-[#ECF0F1] dark:border-dark-4">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-[#00B894]" />
                                <div>
                                    <p className="font-semibold text-[#2C3E50] dark:text-gray-2">{stats.indirectReferrals}</p>
                                    <p className="text-sm text-[#34495E] dark:text-gray-4">Indirect Referrals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Invite and Referral Link Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Invite Form Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-dark-2">
                        <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2 mb-4">Invite Friends</h2>
                        <form className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter friend's email"
                                className="flex-1 p-3 rounded-lg border border-[#ECF0F1] dark:border-dark-4 text-[#34495E] dark:text-gray-3 bg-[#F5F7FA] dark:bg-dark-3 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                            />
                            <button
                                type="button"
                                className="px-4 py-3 rounded-lg font-semibold bg-[#00B894] text-white shadow-sm transition hover:bg-[#00A07A] flex items-center gap-2"
                            >
                                <Mail className="w-5 h-5" />
                                Send Invite
                            </button>
                        </form>
                    </div>

                    {/* Referral Link Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-dark-2">
                        <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2 mb-4">Your Referral Link</h2>
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={`https://dev.fractprop.com/auth/sign-in?ref=${userProfile?.referralCode}`}
                                    readOnly
                                    className="w-full p-3 rounded-lg border border-[#ECF0F1] dark:border-dark-4 text-[#34495E] dark:text-gray-3 bg-[#F5F7FA] dark:bg-dark-3 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                                />
                                <button
                                    type="button"
                                    aria-label="Copy Referral Link"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#34495E] dark:text-gray-3 hover:text-[#00B894] dark:hover:text-[#00B894] transition"
                                    onClick={() => {
                                        const referralLink = `https://dev.fractprop.com/auth/sign-up?ref=${userProfile?.referralCode}`;
                                        navigator.clipboard.writeText(referralLink).then(() => {
                                            toast.success("Referral link copied to clipboard!");
                                        }).catch(() => {
                                            toast.error("Failed to copy link");
                                        });
                                    }}
                                >
                                    <Copy className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    aria-label="Share on Facebook"
                                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                                >
                                    <Facebook className="w-5 h-5" />
                                </button>
                                <button
                                    aria-label="Share on Twitter"
                                    className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition"
                                >
                                    <Twitter className="w-5 h-5" />
                                </button>
                                <button
                                    aria-label="Share on LinkedIn"
                                    className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Referral List Table */}
                <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-dark-2">

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2">
                            Referrals ({filteredReferrals.length})
                        </h2>
                        <div className="flex-1 max-w-md">
                            <SearchInput
                                placeholder="Search by email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<Search className="h-5 w-5 text-[#34495E] dark:text-gray-3" />}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#ECF0F1] dark:border-dark-4">
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                        Level
                                    </th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                        Email
                                    </th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                        Joined At
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#ECF0F1] dark:divide-dark-4">
                                {filteredReferrals.length > 0 ? (
                                    filteredReferrals.map((ref) => (
                                        <tr
                                            key={ref.id}
                                            className="hover:bg-[#ECF0F1] dark:hover:bg-dark-3 transition-colors"
                                        >
                                            <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{ref.level}</td>
                                            <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{ref.email}</td>
                                            <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">
                                                {new Date(ref.joinedAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="py-4 px-2 text-center text-[#34495E] dark:text-gray-4">
                                            No referrals found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}