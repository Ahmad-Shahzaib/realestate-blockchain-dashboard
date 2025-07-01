import { useState } from 'react';
import { ExternalLink, User } from 'lucide-react';

export default function DAOListings() {
    const [activeTab, setActiveTab] = useState('listings');

    const listings = [
        { price: '27,500 PKR', area: '3.8 sq.ft.', date: 'Apr 18, 2025', seller: 'Aliraza' },
        { price: '26,500 PKR', area: '6 sq.ft.', date: 'Apr 18, 2025', seller: 'Gul54481' }
    ];

    const transactions = [
        { seller: 'Hf27', price: '27,999 sq.ft.', date: 'Feb 23, 2025', status: 'completed' },
        { seller: 'Hf27', price: '38,000 sq.ft.', date: 'Oct 11, 2024', status: 'completed' }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-6">Live Orders on DAO Listings</h3>
            
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6 w-fit">
                <button 
                    onClick={() => setActiveTab('listings')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'listings' 
                            ? 'bg-white text-blue-600 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                    DAO Listings Orders
                </button>
                <button 
                    onClick={() => setActiveTab('transactions')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'transactions' 
                            ? 'bg-white text-blue-600 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                    Recent Transactions
                </button>
            </div>

            {activeTab === 'listings' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        <span>Price / sq. ft.</span>
                        <span>Area Available</span>
                        <span>Age</span>
                        <span>Seller</span>
                        <span>Action</span>
                    </div>

                    {listings.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-5 gap-4 items-center p-4 border border-gray-200 rounded-lg">
                            <span className="text-sm font-medium text-gray-800">{item.price}</span>
                            <span className="text-sm text-gray-600">{item.area}</span>
                            <span className="text-sm text-gray-600">{item.date}</span>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="w-3 h-3 text-blue-600" />
                                </div>
                                <span className="text-sm text-gray-800">{item.seller}</span>
                            </div>
                            <button className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                <ExternalLink className="w-3 h-3" />
                                Buy Now
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'transactions' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        <span>Seller</span>
                        <span>Price / sq. ft.</span>
                        <span>Date Listed</span>
                        <span>Status</span>
                        <span>Action</span>
                    </div>

                    {transactions.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-5 gap-4 items-center p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="w-3 h-3 text-blue-600" />
                                </div>
                                <span className="text-sm text-gray-800">{item.seller}</span>
                            </div>
                            <span className="text-sm text-gray-600">{item.price}</span>
                            <span className="text-sm text-gray-600">{item.date}</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                {item.status}
                            </span>
                            <button className="flex items-center gap-2 text-sm border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                                <ExternalLink className="w-3 h-3" />
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}