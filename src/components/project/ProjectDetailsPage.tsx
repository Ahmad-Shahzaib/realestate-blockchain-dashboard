import React from 'react'
import AreaDetailPage from './AreaDetailPage';
import SelectedAreaPage from './SelectedAreaPage';
interface ProjectDetailsPageProps {
    projectId?: string;

}


const ProjectDetailsPage = ({ projectId }: ProjectDetailsPageProps) => {
    return (
        <>
            <div className="w-full bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                    {/* Left Section - Logo and Area Info */}
                    <div className="flex flex-col space-y-4">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-orange-400 rounded-md flex items-center justify-center">
                                <span className="text-white font-bold text-lg">UD</span>
                            </div>
                            <span className="text-xl font-medium text-gray-800">Urban Dwellings</span>
                        </div>

                        {/* Area I Own */}
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-500 text-sm font-medium">AREA I OWN</span>
                            <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
                            <span className="text-gray-800 font-semibold">0</span>
                            <span className="text-gray-500 text-sm">sq. ft.</span>
                        </div>
                    </div>

                    {/* Right Section - Progress Steps */}
                    <div className="flex items-center space-x-8">
                        {/* Step 1 - Active */}
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold">1</span>
                                </div>
                                <span className="text-gray-800 font-medium mt-2">Select Area</span>
                            </div>
                            <div className="w-24 h-1 bg-teal-400 rounded-full"></div>
                        </div>

                        {/* Step 2 - Inactive */}
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center border-2 border-gray-400">
                                    <span className="text-gray-600 font-semibold">2</span>
                                </div>
                                <span className="text-gray-500 font-medium mt-2">Summary</span>
                            </div>
                            <div className="w-24 h-1 bg-gray-300 rounded-full"></div>
                        </div>

                        {/* Step 3 - Inactive */}
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center border-2 border-gray-400">
                                <span className="text-gray-600 font-semibold">3</span>
                            </div>
                            <span className="text-gray-500 font-medium mt-2">Confirmation</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-between py-2'>
                <AreaDetailPage />

            </div>
            <SelectedAreaPage />
        </>
    )
}

export default ProjectDetailsPage