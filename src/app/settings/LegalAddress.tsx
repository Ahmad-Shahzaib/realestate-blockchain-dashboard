"use client"

import React, { useState } from "react"
import { Upload } from "lucide-react"

export default function LegalInformation() {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className="rounded-lg custom-border bg-background text-text p-6 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold ">Legal Information</h2>
                    <p className="mt-1 ">
                        Your personal information is completely secure and we don&apos;t share it with anyone.
                    </p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="font-medium hover:underline text-text"
                    >
                        Edit
                    </button>
                )}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <h3 className="text-lg font-medium ">CNIC</h3>
                    <input
                        type="text"
                        placeholder="00000-0000000-0"
                        className="mt-2 w-full rounded-md px-4 py-2 text-text bg-background border border-border focus:outline-none focus:ring-2 focus:ring-border"
                    />
                </div>

                <div>
                    <h3 className="text-lg font-medium pt-2">FBR Tax Filer</h3>
                    {isEditing ? (
                        <div className="mt-2 flex space-x-6">
                            {["Filer", "Non Filer", "Not Provided"].map((label) => (
                                <label key={label} className="flex items-center text-text">
                                    <input type="radio" name="tax-status" className="h-4 w-4 text-border" />
                                    <span className="ml-2 ">{label}</span>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-1 text-text">Not Provided</p>
                    )}
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-medium ">
                    CNIC Front & Back <span className="text-sm font-normal">(PNG, JPG, PDF - less than 5 mb)</span>
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {["Front", "Back"].map((side, idx) => (
                        <div key={side} className="rounded-md custom-border bg-background border border-border">
                            <input
                                type="file"
                                id={`cnic-${side.toLowerCase()}`}
                                className="hidden"
                            />
                            <label
                                htmlFor={`cnic-${side.toLowerCase()}`}
                                className="flex cursor-pointer flex-col items-center justify-center p-6 text-text"
                            >
                                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border">
                                    <Upload className="h-5 w-5 text-text" />
                                </div>
                                <p className="mb-1 text-sm font-medium ">
                                    {isEditing ? `Upload new CNIC ${side.toLowerCase()}` : `Uploaded CNIC ${side.toLowerCase()}`}
                                </p>
                                <p className="text-xs text-text/70">Click to browse files</p>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {isEditing && (
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="custom-button bg-background text-text border border-border"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="rounded-md bg-background text-text border border-border px-4 py-2 hover:bg-background/80"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    )
}
