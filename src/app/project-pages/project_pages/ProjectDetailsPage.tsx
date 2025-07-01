"use client"

import React, { useState } from 'react'
import AreaDetailPage from './AreaDetailPage';
import SelectedAreaPage from './SelectedAreaPage';
import { useRouter } from 'next/navigation';

interface ProjectDetailsPageProps {
    projectId?: string;
}

const ProjectDetailsPage = ({ projectId }: ProjectDetailsPageProps) => {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 lg:p-8">
            {/* Project Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 mb-6 lg:mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">UD</span>
                        </div>
                        <div>
                            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Urban Dwellings</h2>
                            <div className="flex items-center gap-2 text-gray-500">
                                <span className="text-sm">AREA I OWN</span>
                                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                <span className="font-medium">0 sq. ft.</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Progress Steps */}
                    <div className="flex items-center gap-2 lg:gap-8 overflow-x-auto">
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                1
                            </div>
                            <span className={`text-xs lg:text-sm ${currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-400'} whitespace-nowrap`}>Select Area</span>
                        </div>
                        <div className="w-6 lg:w-12 h-0.5 bg-gray-200 flex-shrink-0"></div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                2
                            </div>
                            <span className={`text-xs lg:text-sm ${currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-400'} whitespace-nowrap`}>Summary</span>
                        </div>
                        <div className="w-6 lg:w-12 h-0.5 bg-gray-200 flex-shrink-0"></div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                3
                            </div>
                            <span className={`text-xs lg:text-sm ${currentStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-400'} whitespace-nowrap`}>Confirmation</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Area Details */}
            <AreaDetailPage />

            {/* Selected Area */}
            <SelectedAreaPage />
        </div>
    )
}

export default ProjectDetailsPage