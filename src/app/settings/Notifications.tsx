"use client"

import React from "react"

export default function Notifications() {
    return (
        <div className="rounded-lg custom-border bg-background text-text border border-border p-6 shadow-sm">
            <h2 className="text-2xl font-bold ">Notifications</h2>
            <p className="mt-1 ">
                Your personal information is completely secure and we don’t share it with anyone.
            </p>

            <div className="mt-8 space-y-4">
                {/* Push Notifications */}
                <div className="flex items-center justify-between rounded-md custom-border bg-background border border-border px-4 py-3">
                    <span className="font-medium text-text">Push Notifications</span>
                    <label htmlFor="push-toggle" className="relative inline-flex cursor-pointer items-center">
                        <input
                            type="checkbox"
                            id="push-toggle"
                            className="sr-only peer"
                            title="Enable push notifications"
                        />
                        <div className="w-11 h-6 bg-border/40 rounded-full peer peer-checked:bg-background transition-all duration-300 border border-border"></div>
                        <div className="absolute left-0.5 top-0.5 h-5 w-5 bg-background text-text border border-border rounded-full shadow-md transform peer-checked:translate-x-full transition-transform duration-300"></div>
                        <span className="sr-only">Enable push notifications</span>
                    </label>
                </div>

                {/* SMS Notifications */}
                <div className="flex items-center justify-between rounded-md custom-border bg-background border border-border px-4 py-3">
                    <span className="font-medium text-text">SMS Notifications</span>
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input
                            type="checkbox"
                            id="sms-toggle"
                            className="sr-only peer"
                            title="Enable SMS notifications"
                        />
                        <span className="sr-only">Enable SMS notifications</span>
                        <div className="w-11 h-6 bg-border/40 rounded-full peer peer-checked:bg-background transition-all duration-300 border border-border"></div>
                        <div className="absolute left-0.5 top-0.5 h-5 w-5 bg-background text-text border border-border rounded-full shadow-md transform peer-checked:translate-x-full transition-transform duration-300"></div>
                    </label>
                </div>
            </div>

        </div>
    )
}
