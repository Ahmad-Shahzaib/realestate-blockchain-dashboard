"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Button from "@/common/Button";

interface TransactionPageProps {
    project: any
}

export default function TransactionPage({ project }: TransactionPageProps) {
    const [activeStep, setActiveStep] = useState<"guide" | "confirm" | "completed">("guide");
    const [subTab, setSubTab] = useState<"crypto" | "cash" | "bank">("crypto");

    const handleCompletion = () => {
        setActiveStep("completed");
    };

    const handleFinalContinue = () => {
        toast.success("🎉 Transaction Completed Successfully!");
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 flex justify-center items-start py-3">
            <Toaster position="top-right" />
            <div className="w-full max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Sidebar Tabs */}
                <div className=" bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
                    style={{ height: "400px" }}>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                        Transaction Dashboard
                    </h1>
                    <div className="flex flex-col space-y-4">
                        <Button
                            onClick={() => setActiveStep("guide")}
                            className={`px-4 py-2 rounded-lg font-semibold text-left transition-all ${activeStep === "guide"
                                ? " text-white shadow-md"
                                : "text-gray-600 dark:text-gray-300  dark:hover:bg-gray-700"
                                }`}
                        >
                            Payment Guide
                        </Button>
                        <Button
                            onClick={() => setActiveStep("confirm")}
                            className={`px-4 py-2 rounded-lg font-semibold text-left transition-all ${activeStep === "confirm"
                                ? " text-white shadow-md"
                                : "text-gray-600 dark:text-gray-300  dark:hover:bg-gray-700"
                                }`}
                        >
                            Confirm Payment
                        </Button>
                        <Button
                            onClick={() => setActiveStep("completed")}
                            className={`px-4 py-2 rounded-lg font-semibold text-left transition-all ${activeStep === "completed"
                                ? " text-white shadow-md"
                                : "text-gray-600 dark:text-gray-300  dark:hover:bg-gray-700"
                                }`}
                        >
                            Transaction Completed!
                        </Button>
                    </div>
                </div>

                {/* Right Content */}
                <div className="lg:col-span-3">
                    {/* STEP 1: Payment Guide */}
                    {activeStep === "guide" && (
                        <div className="grid grid-cols-1 gap-8">
                            {/* Transaction Details */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                                <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-6">
                                    Transaction Details
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                    {/* From */}
                                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                                        <p className="font-semibold text-gray-800 dark:text-white">FROM</p>
                                        <p className="text-gray-700 dark:text-gray-200 mt-1">{project.bankDetails.accountTitle}</p>

                                    </div>

                                    {/* To */}
                                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                                        <p className="font-semibold text-gray-800 dark:text-white">TO</p>
                                        <p className="text-gray-700 dark:text-gray-200 mt-1">
                                            Ahmad Shahzaib{" "}
                                            <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-full">
                                                DAO-80103
                                            </span>
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                            Member Since Mar 12, 2025
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                                            +923040057791
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Bank Account Info */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                                <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-6">
                                    Bank Account Information
                                </h3>

                                <div className="space-y-4">
                                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                                        <p className="font-semibold text-gray-800 dark:text-white">{project.bankDetails.bankName}</p>
                                        <span>Acc No</span>   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.bankDetails.accountNumber}</p>
                                        <span>IBAN</span> <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.bankDetails.iban}</p>
                                    </div>


                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Confirm Payment */}
                    {activeStep === "confirm" && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                            {/* Sub Tabs */}
                            <div className="flex gap-4 mb-6">
                                {["crypto", "cash", "bank"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setSubTab(tab as any)}
                                        className={`px-6 py-2 rounded-full font-semibold capitalize transition-all ${subTab === tab
                                            ? "bg-[#19D6BD] text-white shadow-md"
                                            : "text-gray-500 dark:text-gray-300  dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Sub Tab Content */}
                            {subTab === "crypto" && (
                                <div className="space-y-4">
                                    <input
                                        type="url"
                                        placeholder="Paste transaction URL"
                                        className="w-full px-4 py-3 text-sm rounded-xl 
             border border-gray-300 dark:border-gray-600 
             bg-white dark:bg-gray-800 
             placeholder-gray-400 dark:placeholder-gray-500 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
             shadow-sm transition duration-200"
                                    />
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-10 h-10 mb-3 text-gray-400 dark:text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4M21 16v4H3v-4m18 0l-4 4m4-4l-4-4" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag & drop
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG, PDF (max 5MB)</p>
                                        </div>
                                        <input type="file" className="hidden" />
                                    </label>

                                    <Button
                                        onClick={handleCompletion}
                                        className="mt-4  text-white px-6 py-2 rounded-lg "
                                    >
                                        Submit
                                    </Button>
                                </div>
                            )}

                            {subTab === "cash" && (
                                <div className="space-y-4">
                                    <input
                                        type="number"
                                        placeholder="Enter amount"
                                        className="w-full px-4 py-3 text-sm rounded-xl 
             border border-gray-300 dark:border-gray-600 
             bg-white dark:bg-gray-800 
             placeholder-gray-400 dark:placeholder-gray-500 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
             shadow-sm transition duration-200"
                                    />
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-10 h-10 mb-3 text-gray-400 dark:text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4M21 16v4H3v-4m18 0l-4 4m4-4l-4-4" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag & drop
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG, PDF (max 5MB)</p>
                                        </div>
                                        <input type="file" className="hidden" />
                                    </label>

                                    <Button
                                        onClick={handleCompletion}
                                        className="mt-4  text-white px-6 py-2 rounded-lg"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            )}

                            {subTab === "bank" && (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleCompletion();
                                    }}
                                    className="space-y-4"
                                >
                                    <input
                                        type="text"
                                        placeholder="Bank Name"
                                        className="w-full px-4 py-3 text-sm rounded-xl 
             border border-gray-300 dark:border-gray-600 
             bg-white dark:bg-gray-800 
             placeholder-gray-400 dark:placeholder-gray-500 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
             shadow-sm transition duration-200"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Account Number"
                                        className="w-full px-4 py-3 text-sm rounded-xl 
             border border-gray-300 dark:border-gray-600 
             bg-white dark:bg-gray-800 
             placeholder-gray-400 dark:placeholder-gray-500 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
             shadow-sm transition duration-200"
                                    />
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-10 h-10 mb-3 text-gray-400 dark:text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4M21 16v4H3v-4m18 0l-4 4m4-4l-4-4" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag & drop
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG, PDF (max 5MB)</p>
                                        </div>
                                        <input type="file" className="hidden" />
                                    </label>

                                    <Button
                                        type="submit"
                                        className="mt-4  text-white px-6 py-2 rounded-lg "
                                    >
                                        Submit
                                    </Button>
                                </form>
                            )}
                        </div>
                    )}

                    {/* STEP 3: Completed */}
                    {activeStep === "completed" && (
                        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-8 rounded-2xl shadow-md text-center">
                            <h2 className="text-2xl font-bold">🎉 Transaction Completed!</h2>
                            <p className="mt-2">Your payment has been confirmed and recorded successfully.</p>
                            <button
                                onClick={handleFinalContinue}
                                className="mt-6 bg-[#19D6BD] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
                            >
                                Continue
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
