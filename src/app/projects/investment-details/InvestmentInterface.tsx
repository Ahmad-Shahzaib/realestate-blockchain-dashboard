"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Button from "@/common/Button";
import DocumentsSummary from "./explore-investment/DocumentsSummary";

interface BankDetails {
    accountTitle: string;
    bankName: string;
    accountNumber: string;
    iban: string;
}

interface Project {
    bankDetails: BankDetails;
}

interface TransactionPageProps {
    project: Project;
}

export default function TransactionPage({ project }: TransactionPageProps) {
    const steps = ["guide", "confirm", "proceed", "completed"] as const;
    type Step = typeof steps[number];
    const [activeStep, setActiveStep] = useState<Step>("guide");
    const [subTab, setSubTab] = useState<"crypto" | "cash" | "bank">("crypto");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentStepIndex = steps.indexOf(activeStep);

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setActiveStep(steps[currentStepIndex + 1]);
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setActiveStep(steps[currentStepIndex - 1]);
        }
    };

    const handleCompletion = () => {
        setActiveStep("completed");
    };

    const handleFinalContinue = () => {
        toast.success("🎉 Transaction Completed Successfully!");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size exceeds 5MB");
                return;
            }
            if (!["image/png", "image/jpeg", "application/pdf"].includes(file.type)) {
                toast.error("Invalid file type. Use PNG, JPG, or PDF");
                return;
            }
            toast.success("File uploaded successfully");
        }
    };

    const handleCryptoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const transactionUrl = formData.get("transactionUrl") as string;
        if (!transactionUrl) {
            toast.error("Please enter a transaction URL");
            return;
        }
        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
            handleNext();
        } catch {
            toast.error("Submission failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCashSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const amount = formData.get("amount") as string;
        if (!amount || Number(amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }
        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
            handleNext();
        } catch {
            toast.error("Submission failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBankSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const bankName = formData.get("bankName") as string;
        const accountNumber = formData.get("accountNumber") as string;
        if (!bankName || !accountNumber) {
            toast.error("Please fill in all bank details");
            return;
        }
        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
            handleNext();
        } catch {
            toast.error("Submission failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 flex justify-center items-start py-3">
            <Toaster position="top-right" />
            <div className="w-full max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Left Sidebar Tabs */}
                <div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-4"
                    style={{ height: "400px" }}
                >
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                        Transaction Dashboard
                    </h1>
                    <div className="flex flex-col space-y-4">
                        {["Payment Guide", "Confirm Payment", "Proceed Transaction", "Transaction Completed"].map(
                            (label, index) => (
                                <div key={label} className="flex items-center">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${steps[index] === activeStep
                                            ? "bg-[#19D6BD] text-black"
                                            : index < currentStepIndex
                                                ? "bg-green-500 text-blcak"
                                                : "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white"
                                            }`}
                                    >
                                        {index < currentStepIndex ? "✓" : index + 1}
                                    </div>
                                    <Button
                                        disabled
                                        className={`flex-1 px-4 py-2 rounded-lg font-semibold text-left transition-all ${steps[index] === activeStep
                                            ? "bg-[#19D6BD] text-white shadow-md"
                                            : index < currentStepIndex
                                                ? "text-green-500 dark:text-green-400 bg-gray-500 dark:bg-gray-700"
                                                : "text-black dark:text-white bg-gray-500 dark:bg-gray-700"
                                            }`}
                                    >
                                        {label}
                                    </Button>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Right Content */}
                <div className="lg:col-span-3">
                    {/* Progress Indicator */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between relative">
                            {["Payment Guide", "Confirm Payment", "Proceed Transaction", "Transaction Completed"].map((step, index) => (
                                <div key={step} className="flex-1 flex flex-col items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${index <= currentStepIndex
                                            ? "bg-[#19D6BD] text-black"
                                            : "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white"
                                            }`}
                                    >
                                        {index < currentStepIndex ? "✓" : index + 1}
                                    </div>
                                    <div
                                        className={`text-sm mt-2 text-center ${index <= currentStepIndex ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"
                                            }`}
                                    >
                                        {step}
                                    </div>
                                </div>
                            ))}
                            <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 dark:bg-gray-600">
                                <div
                                    className="h-full bg-[#19D6BD] transition-all duration-300"
                                    style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* STEP 1: Payment Guide */}
                    {activeStep === "guide" && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                            <DocumentsSummary />
                            <div className="flex justify-end mt-6">
                                <Button
                                    onClick={handleNext}
                                    className="bg-[#19D6BD] text-white px-6 py-2 rounded-lg font-semibold"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Confirm Payment */}
                    {activeStep === "confirm" && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                            <div className="flex gap-4 mb-6">
                                {["crypto", "cash", "bank"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setSubTab(tab as any)}
                                        className={`px-6 py-2 rounded-full font-semibold capitalize transition-all ${subTab === tab
                                            ? "bg-[#19D6BD] text-white shadow-md"
                                            : "text-gray-500 dark:text-white dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {subTab === "crypto" && (
                                <form onSubmit={handleCryptoSubmit} className="space-y-4">
                                    <input
                                        type="url"
                                        name="transactionUrl"
                                        placeholder="Paste transaction URL"
                                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                                    />
                                    <label
                                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                        tabIndex={0}
                                        role="button"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-10 h-10 mb-3 text-gray-400 dark:text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 16V4m0 0L3 8m4-4l4 4M21 16v4H3v-4m18 0l-4 4m4-4l-4-4"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag & drop
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG, PDF (max 5MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept=".png,.jpg,.pdf"
                                        />
                                    </label>
                                    <div className="flex justify-between mt-6">
                                        <Button
                                            onClick={handleBack}
                                            className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-lg font-semibold"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-[#19D6BD] text-white px-6 py-2 rounded-lg font-semibold"
                                        >
                                            {isSubmitting ? "Submitting..." : "Next"}
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {subTab === "cash" && (
                                <form onSubmit={handleCashSubmit} className="space-y-4">
                                    <input
                                        type="number"
                                        name="amount"
                                        placeholder="Enter amount"
                                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                                    />
                                    <label
                                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                        tabIndex={0}
                                        role="button"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-10 h-10 mb-3 text-gray-400 dark:text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 16V4m0 0L3 8m4-4l4 4M21 16v4H3v-4m18 0l-4 4m4-4l-4-4"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag & drop
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG, PDF (max 5MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept=".png,.jpg,.pdf"
                                        />
                                    </label>
                                    <div className="flex justify-between mt-6">
                                        <Button
                                            onClick={handleBack}
                                            className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-lg font-semibold"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-[#19D6BD] text-white px-6 py-2 rounded-lg font-semibold"
                                        >
                                            {isSubmitting ? "Submitting..." : "Next"}
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {subTab === "bank" && (
                                <form onSubmit={handleBankSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        name="bankName"
                                        placeholder="Bank Name"
                                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                                    />
                                    <input
                                        type="text"
                                        name="accountNumber"
                                        placeholder="Account Number"
                                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                                    />
                                    <label
                                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                        tabIndex={0}
                                        role="button"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-10 h-10 mb-3 text-gray-400 dark:text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 16V4m0 0L3 8m4-4l4 4M21 16v4H3v-4m18 0l-4 4m4-4l-4-4"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag & drop
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG, PDF (max 5MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept=".png,.jpg,.pdf"
                                        />
                                    </label>
                                    <div className="flex justify-between mt-6">
                                        <Button
                                            onClick={handleBack}
                                            className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-lg font-semibold"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-[#19D6BD] text-white px-6 py-2 rounded-lg font-semibold"
                                        >
                                            {isSubmitting ? "Submitting..." : "Next"}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}

                    {/* STEP 3: Proceed Transaction */}
                    {activeStep === "proceed" && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 max-w-4xl mx-auto">
                            <h2 className="font-bold text-2xl text-gray-800 dark:text-white mb-8 text-center">Invoice</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-4">Transaction Details</h3>
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                                            <p className="font-semibold text-gray-800 dark:text-white">From</p>
                                            <p className="text-gray-700 dark:text-gray-200 mt-1">{project.bankDetails.accountTitle}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                                            <p className="font-semibold text-gray-800 dark:text-white">To</p>
                                            <p className="text-gray-700 dark:text-gray-200 mt-1">
                                                Ahmad Shahzaib{" "}
                                                <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-full">
                                                    DAO-80103
                                                </span>
                                            </p>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                                Member Since Mar 12, 2025
                                            </p>
                                            <p className="text-black dark:text-white text-sm mt-1">+923040057791</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-4">Bank Account Information</h3>
                                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                                        <p className="font-semibold text-gray-800 dark:text-white">{project.bankDetails.bankName}</p>
                                        <div className="flex items-center mt-2">
                                            <span className="text-black dark:text-white font-medium mr-2">Acc No:</span>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{project.bankDetails.accountNumber}</p>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <span className="text-black dark:text-white font-medium mr-2">IBAN:</span>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{project.bankDetails.iban}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between mt-6">
                                <Button
                                    onClick={handleBack}
                                    className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-lg font-semibold"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    className="bg-[#19D6BD] text-white px-6 py-2 rounded-lg font-semibold"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Completed */}
                    {activeStep === "completed" && (
                        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-8 rounded-2xl shadow-md text-center">
                            <h2 className="text-2xl font-bold">🎉 Transaction Completed!</h2>
                            <p className="mt-2">Your payment has been confirmed and recorded successfully.</p>
                            <div className="flex justify-between mt-6">
                                <Button
                                    onClick={handleBack}
                                    className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-lg font-semibold"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleFinalContinue}
                                    className="bg-[#19D6BD] text-white px-6 py-2 rounded-lg font-semibold"
                                >
                                    Continue
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}