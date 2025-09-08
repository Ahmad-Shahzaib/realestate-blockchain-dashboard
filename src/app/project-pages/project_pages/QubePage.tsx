import { Download, Calculator } from 'lucide-react';
import { useState } from 'react';

export default function QubeLahore({ project }: { project: any }) {
    // State for area input and calculated price
    const [area, setArea] = useState('');
    const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

    // Get pricePerSqFt safely
    const pricePerSqFt = project?.floors?.[0]?.pricePerSqFt || 0;

    const handleCalculate = () => {
        const areaNum = parseFloat(area);
        if (!isNaN(areaNum) && areaNum > 0) {
            setCalculatedPrice(areaNum * pricePerSqFt);
        } else {
            setCalculatedPrice(null);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Qube Lahore Section */}
            <div className="lg:col-span-2 bg-white dark:bg-[#1A1D23] rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-4 lg:p-6">
                <h3 className="text-lg lg:text-xl font-bold text-[#003049] dark:text-white mb-4">
                    Qube Lahore
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm lg:text-base mb-6 leading-relaxed">
                    {
                        project?.description || "description here  ."
                    }
                </p>
                <button
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium 
        bg-gradient-to-r from-[#00B894] to-[#00D2B6] 
        text-white shadow-md hover:opacity-90 transition"
                >
                    <Download className="w-4 h-4" />
                    Download Handbook
                </button>
            </div>

            {/* Investment & Rental Returns Section */}
            <div className="bg-white dark:bg-[#1A1D23] rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-4 lg:p-6">
                <h3 className="text-lg lg:text-xl font-bold text-[#003049] dark:text-white mb-6">
                    Investment & Rental Returns
                </h3>

                <div className="space-y-4">
                    <div className="p-4 bg-[#F5F7FA] dark:bg-[#2A2F36] rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Area to Own
                            </label>
                            <span className="text-sm font-medium text-[#0277BD] dark:text-[#4FC3F7]">
                                {pricePerSqFt}/ sq.ft.
                            </span>
                        </div>
                        <input
                            type="number"
                            value={area}
                            onChange={e => setArea(e.target.value)}
                            placeholder="Enter area..."
                            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg text-sm 
            bg-white dark:bg-[#121417] text-gray-900 dark:text-gray-200
            focus:outline-none focus:ring-2 focus:ring-[#00B894] focus:border-transparent"
                        />
                        {/* Show calculated price below input */}
                        {calculatedPrice !== null && (
                            <div className="mt-3 text-sm font-semibold text-[#003049] dark:text-white">
                                Total Price: {calculatedPrice.toLocaleString()} PKR
                            </div>
                        )}
                    </div>

                    <button
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium 
          bg-gradient-to-r from-[#00B894] to-[#00D2B6] 
          text-white shadow-md hover:opacity-90 transition"
                        type="button"
                        onClick={handleCalculate}
                    >
                        <Calculator className="w-4 h-4" />
                        Calculate
                    </button>
                </div>
            </div>
        </div>

    );
}
