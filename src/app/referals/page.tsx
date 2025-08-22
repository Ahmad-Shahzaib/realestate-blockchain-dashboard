"use client"; // Mark as client component for Next.js

import { useState, useEffect } from "react";
import { Copy, Mail, Users, Gift, CheckCircle } from "lucide-react";
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
                {/* Referral Link Section */}
                <section className="mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <h2 className="text-[#003049] dark:text-[#E0E7FF] font-bold text-lg mb-4">Your Referral Link</h2>
                        <div className="flex items-center gap-4">
                            <input
                                type="text"
                                value={referralData.referralLink}
                                readOnly
                                className="flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-[#F5F7FA] dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                            />
                            <button
                                onClick={handleCopyLink}
                                className="px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-lg hover:opacity-90 transition flex items-center gap-2"
                            >
                                <Copy className="w-4 h-4" />
                                Copy Link
                            </button>
                        </div>
                    </div>
                </section>

                {/* Invite Form Section */}
                <section className="mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <h2 className="text-[#003049] dark:text-[#E0E7FF] font-bold text-lg mb-4">Invite Friends</h2>
                        <form onSubmit={handleSendInvite} className="flex flex-col sm:flex-row gap-4">
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
                                className={`px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-lg transition flex items-center gap-2 ${inviteLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
                            >
                                <Mail className="w-4 h-4" />
                                {inviteLoading ? "Sending..." : "Send Invite"}
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </div>

    );
}