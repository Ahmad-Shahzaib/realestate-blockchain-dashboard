"use client"

import { useState } from "react"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"

export default function SetPasswordSection() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="mt-5 p-4 custom-border rounded bg-background text-black border border-themebgColor">
            <h2 className="text-2xl font-bold">Set up Password</h2>
            <p className="mt-1 font-medium">
                Set up a new login password for your account email
                <br />
                <span className="text-sm">
                    Note: Besides using login credentials, you will still be able to use "Sign In with Google" after setting up a password.
                </span>
            </p>

            <Button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 rounded-md bg-background text-black border border-themebgColor px-4 py-2 font-medium hover:bg-background/80 transition"
            >
                Set Your Password
            </Button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
                    <div className="bg-background w-full max-w-md p-6 rounded-lg shadow-lg relative border border-themebgColor text-black">
                        <h3 className="text-xl font-semibold mb-4 text-black">Set New Password</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-black">Password</label>
                                <Input
                                    type="password"
                                    className="mt-1 w-full rounded-md border border-themebgColor px-3 py-2 bg-background text-black focus:outline-none focus:ring-2 focus:ring-themebgColor"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black">Confirm Password</label>
                                <Input
                                    type="password"
                                    className="mt-1 w-full rounded-md border border-themebgColor px-3 py-2 bg-background text-black focus:outline-none focus:ring-2 focus:ring-themebgColor"
                                    placeholder="Confirm password"
                                />
                            </div>
                            <Button
                                className="w-full bg-background text-black border border-themebgColor font-medium py-2 rounded-md hover:bg-background/80 transition"
                            >
                                Update Password
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => setIsModalOpen(false)}
                                className="mt-2 w-full text-sm text-black hover:underline"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
