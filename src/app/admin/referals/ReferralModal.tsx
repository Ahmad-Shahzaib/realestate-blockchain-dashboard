// components/ReferralModal.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store"; // adjust path
// ✅ Correct import
import { createReferral } from "@/redux/reducers/referal/referalSlice"; // ✅ use thunk


import Button from "@/common/Button";

type Props = {
    onClose: () => void;
};

const ReferralModal: React.FC<Props> = ({ onClose }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({
        level: 0,
        percentage: 0,
        description: "",
        isActive: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createReferral(formData))
            .unwrap()
            .then(() => {
                onClose();
            })
            .catch((err) => {
                console.error("Failed to create referral:", err);
            });
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-[600px] bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                    Add Referral Information
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Status */}
                    <div className="flex justify-between">
                        <label className="block text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                            Status
                        </label>
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            className="sr-only peer"
                        />
                        <div className="w-14 h-8 bg-gray-300 rounded-full peer-checked:bg-[#00D2B6] relative cursor-pointer">
                            <div
                                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${formData.isActive ? "translate-x-6" : ""
                                    }`}
                            ></div>
                        </div>
                    </div>

                    {/* Level */}
                    <div>
                        <label className="block text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                            Level
                        </label>
                        <input
                            type="number"
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            placeholder="Enter level"
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>

                    {/* Percentage */}
                    <div>
                        <label className="block text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                            Percentage
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            name="percentage"
                            value={formData.percentage}
                            onChange={handleChange}
                            placeholder="Enter percentage"
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>

                    <Button type="submit" className="w-full font-semibold py-2 px-4">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ReferralModal;
