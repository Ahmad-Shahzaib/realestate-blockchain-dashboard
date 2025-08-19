import { useState } from 'react';

export default function Rentals() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className=" p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Rentals</h2>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm font-medium">BASE RENT</span>
                    <span className="text-gray-600 text-sm font-medium">120 PKR / sq.ft. / mo</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="text-gray-600 text-sm font-medium">AT FULL CAPACITY</span>
                        <p className="text-sm">120 PKR / sq.ft. / mo</p>
                    </div>
                    <div>
                        <span className="text-gray-600 text-sm font-medium">NEXT INCREASE DATE</span>
                        <p className="text-sm">19 Apr, 2026</p>
                    </div>
                </div>

                {!isExpanded && (
                    <button
                        className="flex items-center text-indigo-600 text-sm font-medium hover:text-indigo-700"
                        onClick={() => setIsExpanded(true)}
                    >
                        View More Details
                        <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                )}

                {isExpanded && (
                    <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-gray-600 text-sm font-medium">AT FULL CAPACITY</span>
                                <p className="text-sm">120 PKR / sq.ft. / mo</p>
                            </div>
                            <div>
                                <span className="text-gray-600 text-sm font-medium">NEXT INCREASE DATE</span>
                                <p className="text-sm">19 Apr, 2026</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-gray-600 text-sm font-medium">5TH OF MONTH DISBURSEMENT</span>
                                <p className="text-sm">1st of each Month</p>
                            </div>
                            <div>
                                <span className="text-gray-600 text-sm font-medium">LOCKING DATE</span>
                                <p className="text-sm">Mon</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md">
                            <p className="text-xs text-gray-600">
                                <span className="text-indigo-600">●</span> The actual transferring can vary by 2-3 days
                            </p>
                        </div>
                        <div className="text-center">
                            <span className="text-gray-600 text-sm font-medium">RENTAL GROWTH & TREND</span>
                            <p className="text-sm">10% each year</p>
                        </div>
                        <div className="relative">
                            <svg width="100%" height="150" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                                {/* Background Gradient */}
                                <defs>
                                    <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#e0f7fa', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                {/* Area Chart */}
                                <polyline
                                    points="10,110 100,110 200,80 290,50"
                                    fill="url(#fillGradient)"
                                    stroke="none"
                                />
                                {/* Line Chart */}
                                <polyline
                                    points="10,110 100,110 200,80 290,50"
                                    fill="none"
                                    stroke="#4da8da"
                                    strokeWidth="2"
                                />
                                {/* X-Axis Labels */}
                                <text x="10" y="130" fontSize="10" fill="#6b7280">2025</text>
                                <text x="100" y="130" fontSize="10" fill="#6b7280">2026</text>
                                <text x="200" y="130" fontSize="10" fill="#6b7280">2027</text>
                                <text x="290" y="130" fontSize="10" fill="#6b7280">2028</text>
                                {/* Y-Axis Labels */}
                                <text x="0" y="10" fontSize="10" fill="#6b7280">200</text>
                                <text x="0" y="60" fontSize="10" fill="#6b7280">150</text>
                                <text x="0" y="110" fontSize="10" fill="#6b7280">100</text>
                            </svg>
                        </div>
                        <div className="text-center">
                            <button
                                className="flex items-center mx-auto text-indigo-600 text-sm font-medium hover:text-indigo-700"
                                onClick={() => setIsExpanded(false)}
                            >
                                View Less
                                <svg
                                    className="w-4 h-4 ml-1 rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}