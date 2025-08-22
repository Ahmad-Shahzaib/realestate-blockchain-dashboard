"use client"

import { Copy } from "lucide-react"

export default function WalletInfo() {
    const wallets = [
        {
            id: 1,
            address: "0x8b7cdf9338c96c08a2",
        },
        {
            id: 2,
            address: "TL4bqADvrvRWuujZQgF4",
        },
    ]

    const cryptoLogos = [
        { name: "AH", color: "bg-orange-100 text-orange-700" },
        { name: "AKR", color: "bg-green-100 text-green-700" },
        { name: "QUB", color: "bg-gray-100 text-gray-700" },
        { name: "GRA", color: "bg-yellow-100 text-yellow-700" },
        { name: "SHR", color: "bg-blue-100 text-blue-700" },
    ]

    const copyToClipboard = (address: string) => {
        navigator.clipboard.writeText(address)
    }

    // Simple QR code pattern component
    const QRCode = () => (
        <div className="h-28 w-28 bg-white p-1">
            <div className="grid h-full w-full grid-cols-8 gap-px bg-gray-100">
                {/* QR code pattern - simplified representation */}
                {Array.from({ length: 64 }).map((_, i) => (
                    <div
                        key={i}
                        className={`${
                            // Create a pattern that looks like a QR code
                            i % 8 === 0 ||
                                i % 8 === 7 ||
                                Math.floor(i / 8) === 0 ||
                                Math.floor(i / 8) === 7 ||
                                (i >= 9 && i <= 11 && Math.floor(i / 8) <= 2) ||
                                (i >= 52 && i <= 54 && Math.floor(i / 8) >= 5) ||
                                (i % 3 === 0 && i % 5 === 0) ||
                                (i % 7 === 0 && i > 20 && i < 40)
                                ? "bg-black"
                                : "bg-white"
                            }`}
                    />
                ))}
            </div>
        </div>
    )

    return (
        <div className="mx-auto max-w-7xl p-6 rounded custom-border dark:bg-dark  ">
            <h1 className="mb-6 text-2xl font-semibold ">Wallet Info</h1>


            <div className="flex gap-6">
                {wallets.map((wallet) => (
                    <div key={wallet.id} className="flex-1 rounded-lg custom-border p-6">
                        {/* Crypto Logos */}
                        <div className="mb-6 flex items-center justify-between">
                            {cryptoLogos.map((crypto, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${crypto.color}`}>
                                        <span className="text-xs font-semibold">{crypto.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-start gap-6">
                            {/* QR Code */}
                            <div className="flex-shrink-0">
                                <QRCode />
                            </div>

                            {/* Wallet Address and Info */}
                            <div className="flex-1">
                                <div className="mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-base ">{wallet.address}</span>
                                        <button
                                            onClick={() => copyToClipboard(wallet.address)}
                                            className="rounded p-1 text-blue-600 hover:bg-blue-50"
                                            title="Copy address"
                                        >
                                            <Copy className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-sm  leading-relaxed">
                                    Capture this QR on your phone to copy and share your wallet address directly.
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
