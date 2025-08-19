import React from 'react'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

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
        <div className="p-6 bg-background text-black border-themebgColor">
            <div className="mx-auto rounded-lg shadow-md border border-themebgColor bg-background">
                {/* Header */}
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-black">Transaction Details</h1>
                    <p className="text-black">Transaction ID: {transaction.id}</p>
                </div>

                {/* Property Details */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-black">Property Information</h2>
                        <div className="space-y-2">
                            <p className="text-black"><span className="font-medium">Property:</span> {transaction.propertyName}</p>
                            <p className="text-black"><span className="font-medium">Address:</span> {transaction.address}</p>
                        </div>
                        {/* Example Input usage */}
                        <Input placeholder="Property Name" value={transaction.propertyName} readOnly />
                        <Input placeholder="Address" value={transaction.address} readOnly />
                    </div>

                    {/* Transaction Status */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-black">Transaction Status</h2>
                        <div className="space-y-2">
                            <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm border border-themebgColor bg-background text-black`}
                            >
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </div>
                            <p className="text-black"><span className="font-medium">Date:</span> {transaction.date}</p>
                        </div>
                        <Input placeholder="Status" value={transaction.status} readOnly />
                        <Input placeholder="Date" value={transaction.date} readOnly />
                    </div>

                    {/* Price Information */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-black">Price Details</h2>
                        <div className="text-2xl font-bold text-black">
                            ${transaction.price.toLocaleString()}
                        </div>
                        <Input placeholder="Price" value={transaction.price.toLocaleString()} readOnly />
                    </div>

                    {/* Parties Involved */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-black">Parties Involved</h2>
                        <div className="space-y-2">
                            <p className="text-black"><span className="font-medium">Buyer:</span> {transaction.buyer}</p>
                            <p className="text-black"><span className="font-medium">Seller:</span> {transaction.seller}</p>
                        </div>
                        <Input placeholder="Buyer" value={transaction.buyer} readOnly />
                        <Input placeholder="Seller" value={transaction.seller} readOnly />
                    </div>
                </div>

                {/* Actions */}
                <div className="p-6 flex justify-end space-x-4">
                    <Button variant="outline" className="border-themebgColor text-black bg-background">
                        Download Details
                    </Button>
                    <Button className="border-themebgColor text-black bg-background">
                        Contact Support
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TransactionDetailPage