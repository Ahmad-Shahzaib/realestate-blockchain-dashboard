"use client"

import type { NextPage } from 'next';
import { useState } from "react"
import { Info, Building2, TrendingUp } from "lucide-react"

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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg lg:text-xl font-bold text-gray-800">Select Area</h3>
                        <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {PRICE_PER_SQFT.toLocaleString()} PKR / sq. ft.
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-gray-600 mb-4 text-sm lg:text-base">Move the slider to pledge remaining area.</p>
                    <div className="relative">
                        <input
                            type="range"
                            min="0"
                            max={availableArea}
                            value={selectedArea}
                            onChange={handleSliderChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(selectedArea / availableArea) * 100}%, #e5e7eb ${(selectedArea / availableArea) * 100}%, #e5e7eb 100%)`
                            }}
                        />
                        <div className="flex justify-between text-xs lg:text-sm text-gray-500 mt-2">
                            <span>0 Sq. ft.</span>
                            <span className="text-right">{availableArea.toLocaleString()} Sq. ft.</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">{selectedArea.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Sq. ft.</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Selected Area</span>
                        <span className="font-medium">{selectedArea.toLocaleString()} sq. ft.</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Available Area</span>
                        <span className="font-medium">{availableArea.toLocaleString()} sq. ft.</span>
                    </div>
                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Investment</span>
                            <div className="text-right">
                                <div className="text-xl lg:text-2xl font-bold text-gray-800">{pledgeAmount.toLocaleString()}</div>
                                <div className="text-sm text-gray-500">PKR</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Investment Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
                <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-6">Investment Summary</h3>
                
                <div className="space-y-4 lg:space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                <Building2 className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium text-gray-700 text-sm lg:text-base">Area to Pledge</span>
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-gray-800">{selectedArea.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">sq. ft.</div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium text-gray-700 text-sm lg:text-base">Investment Amount</span>
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-gray-800">{pledgeAmount.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">PKR</div>
                    </div>

                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">%</span>
                            </div>
                            <span className="font-medium text-gray-700 text-sm lg:text-base">Ownership Percentage</span>
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-gray-800">
                            {((selectedArea / totalArea) * 100).toFixed(2)}%
                        </div>
                        <div className="text-sm text-gray-500">of total project</div>
                    </div>

                    {/* Grid Visualization */}
                    <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4">
                        <div className="text-sm font-medium text-gray-700 mb-3">Selected Area Preview</div>
                        <div className="mb-4">
                            <div
                                className="grid grid-cols-20 gap-[0.5px] bg-gray-100 p-2 rounded-lg"
                                style={{ width: '100%', height: '120px' }}
                            >
                                {Array.from({ length: 400 }, (_, i) => (
                                    <div
                                        key={i}
                                        className={`rounded-sm ${i < Math.floor((selectedArea / availableArea) * 400) ? "bg-blue-400" : "bg-gray-200"}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>{selectedArea.toLocaleString()} sq. ft.</span>
                            <span>{availableArea.toLocaleString()} sq. ft.</span>
                        </div>
                    </div>

                    <div className="pt-4 border-t">
                        <button 
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 lg:py-4 rounded-xl font-semibold text-base lg:text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={selectedArea === 0}
                        >
                            {selectedArea === 0 ? 'Select Area to Proceed' : 'Proceed to Investment'}
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                    border: 3px solid white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                }
                input[type="range"]::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                    border: 3px solid white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    -moz-appearance: none;pro
                }
            `}</style>
        </div>
    );
};

export default SelectedAreaPage;