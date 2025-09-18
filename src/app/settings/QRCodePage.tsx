"use client";

import React, { useEffect, useState } from "react";
import Button from "@/common/Button";
import { getUserProfile } from "@/services/user.services";
import QRCode from "react-qr-code";

const QRCodePage = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                const address = response?.data?.user?.solanaWalletAddress;
                if (address) {
                    setWalletAddress(address);
                }
            } catch (error) {
                console.error("Error fetching wallet address:", error);
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
        <div className=" flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md  p-8 space-y-6 transform transition-all ">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                    My Wallet
                </h3>
                <div className="flex  items-center space-y-4">
                    {!loading ? (
                        <>
                            <div className="p-4 ">
                                <QRCode
                                    value={walletAddress || "sample-random-wallet-123"}
                                    size={160}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    bgColor="transparent"
                                    fgColor="#1f2937"
                                    level="H"
                                />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-mono break-all px-4 text-center">
                                {walletAddress || "sample-random-wallet-123"}
                            </p>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-40">
                            <svg
                                className="animate-spin h-8 w-8 text-indigo-600 dark:text-indigo-400"
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
                    )}
                </div>
                {walletAddress && (
                    <Button
                        onClick={handleButtonClick}
                        className="w-full py-3 px-4  font-semibold rounded-lg transition-colors duration-200"
                    >
                        Explore Wallet
                    </Button>
                )}
            </div>
        </div>
    );
};

export default QRCodePage;