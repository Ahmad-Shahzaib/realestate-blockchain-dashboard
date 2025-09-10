"use client"; // Mark as client component for Next.js

import { useState, useEffect } from "react";
import { Copy, Mail, Users, Gift, CheckCircle, Facebook, Twitter, Linkedin } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"; // Optional: For user feedback notifications


// Mock service for referral data (replace with actual ProjectService or ReferralService)
const ReferralService = {
    getReferralData: async () => {
        // Mock data: Replace with actual API call
        return {
            referralLink: "https://blockestate.com/refer/abc123",
            referralsCount: 15,
            rewardsEarned: 5000,
            pendingRewards: 1000,
        };
    },
    sendReferralInvite: async (email: string) => {
        // Mock API call: Replace with actual implementation
        return { success: true, message: `Invitation sent to ${email}` };
    },
};

export default function Page() {
    const [referralData, setReferralData] = useState({
        referralLink: "",
        referralsCount: 0,
        rewardsEarned: 0,
        pendingRewards: 0,
    });
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [inviteLoading, setInviteLoading] = useState(false);
    const router = useRouter();

    // Fetch referral data on mount
    useEffect(() => {
        const fetchReferralData = async () => {
            try {
                setLoading(true);
                const data = await ReferralService.getReferralData();
                setReferralData(data);
                setError(null);
            } catch (err: any) {
                setError(err.message || "Failed to load referral data.");
            } finally {
                setLoading(false);
            }
        };
        fetchReferralData();
    }, []);

    // Handle copying referral link to clipboard
    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralData.referralLink);
        toast.success("Referral link copied to clipboard!");
    };

    // Handle sending referral invite
    const handleSendInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        try {
            setInviteLoading(true);
            const response = await ReferralService.sendReferralInvite(email);
            if (response.success) {
                toast.success(response.message);
                setEmail("");
            } else {
                toast.error("Failed to send invite.");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to send invite.");
        } finally {
            setInviteLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
                <div className="text-gray-700 text-lg">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
                    <div className="text-gray-700 text-sm">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            {/* Header */}
            <header className="px-10 py-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold text-black dark:text-white">Refer & Earn</h1>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                        Invite friends to BlockEstate and earn rewards for every successful referral!
                    </p>
                </div>

                {/* Referral Stats Section */}
                <section>
                    <h2 className="text-[#003049] dark:text-[#E0E7FF] font-bold text-lg mb-4">Your Referral Stats</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Referrals Count */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md transition">
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="w-5 h-5 text-[#00B894]" />
                                <h3 className="text-[#003049] dark:text-gray-200 font-bold text-sm">Total Referrals</h3>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
                                {referralData.referralsCount}
                            </p>
                        </div>

                        {/* Rewards Earned */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md transition">
                            <div className="flex items-center gap-2 mb-2">
                                <Gift className="w-5 h-5 text-[#00B894]" />
                                <h3 className="text-[#003049] dark:text-gray-200 font-bold text-sm">Rewards Earned</h3>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
                                ${referralData.rewardsEarned.toLocaleString()}
                            </p>
                        </div>

                        {/* Pending Rewards */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md transition">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="w-5 h-5 text-[#00B894]" />
                                <h3 className="text-[#003049] dark:text-gray-200 font-bold text-sm">Pending Rewards</h3>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
                                ${referralData.pendingRewards.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </section>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Invite Form Section */}
                    <section>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                            <h2 className="text-[#003049] dark:text-[#E0E7FF] font-bold text-lg mb-4">
                                Invite Friends
                            </h2>
                            <form
                                onSubmit={handleSendInvite}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter friend's email"
                                    className="flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-[#F5F7FA] dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                                />
                                <button
                                    type="submit"
                                    disabled={inviteLoading}
                                    className={`px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-lg transition flex items-center gap-2 ${inviteLoading
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:opacity-90"
                                        }`}
                                >
                                    <Mail className="w-4 h-4" />
                                    {inviteLoading ? "Sending..." : "Send Invite"}
                                </button>
                            </form>
                        </div>
                    </section>

                    {/* Referral Link Section */}
                    <section>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                            <h2 className="text-[#003049] dark:text-[#E0E7FF] font-bold text-lg mb-4">
                                Your Referral Link
                            </h2>

                            <div className="flex items-center gap-4">
                                {/* Input with Copy inside */}
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={referralData.referralLink}
                                        readOnly
                                        className="w-full p-3 pr-12 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-[#F5F7FA] dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                                    />
                                    <button
                                        type="button"
                                        aria-label="Copy Referral Link"
                                        onClick={handleCopyLink}
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

            <div className="overflow-x-auto p-6">
                <table className="min-w-full border-collapse overflow-hidden rounded-2xl shadow-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white">
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                Level
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                Percentage
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                Created At
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                        <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                            <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-100">1</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">10%</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                Direct referral - 10% commission
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100">
                                    Active
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">2025-09-10</td>
                        </tr>

                        <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                            <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-100">2</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">5%</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                Second level - 5% commission
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100">
                                    Inactive
                                </span>ing
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">2025-09-09</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    );
}