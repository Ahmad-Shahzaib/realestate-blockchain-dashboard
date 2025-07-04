import React, { useState } from 'react';

const MyAddresses = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-6 border border-border rounded bg-background text-text">
            {/* Header */}
            <h2 className="text-2xl font-semibold mb-2 text-text">My Addresses</h2>
            <p className="text-text/70 mb-6">
                Your personal information is completely secure and we don’t share it with anyone.
            </p>

            {/* Add New Address Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-background-gradientFrom via-background-gradientVia to-background-gradientTo text-text rounded hover:opacity-90 border border-border"
            >
                Add new address
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-background/80">
                    <div className="bg-background border border-border p-6 rounded-lg w-full max-w-2xl text-text">
                        <h3 className="text-xl font-semibold mb-2 text-text">My Address</h3>
                        <p className="text-text/70 mb-6">
                            We may, from time to time, send you account statements or other important
                            information in the post. Please ensure your address is up to date at all times.
                        </p>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text mb-1">Address Line 1</label>
                                    <input
                                        type="text"
                                        placeholder="House No. 123, Street No. 1"
                                        className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-background-gradientVia bg-background text-text"
                                        required
                                    />
                                    <p className="text-red-500 text-sm mt-1">Address line 1 is required</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text mb-1">Address Line 2</label>
                                    <input
                                        type="text"
                                        placeholder="Sector H, Phase 8, Bahria Town"
                                        className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-background-gradientVia bg-background text-text"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text mb-1">City</label>
                                    <input
                                        type="text"
                                        placeholder="Rawalpindi"
                                        className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-background-gradientVia bg-background text-text"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text mb-1">Country</label>
                                    <input
                                        type="text"
                                        placeholder="Pakistan"
                                        className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-background-gradientVia bg-background text-text"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-background border border-border text-text rounded hover:opacity-80"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gradient-to-r from-background-gradientFrom via-background-gradientVia to-background-gradientTo text-text rounded hover:opacity-90 border border-border"
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
