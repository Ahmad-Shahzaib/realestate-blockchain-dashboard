import React from 'react';
import { Search } from 'lucide-react';

// Define props interface for type safety
interface SearchInputProps {
    placeholder?: string; // Optional placeholder text
    value: string; // Input value
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change event handler
    icon?: React.ReactNode; // Optional custom icon
}

// Functional component with typed props
const SearchInput: React.FC<SearchInputProps> = ({
    placeholder = 'Search...', // Default placeholder
    value,
    onChange,
    icon,
}) => {
    return (
        <div className="relative">
            {/* Icon container */}
            <span
                className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
        "
            >
                {icon || (
                    <Search
                        className="
              h-5 w-5
              text-[#34495E]
              dark:text-gray-3
            "
                    />
                )}
            </span>

            {/* Search input field */}
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="
          w-full
          pl-10 pr-4 py-2
          border border-[#ECF0F1]
          rounded-lg
          focus:ring-2
          focus:ring-[#3498DB]
          focus:border-[#3498DB]
          text-[#34495E]
          dark:border-dark-4
          dark:bg-dark-3
          dark:text-gray-2
        "
            />
        </div>
    );
};

export default SearchInput;