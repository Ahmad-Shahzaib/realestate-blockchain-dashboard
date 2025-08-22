import { useState } from 'react';
import { ExternalLink, User } from 'lucide-react';

export default function DAOListings() {
    const [activeTab, setActiveTab] = useState('listings');

    const listings = [
        { price: '27,500 PKR', area: '3.8 sq.ft.', date: 'Apr 18, 2025', seller: 'Aliraza' },
        { price: '26,500 PKR', area: '6 sq.ft.', date: 'Apr 18, 2025', seller: 'Gul54481' },
    ];

    const transactions = [
        { seller: 'Hf27', price: '27,999 sq.ft.', date: 'Feb 23, 2025', status: 'completed' },
        { seller: 'Hf27', price: '38,000 sq.ft.', date: 'Oct 11, 2024', status: 'completed' },
    ];

    return (
        <div className="p-6 rounded-2xl dark:bg-dark shadow-md dark:text-white border border-gray-100 dark:border-gray-700 hover:shadow-xl transition">
            <h3 className="text-lg lg:text-xl font-bold text-dark dark:text-white  mb-6">Live Orders on DAO Listings</h3>

            {/* Tabs */}
            <div className="flex bg-[#F5F7FA] dark:bg-dark  rounded-lg p-1 mb-6 w-fit">
                <button
                    onClick={() => setActiveTab('listings')}
                    className={`px-4 py-2 dark:text-white text-sm font-medium rounded-md transition-colors ${activeTab === 'listings'
                        ? 'bg-gradient-to-r  from-[#00B894]/20 to-[#00D2B6]/20 text-[#003049] shadow-sm'
                        : 'text-gray-700 hover:text-white hover:bg-dark'
                        }`}
                >
                    DAO Listings Orders
                </button>
                <button
                    onClick={() => setActiveTab('transactions')}
                    className={`px-4 py-2 text-sm dark:text-white font-medium rounded-md transition-colors ${activeTab === 'transactions'
                        ? 'bg-gradient-to-r from-[#00B894]/20 to-[#00D2B6]/20 text-[#003049] shadow-sm'
                        : 'text-gray-700 hover:text-white hover:bg-dark'
                        }`}
                >
                    Recent Transactions
                </button>
            </div>

            {activeTab === 'listings' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-2 text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wide">
                        <span>Price / sq. ft.</span>
                        <span>Area Available</span>
                        <span>Age</span>
                        <span>Seller</span>
                        <span>Action</span>
                    </div>

                    {listings.map((item, idx) => (
                        <div
                            key={idx}
                            className="grid grid-cols-5 gap-2 items-center dark:text-white p-2 border border-gray-100 rounded-lg hover:bg-dark transition"
                        >
                            <span className="text-sm font-medium text-[#003049] dark:text-white">{item.price}</span>
                            <span className="text-sm text-gray-700 dark:text-white">{item.area}</span>
                            <span className="text-sm text-gray-700 dark:text-white">{item.date}</span>
                            <div className="flex items-center gap-1 dark:text-white">
                                <div className="w-6 h-6 bg-[#00B894]/20 rounded-full flex items-center justify-center">
                                    <User className="w-3 h-3 text-[#00B894] dark:text-white" />
                                </div>
                                <span className="text-sm text-[#003049] dark:text-white">{item.seller}</span>
                            </div>
                            <button className="flex items-center gap-1 text-sm px-2 py-2 rounded font-semibold bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-lg hover:opacity-90 transition">

                                Buy Now
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'transactions' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        <span>Seller</span>
                        <span>Price / sq. ft.</span>
                        <span>Date Listed</span>
                        <span>Status</span>
                        <span>Action</span>
                    </div>

                    {transactions.map((item, idx) => (
                        <div
                            key={idx}
                            className="grid grid-cols-5 gap-4 items-center p-4 border border-gray-100 rounded-lg hover:bg-[#F5F7FA] transition"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-[#00B894]/20 rounded-full flex items-center justify-center">
                                    <User className="w-3 h-3 text-[#00B894]" />
                                </div>
                                <span className="text-sm text-[#003049]">{item.seller}</span>
                            </div>
                            <span className="text-sm text-gray-700">{item.price}</span>
                            <span className="text-sm text-gray-700">{item.date}</span>
                            <span className="text-xs bg-[#00B894]/20 text-[#00B894] px-2 py-1 rounded-full font-medium">
                                {item.status}
                            </span>
                            <button className="flex items-center gap-2 text-sm border  px-2 py-2 rounded bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white transition-colors">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}