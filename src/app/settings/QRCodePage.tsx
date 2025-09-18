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
        <div className="flex flex-col items-center justify-center mt-10 space-y-6">
            {/* ✅ Wallet Card with QR */}
            <div className="w-full max-w-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    My Wallet
                </h3>

                <div className="flex justify-center items-center">
                    {!loading ? (
                        <>
                            <QRCode
                                value={walletAddress || "sample-random-wallet-123"}
                                size={100}
                                style={{ height: "auto", maxWidth: "100%", width: "100px" }}
                            />
                        </>
                    ) : (
                        <p>Loading QR code...</p>
                    )}
                </div>

            </div>

            {/* ✅ Button */}
            {walletAddress && (
                <Button onClick={handleButtonClick}>Explore Wallet</Button>
            )}
        </div>
    );
};

export default QRCodePage;
