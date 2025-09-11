"use client";
import Button from "@/common/Button";
import React, { useState } from "react";

const PaymentSteps = () => {
    const [openStep, setOpenStep] = useState<number>(1);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    NEXT STEPS
                </h2>
            </div>

            {/* Step 1 */}
            <div
                className="mt-4 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
                <button
                    onClick={() => setOpenStep(openStep === 1 ? 0 : 1)}
                    className="w-full flex items-center justify-between p-4 text-left"
                >
                    <div className="flex items-center space-x-3">
                        <span className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300 font-medium">
                            1
                        </span>
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">
                            Make Payment
                        </h3>
                    </div>
                    <span className="text-gray-500">{openStep === 1 ? "▲" : "▼"}</span>
                </button>

                {openStep === 1 && (
                    <div className="px-6 pb-6">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Deposit the Cheque with the amount (PKR 22,110,000) to any of the
                            following bank accounts
                        </p>

                        {/* Bank Accounts */}
                        <div className="grid grid-cols-2 gap-6 mt-4 text-sm text-gray-700 dark:text-gray-300">
                            <div className="p-4 border rounded-md">
                                <p className="font-medium">JS Bank</p>
                                <p>ACCOUNT NUMBER: 0001533435</p>
                                <p>ACCOUNT TITLE: Elements Residencia LLP</p>
                                <p>IBAN: PK47JSBL9000000153435</p>
                                <p>BRANCH: Bahria Phase 7 Islamabad</p>
                            </div>
                            <div className="p-4 border rounded-md">
                                <p className="font-medium">Bank Islami</p>
                                <p>ACCOUNT NUMBER: 301200394020001</p>
                                <p>ACCOUNT TITLE: Elements Residencia LLP</p>
                                <p>IBAN: PK12BKIP030120039402001</p>
                                <p>BRANCH: Chaklala scheme III Br 3012 Rawalpindi</p>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="mt-6">
                            <h4 className="text-md font-medium text-gray-900 dark:text-white">
                                Accepted Payment Methods
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                Explore the steps to pay through any of these acceptable payment
                                methods
                            </p>
                            <div className="mt-3 flex space-x-4">
                                <Button className="">
                                    Cash / Cross-cheque Deposit
                                </Button>
                                <Button className="">
                                    Online Bank / Wire Transfer
                                </Button>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
                            <h5 className="font-medium text-gray-900 dark:text-white">
                                Cash / Cross-cheque Deposit
                            </h5>
                            <ol className="list-decimal list-inside mt-2 space-y-1">
                                <li>You can make a payment through cash or a crossed cheque.</li>
                                <li>The cash can be deposited directly at the bank.</li>
                                <li>
                                    The cheque can be deposited either at the bank or sent to us
                                    at DAO PropTech, 23-A Business Bay, DHA Phase 1, Islamabad.
                                </li>
                                <li>Please address the cheque to DAO PropTech Pvt. Ltd.</li>
                                <li>
                                    If you are making a payment at the bank, please clearly state
                                    your DAO ID within the "Reference" section.
                                </li>
                                <li>
                                    Once the deposit has been made, please send the proof of
                                    payment to{" "}
                                    <a
                                        href="mailto:support@daoproptech.com"
                                        className="text-[#1E1EFF] hover:underline"
                                    >
                                        support@daoproptech.com
                                    </a>
                                    .
                                </li>
                            </ol>
                        </div>
                    </div>
                )}
            </div>

            {/* Step 2 */}
            <div className="mt-4 border border-gray-300 dark:border-gray-700 rounded-lg">
                <button
                    onClick={() => setOpenStep(openStep === 2 ? 0 : 2)}
                    className="w-full flex items-center justify-between p-4 text-left"
                >
                    <div className="flex items-center space-x-3">
                        <span className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300 font-medium">
                            2
                        </span>
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">
                            Upload Payment Verification / Scanned Copies
                        </h3>
                    </div>
                    <span className="text-gray-500">{openStep === 2 ? "▲" : "▼"}</span>
                </button>

                {openStep === 2 && (
                    <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-300">
                        Submit scanned copies of the transaction before{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            17-Sep-2025
                        </span>{" "}
                        to complete your pledge request.
                    </div>
                )}
            </div>

            {/* Step 3 */}
            <div className="mt-4 border border-gray-300 dark:border-gray-700 rounded-lg">
                <button
                    onClick={() => setOpenStep(openStep === 3 ? 0 : 3)}
                    className="w-full flex items-center justify-between p-4 text-left"
                >
                    <div className="flex items-center space-x-3">
                        <span className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300 font-medium">
                            3
                        </span>
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">
                            Status: Verified
                        </h3>
                    </div>
                    <span className="text-gray-500">{openStep === 3 ? "▲" : "▼"}</span>
                </button>

                {openStep === 3 && (
                    <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-300">
                        On successful document review, your investment status will be
                        verified with your allocated space in the building.
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-6 flex space-x-4">
                <Button className="">
                    See Transactions
                </Button>
                <Button className="">
                    Upload Verification
                </Button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
                You can always manage and check the status of your transactions under{" "}
                <a
                    href="#"
                    className="text-[#1E1EFF] font-medium hover:underline"
                >
                    Transactions
                </a>
            </p>
        </div>
    );
};

export default PaymentSteps;
