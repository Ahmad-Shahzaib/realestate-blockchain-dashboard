"use client"

import type { NextPage } from 'next';
import { useState } from "react"
import { Info, Building2, TrendingUp } from "lucide-react"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const SelectedAreaPage: NextPage = () => {
    const PRICE_PER_SQFT = 16000; // Price per square foot in PKR
    const [selectedArea, setSelectedArea] = useState(0)
    const totalArea = 624000;
    const lockedArea = 163933;
    const availableArea = totalArea - lockedArea; // 460,067
    const pledgeAmount = selectedArea * PRICE_PER_SQFT;

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value)
        setSelectedArea(value)
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Panel - Area Selection */}
            <div className="bg-background rounded-2xl shadow-sm border border-themebgColor p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg lg:text-xl font-bold text-black">Select Area</h3>
                        <Info className="w-4 h-4 text-black" />
                    </div>
                    <div className="bg-background text-black px-3 py-1 rounded-full text-sm font-medium border border-themebgColor">
                        {PRICE_PER_SQFT.toLocaleString()} PKR / sq. ft.
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-black mb-4 text-sm lg:text-base">Move the slider to pledge remaining area.</p>
                    <div className="relative">
                        <Input
                            type="range"
                            min={0}
                            max={availableArea}
                            value={selectedArea}
                            onChange={handleSliderChange}
                            className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer border border-themebgColor"
                        />
                        <div className="flex justify-between text-xs lg:text-sm text-black mt-2">
                            <span>0 Sq. ft.</span>
                            <span className="text-right">{availableArea.toLocaleString()} Sq. ft.</span>
                        </div>
                    </div>
                </div>

                <div className="bg-background rounded-xl p-4 mb-6 border border-themebgColor">
                    <div className="text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-black mb-1">{selectedArea.toLocaleString()}</div>
                        <div className="text-sm text-black">Sq. ft.</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-black">Selected Area</span>
                        <span className="font-medium text-black">{selectedArea.toLocaleString()} sq. ft.</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-black">Available Area</span>
                        <span className="font-medium text-black">{availableArea.toLocaleString()} sq. ft.</span>
                    </div>
                    <div className="border-t pt-4 border-themebgColor">
                        <div className="flex justify-between items-center">
                            <span className="text-black">Total Investment</span>
                            <div className="text-right">
                                <div className="text-xl lg:text-2xl font-bold text-black">{pledgeAmount.toLocaleString()}</div>
                                <div className="text-sm text-black">PKR</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Investment Summary */}
            <div className="bg-background rounded-2xl shadow-sm border border-themebgColor p-4 lg:p-6">
                <h3 className="text-lg lg:text-xl font-bold text-black mb-6">Investment Summary</h3>
                
                <div className="space-y-4 lg:space-y-6">
                    <div className="bg-background rounded-xl p-4 border border-themebgColor">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-background border border-themebgColor rounded-lg flex items-center justify-center">
                                <Building2 className="w-4 h-4 text-black" />
                            </div>
                            <span className="font-medium text-black text-sm lg:text-base">Area to Pledge</span>
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-black">{selectedArea.toLocaleString()}</div>
                        <div className="text-sm text-black">sq. ft.</div>
                    </div>

                    <div className="bg-background rounded-xl p-4 border border-themebgColor">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-background border border-themebgColor rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-black" />
                            </div>
                            <span className="font-medium text-black text-sm lg:text-base">Investment Amount</span>
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-black">{pledgeAmount.toLocaleString()}</div>
                        <div className="text-sm text-black">PKR</div>
                    </div>

                    <div className="bg-background rounded-xl p-4 border border-themebgColor">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-background border border-themebgColor rounded-lg flex items-center justify-center">
                                <span className="text-black font-bold text-xs">%</span>
                            </div>
                            <span className="font-medium text-black text-sm lg:text-base">Ownership Percentage</span>
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-black">
                            {((selectedArea / totalArea) * 100).toFixed(2)}%
                        </div>
                        <div className="text-sm text-black">of total project</div>
                    </div>

                    {/* Grid Visualization */}
                    <div className="bg-background rounded-xl p-4 border border-themebgColor">
                        <div className="text-sm font-medium text-black mb-3">Selected Area Preview</div>
                        <div className="mb-4">
                            <div
                                className="grid grid-cols-20 gap-[0.5px] bg-background border border-themebgColor p-2 rounded-lg"
                                style={{ width: '100%', height: '120px' }}
                            >
                                {Array.from({ length: 400 }, (_, i) => (
                                    <div
                                        key={i}
                                        className={`rounded-sm ${i < Math.floor((selectedArea / availableArea) * 400) ? "bg-themebgColor" : "bg-background"}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between text-xs text-black">
                            <span>{selectedArea.toLocaleString()} sq. ft.</span>
                            <span>{availableArea.toLocaleString()} sq. ft.</span>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-themebgColor">
                        <Button 
                            className="w-full py-3 lg:py-4 rounded-xl font-semibold text-base lg:text-lg"
                            disabled={selectedArea === 0}
                        >
                            {selectedArea === 0 ? 'Select Area to Proceed' : 'Proceed to Investment'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Removed static slider thumb styles, use Input component styling */}
        </div>
    );
};

export default SelectedAreaPage;