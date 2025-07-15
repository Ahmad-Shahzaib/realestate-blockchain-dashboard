"use client"

import React, { useState } from "react"
import { Upload } from "lucide-react"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"

export default function LegalInformation() {
    const [isEditing, setIsEditing] = useState(false)
    return (
        <div className="rounded-lg border border-themebgColor bg-background text-black p-6 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Legal Information</h2>
                    <p className="mt-1">
                        Your personal information is completely secure and we don&apos;t share it with anyone.
                    </p>
                </div>
                {!isEditing && (
                    <Button
                        variant="ghost"
                        onClick={() => setIsEditing(true)}
                        className="font-medium hover:underline"
                    >
                        Edit
                    </Button>
                )}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <h3 className="text-lg font-medium">CNIC</h3>
                    <Input
                        type="text"
                        placeholder="00000-0000000-0"
                        className="mt-2 w-full"
                    />
                </div>

                <div>
                    <h3 className="text-lg font-medium pt-2">FBR Tax Filer</h3>
                    {isEditing ? (
                        <div className="mt-2 flex space-x-6">
                            {["Filer", "Non Filer", "Not Provided"].map((label) => (
                                <label key={label} className="flex items-center">
                                    <input type="radio" name="tax-status" className="h-4 w-4 accent-themebgColor" />
                                    <span className="ml-2">{label}</span>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-1">Not Provided</p>
                    )}
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-medium">
                    CNIC Front & Back <span className="text-sm font-normal">(PNG, JPG, PDF - less than 5 mb)</span>
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {["Front", "Back"].map((side, idx) => (
                        <div key={side} className="rounded-md border border-themebgColor bg-background">
                            <input
                                type="file"
                                id={`cnic-${side.toLowerCase()}`}
                                className="hidden"
                            />
                            <label
                                htmlFor={`cnic-${side.toLowerCase()}`}
                                className="flex cursor-pointer flex-col items-center justify-center p-6"
                            >
                                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-themebgColor bg-background">
                                    <Upload className="h-5 w-5 text-black" />
                                </div>
                                <p className="mb-1 text-sm font-medium">
                                    {isEditing ? `Upload new CNIC ${side.toLowerCase()}` : `Uploaded CNIC ${side.toLowerCase()}`}
                                </p>
                                <p className="text-xs text-black/70">Click to browse files</p>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {isEditing && (
                <div className="mt-6 flex justify-end gap-4">
                    <Button
                        onClick={() => setIsEditing(false)}
                        className="border border-themebgColor bg-background text-black"
                    >
                        Update
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => setIsEditing(false)}
                        className="border border-themebgColor bg-background text-black px-4 py-2 hover:bg-background/80"
                    >
                        Cancel
                    </Button>
                </div>
            )}
        </div>
    )
}
