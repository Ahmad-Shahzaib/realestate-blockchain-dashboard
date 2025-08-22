import React, { useState } from 'react';

const MyAddresses = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-white dark:bg-dark p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            {/* Header */}
            <h2 className="text-2xl font-bold text-[#003049] dark:text-white mb-2">My Addresses</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your personal information is completely secure and we don’t share it with anyone.
            </p>

            {/* Add New Address Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2 rounded-md font-semibold bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-md hover:opacity-90 transition"
            >
                Add new address
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-[9999] ">
                    <div className="bg-white dark:bg-dark p-6 rounded-2xl shadow-lg w-full max-w-2xl">
                        <h3 className="text-xl font-bold text-[#003049] dark:text-white mb-2">My Address</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            We may, from time to time, send you account statements or other important
                            information in the post. Please ensure your address is up to date at all times.
                        </p>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Address Line 1 */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#003049] dark:text-gray-200 mb-1">Address Line 1</label>
                                    <input
                                        type="text"
                                        placeholder="House No. 123, Street No. 1"
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-dark text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-[#00B894]/50"
                                        required
                                    />
                                    <p className="text-red-500 text-sm mt-1">Address line 1 is required</p>
                                </div>

                                {/* Address Line 2 */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#003049] dark:text-gray-200 mb-1">Address Line 2</label>
                                    <input
                                        type="text"
                                        placeholder="Sector H, Phase 8, Bahria Town"
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-dark text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-[#00B894]/50"
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#003049] dark:text-gray-200 mb-1">City</label>
                                    <input
                                        type="text"
                                        placeholder="Rawalpindi"
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-dark text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-[#00B894]/50"
                                    />
                                </div>

                                {/* Country */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#003049] dark:text-gray-200 mb-1">Country</label>
                                    <input
                                        type="text"
                                        placeholder="Pakistan"
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-dark text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-[#00B894]/50"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2 rounded-md font-medium text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#2E2E2E] transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded-md font-semibold bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-md hover:opacity-90 transition"
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

export default MyAddresses;
