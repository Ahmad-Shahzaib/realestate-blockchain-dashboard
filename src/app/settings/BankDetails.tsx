import React, { useState } from 'react';

const BankDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-dark border border-gray-100 dark:border-gray-700 hover:shadow-xl transition">
            {/* Header */}
            <h2 className="text-2xl font-bold text-[#003049] dark:text-white mb-2">Bank Details</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
                Your personal information is completely secure and we don’t share it with anyone.
            </p>

            {/* Add New Bank Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 rounded-xl font-semibold 
      bg-gradient-to-r from-[#00B894] to-[#00D2B6] 
      text-white shadow-lg hover:opacity-90 transition"
            >
                Add new bank account
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-[9999]">
                    <div
                        className="absolute inset-0 "
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white dark:bg-dark p-6 rounded-2xl shadow-lg w-full max-w-xl border border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-[#003049] dark:text-white mb-4">Add Bank Details</h3>

                        <form className="space-y-4">
                            {/* Bank Name */}
                            <div>
                                <label
                                    htmlFor="bankName"
                                    className="block text-sm font-medium text-[#003049] dark:text-gray-200 mb-1"
                                >
                                    Bank Name
                                </label>
                                <select
                                    id="bankName"
                                    required
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B894] dark:bg-dark dark:text-white dark:border-gray-700"
                                >
                                    <option value="">Select Bank</option>
                                    <option value="HBL">Habib Bank Limited (HBL)</option>
                                    <option value="UBL">United Bank Limited (UBL)</option>
                                    <option value="MCB">MCB Bank</option>
                                    <option value="Meezan">Meezan Bank</option>
                                    <option value="Allied">Allied Bank</option>
                                    <option value="Askari">Askari Bank</option>
                                    <option value="Alfalah">Bank Alfalah</option>
                                    <option value="StandardChartered">Standard Chartered</option>
                                    <option value="NBP">National Bank of Pakistan (NBP)</option>
                                    <option value="Faysal">Faysal Bank</option>
                                </select>
                            </div>

                            {/* Account Number */}
                            <div>
                                <label className="block text-sm font-medium text-[#003049] dark:text-gray-200 mb-1">
                                    Account Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="1234567890123456"
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B894] dark:bg-dark dark:text-white dark:border-gray-700"
                                    required
                                />
                            </div>

                            {/* Account Title */}
                            <div>
                                <label className="block text-sm font-medium text-[#003049] dark:text-gray-200 mb-1">
                                    Account Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="Muhammad Shakeel"
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B894] dark:bg-dark dark:text-white dark:border-gray-700"
                                    required
                                />
                            </div>

                            {/* IBAN */}
                            <div>
                                <label className="block text-sm font-medium text-[#003049] dark:text-gray-200 mb-1">
                                    IBAN <span className="text-gray-400 text-sm">(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="PK36SCBL0000001123456702"
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B894] dark:bg-dark dark:text-white dark:border-gray-700"
                                />
                            </div>

                            {/* Disclaimer */}
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                All account information is accurate & I am responsible for the information provided above.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-lg font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-xl font-semibold 
                bg-gradient-to-r from-[#00B894] to-[#00D2B6] 
                text-white shadow-lg hover:opacity-90 transition"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
};

export default BankDetails;
