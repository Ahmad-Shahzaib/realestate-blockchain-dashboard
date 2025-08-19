import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function Rentals() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-background rounded-xl shadow-sm  p-4 lg:p-6">
            <h3 className="text-lg lg:text-xl font-bold text-black mb-6">Rentals</h3>
            <div className="space-y-6">
                {/* Base Rent */}
                <div className="flex justify-between items-center p-4 bg-background rounded-lg border border-themebgColor">
                    <span className="text-sm font-medium text-black">BASE RENT</span>
                    <span className="text-lg font-bold text-black">120 PKR / sq.ft. / mo</span>
                </div>

                {/* Grid Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-background rounded-lg border border-themebgColor">
                        <div className="text-sm font-medium text-black uppercase tracking-wide mb-2">
                            At Full Capacity
                        </div>
                        <div className="text-xl font-bold text-black">120 PKR / sq.ft. / mo</div>
                    </div>
                    <div className="p-4 bg-background rounded-lg border border-themebgColor">
                        <div className="text-sm font-medium text-black uppercase tracking-wide mb-2">
                            Next Increase Date
                        </div>
                        <div className="text-xl font-bold text-black">19 Apr, 2026</div>
                    </div>
                </div>

                {/* Expand/Collapse Button */}
                <Button
                    className="flex items-center gap-2 text-sm font-medium"
                    variant="outline"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'View Less' : 'View More Details'}
                    {isExpanded ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                    }
                </Button>

                {/* Expanded Content */}
                {isExpanded && (
                    <div className="space-y-6 border-t border-themebgColor pt-6">
                        {/* Additional Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-background rounded-lg border border-themebgColor">
                                <div className="text-sm font-medium text-black uppercase tracking-wide mb-2">
                                    5th of Month Disbursement
                                </div>
                                <div className="text-lg font-bold text-black">1st of each Month</div>
                            </div>
                            <div className="p-4 bg-background rounded-lg border border-themebgColor">
                                <div className="text-sm font-medium text-black uppercase tracking-wide mb-2">
                                    Locking Date
                                </div>
                                <div className="text-lg font-bold text-black">Mon</div>
                            </div>
                        </div>

                        {/* Info Note */}
                        <div className="bg-background border border-themebgColor rounded-lg p-4">
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                                <p className="text-sm text-black">
                                    The actual transferring can vary by 2-3 days
                                </p>
                            </div>
                        </div>

                        {/* Rental Growth */}
                        <div className="text-center p-4 bg-background rounded-lg border border-themebgColor">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-black" />
                                <span className="text-sm font-medium text-black uppercase tracking-wide">
                                    Rental Growth & Trend
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-black">10% each year</div>
                        </div>

                        {/* Chart Area */}
                        <div className="bg-background rounded-lg p-4 border border-themebgColor">
                            <div className="h-32 bg-background rounded relative overflow-hidden border border-themebgColor">
                                {/* Simple Chart Visualization */}
                                <svg width="100%" height="100%" viewBox="0 0 300 120" className="absolute inset-0">
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: 'black', stopOpacity: 0.3 }} />
                                            <stop offset="100%" style={{ stopColor: 'black', stopOpacity: 0.1 }} />
                                        </linearGradient>
                                    </defs>
                                    <polyline
                                        points="20,80 100,70 200,50 280,30"
                                        fill="none"
                                        stroke="black"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    <polygon
                                        points="20,80 100,70 200,50 280,30 280,120 20,120"
                                        fill="url(#chartGradient)"
                                    />
                                </svg>
                                <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs text-black">
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