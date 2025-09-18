"use client";

import { useState, useEffect } from "react";
import { Copy, Mail, Users, Gift, CheckCircle, Facebook, Twitter, Linkedin } from "lucide-react";
import { toast } from "react-hot-toast";
import ReferralService from "@/services/referal.service"; // <-- your API service

type Referral = {
    id: string;
    email: string;
    level: number;
    joinedAt: string;
};

export default function Page() {
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [stats, setStats] = useState({
        totalReferrals: 0,
        directReferrals: 0,
        indirectReferrals: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // fetch data
    useEffect(() => {
        const fetchReferrals = async () => {
            try {
                setLoading(true);
                const res = await ReferralService.getReferrals();
                console.log("API Response:", res);

                // ✅ Flatten referrals from levels 1, 2, ...
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

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6">
            {/* Referral Stats */}
            <section className="mb-8">
                <h2 className="text-lg font-bold mb-4">Referral Stats</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="border shadow-md p-4 rounded-xl bg-white dark:bg-dark dark:text-white ">
                        <Users className="w-5 h-5 text-[#00B894]" />
                        <p className="font-semibold">{stats.totalReferrals}</p>
                        <p className="text-sm text-gray-500 dark:text-white">Total Referrals</p>
                    </div>
                    <div className="border shadow-md p-4 rounded-xl bg-white dark:bg-dark dark:text-white ">
                        <Gift className="w-5 h-5 text-[#00B894]" />
                        <p className="font-semibold">{stats.directReferrals}</p>
                        <p className="text-sm text-gray-500 dark:text-white">Direct Referrals</p>
                    </div>
                    <div className="border shadow-md p-4 rounded-xl bg-white dark:bg-dark dark:text-white ">
                        <CheckCircle className="w-5 h-5 text-[#00B894]" />
                        <p className="font-semibold">{stats.indirectReferrals}</p>
                        <p className="text-sm text-gray-500 dark:text-white">Indirect Referrals</p>
                    </div>
                </div>
            </section>

            <main className="py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Invite Form Section */}
                    <section>
                        <div className="border shadow-md dark:bg-dark bg-white rounded-2xl  
                         p-6">
                            <h2 className="text-[#003049] dark:text-[#E0E7FF] font-bold text-lg mb-4">
                                Invite Friends
                            </h2>
                            <form className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter friend's email"
                                    className="flex-1 p-3 rounded-lg border border-[#00B894] dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-[#F5F7FA] dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                                />
                                <button
                                    type="button"
                                    className="px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-lg transition flex items-center gap-2 hover:opacity-90"
                                >
                                    <Mail className="w-4 h-4" />
                                    Send Invite
                                </button>
                            </form>
                        </div>
                    </section>

                    {/* Referral Link Section */}
                    <section>
                        <div className="border shadow-md dark:bg-dark bg-white rounded-2xl  
                         p-6">
                            <h2 className="text-[#003049] dark:text-[#E0E7FF] font-bold text-lg mb-4">
                                Your Referral Link
                            </h2>

                            <div className="flex items-center gap-4">
                                {/* Input with Copy inside */}
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value="https://example.com/referral/abcd1234"
                                        readOnly
                                        className="w-full p-3 pr-12 rounded-lg border border-[#00B894] dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-[#F5F7FA] dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                                    />
                                    <button
                                        type="button"
                                        aria-label="Copy Referral Link"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00B894] transition"
                                    >
                                        <Copy className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Social Icons */}
                                <div className="flex items-center gap-3">
                                    <button
                                        aria-label="Share on Facebook"
                                        className="p-2 rounded-full bg-blue-600 text-white hover:opacity-90 transition"
                                    >
                                        <Facebook className="w-5 h-5" />
                                    </button>
                                    <button
                                        aria-label="Share on Twitter"
                                        className="p-2 rounded-full bg-sky-500 text-white hover:opacity-90 transition"
                                    >
                                        <Twitter className="w-5 h-5" />
                                    </button>
                                    <button
                                        aria-label="Share on LinkedIn"
                                        className="p-2 rounded-full bg-blue-700 text-white hover:opacity-90 transition"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>



            {/* Referral List Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse rounded-xl shadow-lg overflow-hidden">
                    <thead>
                        <tr className="bg-[#00B894] text-white">
                            <th className="px-6 py-3 text-left text-sm font-semibold">Level</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Joined At</th>
                        </tr>
                    </thead>
                    <tbody className="border shadow-md">
                        {referrals.map((ref) => (
                            <tr
                                key={ref.id}
                                className="border-b border-gray-200 hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4">{ref.level}</td>
                                <td className="px-6 py-4">{ref.email}</td>
                                <td className="px-6 py-4">
                                    {new Date(ref.joinedAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}

                        {referrals.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                                    No referrals yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
