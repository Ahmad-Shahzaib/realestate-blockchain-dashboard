import React, { useState } from 'react';

const BankDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-6">
            {/* Header */}
            <h2 className="text-2xl font-semibold mb-2">Bank Details</h2>
            <p className="text-gray-600 mb-6">
                Your personal information is completely secure and we don’t share it with anyone.
            </p>

            {/* Add New Bank Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Add new bank account
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
                    <div className="bg-white p-6 rounded-lg w-full max-w-xl">
                        <h3 className="text-xl font-semibold mb-4">Add Bank Details</h3>

                        <form className="space-y-4">
                            <div>
                                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                <select
                                    id="bankName"
                                    required
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"

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


                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                                <input
                                    type="text"
                                    placeholder="1234567890123456"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Account Title</label>
                                <input
                                    type="text"
                                    placeholder="Muhammad Shakeel"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">IBAN <span className="text-gray-400 text-sm">(Optional)</span></label>
                                <input
                                    type="text"
                                    placeholder="PK36SCBL0000001123456702"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>

                            {/* Disclaimer */}
                            <p className="text-sm text-gray-600 mt-2">
                                All account information is accurate & I am responsible for the information provided above.
                            </p>

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

export default BankDetails;
