"use client";

import React, { useEffect, useState } from "react";
import Button from "@/common/Button";
import { getUserProfile } from "@/services/user.services"; // adjust import path if needed

const QRCodePage = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

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
            }
        };

        fetchProfile();
    }, []);

    const handleButtonClick = () => {
        if (walletAddress) {
            window.location.href = `https://solscan.io/account/${walletAddress}`;
        }
    };

    return (
        <div>
            {walletAddress ? (
                <Button onClick={handleButtonClick}>Explore Wallet</Button>
            ) : (
                <p>Loading wallet address...</p>
            )}
        </div>
    );
};

export default QRCodePage;
