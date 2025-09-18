import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setUser } from '@/redux/reducers/userinfoslice/userInfoSlice';
import { getUserProfile, updateUserProfile, UserProfile } from '@/services/user.services';
import { getAxiosInstance } from '@/lib/axios';

const BankDetails = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfo);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [bankForm, setBankForm] = useState({
        bankName: '',
        accountNumber: '',
        accountTitle: '',
        iban: '',
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setIsLoading(true);
                setError('');
                const result = await getUserProfile();
                console.log('getUserProfile response:', JSON.stringify(result, null, 2));
                if (result.status === 'success') {
                    const user = result.data.user;
                    console.log('Fetched user data:', JSON.stringify(user, null, 2));
                    dispatch(setUser(user));
                } else {
                    setError('Failed to load bank details: Invalid response status');
                }
            } catch (error: any) {
                console.error('Failed to fetch profile:', error);
                setError(error.message || 'Failed to load bank details. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserProfile();
    }, [dispatch]);

    const handleBankChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setBankForm({ ...bankForm, [e.target.name]: e.target.value });
    };

    const handleBankSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bankForm.bankName || !bankForm.accountNumber || !bankForm.accountTitle) {
            setError('Bank Name, Account Number, and Account Title are required');
            return;
        }
        try {
            setIsLoading(true);
            setError('');
            const newBankDetail = {
                bankName: bankForm.bankName,
                accountNumber: bankForm.accountNumber,
                accountTitle: bankForm.accountTitle,
                iban: bankForm.iban || undefined,
            };
            const updatedBankDetails = [...(userInfo.user?.bankDetails || []), newBankDetail];
            const userData: UserProfile = {
                firstName: userInfo.user?.firstName || '',
                lastName: userInfo.user?.lastName || '',
                email: userInfo.user?.email || '',
                bankDetails: updatedBankDetails,
                address: userInfo.user?.address || undefined,
                city: userInfo.user?.city || undefined,
                country: userInfo.user?.country || undefined,
                phoneNumber: userInfo.user?.phoneNumber || undefined,
            };
            console.log('Sending payload to updateUserProfile:', JSON.stringify(userData, null, 2));
            const result = await updateUserProfile(userData);
            console.log('updateUserProfile response:', JSON.stringify(result, null, 2));
            if (result.status === 'success') {
                dispatch(setUser({ ...userInfo.user, ...userData }));
                setIsModalOpen(false);
                setBankForm({ bankName: '', accountNumber: '', accountTitle: '', iban: '' });
            } else {
                setError('Failed to update bank details: Invalid response status');
            }
        } catch (error: any) {
            console.error('Failed to update bank details:', error);
            setError(error.message || 'Failed to update bank details. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6  bg-white dark:bg-dark   ">
            {/* Header */}
            <h2 className="text-2xl font-bold text-[#003049] dark:text-white mb-2">Bank Details</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
                Your personal information is completely secure and we don’t share it with anyone.
            </p>

            {/* Loading State */}
            {isLoading && !isModalOpen && (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00B894]"></div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Bank Details Table */}
            {!isLoading && (
                <div className="mb-6">
                    <table className="w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-200">
                        <thead>
                            <tr className="border-b border-gray-300 dark:border-gray-600">
                                <th className="py-3 px-4 font-semibold text-[#003049] dark:text-gray-200">Bank Name</th>
                                <th className="py-3 px-4 font-semibold text-[#003049] dark:text-gray-200">Account Number</th>
                                <th className="py-3 px-4 font-semibold text-[#003049] dark:text-gray-200">Account Title</th>
                                <th className="py-3 px-4 font-semibold text-[#003049] dark:text-gray-200">IBAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userInfo.user?.bankDetails && userInfo.user.bankDetails.length > 0 ? (
                                userInfo.user.bankDetails.map((bank, index) => (
                                    <tr key={index} className="border-b border-gray-300 dark:border-gray-600">
                                        <td className="py-3 px-4">{bank.bankName || 'N/A'}</td>
                                        <td className="py-3 px-4">{bank.accountNumber || 'N/A'}</td>
                                        <td className="py-3 px-4">{bank.accountTitle || 'N/A'}</td>
                                        <td className="py-3 px-4">{bank.iban || 'N/A'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-3 px-4 text-center">
                                        No bank details provided
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {(!userInfo.user?.bankDetails || userInfo.user.bankDetails.length === 0) && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                            No bank details provided. Click below to add one.
                        </p>
                    )}
                </div>
            )}

            {/* Add New Bank Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-lg hover:opacity-90 transition"
                disabled={isLoading}
            >
                Add new bank account
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-[9999]">
                    <div className="relative bg-white dark:bg-dark p-6 rounded-2xl shadow-lg w-full max-w-xl border border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-[#003049] dark:text-white mb-4">Add Bank Details</h3>

                        <form className="space-y-4" onSubmit={handleBankSubmit}>
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
                                    name="bankName"
                                    value={bankForm.bankName}
                                    onChange={handleBankChange}
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
                                    name="accountNumber"
                                    placeholder="1234567890123456"
                                    value={bankForm.accountNumber}
                                    onChange={handleBankChange}
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
                                    name="accountTitle"
                                    placeholder="Muhammad Shakeel"
                                    value={bankForm.accountTitle}
                                    onChange={handleBankChange}
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
                                    name="iban"
                                    placeholder="PK36SCBL0000001123456702"
                                    value={bankForm.iban}
                                    onChange={handleBankChange}
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
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-lg hover:opacity-90 transition"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Adding...' : 'Add'}
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