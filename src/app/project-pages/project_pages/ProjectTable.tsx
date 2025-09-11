import React, { useState } from 'react';
import DAOListings from './DaoListing';
import Rentals from './RentalPage';
import QubeLahore from './QubePage';
import LocationSection from './LocationSection';
import DocumentPage from './DocumentPage';
import FaqAccordion from './FaqAccordion';
import InvestmentCalculator from './InvestmentCalculator';

const ProjectTable = ({ project }: { project: any }) => {
    const [activeTab, setActiveTab] = useState('liveOrders');

    const tabs = [
        { id: 'liveOrders', label: 'Live Orders' },
        { id: 'keyPoints', label: 'Key Ideal Points' },
        // { id: 'rentals', label: 'Rentals' },
        // { id: 'calculate', label: 'Calculate Rentals' },
        { id: 'documents', label: 'Documents' },
        { id: 'stats', label: 'Stats' },
        { id: 'investors', label: 'Investors' },
        { id: 'faqs', label: 'FAQs' },
    ];
    console.log("Project roi:", project.roi);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'liveOrders':
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 ">
                        {/* <DAOListings project={project} /> */}
                        <InvestmentCalculator />

                        <Rentals project={project} />
                    </div>
                );
            case 'keyPoints':
                return <QubeLahore project={project} />;
            case 'rentals':
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <Rentals project={project} />
                        <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 hover:shadow-xl transition">
                            <h3 className="text-lg lg:text-xl font-bold text-[#003049] dark:text-white mb-4">
                                Investment Calculator
                            </h3>

                            <div className="space-y-4">
                                {/* Area Input */}
                                <div className="p-4 dark:bg-dark dark:bg-[#0F172A] rounded-lg">
                                    <label className="block text-sm font-medium dark:text-white dark:text-gray-300 mb-2">
                                        Area to Own (sq. ft.)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter area..."
                                        className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white 
                   focus:outline-none focus:ring-2 focus:ring-[#00B894] focus:border-transparent"
                                    />
                                </div>

                                {/* Price Section */}
                                <div className="p-4 dark:bg-dark dark:bg-[#0F172A] rounded-lg">
                                    <div className="text-sm dark:text-white dark:text-gray-300 mb-1">
                                        Price per sq. ft.
                                    </div>
                                    <div className="text-xl font-bold text-[#003049] dark:text-white">
                                        28,000 PKR
                                    </div>
                                </div>

                                {/* Button */}
                                <button
                                    className="w-full px-6 py-3 rounded-xl font-semibold 
                 bg-gradient-to-r from-[#00B894] to-[#00D2B6] 
                 text-white shadow-lg hover:opacity-90 transition"
                                >
                                    Calculate Investment
                                </button>
                            </div>
                        </div>

                    </div>
                );
            case 'calculate':
                return (
                    <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition">
                        <h3 className="text-lg lg:text-xl font-bold text-[#003049] dark:text-[#00D2B6] mb-6">
                            Calculate Rentals
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Side */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium dark:text-white dark:text-gray-300 mb-2">
                                        Investment Amount (PKR)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter investment amount..."
                                        className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0277BD] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium dark:text-white dark:text-gray-300 mb-2">
                                        Area (sq. ft.)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter area..."
                                        className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0277BD] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                    />
                                </div>
                                <button className="w-full px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-lg hover:opacity-90 transition">
                                    Calculate Returns
                                </button>
                            </div>

                            {/* Right Side */}
                            <div className="p-4 dark:bg-dark dark:bg-gray-800 rounded-lg">
                                <h4 className="font-semibold text-[#003049] dark:text-[#00D2B6] mb-4">
                                    Estimated Returns
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="dark:text-white dark:text-gray-300">Monthly Rental:</span>
                                        <span className="font-semibold text-[#003049] dark:text-white">-- PKR</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="dark:text-white dark:text-gray-300">Yearly Rental:</span>
                                        <span className="font-semibold text-[#003049] dark:text-white">-- PKR</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="dark:text-white dark:text-gray-300">ROI:</span>

                                        <span className="font-semibold text-[#003049] dark:text-white">
                                            {project?.roi ? `${project.roi}%` : "--%"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                );
            case 'documents':
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <LocationSection project={project} />

                        <DocumentPage project={project} />
                    </div>
                );
            case 'stats':
                return (
                    <div className="p-6 rounded-2xl shadow-md  border border-gray-100 hover:shadow-xl transition">
                        <h3 className="text-lg lg:text-xl font-bold text-[#003049] dark:text-white mb-6">
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
                                    className="p-5 dark:bg-dark rounded-xl text-center shadow-sm hover:shadow-md transition"
                                >
                                    {/* Value */}
                                    <div className="text-3xl font-extrabold bg-gradient-to-r from-[#00B894] to-[#00D2B6] bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>

                                    {/* Label */}
                                    <div className="text-sm dark:text-white mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Chart Placeholder */}
                        <div className="mt-8 h-64 dark:bg-dark rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-[#00B894] transition">
                            <div className="text-center">
                                <div className="text-3xl mb-3">📊</div>
                                <p className="dark:text-white font-medium">Interactive Chart</p>
                                <p className="text-sm text-gray-500">Performance Analytics</p>
                            </div>
                        </div>
                    </div>


                );
            case 'investors':
                return (
                    <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-dark border border-gray-100 dark:border-gray-700 hover:shadow-xl transition">
                        <h3 className="text-lg lg:text-xl font-bold text-[#003049] dark:text-white mb-6">
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
                                    className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl bg-[#F9FAFB] dark:bg-[#2A2A2A] hover:bg-[#F0F4F8] dark:hover:bg-[#333333] transition-all"
                                >
                                    {/* Avatar + Name */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#00B894]/20 rounded-full flex items-center justify-center shadow-sm">
                                            <span className="text-[#00B894] font-semibold text-lg">
                                                {investor.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-[#003049] dark:text-white text-base">
                                                {investor.name}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {investor.area}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Investment + Returns */}
                                    <div className="text-right">
                                        <div className="font-bold text-[#003049] dark:text-white text-base">
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
                return <FaqAccordion project={project} />;
            default:
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <DAOListings project={project} />
                        {/* <Rentals project={project} /> */}
                    </div>
                );
        }
    };

    return (
        <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="p-6 rounded-2xl shadow-md dark:text-white dark:border-gray-700  border border-gray-100 hover:shadow-xl transition">
                <div className="border-b border-gray-100">
                    <nav className="flex overflow-x-auto scrollbar-hide" aria-label="Tabs dark:bg-dark dark:text-white">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-1 px-4 lg:px-6 border-b-2 font-medium text-sm whitespace-nowrap  dark:text-white transition-colors ${activeTab === tab.id
                                    ? 'border-[#00B894] text-[#003049] bg-gradient-to-r from-[#00B894]/20 to-[#00D2B6]/20'
                                    : 'border-transparent dark:text-white  hover:border-[#0277BD] hover:bg-gradient-to-r from-[#00B894]/20 to-[#00D2B6]/20 hover:text-black'
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