// components/StatCard.tsx
import React from 'react';
// Define props interface for type safety
interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    percentage?: string;
    percentageColor?: string;
    percentageText?: string;
    badge?: string;
    progress?: number;
}
// Functional component with typed props and default values where applicable 
const StatCard: React.FC<StatCardProps> = ({
    icon,
    title,
    value,

}) => {
    return (
        <div
            className="
        relative
        border border-gray-200 dark:border-gray-700
        rounded-2xl
        p-6
        hover:border-[#00B894]/50
        transition-all duration-300
        group
        bg-white dark:bg-dark-2
      "
        >

            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className="
              p-2
              bg-gradient-to-br from-[#00B894]/20 to-[#00D2B6]/20
              rounded-2xl
              border border-[#00B894]/30
              group-hover:border-[#00B894]/50
              transition-colors
              text-[#003049] dark:text-gray-2
            "
                    >
                        {icon}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-3">{title}</p>
                        <p className="text-2xl font-bold mt-1 text-[#003049] dark:text-gray-2">{value}</p>
                    </div>
                </div>
            </div>

            {/* Hover effect overlay */}
            <div
                className="
          absolute inset-0
          bg-gradient-to-r from-[#00B894]/5 to-[#00D2B6]/5
          rounded-2xl
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
            />
        </div>
    );
};

export default StatCard;