import React from "react";
import { Info, TrendingUp, Building2, Lock, Unlock } from "lucide-react";
import { motion } from "framer-motion";

interface AreaDetailPageeProps {
    project: any;
}

const AreaDetailPage = ({ project }: AreaDetailPageeProps) => {
    // Animation variants for cards
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mb-8"
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.2 } },
            }}
        >
            {/* Current Price */}
            <motion.div
                variants={cardVariants}
                className="bg-white dark:bg-dark-2 rounded-xl p-2 lg:p-3 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
                <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-[#00B894]" />
                    <span className="text-sm font-medium text-[#003049] dark:text-white uppercase tracking-wide">
                        Current Price
                    </span>
                    <Info className="w-4 h-4 text-[#00D2B6]" />
                </div>
                <div className="text-3xl font-bold text-[#003049] dark:text-white">
                    {project.floors?.[0]?.pricePerSqFt}

                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">PKR / sq. ft.</div>
            </motion.div>

            {/* Total Area */}
            <motion.div
                variants={cardVariants}
                className="bg-white dark:bg-dark-2 rounded-xl p-6 lg:p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
                <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-[#00B894]" />
                    <span className="text-sm font-medium text-[#003049] dark:text-white uppercase tracking-wide">
                        Total Area
                    </span>
                </div>
                <div className="text-3xl font-bold text-[#003049] dark:text-white">
                    {project.totalArea}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">sq. ft.</div>
            </motion.div>

            {/* Area Locked */}
            <motion.div
                variants={cardVariants}
                className="bg-white dark:bg-dark-2 rounded-xl p-6 lg:p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
                <div className="flex items-center gap-2 mb-3">
                    <Lock className="w-5 h-5 text-[#00B894]" />
                    <span className="text-sm font-medium text-[#003049] dark:text-white uppercase tracking-wide">
                        Area Locked
                    </span>
                </div>
                <div className="text-3xl font-bold text-[#003049] dark:text-white">
                    {project.soldUnits}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">sq. ft.</div>
            </motion.div>

            {/* Area Left */}
            <motion.div
                variants={cardVariants}
                className="bg-white dark:bg-dark-2 rounded-xl p-6 lg:p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
                <div className="flex items-center gap-2 mb-3">
                    <Unlock className="w-5 h-5 text-[#00B894]" />
                    <span className="text-sm font-medium text-[#003049] dark:text-white uppercase tracking-wide">
                        Area Left
                    </span>
                </div>
                <div className="text-3xl font-bold text-[#003049] dark:text-white">
                    {project.sellableArea}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">sq. ft.</div>
            </motion.div>
        </motion.div>
    );
};

export default AreaDetailPage;
