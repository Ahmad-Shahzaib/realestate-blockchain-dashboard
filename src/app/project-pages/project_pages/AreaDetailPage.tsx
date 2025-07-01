import React from 'react'
import { Info, TrendingUp, Building2, Lock, Unlock } from "lucide-react"

const AreaDetailPage = () => {
    const totalArea = 624000;
    const lockedArea = 163933;
    const availableArea = totalArea - lockedArea;
    const pricePerSqFt = 16000;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {/* Current Price */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 lg:p-6">
                <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-blue-600 font-medium">Current Price</span>
                    <Info className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{pricePerSqFt.toLocaleString()}</div>
                <div className="text-sm text-gray-500">PKR / sq. ft.</div>
            </div>

            {/* Total Area */}
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-4 lg:p-6">
                <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-emerald-600 font-medium">Total Area</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">{totalArea.toLocaleString()}</div>
                <div className="text-sm text-gray-500">sq. ft.</div>
            </div>

            {/* Area Locked */}
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 lg:p-6">
                <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-5 h-5 text-amber-600" />
                    <span className="text-sm text-amber-600 font-medium">Area Locked</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">{lockedArea.toLocaleString()}</div>
                <div className="text-sm text-gray-500">sq. ft.</div>
            </div>

            {/* Area Left */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 lg:p-6">
                <div className="flex items-center gap-2 mb-2">
                    <Unlock className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-purple-600 font-medium">Area Left</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">{availableArea.toLocaleString()}</div>
                <div className="text-sm text-gray-500">sq. ft.</div>
            </div>
        </div>
    )
}

export default AreaDetailPage