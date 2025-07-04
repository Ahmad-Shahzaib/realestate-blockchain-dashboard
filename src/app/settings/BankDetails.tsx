import React, { useState } from 'react';

const BankDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-6 border border-border rounded bg-background text-text">
            {/* Header */}
            <h2 className="text-2xl font-semibold mb-2 text-text">Bank Details</h2>
            <p className="text-text/70 mb-6">
                Your personal information is completely secure and we don’t share it with anyone.
            </p>

            {/* Add New Bank Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-background-gradientFrom via-background-gradientVia to-background-gradientTo text-text rounded hover:opacity-90 border border-border"
            >
                Add new bank account
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-background/80">
                    <div className="bg-background border border-border p-6 rounded-lg w-full max-w-xl text-text">
                        <h3 className="text-xl font-semibold mb-4 text-text">Add Bank Details</h3>

                        <form className="space-y-4">
                            <div>
                                <label htmlFor="bankName" className="block text-sm font-medium text-text mb-1">Bank Name</label>
                                <select
                                    id="bankName"
                                    required
                                    className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-background-gradientVia bg-background text-text"
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
                                <label className="block text-sm font-medium text-text mb-1">Account Number</label>
                                <input
                                    type="text"
                                    placeholder="1234567890123456"
                                    className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-background-gradientVia bg-background text-text"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text mb-1">Account Title</label>
                                <input
                                    type="text"
                                    placeholder="Muhammad Shakeel"
                                    className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-background-gradientVia bg-background text-text"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text mb-1">IBAN <span className="text-text/50 text-sm">(Optional)</span></label>
                                <input
                                    type="text"
                                    placeholder="PK36SCBL0000001123456702"
                                    className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-background-gradientVia bg-background text-text"
                                />
                            </div>

                            {/* Disclaimer */}
                            <p className="text-sm text-text/70 mt-2">
                                All account information is accurate & I am responsible for the information provided above.
                            </p>

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

export default BankDetails;
