"use client";

import React, { useEffect, useState } from "react";
import Button from "@/common/Button";
import { getUserProfile, UserProfile } from "@/services/user.services";
import QRCode from "react-qr-code";
import { FaAccusoft } from "react-icons/fa";

const QRCodePage = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getUserProfile();
                const user = response?.data?.user;
                // Prioritize walletAddress if solanaWalletAddress is null
                const address = user?.solanaWalletAddress || user?.walletAddress;
                if (address) {
                    setWalletAddress(address);
                } else {
                    setError("No wallet address found for this user.");
                }
            } catch (error) {
                console.error("Error fetching wallet address:", error);
                setError("Failed to fetch wallet address. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleButtonClick = () => {
        if (walletAddress) {
            window.open(`https://solscan.io/account/${walletAddress}`, "_blank");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 p-6">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center border  ">
                {/* Header (Logo + Title) */}
                <div className="flex items-center justify-center space-x-2 mb-4">
                    <FaAccusoft className="text-4xl text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Your Wallet
                    </h3>
                </div>

                {/* QR Code Section */}
                <div className="flex flex-col items-center space-y-3">
                    {loading ? (
                        <div className="flex items-center justify-center h-44">
                            <svg
                                className="animate-spin h-10 w-10 text-indigo-600 dark:text-indigo-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                        </div>
                    ) : error ? (
                        <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
                    ) : (
                        <>
                            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow">
                                <QRCode
                                    value={walletAddress || "sample-random-wallet-123"}
                                    size={180}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    bgColor="white"
                                    fgColor="#000000"
                                    level="H"
                                />
                            </div>
                            <p className="text-sm font-mono text-gray-700 dark:text-gray-300 break-all px-2">
                                {walletAddress || "No wallet address available"}
                            </p>
                        </>
                    )}
                </div>

                {/* Button */}
                {walletAddress && !error && (
                    <div className="mt-6">
                        <Button
                            onClick={handleButtonClick}
                            className="w-full py-3 px-4 text-white font-semibold rounded-xl shadow-md  transition-all duration-300"
                        >
                            Explore Wallet
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QRCodePage;