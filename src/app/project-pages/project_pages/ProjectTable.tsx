import React, { useState } from 'react';
import DAOListings from './DaoListing';
import Rentals from './RentalPage';
import QubeLahore from './QubePage';
import LocationSection from './LocationSection';
import DocumentPage from './DocumentPage';
import FaqAccordion from './FaqAccordion';

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
        { id: 'faqs', label: 'FAQs' },
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
                        <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-100 hover:shadow-xl transition">
                            <h3 className="text-lg lg:text-xl font-bold text-[#003049] mb-4">Investment Calculator</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-[#F5F7FA] rounded-lg">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Area to Own (sq. ft.)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter area..."
                                        className="w-full p-3 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0277BD]"
                                    />
                                </div>
                                <div className="p-4 bg-[#F5F7FA] rounded-lg">
                                    <div className="text-sm text-gray-700 mb-1">Price per sq. ft.</div>
                                    <div className="text-xl font-bold text-[#003049]">28,000 PKR</div>
                                </div>
                                <button className="w-full px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-lg hover:opacity-90 transition">
                                    Calculate Investment
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'calculate':
                return (
                    <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-100 hover:shadow-xl transition">
                        <h3 className="text-lg lg:text-xl font-bold text-[#003049] mb-6">Calculate Rentals</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Investment Amount (PKR)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter investment amount..."
                                        className="w-full p-3 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0277BD]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Area (sq. ft.)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter area..."
                                        className="w-full p-3 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0277BD]"
                                    />
                                </div>
                                <button className="w-full px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-lg hover:opacity-90 transition">
                                    Calculate Returns
                                </button>
                            </div>
                            <div className="p-4 bg-[#F5F7FA] rounded-lg">
                                <h4 className="font-semibold text-[#003049] mb-4">Estimated Returns</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Monthly Rental:</span>
                                        <span className="font-semibold text-[#003049]">-- PKR</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Yearly Rental:</span>
                                        <span className="font-semibold text-[#003049]">-- PKR</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">ROI:</span>
                                        <span className="font-semibold text-[#003049]">--%</span>
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
                    <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-100 hover:shadow-xl transition">
                        <h3 className="text-lg lg:text-xl font-bold text-[#003049] mb-6">
                            Project Statistics
                        </h3>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { value: "95%", label: "Occupancy Rate" },
                                { value: "1,250", label: "Total Investors" },
                                { value: "22K", label: "Total Area (sq. ft.)" },
                                { value: "5.1%", label: "Average Yield" },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="p-5 bg-[#F5F7FA] rounded-xl text-center shadow-sm hover:shadow-md transition"
                                >
                                    <div className="text-3xl font-extrabold bg-gradient-to-r from-[#00B894] to-[#00D2B6] bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-700 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Chart Placeholder */}
                        <div className="mt-8 h-64 bg-[#F5F7FA] rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-[#00B894] transition">
                            <div className="text-center">
                                <div className="text-3xl mb-3">📊</div>
                                <p className="text-gray-700 font-medium">Interactive Chart</p>
                                <p className="text-sm text-gray-500">Performance Analytics</p>
                            </div>
                        </div>
                    </div>

                );
            case 'investors':
                return (
                    <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-100 hover:shadow-xl transition">
                        <h3 className="text-lg lg:text-xl font-bold text-[#003049] mb-6">
                            Top Investors
                        </h3>
                        <div className="space-y-4">
                            {[
                                { name: "Ahmed Khan", investment: "2,500,000", area: "89.3 sq. ft.", returns: "12.5%" },
                                { name: "Sarah Ahmed", investment: "1,800,000", area: "64.3 sq. ft.", returns: "11.2%" },
                                { name: "Usman Ali", investment: "1,200,000", area: "42.9 sq. ft.", returns: "10.8%" },
                                { name: "Fatima Sheikh", investment: "950,000", area: "33.9 sq. ft.", returns: "9.7%" },
                            ].map((investor, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-[#F9FAFB] hover:bg-[#F0F4F8] transition-all"
                                >
                                    {/* Avatar + Name */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#00B894]/20 rounded-full flex items-center justify-center shadow-sm">
                                            <span className="text-[#00B894] font-semibold text-lg">
                                                {investor.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-[#003049] text-base">
                                                {investor.name}
                                            </div>
                                            <div className="text-sm text-gray-600">{investor.area}</div>
                                        </div>
                                    </div>

                                    {/* Investment + Returns */}
                                    <div className="text-right">
                                        <div className="font-bold text-[#003049] text-base">
                                            {investor.investment} PKR
                                        </div>
                                        <div className="text-sm font-medium text-[#00B894]">
                                            ↑ {investor.returns}
                                        </div>
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
            <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-100 hover:shadow-xl transition">
                <div className="border-b border-gray-100">
                    <nav className="flex overflow-x-auto scrollbar-hide" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-1 px-4 lg:px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === tab.id
                                    ? 'border-[#00B894] text-[#003049] bg-gradient-to-r from-[#00B894]/20 to-[#00D2B6]/20'
                                    : 'border-transparent text-gray-700 hover:text-[#0277BD] hover:border-[#0277BD] hover:bg-[#F5F7FA]'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            <div>{renderTabContent()}</div>
        </div>
    );
};

export default ProjectTable;