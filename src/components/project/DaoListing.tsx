import { useState } from 'react';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'; // Icon as per image

export default function DAOListings() {
    const [activeTab, setActiveTab] = useState('listings');

    const tabClass = (tab: string) =>
        `px-4 py-1.5 text-sm font-medium rounded-full border ${activeTab === tab
            ? 'bg-white text-indigo-600 border-indigo-600'
            : 'text-gray-500 bg-gray-100 border-transparent'
        }`;

    const badge = (text: string, color: string) => (
        <span className={`text-xs font-semibold rounded-full px-3 py-1 ${color}`}>
            {text}
        </span>
    );

    return (
        <div className="p-6 h-80 bg-white rounded-xl shadow border border-gray-200  mt-3">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Orders on DAO Listings</h2>
            <div className="flex bg-gray-100 rounded-full p-1 w-fit mb-6">
                <button onClick={() => setActiveTab('listings')} className={tabClass('listings')}>
                    DAO Listings Orders
                </button>
                <button onClick={() => setActiveTab('transactions')} className={tabClass('transactions')}>
                    Recent Transactions
                </button>
            </div>

            {activeTab === 'listings' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-gray-500">
                        <span>PRICE / SQ. FT.</span>
                        <span>AREA AVAILABLE</span>
                        <span>AGE</span>
                        <span>SELLER</span>
                        <span>ACTION</span>
                    </div>

                    {/* Listings */}
                    {[
                        { price: '27,500 PKR', area: '3.8 sq.ft.', date: 'Apr 18, 2025', seller: 'Aliraza' },
                        { price: '26,500 PKR', area: '6 sq.ft.', date: 'Apr 18, 2025', seller: 'Gul54481' }
                    ].map((item, idx) => (
                        <div key={idx} className="grid grid-cols-5 gap-4 items-center border-t border-gray-200 pt-3 text-sm">
                            {badge(item.price, 'bg-green-100 text-green-600')}
                            {badge(item.area, 'bg-orange-100 text-orange-600')}
                            <span>{item.date}</span>
                            <span className="flex items-center">
                                <img src="https://via.placeholder.com/20" alt="Seller Icon" className="mr-2 rounded-full" />
                                {item.seller}
                            </span>
                            <button className="flex items-center gap-2 text-sm border border-indigo-600 text-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-50">
                                <FaArrowUpRightFromSquare className="w-3 h-3" />
                                Buy Now
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'transactions' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-gray-500">
                        <span>SELLER</span>
                        <span>PRICE / SQ. FT.</span>
                        <span>DATE LISTED</span>
                        <span>STATUS</span>
                        <span>SOLD IN</span>
                    </div>

                    {/* Transactions */}
                    {[
                        { seller: 'Hf27', price: '27,999 sq.ft.', date: 'Feb 23, 2025', status: 'completed' },
                        { seller: 'Hf27', price: '38,000 sq.ft.', date: 'Oct 11, 2024', status: 'completed' }
                    ].map((item, idx) => (
                        <div key={idx} className="grid grid-cols-5 gap-4 items-center border-t border-gray-200 pt-3 text-sm">
                            <span className="flex items-center">
                                <img src="https://via.placeholder.com/20" alt="Seller Icon" className="mr-2 rounded-full" />
                                {item.seller}
                            </span>
                            <span>{item.price}</span>
                            <span>{item.date}</span>
                            {badge(item.status, 'bg-green-100 text-green-600')}
                            <button className="flex items-center gap-2 text-sm border border-indigo-600 text-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-50">
                                <FaArrowUpRightFromSquare className="w-3 h-3" />
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
