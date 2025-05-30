"use client"

import React, { useState } from "react"
import { Upload } from "lucide-react"

export default function LegalInformation() {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Legal Information</h2>
                    <p className="mt-1 text-gray-600">
                        Your personal information is completely secure and we don&apos;t share it with anyone.
                    </p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Edit
                    </button>
                )}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">CNIC</h3>
                    {isEditing ? (
                        <input
                            type="text"
                            placeholder="00000-0000000-0"
                            className="mt-2 w-full rounded-md bg-gray-50 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="mt-1 text-gray-700">00000-0000000-0</p>
                    )}
                </div>

                <div>
                    <h3 className="text-lg font-medium text-gray-900">FBR Tax Filer</h3>
                    {isEditing ? (
                        <div className="mt-2 flex space-x-6">
                            {["Filer", "Non Filer", "Not Provided"].map((label) => (
                                <label key={label} className="flex items-center">
                                    <input type="radio" name="tax-status" className="h-4 w-4 text-blue-600" />
                                    <span className="ml-2 text-gray-700">{label}</span>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-1 text-gray-700">Not Provided</p>
                    )}
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">
                    CNIC Front & Back <span className="text-sm font-normal text-gray-500">(PNG, JPG, PDF - less than 5 mb)</span>
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {["Front", "Back"].map((side, idx) => (
                        <div key={side} className="rounded-md border border-gray-300 bg-gray-50">
                            <input
                                type="file"
                                id={`cnic-${side.toLowerCase()}`}
                                className="hidden"
                            />
                            <label
                                htmlFor={`cnic-${side.toLowerCase()}`}
                                className="flex cursor-pointer flex-col items-center justify-center p-6"
                            >
                                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                                    <Upload className="h-5 w-5 text-blue-600" />
                                </div>
                                <p className="mb-1 text-sm font-medium text-blue-600">
                                    {isEditing ? `Upload new CNIC ${side.toLowerCase()}` : `Uploaded CNIC ${side.toLowerCase()}`}
                                </p>
                                <p className="text-xs text-gray-500">Click to browse files</p>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {isEditing && (
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    )
}
