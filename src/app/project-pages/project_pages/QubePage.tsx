import { Download, Calculator } from 'lucide-react';

export default function QubeLahore() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Qube Lahore Section */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 p-4 lg:p-6">
                <h3 className="text-lg lg:text-xl font-bold text-[#003049] mb-4">Qube Lahore</h3>
                <p className="text-gray-700 text-sm lg:text-base mb-6 leading-relaxed">
                    Qube harmoniously inculcates a secure environment, equipped with all the principal features
                    that prompt an integrated lifestyle. This project has been well constructed with amenities that
                    offer luxury and comfort. It functions as a multipurpose, state-of-the-art lifestyle complex,
                    enabling people and businesses to grow. The Corporate offices at Qube encompass dynamic
                    conditions for maximum productivity. Spanning over 22,000 sqft, it features exceptional rentable
                    and saleable commercial spaces.
                </p>
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium 
                    bg-gradient-to-r from-[#00B894] to-[#00D2B6] 
                    text-white shadow-md hover:opacity-90 transition">
                    <Download className="w-4 h-4" />
                    Download Handbook
                </button>
            </div>

            {/* Investment & Rental Returns Section */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 lg:p-6">
                <h3 className="text-lg lg:text-xl font-bold text-[#003049] mb-6">Investment & Rental Returns</h3>

                <div className="space-y-4">
                    <div className="p-4 bg-[#F5F7FA] rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">
                                Area to Own
                            </label>
                            <span className="text-sm font-medium text-[#0277BD]">
                                @ 28,000 PKR / sq.ft.
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter area..."
                            className="w-full p-3 border border-gray-200 rounded-lg text-sm 
                                focus:outline-none focus:ring-2 focus:ring-[#00B894] focus:border-transparent"
                        />
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium 
                        bg-gradient-to-r from-[#00B894] to-[#00D2B6] 
                        text-white shadow-md hover:opacity-90 transition">
                        <Calculator className="w-4 h-4" />
                        Calculate
                    </button>
                </div>
            </div>
        </div>
    );
}
