import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';

export default function Rentals() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-6">Rentals</h3>
            
            <div className="space-y-6">
                {/* Base Rent */}
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">BASE RENT</span>
                    <span className="text-lg font-bold text-gray-800">120 PKR / sq.ft. / mo</span>
                </div>

                {/* Grid Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                            At Full Capacity
                        </div>
                        <div className="text-xl font-bold text-gray-800">120 PKR / sq.ft. / mo</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                            Next Increase Date
                        </div>
                        <div className="text-xl font-bold text-gray-800">19 Apr, 2026</div>
                    </div>
                </div>

                {/* Expand/Collapse Button */}
                <button
                    className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'View Less' : 'View More Details'}
                    {isExpanded ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                    }
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                    <div className="space-y-6 border-t border-gray-200 pt-6">
                        {/* Additional Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                                    5th of Month Disbursement
                                </div>
                                <div className="text-lg font-bold text-gray-800">1st of each Month</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                                    Locking Date
                                </div>
                                <div className="text-lg font-bold text-gray-800">Mon</div>
                            </div>
                        </div>

                        {/* Info Note */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                <p className="text-sm text-blue-800">
                                    The actual transferring can vary by 2-3 days
                                </p>
                            </div>
                        </div>

                        {/* Rental Growth */}
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                    Rental Growth & Trend
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-green-600">10% each year</div>
                        </div>

                        {/* Chart Area */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="h-32 bg-gradient-to-t from-blue-100 to-blue-200 rounded relative overflow-hidden">
                                {/* Simple Chart Visualization */}
                                <svg width="100%" height="100%" viewBox="0 0 300 120" className="absolute inset-0">
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
                                            <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
                                        </linearGradient>
                                    </defs>
                                    <polyline
                                        points="20,80 100,70 200,50 280,30"
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    <polygon
                                        points="20,80 100,70 200,50 280,30 280,120 20,120"
                                        fill="url(#chartGradient)"
                                    />
                                </svg>
                                <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs text-gray-600">
                                    <span>2025</span>
                                    <span>2026</span>
                                    <span>2027</span>
                                    <span>2028</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}