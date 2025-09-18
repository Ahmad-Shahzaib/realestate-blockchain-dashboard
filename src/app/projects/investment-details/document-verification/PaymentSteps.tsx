"use client";

import Button from "@/common/Button";
import React, { useState } from "react";

const PaymentSteps = () => {
    const [openStep, setOpenStep] = useState<number>(1);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center py-16">
            <div className="w-full max-w-4xl px-6">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
                        Next Steps for Your Pledge
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
                        Follow these steps to complete your payment and verification process.
                    </p>
                </div>

                {/* Steps Container */}
                <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl">
                        <button
                            onClick={() => setOpenStep(openStep === 1 ? 0 : 1)}
                            className="w-full flex items-center justify-between p-6 text-left group"
                        >
                            <div className="flex items-center space-x-4">
                                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold text-lg group-hover:scale-105 transition-transform">
                                    1
                                </span>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    Make Payment
                                </h3>
                            </div>
                            <span className="text-gray-500 dark:text-gray-400 text-lg group-hover:rotate-180 transition-transform">
                                {openStep === 1 ? "▲" : "▼"}
                            </span>
                        </button>
                        {openStep === 1 && (
                            <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 text-sm">
                                <p className="mb-4">
                                    Deposit the amount of <span className="font-semibold text-gray-800 dark:text-white">PKR 22,110,000</span> using a cheque to one of the following bank accounts:
                                </p>

                                {/* Bank Accounts */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <p className="font-semibold text-gray-800 dark:text-white">JS Bank</p>
                                        <p className="mt-1">Account Number: 0001533435</p>
                                        <p>Account Title: Elements Residencia LLP</p>
                                        <p>IBAN: PK47JSBL9000000153435</p>
                                        <p>Branch: Bahria Phase 7 Islamabad</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <p className="font-semibold text-gray-800 dark:text-white">Bank Islami</p>
                                        <p className="mt-1">Account Number: 301200394020001</p>
                                        <p>Account Title: Elements Residencia LLP</p>
                                        <p>IBAN: PK12BKIP030120039402001</p>
                                        <p>Branch: Chaklala Scheme III Br 3012 Rawalpindi</p>
                                    </div>
                                </div>

                                {/* Payment Methods */}
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                        Accepted Payment Methods
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                        Choose a payment method to proceed with your transaction.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button className="flex-1  text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
                                            Cash / Cross-Cheque Deposit
                                        </Button>
                                        <Button className="flex-1  text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
                                            Online Bank / Wire Transfer
                                        </Button>
                                    </div>
                                </div>

                                {/* Instructions */}
                                <div>
                                    <h5 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                        Cash / Cross-Cheque Deposit Instructions
                                    </h5>
                                    <ol className="list-decimal list-inside space-y-2 text-sm">
                                        <li>Make payment via cash or a crossed cheque.</li>
                                        <li>Deposit cash directly at the bank.</li>
                                        <li>
                                            Send cheques to Fract PropTech, 23-A Business Bay, DHA Phase 1, Islamabad, or deposit at the bank.
                                        </li>
                                        <li>Address cheques to Fract PropTech Pvt. Ltd.</li>
                                        <li>Include your DAO ID in the "Reference" section for bank deposits.</li>
                                        <li>
                                            Email proof of payment to{" "}
                                            <a
                                                href="mailto:support@daoproptech.com"
                                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold"
                                            >
                                                support@daoproptech.com
                                            </a>.
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl">
                        <button
                            onClick={() => setOpenStep(openStep === 2 ? 0 : 2)}
                            className="w-full flex items-center justify-between p-6 text-left group"
                        >
                            <div className="flex items-center space-x-4">
                                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold text-lg group-hover:scale-105 transition-transform">
                                    2
                                </span>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    Upload Payment Verification
                                </h3>
                            </div>
                            <span className="text-gray-500 dark:text-gray-400 text-lg group-hover:rotate-180 transition-transform">
                                {openStep === 2 ? "▲" : "▼"}
                            </span>
                        </button>
                        {openStep === 2 && (
                            <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-300">
                                Submit scanned copies of the transaction by{" "}
                                <span className="font-semibold text-red-500 dark:text-red-400">
                                    17-Sep-2025
                                </span>{" "}
                                to complete your pledge request.
                            </div>
                        )}
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl">
                        <button
                            onClick={() => setOpenStep(openStep === 3 ? 0 : 3)}
                            className="w-full flex items-center justify-between p-6 text-left group"
                        >
                            <div className="flex items-center space-x-4">
                                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold text-lg group-hover:scale-105 transition-transform">
                                    3
                                </span>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    Status: Verified
                                </h3>
                            </div>
                            <span className="text-gray-500 dark:text-gray-400 text-lg group-hover:rotate-180 transition-transform">
                                {openStep === 3 ? "▲" : "▼"}
                            </span>
                        </button>
                        {openStep === 3 && (
                            <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-300">
                                Upon successful document review, your investment status will be verified, and your allocated space in the building will be confirmed.
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button className="flex-1  text-white py-3 rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg">
                        See Transactions
                    </Button>
                    <Button className="flex-1  text-white py-3 rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg">
                        Upload Verification
                    </Button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                    Manage and check the status of your transactions under{" "}
                    <a
                        href="#"
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300"
                    >
                        Transactions
                    </a>
                </p>
            </div>
        </div>
    );
};

export default PaymentSteps;