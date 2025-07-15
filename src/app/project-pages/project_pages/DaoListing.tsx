import { useState } from 'react';
import { ExternalLink, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        <div className="bg-background rounded-xl shadow-sm  p-4 lg:p-6">
            <h3 className="text-lg lg:text-xl font-bold text-black mb-6">Live Orders on DAO Listings</h3>

            {/* Tabs */}
            <div className="flex bg-background rounded-lg p-1 gap-2 mb-6 w-fit">
                <Button
                    variant={activeTab === 'listings' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('listings')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'listings' ? '' : ''}`}
                >
                    DAO Listings Orders
                </Button>
                <Button
                    variant={activeTab === 'transactions' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('transactions')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'transactions' ? '' : ''}`}
                >
                    Recent Transactions
                </Button>
            </div>

            {activeTab === 'listings' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-black uppercase tracking-wide">
                        <span>Price / sq. ft.</span>
                        <span>Area Available</span>
                        <span>Age</span>
                        <span>Seller</span>
                        <span>Action</span>
                    </div>

                    {listings.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-5 gap-4 items-center p-2 border border-themebgColor rounded-lg">
                            <span className="text-sm font-medium text-black">{item.price}</span>
                            <span className="text-sm text-black">{item.area}</span>
                            <span className="text-sm text-black">{item.date}</span>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-background rounded-full flex items-center justify-center border border-themebgColor">
                                    <User className="w-3 h-3 text-black" />
                                </div>
                                <span className="text-sm text-black">{item.seller}</span>
                            </div>
                            <Button className="flex items-center gap-1 text-sm px-8 py-2 rounded-lg">
                                <ExternalLink className="w-3 h-3" />
                                Buy Now
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'transactions' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-black uppercase tracking-wide">
                        <span>Seller</span>
                        <span>Price / sq. ft.</span>
                        <span>Date Listed</span>
                        <span>Status</span>
                        <span>Action</span>
                    </div>

                    {transactions.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-5 gap-4 items-center p-4 border border-themebgColor rounded-lg">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-background rounded-full flex items-center justify-center border border-themebgColor">
                                    <User className="w-3 h-3 text-black" />
                                </div>
                                <span className="text-sm text-black">{item.seller}</span>
                            </div>
                            <span className="text-sm text-black">{item.price}</span>
                            <span className="text-sm text-black">{item.date}</span>
                            <span className="text-xs px-2 py-1 rounded-full font-medium text-black border border-themebgColor bg-background">
                                {item.status}
                            </span>
                            <Button variant="outline" className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg">
                                <ExternalLink className="w-3 h-3" />
                                View Details
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}