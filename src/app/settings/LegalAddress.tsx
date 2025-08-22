"use client"

import React, { useState } from "react"
import { Upload } from "lucide-react"

export default function LegalInformation() {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-md hover:shadow-lg transition">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-[#003049] dark:text-white">Legal Information</h2>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Your personal information is completely secure and we don&apos;t share it with anyone.
                    </p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-[#0277BD] font-medium hover:text-[#00B894] transition dark:text-[#4FC3F7] dark:hover:text-[#00E5A0]"
                    >
                        Edit
                    </button>
                )}
            </div>

            {/* CNIC + Tax Filer */}
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <h3 className="text-lg font-semibold text-[#003049] dark:text-white">CNIC</h3>
                    <input
                        type="text"
                        placeholder="00000-0000000-0"
                        className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100 shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-[#00B894] focus:border-[#00B894] transition"
                    />
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-[#003049] dark:text-white pt-2">FBR Tax Filer</h3>
                    {isEditing ? (
                        <div className="mt-2 flex space-x-6">
                            {["Filer", "Non Filer", "Not Provided"].map((label) => (
                                <label key={label} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="tax-status"
                                        className="h-4 w-4 text-[#00B894] focus:ring-[#00B894]"
                                    />
                                    <span className="ml-2 text-gray-700 dark:text-gray-300">{label}</span>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-1 text-gray-600 dark:text-gray-400">Not Provided</p>
                    )}
                </div>
            </div>

            {/* CNIC Upload */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold text-[#003049] dark:text-white">
                    CNIC Front & Back{" "}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        (PNG, JPG, PDF - less than 5 mb)
                    </span>
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {["Front", "Back"].map((side) => (
                        <div
                            key={side}
                            className="rounded-xl border border-gray-200 dark:border-gray-700 
                    bg-[#F5F7FA] dark:bg-gray-800 hover:border-[#00B894] transition"
                        >
                            <input type="file" id={`cnic-${side.toLowerCase()}`} className="hidden" />
                            <label
                                htmlFor={`cnic-${side.toLowerCase()}`}
                                className="flex cursor-pointer flex-col items-center justify-center p-6"
                            >
                                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-md">
                                    <Upload className="h-5 w-5" />
                                </div>
                                <p className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {isEditing
                                        ? `Upload new CNIC ${side.toLowerCase()}`
                                        : `Uploaded CNIC ${side.toLowerCase()}`}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Click to browse files</p>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 rounded-xl font-semibold 
                bg-gradient-to-r from-[#00B894] to-[#00D2B6] 
                text-white shadow-md hover:opacity-90 transition"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                bg-gray-100 dark:bg-gray-700 
                text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>

    )
}
