"use client"

import { useState } from "react"

export default function SetPasswordSection() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="mt-5 p-6 bg-white  transition dark:bg-dark dark:text-white">
            {/* Section Header */}
            <h2 className="text-2xl font-bold text-[#003049] dark:text-white">Set up Password</h2>
            <p className="mt-2 font-medium text-gray-700 dark:text-gray-300">
                Set up a new login password for your account email
                <br />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    Note: Besides using login credentials, you will still be able to use "Sign In with Google" after setting up a password.
                </span>
            </p>

            {/* Open Modal Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-5 px-6 py-2 rounded-xl font-semibold 
      bg-gradient-to-r from-[#00B894] to-[#00D2B6] 
      text-white shadow-md hover:opacity-90 transition"
            >
                Set Your Password
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center ">
                    <div className="bg-white dark:bg-dark w-full max-w-md p-6 rounded-2xl shadow-xl relative">
                        <h3 className="text-xl font-semibold text-[#003049] dark:text-white mb-4">
                            Set New Password
                        </h3>

                        <div className="space-y-4">
                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-[#003049] dark:text-gray-200">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-dark-2 dark:text-white px-3 py-2 shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-[#00B894] focus:border-[#00B894] transition"
                                    placeholder="Enter new password"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-[#003049] dark:text-gray-200">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-dark-2 dark:text-white px-3 py-2 shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-[#00B894] focus:border-[#00B894] transition"
                                    placeholder="Confirm password"
                                />
                            </div>

                            {/* Update Button */}
                            <button
                                className="w-full px-6 py-2 rounded-xl font-semibold 
              bg-gradient-to-r from-[#00B894] to-[#00D2B6] 
              text-white shadow-md hover:opacity-90 transition"
                            >
                                Update Password
                            </button>

                            {/* Cancel */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-2 w-full text-sm text-gray-600 dark:text-gray-400 hover:text-[#00B894] hover:underline transition"
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
