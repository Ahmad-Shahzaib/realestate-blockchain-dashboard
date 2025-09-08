import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';

export default function Rentals({ project }: { project: any }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white dark:bg-dark rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-4 lg:p-6">
            <h3 className="text-lg lg:text-xl font-bold text-[#003049] dark:text-white mb-6">
                Rentals
            </h3>

            <div className="space-y-6">
                {/* Base Rent */}
                <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white">
                    <span className="text-sm font-medium">BASE RENT</span>
                    <span className="text-lg font-bold">{project.floors[0].pricePerSqFt} PKR / sq.ft. / mo</span>
                </div>

                {/* Grid Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#F5F7FA] dark:bg-gray-800 rounded-xl">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                            At Full Capacity
                        </div>
                        <div className="text-xl font-bold text-[#003049] dark:text-white">
                            120 PKR / sq.ft. / mo
                        </div>
                    </div>
                    <div className="p-4 bg-[#F5F7FA] dark:bg-gray-800 rounded-xl">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                            Next Increase Date
                        </div>
                        <div className="text-xl font-bold text-[#003049] dark:text-white">
                            19 Apr, 2026
                        </div>
                    </div>
                </div>

                {/* Expand/Collapse Button */}
                <button
                    className="flex items-center gap-2 text-[#0277BD] dark:text-[#4DA3FF] text-sm font-medium hover:text-[#00B894] transition-colors"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? "View Less" : "View More Details"}
                    {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                    ) : (
                        <ChevronDown className="w-4 h-4" />
                    )}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                    <div className="space-y-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                        {/* Additional Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-[#F5F7FA] dark:bg-gray-800 rounded-xl">
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                    5th of Month Disbursement
                                </div>
                                <div className="text-lg font-bold text-[#003049] dark:text-white">
                                    1st of each Month
                                </div>
                            </div>
                            <div className="p-4 bg-[#F5F7FA] dark:bg-gray-800 rounded-xl">
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                    Locking Date
                                </div>
                                <div className="text-lg font-bold text-[#003049] dark:text-white">
                                    Mon
                                </div>
                            </div>
                        </div>

                        {/* Info Note */}
                        <div className="bg-gradient-to-r from-[#00B894]/10 to-[#00D2B6]/10 dark:from-[#00B894]/20 dark:to-[#00D2B6]/20 border border-[#00B894]/30 rounded-xl p-4">
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-[#00B894] rounded-full mt-2"></div>
                                <p className="text-sm text-[#003049] dark:text-white">
                                    The actual transferring can vary by 2-3 days
                                </p>
                            </div>
                        </div>

                        {/* Rental Growth */}
                        <div className="text-center p-4 bg-[#F5F7FA] dark:bg-gray-800 rounded-xl">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-[#00B894]" />
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    Rental Growth & Trend
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-[#00B894]">10% each year</div>
                        </div>

                        {/* Chart Area */}
                        <div className="bg-[#F5F7FA] dark:bg-gray-800 rounded-xl p-4">
                            <div className="h-32 bg-gradient-to-t from-[#00D2B6]/20 to-[#00B894]/10 rounded relative overflow-hidden">
                                {/* Simple Chart Visualization */}
                                <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 300 120"
                                    className="absolute inset-0"
                                >
                                    <defs>
                                        <linearGradient
                                            id="chartGradient"
                                            x1="0%"
                                            y1="0%"
                                            x2="0%"
                                            y2="100%"
                                        >
                                            <stop
                                                offset="0%"
                                                style={{ stopColor: "#00B894", stopOpacity: 0.3 }}
                                            />
                                            <stop
                                                offset="100%"
                                                style={{ stopColor: "#00D2B6", stopOpacity: 0.1 }}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <polyline
                                        points="20,80 100,70 200,50 280,30"
                                        fill="none"
                                        stroke="#00B894"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    <polygon
                                        points="20,80 100,70 200,50 280,30 280,120 20,120"
                                        fill="url(#chartGradient)"
                                    />
                                </svg>
                                <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs text-gray-600 dark:text-gray-400">
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
