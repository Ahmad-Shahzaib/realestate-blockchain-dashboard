"use client"

import React from "react"

export default function Notifications() {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white dark:bg-dark dark:border-gray-700 p-6 shadow-md hover:shadow-lg transition">
            {/* Header */}
            <h2 className="text-2xl font-bold text-[#003049] dark:text-white">Notifications</h2>
            <p className="mt-1 text-dark dark:text-gray-300">
                Manage how you want to receive alerts and stay updated.
            </p>

            <div className="mt-8 space-y-4">
                {/* Push Notifications */}
                <div className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 bg-[#F5F7FA] dark:bg-dark hover:border-[#00B894] transition">
                    <span className="font-medium text-gray-700 dark:text-gray-200">Push Notifications</span>
                    <label htmlFor="push-toggle" className="relative inline-flex cursor-pointer items-center">
                        <input
                            type="checkbox"
                            id="push-toggle"
                            className="sr-only peer"
                            title="Enable push notifications"
                        />
                        {/* Track */}
                        <div className="w-11 h-6 rounded-full bg-gray-300 dark:bg-dark peer-checked:bg-gradient-to-r peer-checked:from-[#00B894] peer-checked:to-[#00D2B6] transition-all duration-300"></div>
                        {/* Thumb */}
                        <div className="absolute left-0.5 top-0.5 h-5 w-5 bg-white dark:bg-gray-200 rounded-full shadow-md transform peer-checked:translate-x-full transition-transform duration-300"></div>
                        <span className="sr-only">Enable push notifications</span>
                    </label>
                </div>

                {/* SMS Notifications */}
                <div className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 bg-[#F5F7FA] dark:bg-dark hover:border-[#00B894] transition">
                    <span className="font-medium text-gray-700 dark:text-gray-200">SMS Notifications</span>
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input
                            type="checkbox"
                            id="sms-toggle"
                            className="sr-only peer"
                            title="Enable SMS notifications"
                        />
                        <span className="sr-only">Enable SMS notifications</span>
                        {/* Track */}
                        <div className="w-11 h-6 rounded-full bg-gray-300 dark:bg-dark peer-checked:bg-gradient-to-r peer-checked:from-[#00B894] peer-checked:to-[#00D2B6] transition-all duration-300"></div>
                        {/* Thumb */}
                        <div className="absolute left-0.5 top-0.5 h-5 w-5 bg-white dark:bg-gray-200 rounded-full shadow-md transform peer-checked:translate-x-full transition-transform duration-300"></div>
                    </label>
                </div>
            </div>
        </div>

    )
}
