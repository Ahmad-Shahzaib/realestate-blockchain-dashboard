import React, { useState } from 'react';

const MyAddresses = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-6 custom-border rounded">
            {/* Header */}
            <h2 className="text-2xl font-semibold mb-2 ">My Addresses</h2>
            <p className="text-gray-600 mb-6">
                Your personal information is completely secure and we don’t share it with anyone.
            </p>

            {/* Add New Address Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Add new address
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0  flex items-center justify-center z-[9999]">

                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                        <h3 className="text-xl font-semibold mb-2">My Address</h3>
                        <p className="text-gray-600 mb-6">
                            We may, from time to time, send you account statements or other important
                            information in the post. Please ensure your address is up to date at all times.
                        </p>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                                    <input
                                        type="text"
                                        placeholder="House No. 123, Street No. 1"
                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                        required
                                    />
                                    <p className="text-red-500 text-sm mt-1">Address line 1 is required</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                                    <input
                                        type="text"
                                        placeholder="Sector H, Phase 8, Bahria Town"
                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        type="text"
                                        placeholder="Rawalpindi"
                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                    <input
                                        type="text"
                                        placeholder="Pakistan"
                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
