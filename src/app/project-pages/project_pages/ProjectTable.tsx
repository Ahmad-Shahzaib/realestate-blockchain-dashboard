import React, { useState } from 'react'
import DAOListings from './DaoListing'
import Rentals from './RentalPage'
import QubeLahore from './QubePage'
import LocationSection from './LocationSection'
import DocumentPage from './DocumentPage'
import FaqAccordion from './FaqAccordion'

const ProjectTable = () => {
    const [activeTab, setActiveTab] = useState('liveOrders');

    const tabs = [
        { id: 'liveOrders', label: 'Live Orders' },
        { id: 'keyPoints', label: 'Key Ideal Points' },
        { id: 'rentals', label: 'Rentals' },
        { id: 'calculate', label: 'Calculate Rentals' },
        { id: 'documents', label: 'Documents' },
        { id: 'stats', label: 'Stats' },
        { id: 'investors', label: 'Investors' },
        { id: 'faqs', label: 'FAQs' }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'liveOrders':
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <DAOListings />
                        <Rentals />
                    </div>
                );
            case 'keyPoints':
                return <QubeLahore />;
            case 'rentals':
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <Rentals />
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">Investment Calculator</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Area to Own (sq. ft.)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter area..."
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-600 mb-1">Price per sq. ft.</div>
                                    <div className="text-xl font-bold text-gray-800">28,000 PKR</div>
                                </div>
                                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    Calculate Investment
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'calculate':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                        <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-6">Calculate Rentals</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Investment Amount (PKR)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter investment amount..."
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Area (sq. ft.)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter area..."
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    Calculate Returns
                                </button>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-800 mb-4">Estimated Returns</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Monthly Rental:</span>
                                        <span className="font-semibold">-- PKR</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Yearly Rental:</span>
                                        <span className="font-semibold">-- PKR</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">ROI:</span>
                                        <span className="font-semibold">--%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'documents':
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <LocationSection />
                        <DocumentPage />
                    </div>
                );
            case 'stats':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                        <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-6">Project Statistics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 bg-blue-50 rounded-lg text-center">
                                <div className="text-2xl font-bold text-blue-600">95%</div>
                                <div className="text-sm text-gray-600">Occupancy Rate</div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg text-center">
                                <div className="text-2xl font-bold text-green-600">1,250</div>
                                <div className="text-sm text-gray-600">Total Investors</div>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg text-center">
                                <div className="text-2xl font-bold text-purple-600">22K</div>
                                <div className="text-sm text-gray-600">Total Area (sq. ft.)</div>
                            </div>
                            <div className="p-4 bg-amber-50 rounded-lg text-center">
                                <div className="text-2xl font-bold text-amber-600">5.1%</div>
                                <div className="text-sm text-gray-600">Average Yield</div>
                            </div>
                        </div>
                        <div className="mt-6 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-gray-400 mb-2">📊</div>
                                <p className="text-gray-500">Interactive Chart</p>
                                <p className="text-sm text-gray-400">Performance Analytics</p>
                            </div>
                        </div>
                    </div>
                );
            case 'investors':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                        <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-6">Top Investors</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Ahmed Khan', investment: '2,500,000', area: '89.3 sq. ft.', returns: '12.5%' },
                                { name: 'Sarah Ahmed', investment: '1,800,000', area: '64.3 sq. ft.', returns: '11.2%' },
                                { name: 'Usman Ali', investment: '1,200,000', area: '42.9 sq. ft.', returns: '10.8%' },
                                { name: 'Fatima Sheikh', investment: '950,000', area: '33.9 sq. ft.', returns: '9.7%' }
                            ].map((investor, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 font-semibold">{investor.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800">{investor.name}</div>
                                            <div className="text-sm text-gray-500">{investor.area}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-gray-800">{investor.investment} PKR</div>
                                        <div className="text-sm text-green-600">+{investor.returns}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'faqs':
                return <FaqAccordion />;
            default:
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <DAOListings />
                        <Rentals />
                    </div>
                );
        }
    };

    return (
        <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200">
                    <nav className="flex overflow-x-auto scrollbar-hide" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-4 lg:px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            <div>
                {renderTabContent()}
            </div>
        </div>
    )
}

export default ProjectTable