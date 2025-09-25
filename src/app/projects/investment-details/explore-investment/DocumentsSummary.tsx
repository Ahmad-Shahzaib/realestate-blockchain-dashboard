"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle, Upload } from "lucide-react";
import Button from "@/common/Button";

export default function DocumentsSummary() {
    const [address, setAddress] = useState("");
    const [editingAddress, setEditingAddress] = useState(false);
    const [cnic, setCnic] = useState("");
    const [editingCnic, setEditingCnic] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleClick = () => {
        router.push("/projects/investment-details/document-verification");
    };

    // ✅ Read context from query params
    const from = searchParams.get("from");
    const totalInvestment = searchParams.get("totalInvestment");
    const totalArea = searchParams.get("totalArea");

    return (
        <div className="min-h-screen   flex justify-center items-start">
            <div className="w-full  px-3">
                {/* Page Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
                        Documents & Summary
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
                        Provide the required documents and details to ensure a seamless investment process.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    {/* Left Side - Details */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Billing Address */}
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Billing Address */}
                            <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 transition-all hover:shadow-xl">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                                    <span className="mr-2 text-blue-600 dark:text-blue-400">1.</span> Billing Address
                                </h3>
                                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-all hover:bg-gray-100 dark:hover:bg-gray-600">
                                    {editingAddress ? (
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Enter your billing address"
                                            className="flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 rounded-md px-3 py-2"
                                        />
                                    ) : (
                                        <span className="text-sm text-gray-700 dark:text-gray-200">
                                            {address || "Primary Address (Used in your previous transaction)"}
                                        </span>
                                    )}
                                    <Button
                                        onClick={() => setEditingAddress(!editingAddress)}
                                        className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                                    >
                                        {editingAddress ? "Save" : "Add"}
                                    </Button>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 transition-all hover:shadow-xl">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                                    <span className="mr-2 text-blue-600 dark:text-blue-400">2.</span> Contact Information
                                </h3>
                                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-all hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                                            Primary Phone
                                        </span>
                                        <span className="text-sm font-semibold text-gray-800 dark:text-white">
                                            +92 304 0057 791
                                        </span>
                                        <span className="flex items-center text-green-600 dark:text-green-400 text-sm gap-1">
                                            <CheckCircle size={18} /> Verified
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CNIC */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 transition-all hover:shadow-xl">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                                <span className="mr-2 text-blue-600 dark:text-blue-400">3.</span> CNIC
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-all hover:bg-gray-100 dark:hover:bg-gray-600">
                                    {editingCnic ? (
                                        <input
                                            type="text"
                                            value={cnic}
                                            onChange={(e) => setCnic(e.target.value)}
                                            placeholder="421XX-XXXXXXX-X"
                                            className="flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 rounded-md px-3 py-2"
                                        />
                                    ) : (
                                        <span className="flex-1 text-sm text-gray-700 dark:text-gray-200">
                                            {cnic || "421XX-XXXXXXX-X"}
                                        </span>
                                    )}
                                    <Button
                                        onClick={() => setEditingCnic(!editingCnic)}
                                        className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                                    >
                                        {editingCnic ? "Save" : "Update"}
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 transition-all cursor-pointer group">
                                        <Upload size={28} className="mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                                        <p className="text-sm font-medium">Upload CNIC Front</p>
                                        <input type="file" accept=".png,.jpg,.jpeg,.pdf" className="hidden" />
                                    </label>
                                    <label className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 transition-all cursor-pointer group">
                                        <Upload size={28} className="mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                                        <p className="text-sm font-medium">Upload CNIC Back</p>
                                        <input type="file" accept=".png,.jpg,.jpeg,.pdf" className="hidden" />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    (PNG, JPG, PDF - less than 5 MB)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Order Summary */}
                    <div className="bg-white w-90 dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sticky top-8 h-[450px] ">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                            {from === "explore" ? "Explore Investments" : "Order Summary"}
                        </h3>

                        {/* Discount Voucher */}
                        <div className="mb-6">
                            <label className="text-sm font-semibold text-gray-800 dark:text-white">
                                Apply Discount Voucher
                            </label>
                            <div className="flex mt-2">
                                <input
                                    type="text"
                                    placeholder="Enter Voucher Code"
                                    className="flex-1 border border-r-0 rounded-l-lg px-4 py-2 text-sm text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 transition-all"
                                />
                                <Button className="">
                                    Apply
                                </Button>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-800 dark:text-white">Total Area Pledged</span>
                                <span className="font-semibold text-gray-800 dark:text-white">
                                    {totalArea ? `${Number(totalArea).toLocaleString()} sq.ft.` : "1,005 sq.ft."}
                                </span>
                            </div>
                            {/* <div className="flex justify-between">
                                <span className="font-medium text-gray-800 dark:text-white">Retail Price</span>
                                <span className="font-semibold text-gray-800 dark:text-white">22,000 PKR/sq.ft</span>
                            </div> */}
                            <div className="flex justify-between font-semibold text-lg">
                                <span className="text-gray-800 dark:text-white">Payable Amount</span>
                                <span className="text-gray-800 dark:text-white">
                                    {totalInvestment ? `${Number(totalInvestment).toLocaleString()} PKR` : "22,110,000 PKR"}
                                </span>
                            </div>
                        </div>

                        {/* Confirm Checkbox */}
                        <div className="flex items-center mb-6">
                            <input
                                type="checkbox"
                                id="confirm"
                                className="w-5 h-5 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-600 dark:focus:ring-blue-400"
                            />
                            <label htmlFor="confirm" className="ml-2 text-sm text-gray-800 dark:text-white">
                                I confirm the information provided is accurate
                            </label>
                        </div>

                        {/* Checkout Button */}
                        <Button
                            onClick={handleClick}
                            className="w-full text-white py-3 rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg"
                        >
                            Proceed to Checkout
                        </Button>

                        <div className="mt-4 text-sm text-blue-600 dark:text-blue-400 text-center cursor-pointer hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                            Go Back
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}