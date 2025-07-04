import React from 'react'
import Image from 'next/image'

interface TransactionDetail {
    id: string;
    propertyName: string;
    address: string;
    price: number;
    status: 'pending' | 'completed' | 'cancelled';
    date: string;
    buyer: string;
    seller: string;
}

const TransactionDetailPage = () => {
    // Mock data - replace with actual data fetching 
    const transaction: TransactionDetail = {
        id: "TX123456",
        propertyName: "Luxury Villa",
        address: "123 Palm Street, Beverly Hills, CA 90210",
        price: 1250000,
        status: "completed",
        date: "2024-01-15",
        buyer: "John Doe",
        seller: "Jane Smith"
    }

    return (
        <div className="p-6 bg-background text-text border-border">
            <div className="mx-auto rounded-lg shadow-md border border-border bg-gradient-to-br from-background-gradientFrom via-background-gradientVia to-background-gradientTo">
                {/* Header */}
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-text">Transaction Details</h1>
                    <p className="text-text">Transaction ID: {transaction.id}</p>
                </div>

                {/* Property Details */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-text">Property Information</h2>
                        <div className="space-y-2">
                            <p className="text-text"><span className="font-medium">Property:</span> {transaction.propertyName}</p>
                            <p className="text-text"><span className="font-medium">Address:</span> {transaction.address}</p>
                        </div>
                    </div>

                    {/* Transaction Status */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-text">Transaction Status</h2>
                        <div className="space-y-2">
                            <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm border border-border
                                    ${transaction.status === 'completed' ? 'bg-background-gradientVia text-text' :
                                        transaction.status === 'pending' ? 'bg-background-gradientTo text-text' :
                                            'bg-background-gradientFrom text-text'}`}
                            >
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </div>
                            <p className="text-text"><span className="font-medium">Date:</span> {transaction.date}</p>
                        </div>
                    </div>

                    {/* Price Information */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-text">Price Details</h2>
                        <div className="text-2xl font-bold text-text">
                            ${transaction.price.toLocaleString()}
                        </div>
                    </div>

                    {/* Parties Involved */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-text">Parties Involved</h2>
                        <div className="space-y-2">
                            <p className="text-text"><span className="font-medium">Buyer:</span> {transaction.buyer}</p>
                            <p className="text-text"><span className="font-medium">Seller:</span> {transaction.seller}</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-6 flex justify-end space-x-4">
                    <button className="px-4 py-2 rounded border border-border shadow-xl text-text bg-background hover:bg-background-gradientVia">
                        Download Details
                    </button>
                    <button className="px-4 py-2 rounded text-text bg-background-gradientFrom hover:bg-background-gradientVia border border-border">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TransactionDetailPage