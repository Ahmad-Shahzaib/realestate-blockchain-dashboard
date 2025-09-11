"use client";

import { useState } from "react";
import { CheckCircle, Circle, Upload, FileText } from "lucide-react";

export default function TransactionPage() {
    const [activeTab, setActiveTab] = useState<"details" | "attachments">("details");
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        "Pledge Request Submission",
        "Payment Guide",
        "Confirm Payment",
        "Transaction Completed!",
        "Sync with Blockchain",
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-start py-16">
            <div className="w-full max-w-7xl px-6">
                {/* Header with Tabs */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
                            Transaction Dashboard
                        </h1>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setActiveTab("details")}
                                className={`px-6 py-2 rounded-full font-semibold text-lg transition-all ${activeTab === "details"
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                            >
                                Details
                            </button>
                            <button
                                onClick={() => setActiveTab("attachments")}
                                className={`px-6 py-2 rounded-full font-semibold text-lg transition-all ${activeTab === "attachments"
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                            >
                                Attachments
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === "details" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Stepper Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                            <div className="mb-8">
                                <p className="flex items-center text-yellow-600 dark:text-yellow-400 font-semibold text-lg">
                                    <Circle className="w-6 h-6 mr-3" /> Pending
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                                    Complete the payment to verify your transaction.
                                </p>
                            </div>

                            {/* Steps */}
                            <div className="space-y-8">
                                {steps.map((step, index) => {
                                    const stepNum = index + 1;
                                    const isCompleted = stepNum < currentStep;
                                    const isActive = stepNum === currentStep;

                                    return (
                                        <div key={stepNum} className="flex items-start group">
                                            <div className="flex-shrink-0">
                                                {isCompleted ? (
                                                    <CheckCircle className="text-green-500 w-6 h-6 mt-1 mr-4" />
                                                ) : (
                                                    <Circle
                                                        className={`w-6 h-6 mt-1 mr-4 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
                                                            } group-hover:scale-110 transition-transform`}
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p
                                                    className={`font-semibold text-lg ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-200"
                                                        }`}
                                                >
                                                    {step}
                                                </p>

                                                {/* Step-specific actions */}
                                                {isActive && stepNum === 2 && (
                                                    <>
                                                        <p className="text-red-500 dark:text-red-400 font-semibold text-lg mt-2">
                                                            22,110,000 PKR Due
                                                        </p>
                                                        <input
                                                            type="text"
                                                            placeholder="0.0 PKR"
                                                            className="mt-3 w-48 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 transition-all"
                                                        />
                                                    </>
                                                )}

                                                {isActive && stepNum === 3 && (
                                                    <button
                                                        onClick={() => setCurrentStep(currentStep + 1)}
                                                        className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 dark:hover:bg-blue-500 transition-all"
                                                    >
                                                        Submit Payment Proof
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Next button */}
                            {currentStep < steps.length && (
                                <button
                                    onClick={() => setCurrentStep(currentStep + 1)}
                                    className="mt-8 w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 dark:hover:from-green-500 dark:hover:to-green-600 transition-all shadow-md hover:shadow-lg"
                                >
                                    Continue
                                </button>
                            )}
                        </div>

                        {/* Right Transaction Section */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Transaction Details */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                                <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-6">
                                    Transaction Details
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                    {/* From */}
                                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                                        <p className="font-semibold text-gray-800 dark:text-white">FROM</p>
                                        <p className="text-gray-700 dark:text-gray-200 mt-1">DAO Proptech</p>
                                        <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">
                                            investors@daoproptech.com
                                        </p>
                                    </div>

                                    {/* To */}
                                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
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

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <FileText className="w-5 h-5 text-red-500 dark:text-red-400" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            Area Pledged Receipt (166.2 KB)
                                        </span>
                                    </div>
                                    <button className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        View All Attachments
                                    </button>
                                </div>
                            </div>

                            {/* Bank Account Info */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                                <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-6">
                                    Bank Account Information
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-white">JS Bank</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">0001533435</p>
                                        </div>

                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-white">Bank Islami</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">301200394620001</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "attachments" && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                        <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-6">Attachments</h3>
                        <ul className="space-y-4">
                            {[
                                "Sample Document 1 (PDF, 250 KB)",
                                "Proof of Payment (JPG, 1.2 MB)",
                                "Agreement File (DOCX, 500 KB)",
                            ].map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                                >
                                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    <span className="text-gray-600 dark:text-gray-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}