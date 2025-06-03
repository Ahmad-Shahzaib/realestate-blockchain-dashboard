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
        <div className=" p-6">
            <div className="max-w-5xl mx-auto  rounded-lg shadow-md custom-border  ">
                {/* Header */}
                <div className="p-6 ">
                    <h1 className="text-2xl font-bold ">Transaction Details</h1>
                    <p className="">Transaction ID: {transaction.id}</p>
                </div>

                {/* Property Details */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold ">Property Information</h2>
                        <div className="space-y-2">
                            <p className=""><span className="font-medium">Property:</span> {transaction.propertyName}</p>
                            <p className=""><span className="font-medium">Address:</span> {transaction.address}</p>
                        </div>
                    </div>

                    {/* Transaction Status */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold ">Transaction Status</h2>
                        <div className="space-y-2">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm
                                ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'}`}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </div>
                            <p className=""><span className="font-medium">Date:</span> {transaction.date}</p>
                        </div>
                    </div>

                    {/* Price Information */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold ">Price Details</h2>
                        <div className="text-2xl font-bold ">
                            ${transaction.price.toLocaleString()}
                        </div>
                    </div>

                    {/* Parties Involved */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold ">Parties Involved</h2>
                        <div className="space-y-2">
                            <p className=""><span className="font-medium">Buyer:</span> {transaction.buyer}</p>
                            <p className=""><span className="font-medium">Seller:</span> {transaction.seller}</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-6  flex justify-end space-x-4">
                    <button className="px-4 py-2 rounded  custom-border shadow-xl">
                        Download Details
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TransactionDetailPage