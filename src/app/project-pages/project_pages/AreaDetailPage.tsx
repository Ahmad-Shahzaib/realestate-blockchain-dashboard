import React from 'react'
import { TrendingUp, Building2, Lock, Unlock } from "lucide-react"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const AreaDetailPage = () => {
    const totalArea = 624000;
    const lockedArea = 163933;
    const availableArea = totalArea - lockedArea;
    const pricePerSqFt = 16000;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {/* Current Price */}
            <div className="bg-background rounded-xl border border-themebgColor p-4 lg:p-6">
                <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-black" />
                    <span className="text-sm text-black font-medium">Current Price</span>
                </div>
                <div className="text-2xl font-bold text-black">{pricePerSqFt.toLocaleString()}</div>
                <div className="text-sm text-black">PKR / sq. ft.</div>
                <Input placeholder="Enter amount" className="mt-2" />
                <Button className="mt-2">Buy</Button>
            </div>

            {/* Total Area */}
            <div className="bg-background rounded-xl border border-themebgColor p-4 lg:p-6">
                <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-black" />
                    <span className="text-sm text-black font-medium">Total Area</span>
                </div>
                <div className="text-2xl font-bold text-black">{totalArea.toLocaleString()}</div>
                <div className="text-sm text-black">sq. ft.</div>
            </div>

            {/* Area Locked */}
            <div className="bg-background rounded-xl p-4 lg:p-6 border border-themebgColor">
                <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-5 h-5 text-black" />
                    <span className="text-sm text-black font-medium">Area Locked</span>
                </div>
                <div className="text-2xl font-bold text-black">{lockedArea.toLocaleString()}</div>
                <div className="text-sm text-black">sq. ft.</div>
            </div>

            {/* Area Left */}
            <div className="bg-background rounded-xl p-4 lg:p-6 border border-themebgColor">
                <div className="flex items-center gap-2 mb-2">
                    <Unlock className="w-5 h-5 text-black" />
                    <span className="text-sm text-black font-medium">Area Left</span>
                </div>
                <div className="text-2xl font-bold text-black">{availableArea.toLocaleString()}</div>
                <div className="text-sm text-black">sq. ft.</div>
            </div>
        </div>
    )
}

export default AreaDetailPage