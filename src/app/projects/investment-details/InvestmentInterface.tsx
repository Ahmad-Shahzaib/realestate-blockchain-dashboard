"use client";

import { useState } from "react";
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
    const steps = ["guide", "invoice", "payment-method", "payment-details", "completed"] as const;
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
            await new Promise((resolve) => setTimeout(resolve, 1000));
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
            await new Promise((resolve) => setTimeout(resolve, 1000));
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
            await new Promise((resolve) => setTimeout(resolve, 1000));
            handleNext();
        } catch {
            toast.error("Submission failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePaymentMethodSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (subTab === "cash") {
            setActiveStep("payment-details");
        } else {
            handleNext();
        }
    };

    const banks = [
        { name: "FracProp", accountNumber: "1234567890", iban: "AB12345678901234567890" },

    ];

    return (
        <div className="bg-gray-100 dark:bg-gray-900 flex justify-center items-start py-3">
            <Toaster position="top-right" />
            <div className="w-full max-w-6xl px-6 grid grid-cols-1 gap-4">
                <div className="mb-6">
                    <div className="flex items-center justify-between relative">
                        {["Payment Guide", "Invoice", "Payment Method", "Payment Details", "Completed"].map((step, index) => (
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

                {/* STEP 2: Invoice */}
                {activeStep === "invoice" && (
                    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-10 mx-auto ">
                        {/* Header */}
                        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                            <div>
                                <h2 className="font-bold text-3xl text-gray-800 dark:text-white">INVOICE</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Invoice #INV-2025-001</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Date: {new Date().toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{project.bankDetails.accountTitle}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">{project.bankDetails.bankName}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Acc No: {project.bankDetails.accountNumber}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">IBAN: {project.bankDetails.iban}</p>
                            </div>
                        </div>

                        {/* Bill To / From */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">Billed From</h3>
                                <p className="text-gray-700 dark:text-gray-300">{project.bankDetails.accountTitle}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">Billed To</h3>
                                <p className="text-gray-700 dark:text-gray-300">Ahmad Shahzaib</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">FracProp-80103</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Member Since: Mar 12, 2025</p>
                                <p className="text-gray-700 dark:text-gray-300">+923040057791</p>
                            </div>
                        </div>

                        {/* Transaction Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-700">
                                        <th className="text-left p-3 text-gray-800 dark:text-white">Description</th>
                                        <th className="text-right p-3 text-gray-800 dark:text-white">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-t border-gray-200 dark:border-gray-700">
                                        <td className="p-3 text-gray-700 dark:text-gray-300">Project Investment</td>
                                        <td className="p-3 text-right text-gray-700 dark:text-gray-300">PKR10,000</td>
                                    </tr>
                                    <tr className="border-t border-gray-200 dark:border-gray-700">
                                        <td className="p-3 text-gray-700 dark:text-gray-300">Transaction Fee</td>
                                        <td className="p-3 text-right text-gray-700 dark:text-gray-300">PKR100</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr className="border-t border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                                        <td className="p-3 font-bold text-gray-800 dark:text-white">Total</td>
                                        <td className="p-3 text-right font-bold text-gray-800 dark:text-white">PKR10,100</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex justify-between mt-8">
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


                {/* STEP 3: Payment Method */}
                {activeStep === "payment-method" && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                        <h2 className="font-bold text-2xl text-gray-800 dark:text-white mb-6 text-center">Select Payment Method</h2>
                        <form onSubmit={handlePaymentMethodSubmit}>
                            <div className="flex gap-4 mb-6 justify-center">
                                {["crypto", "cash", "bank"].map((tab) => (
                                    <button
                                        key={tab}
                                        type="button"
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
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value="0x1234abcd5678efgh9012ijklmnopqrstuv"
                                        readOnly
                                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none shadow-sm transition duration-200 cursor-not-allowed"
                                    />
                                </div>
                            )}

                            {subTab === "bank" && (
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-4">Available Banks</h3>
                                    {banks.map((bank, index) => (
                                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                                            <p className="font-semibold text-gray-800 dark:text-white">{bank.name}</p>
                                            <div className="flex items-center mt-2">
                                                <span className="text-black dark:text-white font-medium mr-2">Acc No:</span>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{bank.accountNumber}</p>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <span className="text-black dark:text-white font-medium mr-2">IBAN:</span>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{bank.iban}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {subTab === "cash" && (
                                <div className="text-center text-gray-700 dark:text-gray-200">
                                    <p>Please proceed to enter the payment details in the next step.</p>
                                </div>
                            )}

                            <div className="flex justify-between mt-6">
                                <Button
                                    onClick={handleBack}
                                    className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-lg font-semibold"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-[#19D6BD] text-white px-6 py-2 rounded-lg font-semibold"
                                >
                                    Next
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* STEP 4: Payment Details */}
                {activeStep === "payment-details" && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                        <h2 className="font-bold text-2xl text-gray-800 dark:text-white mb-6 text-center">Enter Payment Details</h2>
                        <div className="flex gap-4 mb-6 justify-center">
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

                {/* STEP 5: Completed */}
                {activeStep === "completed" && (
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-8 rounded-2xl shadow-md text-center">
                        <h2 className="text-2xl font-bold">🎉 Transaction Completed!</h2>
                        <p className="mt-2">Your payment has been confirmed and recorded successfully.</p>
                    </div>
                )}
            </div>
        </div>
    );
}