"use client"

import { useState } from "react"

export default function SetPasswordSection() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="mt-5 p-4 custom-border rounded bg-background text-text border border-border">
            <h2 className="text-2xl font-bold">Set up Password</h2>
            <p className="mt-1 font-medium ">
                Set up a new login password for your account email
                <br />
                <span className="text-sm">
                    Note: Besides using login credentials, you will still be able to use "Sign In with Google" after setting up a password.
                </span>
            </p>

            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 rounded-md bg-background text-text border border-border px-4 py-2 font-medium hover:bg-background/80 transition"
            >
                Set Your Password
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
                    <div className="bg-background w-full max-w-md p-6 rounded-lg shadow-lg relative border border-border text-text">
                        <h3 className="text-xl font-semibold mb-4 text-text">Set New Password</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text">Password</label>
                                <input
                                    type="password"
                                    className="mt-1 w-full rounded-md border border-border px-3 py-2 bg-background text-text focus:outline-none focus:ring-2 focus:ring-border"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text">Confirm Password</label>
                                <input
                                    type="password"
                                    className="mt-1 w-full rounded-md border border-border px-3 py-2 bg-background text-text focus:outline-none focus:ring-2 focus:ring-border"
                                    placeholder="Confirm password"
                                />
                            </div>
                            <button
                                className="w-full bg-background text-text border border-border font-medium py-2 rounded-md hover:bg-background/80 transition"
                            >
                                Update Password
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-2 w-full text-sm text-text hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
