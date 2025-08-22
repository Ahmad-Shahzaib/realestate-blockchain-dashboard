"use client"

import React, { useState } from 'react'
import AreaDetailPage from './AreaDetailPage';
import SelectedAreaPage from './SelectedAreaPage';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

interface ProjectDetailsPageProps {
    projectId?: string;
}

const ProjectDetailsPage = ({ projectId }: ProjectDetailsPageProps) => {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 lg:p-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Project Info */}
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-[#00B894] to-[#00D2B6] rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-xl">UD</span>
                        </div>
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-[#003049]">
                                Urban Dwellings
                            </h2>
                            <div className="flex items-center gap-3 text-gray-600">
                                <span className="text-sm font-medium uppercase tracking-wide">
                                    Area I Own
                                </span>
                                <div className="w-4 h-4 bg-[#00B894] rounded-full"></div>
                                <span className="text-lg font-semibold text-[#003049]">
                                    0 sq. ft.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-4 lg:gap-8 overflow-x-auto py-2">
                        {[
                            { step: 1, label: "Select Area" },
                            { step: 2, label: "Summary" },
                            { step: 3, label: "Confirmation" },
                        ].map((item, index) => (
                            <React.Fragment key={item.step}>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shadow-sm transition-colors ${currentStep >= item.step
                                            ? "bg-[#00B894] text-white"
                                            : "bg-gray-100 text-gray-400"
                                            }`}
                                    >
                                        {item.step}
                                    </div>
                                    <span
                                        className={`text-sm font-medium ${currentStep >= item.step ? "text-[#003049]" : "text-gray-400"
                                            } whitespace-nowrap`}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                                {index < 2 && (
                                    <div
                                        className={`w-8 lg:w-12 h-0.5 flex-shrink-0 transition-colors ${currentStep > item.step ? "bg-[#00B894]" : "bg-gray-200"
                                            }`}
                                    ></div>
                                )}
                            </React.Fragment>
                        ))}
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