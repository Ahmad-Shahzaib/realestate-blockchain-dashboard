"use client";
import Button from '@/common/Button';
import React from 'react';

const PledgeStatus = () => {
    return (
        <div className=" bg-gray-100 dark:bg-gray-900 flex justify-center items-center py-4">
            <div className="w-full max-w-4xl px-6">
                {/* Main Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-10 transition-all hover:shadow-3xl">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <span className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-2xl animate-pulse">
                                ✓
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
                            Pledge Request Submitted
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
                            Your area pledge request has been successfully submitted. Our representative will contact you within 2 days.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Date: Sep 10, 2025
                        </p>
                    </div>

                    {/* Project Details */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 mb-8 transition-all hover:bg-gray-100 dark:hover:bg-gray-600">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                            Elements Residencia
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
                            <div className="space-y-1">
                                <p className="text-gray-500 dark:text-gray-400 font-medium">Ticket</p>
                                <p className="text-gray-800 dark:text-white font-semibold">13692</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-500 dark:text-gray-400 font-medium">Status</p>
                                <p className="text-yellow-600 dark:text-yellow-400 font-semibold">Pending</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-500 dark:text-gray-400 font-medium">Next Step</p>
                                <p className="text-gray-800 dark:text-white font-semibold">Make Payment</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-500 dark:text-gray-400 font-medium">Payment Due Date</p>
                                <p className="text-red-500 dark:text-red-400 font-semibold">Sep 17, 2025</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="bg-blue-50 dark:bg-blue-900 rounded-2xl p-6 mb-8 transition-all hover:bg-blue-100 dark:hover:bg-blue-800">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                            <div className="space-y-1">
                                <p className="font-semibold text-gray-800 dark:text-white">Primary Address</p>
                                <p className="text-gray-600 dark:text-gray-300">-</p>
                            </div>
                            <div className="space-y-1">
                                <p className="font-semibold text-gray-800 dark:text-white">Area Pledged</p>
                                <p className="text-gray-600 dark:text-gray-300">1,005 sq.ft.</p>
                            </div>
                            <div className="space-y-1">
                                <p className="font-semibold text-gray-800 dark:text-white">Primary Phone</p>
                                <p className="text-gray-600 dark:text-gray-300">+92 304 0057 791</p>
                            </div>
                            <div className="space-y-1">
                                <p className="font-semibold text-gray-800 dark:text-white">Amount to Pay</p>
                                <p className="text-gray-600 dark:text-gray-300">22,110,000 PKR</p>
                            </div>
                        </div>
                    </div>

                    {/* Support Section */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 mb-8 transition-all hover:bg-gray-100 dark:hover:bg-gray-600">
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">Have Questions?</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Contact our sales agent for assistance.
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <a
                                href="tel:+923143267727"
                                className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                            >
                                +92 314 3267727
                            </a>
                            <a
                                href="mailto:support@FracProp.com"
                                className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                            >
                                support@FracProp.com
                            </a>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="flex-1 text-white py-3 rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg">
                            See Transactions
                        </Button>
                        <Button className="flex-1  text-white py-3 rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg">
                            Upload Verification
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PledgeStatus;
