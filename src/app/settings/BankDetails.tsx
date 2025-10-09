import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setUser } from '@/redux/reducers/userinfoslice/userInfoSlice';
import {
    addBankAccount,
    getAllBankAccounts,
    updateBankAccount,
    deleteBankAccount,
    BankDetail
} from '@/services/bank.service';

// Define icons (you can replace these with actual icon components)
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

const BankDetails = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfo);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [editingBank, setEditingBank] = useState<BankDetail | null>(null);
    const [bankForm, setBankForm] = useState({
        bankName: '',
        accountNumber: '',
        accountName: '',
        iban: '',
    });

    // Memoize fetchBankDetails to prevent unnecessary re-creation
    const fetchBankDetails = useCallback(async () => {
        if (userInfo.user?.bankDetails?.length) {
            return;
        }
        try {
            setIsLoading(true);
            setError('');
            const result = await getAllBankAccounts();
            console.log('getAllBankAccounts response:', JSON.stringify(result, null, 2));
            if (result.status === 'success') {
                const validBankDetails = (result.data.bankDetails || []).filter(
                    (bank): bank is BankDetail => bank !== null && bank !== undefined
                );
                dispatch(setUser({ ...userInfo.user, bankDetails: validBankDetails }));
            } else {
                setError(`Failed to load bank details: ${result.message || 'Invalid response status'}`);
            }
        } catch (error: any) {
            console.error('Failed to fetch bank details:', error);
            setError(
                error.response?.status === 404
                    ? 'Bank details endpoint not found. Please check the server configuration.'
                    : error.message || 'Failed to load bank details. Please try again later.'
            );
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, userInfo.user?.bankDetails]);

    // Fetch bank details only on component mount
    useEffect(() => {
        fetchBankDetails();
    }, [fetchBankDetails]);

    const handleBankChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setBankForm({ ...bankForm, [e.target.name]: e.target.value });
    };

    const handleBankSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bankForm.bankName || !bankForm.accountNumber || !bankForm.accountName) {
            setError('Bank Name, Account Number, and Account Name are required');
            return;
        }
        try {
            setIsLoading(true);
            setError('');
            setSuccessMessage('');

            let result;
            if (editingBank) {
                // Update existing bank account
                result = await updateBankAccount(editingBank._id!, bankForm);
            } else {
                // Add new bank account
                result = await addBankAccount(bankForm);
            }

            console.log('bank operation response:', JSON.stringify(result, null, 2));

            const newDetail =
                result.data?.bankDetail ||
                result.bankDetail ||
                result.data?.bankAccount ||
                result.data?.account ||
                result.data ||
                result.bankAccount ||
                result.account ||
                result ||
                null;

            const isSuccess =
                (result.status === 'success' ||
                    result.status === 'ok' ||
                    result.status === 'created' ||
                    result.status === 200 ||
                    result.status === 201 ||
                    result.status === true) ||
                (result.message && typeof result.message === 'string' && result.message.toLowerCase().includes('successfully')) ||
                (result.message && typeof result.message === 'string' && result.message.toLowerCase().includes('added'));

            if (isSuccess) {
                if (newDetail && typeof newDetail === 'object') {
                    let updatedBankDetails;
                    if (editingBank) {
                        // Update existing bank in the list
                        updatedBankDetails = (userInfo.user?.bankDetails || []).map(bank =>
                            bank._id === editingBank._id ? newDetail : bank
                        );
                        setSuccessMessage('Bank account updated successfully!');
                    } else {
                        // Add new bank to the list
                        updatedBankDetails = [...(userInfo.user?.bankDetails || []), newDetail];
                        setSuccessMessage('Bank account added successfully!');
                    }

                    dispatch(setUser({ ...userInfo.user, bankDetails: updatedBankDetails }));
                }

                setIsModalOpen(false);
                setBankForm({ bankName: '', accountNumber: '', accountName: '', iban: '' });
                setEditingBank(null);

                // Clear success message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);

                // Refetch to ensure latest data
                setTimeout(() => fetchBankDetails(), 500);
            } else {
                console.error('API failure response:', result);
                setError(
                    result.message
                        ? `Failed to ${editingBank ? 'update' : 'add'} bank details: ${result.message}`
                        : `Failed to ${editingBank ? 'update' : 'add'} bank details: Unknown error`
                );
            }
        } catch (error: any) {
            console.error('Failed to process bank details:', error);
            setError(error.response?.data?.message || error.message || `Failed to ${editingBank ? 'update' : 'add'} bank details. Please try again.`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditClick = (bank: BankDetail) => {
        setEditingBank(bank);
        setBankForm({
            bankName: bank.bankName || '',
            accountNumber: bank.accountNumber || '',
            accountName: bank.accountName || '',
            iban: bank.iban || '',
        });
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this bank account?')) {
            try {
                setIsLoading(true);
                setError('');
                setSuccessMessage('');
                const result = await deleteBankAccount(id);
                console.log('deleteBankAccount response:', JSON.stringify(result, null, 2));

                if (result.status === 'success') {
                    // Remove deleted bank from state
                    const updatedBankDetails = (userInfo.user?.bankDetails || []).filter(bank => bank._id !== id);
                    dispatch(setUser({ ...userInfo.user, bankDetails: updatedBankDetails }));
                    setSuccessMessage('Bank account deleted successfully!');
                    // Clear success message after 3 seconds
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 3000);
                } else {
                    setError(
                        result.message
                            ? `Failed to delete bank account: ${result.message}`
                            : 'Failed to delete bank account: Unknown error'
                    );
                }
            } catch (error: any) {
                console.error('Failed to delete bank account:', error);
                setError(error.response?.data?.message || error.message || 'Failed to delete bank account. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingBank(null);
        setBankForm({ bankName: '', accountNumber: '', accountName: '', iban: '' });
    };

    return (
        <div className="p-6 bg-white dark:bg-dark">
            {/* Header */}
            <h2 className="text-2xl font-bold text-[#003049] dark:text-white mb-2">Bank Details</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
                Your personal information is completely secure and we don't share it with anyone.
            </p>

            {/* Success Message */}
            {successMessage && (
                <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 px-4 py-3 rounded mb-4">
                    {successMessage}
                </div>
            )}

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
                                <th className="py-3 px-4 font-semibold text-[#003049] dark:text-gray-200">Account Name</th>
                                <th className="py-3 px-4 font-semibold text-[#003049] dark:text-gray-200">IBAN</th>
                                <th className="py-3 px-4 font-semibold text-[#003049] dark:text-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userInfo.user?.bankDetails && userInfo.user.bankDetails.length > 0 ? (
                                userInfo.user.bankDetails.map((bank) =>
                                    bank ? (
                                        <tr key={bank._id} className="border-b border-gray-300 dark:border-gray-600">
                                            <td className="py-3 px-4">{bank.bankName || 'N/A'}</td>
                                            <td className="py-3 px-4">{bank.accountNumber || 'N/A'}</td>
                                            <td className="py-3 px-4">{bank.accountName || 'N/A'}</td>
                                            <td className="py-3 px-4">{bank.iban || 'N/A'}</td>
                                            <td className="py-3 px-4">
                                                <button
                                                    onClick={() => handleEditClick(bank)}
                                                    className="text-blue-600 hover:text-blue-800 mr-3"
                                                    title="Edit"
                                                >
                                                    <EditIcon />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(bank._id!)}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Delete"
                                                >
                                                    <TrashIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    ) : null
                                )
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-3 px-4 text-center">
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
                onClick={() => {
                    setEditingBank(null);
                    setBankForm({ bankName: '', accountNumber: '', accountName: '', iban: '' });
                    setIsModalOpen(true);
                }}
                className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-lg hover:opacity-90 transition"
                disabled={isLoading}
            >
                Add new bank account
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-[9999]">
                    <div className="relative bg-white dark:bg-dark p-6 rounded-2xl shadow-lg w-full max-w-xl border border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-[#003049] dark:text-white mb-4">
                            {editingBank ? 'Edit Bank Details' : 'Add Bank Details'}
                        </h3>

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
                                    <option value="MCB">MCB Bank Limited</option>
                                    <option value="Meezan">Meezan Bank Limited</option>
                                    <option value="Allied">Allied Bank Limited (ABL)</option>
                                    <option value="Askari">Askari Bank Limited</option>
                                    <option value="Alfalah">Bank Alfalah Limited</option>
                                    <option value="StandardChartered">Standard Chartered Bank Pakistan</option>
                                    <option value="NBP">National Bank of Pakistan (NBP)</option>
                                    <option value="Faysal">Faysal Bank Limited</option>
                                    <option value="BankAlHabib">Bank AL Habib Limited</option>
                                    <option value="JSBL">JS Bank Limited</option>
                                    <option value="HabbibMetro">Habib Metropolitan Bank Limited</option>
                                    <option value="Samba">Samba Bank Limited</option>
                                    <option value="BankIslami">BankIslami Pakistan Limited</option>
                                    <option value="DubaiIslamic">Dubai Islamic Bank Pakistan Limited</option>
                                    <option value="AlBaraka">Al Baraka Bank Pakistan Limited</option>
                                    <option value="MeezanIslamic">Meezan Bank Limited (Islamic)</option>
                                    <option value="BankOfPunjab">The Bank of Punjab</option>
                                    <option value="BankOfKhyber">The Bank of Khyber</option>
                                    <option value="SindhBank">Sindh Bank Limited</option>
                                    <option value="ZaraiTaraqiati">Zarai Taraqiati Bank Limited</option>
                                    <option value="IndustrialDev">Industrial Development Bank of Pakistan</option>
                                    <option value="SMEBank">National Bank of Pakistan - SME Bank Limited</option>
                                    <option value="PunjabProvincial">Punjab Provincial Cooperative Bank Limited</option>
                                    <option value="KhyberProvincial">Khyber Provincial Cooperative Bank Limited</option>
                                    <option value="BalochistanProvincial">Balochistan Provincial Cooperative Bank Limited</option>
                                    <option value="SindhProvincial">Sindh Provincial Cooperative Bank Limited</option>
                                    <option value="Citibank">Citibank N.A. Pakistan</option>
                                    <option value="Barclays">Barclays Bank PLC Pakistan</option>
                                    <option value="DeutscheBank">Deutsche Bank AG Pakistan</option>
                                    <option value="HBZ">Habib Bank Zurich plc</option>
                                    <option value="Mashreq">Mashreq Bank Pakistan Limited</option>
                                    <option value="BankNizwa">Bank Nizwa Limited</option>
                                    <option value="UAEBank">The UAE Bank Limited</option>
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

                            {/* Account Name */}
                            <div>
                                <label className="block text-sm font-medium text-[#003049] dark:text-gray-200 mb-1">
                                    Account Name
                                </label>
                                <input
                                    type="text"
                                    name="accountName"
                                    placeholder="Account Name here"
                                    value={bankForm.accountName}
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
                                    onClick={closeModal}
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
                                    {isLoading ? (editingBank ? 'Updating...' : 'Adding...') : (editingBank ? 'Update' : 'Add')}
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