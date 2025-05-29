import React from 'react'
import { Info, Globe } from "lucide-react"

const AreaDetailPage = () => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Current Price */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-600 text-sm">Current Price</span>
                    <Info className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">16,000</div>
                <div className="text-gray-500 text-sm">PKR / sq. ft.</div>
            </div>

            {/* Total Area */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-600 text-sm">Total Area</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                    <span className="text-2xl font-bold text-gray-900">624,000</span>
                </div>
                <div className="text-gray-500 text-sm">sq. ft.</div>
            </div>

            {/* Area Locked */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-600 text-sm">Area Locked</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-teal-400 rounded-sm"></div>
                    <span className="text-2xl font-bold text-gray-900">163,933</span>
                </div>
                <div className="text-gray-500 text-sm">sq. ft.</div>
            </div>

            {/* Area Left */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 relative">
                <div className="absolute top-4 right-4">
                    <Globe className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-600 text-sm">Area Left</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                    <span className="text-2xl font-bold text-gray-900">460,067</span>
                </div>
                <div className="text-gray-500 text-sm">sq. ft.</div>
            </div>
        </div>
    )
}

export default AreaDetailPage