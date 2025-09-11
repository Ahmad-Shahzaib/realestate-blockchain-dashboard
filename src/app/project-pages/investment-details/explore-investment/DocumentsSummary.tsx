"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle, Upload } from "lucide-react";
import Button from "@/common/Button";

export default function DocumentsSummary() {
    const [address, setAddress] = useState("");
    const [editingAddress, setEditingAddress] = useState(false);

    const [cnic, setCnic] = useState("");
    const [editingCnic, setEditingCnic] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        router.push("/project-pages/investment-details/document-verification");
    };


    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Page Title */}
            <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
                Documents & Summary
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Please fill out and provide the documents to have a smoother investment experience
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side - Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Billing Address */}
                    <div className="border rounded-lg p-5 dark:border-gray-700">
                        <h3 className="font-semibold mb-3 text-black dark:text-white">
                            1. Verify your billing address
                        </h3>
                        <div className="flex items-center justify-between border rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            {editingAddress ? (
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter your billing address"
                                    className="flex-1 bg-transparent outline-none text-sm text-black dark:text-white"
                                />
                            ) : (
                                <span className="text-sm text-black dark:text-white">
                                    {address || "PRIMARY ADDRESS (Used in your previous transaction)"}
                                </span>
                            )}
                            <Button
                                onClick={() => setEditingAddress(!editingAddress)}
                                className="text-blue-600 font-medium text-sm"
                            >
                                {editingAddress ? "Save" : "Add"}
                            </Button>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="border rounded-lg p-5 dark:border-gray-700">
                        <h3 className="font-semibold mb-3 text-black dark:text-white">
                            2. Contact Information
                        </h3>
                        <div className="flex items-center justify-between border rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    PRIMARY PHONE
                                </span>
                                <input
                                    type="tel"
                                    defaultValue="+92 304 0057 791"
                                    className="bg-transparent outline-none text-sm font-medium text-black dark:text-white"
                                    readOnly
                                />
                                <span className="flex items-center text-green-600 text-sm gap-1">
                                    <CheckCircle size={16} /> Verified
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* CNIC */}
                    <div className="border rounded-lg p-5 dark:border-gray-700">
                        <h3 className="font-semibold mb-3 text-black dark:text-white">3. CNIC</h3>

                        {editingCnic ? (
                            <input
                                type="text"
                                value={cnic}
                                onChange={(e) => setCnic(e.target.value)}
                                placeholder="421XX-XXXXXXX-X"
                                className="w-full border rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm text-black dark:text-white mb-4"
                            />
                        ) : (
                            <input
                                type="text"
                                value={cnic}
                                placeholder="421XX-XXXXXXX-X"
                                className="w-full border rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm text-black dark:text-white mb-4"
                                disabled
                            />
                        )}

                        <Button
                            onClick={() => setEditingCnic(!editingCnic)}
                            className="text-blue-600 font-medium text-sm mb-4 block"
                        >
                            {editingCnic ? "Save" : "Update"}
                        </Button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 dark:border-gray-700 hover:border-blue-600 cursor-pointer">
                                <Upload size={24} className="mb-2" />
                                <p className="text-sm">Upload new CNIC front</p>
                                <input type="file" accept=".png,.jpg,.jpeg,.pdf" className="hidden" />
                            </label>
                            <label className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 dark:border-gray-700 hover:border-blue-600 cursor-pointer">
                                <Upload size={24} className="mb-2" />
                                <p className="text-sm">Upload new CNIC back</p>
                                <input type="file" accept=".png,.jpg,.jpeg,.pdf" className="hidden" />
                            </label>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            (PNG, JPG, PDF - less than 5 mb)
                        </p>
                    </div>
                </div>

                {/* Right Side - Order Summary */}
                <div className="border rounded-lg p-6 bg-white shadow-sm dark:bg-gray-900 dark:border-gray-700">
                    <h3 className="font-semibold mb-4 text-black dark:text-white">Order Summary</h3>

                    {/* Discount Voucher */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-black dark:text-white">
                            Apply Discount Voucher
                        </label>
                        <div className="flex mt-2">
                            <input
                                type="text"
                                placeholder="Voucher Code"
                                className="flex-1 border rounded-l-lg px-3 py-2 text-sm text-black dark:text-white dark:bg-gray-800 dark:border-gray-700"
                            />
                            <Button className="">
                                Apply
                            </Button>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                        <div className="flex justify-between">
                            <span className="text-black dark:text-white">TOTAL AREA PLEDGED</span>
                            <span className="font-medium text-black dark:text-white">1,005 sq.ft.</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-black dark:text-white">RETAIL PRICE</span>
                            <span className="font-medium text-black dark:text-white">22,000 PKR/sq.ft</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span className="text-black dark:text-white">PAYABLE AMOUNT</span>
                            <span className="text-black dark:text-white">22,110,000 PKR</span>
                        </div>
                    </div>

                    {/* Confirm Checkbox */}
                    <div className="flex items-center mb-4">
                        <input type="checkbox" id="confirm" className="mr-2" />
                        <label htmlFor="confirm" className="text-sm text-black dark:text-white">
                            I confirm the information I provided is accurate
                        </label>
                    </div>

                    {/* Checkout Button */}
                    <Button
                        onClick={handleClick}
                        className="w-full  text-white py-3 rounded-lg font-medium">
                        Checkout
                    </Button>

                    <div className="mt-3 text-sm text-blue-600 text-center cursor-pointer">
                        Go Back
                    </div>
                </div>
            </div>
        </div>
    );
}
