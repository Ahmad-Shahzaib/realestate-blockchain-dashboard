"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"


export default function Notifications() {
    return (
        <div className="rounded-lg custom-border bg-background text-black border themebgColor p-6 shadow-sm">
            <h2 className="text-2xl font-bold ">Notifications</h2>
            <p className="mt-1 ">
                Your personal information is completely secure and we don’t share it with anyone.
            </p>

            <div className="mt-8 space-y-4">
                {/* Push Notifications */}
                <div className="flex items-center justify-between rounded-md custom-border bg-background border themebgColor px-4 py-3">
                    <span className="font-medium text-black">Push Notifications</span>
                    <div className="flex items-center gap-2">
                        <Input type="checkbox" id="push-toggle" title="Enable push notifications" />
                        <Button>Save</Button>
                    </div>
                </div>

                {/* SMS Notifications */}
                <div className="flex items-center justify-between rounded-md custom-border bg-background border themebgColor px-4 py-3">
                    <span className="font-medium text-black">SMS Notifications</span>
                    <div className="flex items-center gap-2">
                        <Input type="checkbox" id="sms-toggle" title="Enable SMS notifications" />
                        <Button>Save</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}
