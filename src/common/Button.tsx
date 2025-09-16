import React from "react";
// Define props interface for type safety
interface ButtonProps {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
    className?: string;
    disabled?: boolean;
}
// Button component
const Button: React.FC<ButtonProps> = ({ children, onClick, type = "button", className = "", disabled = false }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-lg bg-[#00D2B6] dark:bg-dark border text-white font-semibold shadow-md hover:opacity-90 transition focus:ring-2 focus:ring-[#00B894] focus:ring-offset-2 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
