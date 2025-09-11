"use client";

import { useState } from "react";
import { CheckCircle, Circle, Upload, FileText } from "lucide-react";

export default function TransactionPage() {
    const [activeTab, setActiveTab] = useState<"details" | "attachments">("details");
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        "Pledge Request Submission",
        "Payment guide",
        "Confirm Payment",
        "Transaction Completed!",
        "Sync with Blockchain",
    ];

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("details")}
                    className={`px-6 py-2 font-medium ${activeTab === "details"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500"
                        }`}
                >
                    DETAILS
                </button>
                <button
                    onClick={() => setActiveTab("attachments")}
                    className={`px-6 py-2 font-medium ${activeTab === "attachments"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500"
                        }`}
                >
                    ATTACHMENTS
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === "details" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Left Stepper Section */}
                    <div className="bg-white border rounded-lg p-6 shadow-sm">
                        <div className="mb-6">
                            <p className="flex items-center text-yellow-600 font-medium">
                                <Circle className="w-5 h-5 mr-2" /> Pending
                            </p>
                            <p className="text-gray-500 text-sm">
                                Please complete the payment to get your transaction verified.
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="space-y-6">
                            {steps.map((step, index) => {
                                const stepNum = index + 1;
                                const isCompleted = stepNum < currentStep;
                                const isActive = stepNum === currentStep;

                                return (
                                    <div key={stepNum} className="flex flex-col">
                                        <div className="flex items-start">
                                            {isCompleted ? (
                                                <CheckCircle className="text-green-500 w-5 h-5 mt-1 mr-2" />
                                            ) : (
                                                <Circle
                                                    className={`w-5 h-5 mt-1 mr-2 ${isActive ? "text-blue-600" : "text-gray-400"
                                                        }`}
                                                />
                                            )}
                                            <div>
                                                <p
                                                    className={`font-medium ${isActive ? "text-blue-600" : ""
                                                        }`}
                                                >
                                                    {step}
                                                </p>

                                                {/* Step-specific actions */}
                                                {isActive && stepNum === 2 && (
                                                    <>
                                                        <p className="text-red-500 font-semibold">
                                                            22,110,000 PKR Due
                                                        </p>
                                                        <input
                                                            type="text"
                                                            placeholder="0.0 PKR"
                                                            className="mt-2 w-40 border rounded-md px-3 py-1 text-sm"
                                                        />
                                                    </>
                                                )}

                                                {isActive && stepNum === 3 && (
                                                    <button
                                                        onClick={() => setCurrentStep(currentStep + 1)}
                                                        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-md text-sm"
                                                    >
                                                        Submit Payment Proof
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Next button (for demo, auto progress) */}
                        {currentStep < steps.length && (
                            <button
                                onClick={() => setCurrentStep(currentStep + 1)}
                                className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md text-sm w-full"
                            >
                                Continue
                            </button>
                        )}
                    </div>

                    {/* Right Transaction Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Transaction Details */}
                        <div className="bg-white border rounded-lg p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-700 mb-4">
                                Transaction Details
                            </h3>

                            <div className="flex justify-between items-start mb-6">
                                {/* From */}
                                <div>
                                    <p className="font-semibold">FROM</p>
                                    <p className="text-gray-700">DAO Proptech</p>
                                    <p className="text-blue-600 text-sm">
                                        investors@daoproptech.com
                                    </p>
                                </div>

                                <div className="text-gray-400">→</div>

                                {/* To */}
                                <div>
                                    <p className="font-semibold">TO</p>
                                    <p className="text-gray-700">
                                        Ahmad Shahzaib{" "}
                                        <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                                            DAO-80103
                                        </span>
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        Member Since Mar 12, 2025
                                    </p>
                                    <p className="text-gray-600 text-sm">+923040057791</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <FileText className="w-4 h-4 text-red-500" />
                                    <span className="text-sm">
                                        Area Pledged Receipt (166.2 KB)
                                    </span>
                                </div>
                                <button className="text-sm font-medium text-gray-600 hover:text-blue-600">
                                    View All Attachments
                                </button>
                            </div>
                        </div>

                        {/* Bank Account Info */}
                        <div className="bg-white border rounded-lg p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-700 mb-4">
                                Bank Account Information
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="border rounded-lg p-4 flex items-center justify-between hover:shadow">
                                    <div>
                                        <p className="font-medium">JS Bank</p>
                                        <p className="text-sm text-gray-500">0001533435</p>
                                    </div>
                                    <span className="text-gray-500">⌄</span>
                                </div>

                                <div className="border rounded-lg p-4 flex items-center justify-between hover:shadow">
                                    <div>
                                        <p className="font-medium">Bank Islami</p>
                                        <p className="text-sm text-gray-500">301200394620001</p>
                                    </div>
                                    <span className="text-gray-500">⌄</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "attachments" && (
                <div className="bg-white border rounded-lg p-6 shadow-sm mt-6">
                    <h3 className="font-semibold text-gray-700 mb-4">Attachments</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Sample Document 1 (PDF, 250 KB)</li>
                        <li>Proof of Payment (JPG, 1.2 MB)</li>
                        <li>Agreement File (DOCX, 500 KB)</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
