"use client";
import Button from '@/common/Button';
import React from 'react';

const PledgeStatus = () => {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                        ✓
                    </span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Pledge Request Submitted
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Your area pledge request has been submitted successfully. Our representative will get back to you within 2 days
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Date: Sep 10, 2025</p>
            </div>

            <div className="mt-6">
                <h3 className="text-md font-medium text-gray-900 dark:text-white">Elements Residencia</h3>
                <div className="grid grid-cols-4 gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <div>Ticket</div>
                    <div>Status</div>
                    <div>Next Step</div>
                    <div>Payment Due Date</div>
                    <div className="font-medium">13692</div>
                    <div className="font-medium">pending</div>
                    <div className="font-medium">Make Payment</div>
                    <div className="font-medium">Sep 17, 2025</div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div>
                            <p className="font-medium dark:text-white">Primary Address</p>
                            <p>-</p>
                        </div>
                        <div>
                            <p className="font-medium dark:text-white">Area Pledged</p>
                            <p>1,005 sq.ft.</p>
                        </div>
                        <div>
                            <p className="font-medium dark:text-white">Primary Phone</p>
                            <p>+92 304 0057 791</p>
                        </div>
                        <div>
                            <p className="font-medium dark:text-white">Amount to Pay</p>
                            <p>22,110,000 PKR</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Question?</p>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Reach out to our sales agent for any confusion.
                        </p>
                        <div className="flex space-x-4">
                            <a href="tel:+923143267727" className="text-blue-600 dark:text-blue-400 hover:underline">
                                +92 314 3267727
                            </a>
                            <a href="mailto:support@daoproptech.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                                support@daoproptech.com
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex space-x-4">
                    <Button>
                        See Transactions
                    </Button>
                    <Button>
                        Upload Verification
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PledgeStatus;
