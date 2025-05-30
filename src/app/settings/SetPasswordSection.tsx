"use client"

import { useState } from "react"

export default function SetPasswordSection() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="mt-5 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Set up Password</h2>
            <p className="mt-1 text-gray-600 font-medium ">
                Set up a new login password for your account email
                <br />
                <span className="text-sm text-gray-500">
                    Note: Besides using login credentials, you will still be able to use "Sign In with Google" after setting up a password.
                </span>
            </p>

            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
            >
                Set Your Password
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center ">
                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Set New Password</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Confirm password"
                                />
                            </div>
                            <button
                                className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Update Password
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-2 w-full text-sm text-gray-600 hover:underline"
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
