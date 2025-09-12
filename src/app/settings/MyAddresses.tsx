import Button from '@/common/Button';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setUser } from '@/redux/reducers/userinfoslice/userInfoSlice';
import { getUserProfile, updateUserProfile, UserProfile } from '@/services/user.services';
import { getAxiosInstance } from '@/lib/axios';

const MyAddresses = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfo);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [addressForm, setAddressForm] = useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setIsLoading(true);
                setError('');
                const result = await getUserProfile();
                if (result.status === 'success') {
                    const user = result.data.user;
                    dispatch(setUser(user));
                    setAddressForm({
                        addressLine1: user.address?.split(', ')[0] || '',
                        addressLine2: user.address?.split(', ')[1] || '',
                        city: user.city || '',
                        country: user.country || '',
                    });
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                setError('Failed to load address. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserProfile();
    }, [dispatch]);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
    };

    const handleAddressSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!addressForm.addressLine1) {
            setError('Address Line 1 is required');
            return;
        }
        try {
            setIsLoading(true);
            setError('');
            const userData: UserProfile = {
                address: `${addressForm.addressLine1}${addressForm.addressLine2 ? ', ' + addressForm.addressLine2 : ''}`,
                city: addressForm.city,
                country: addressForm.country,
            };
            const result = await updateUserProfile(userData);
            if (result.status === 'success') {
                dispatch(setUser({ ...userInfo.user, ...userData }));
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Failed to update address:', error);
            setError('Failed to update address. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-dark p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            {/* Header */}
            <h2 className="text-2xl font-bold text-[#003049] dark:text-white mb-2">My Addresses</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
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

            {/* Address Table */}
            {!isLoading && (
                <div className="mb-6">
                    <table className="w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-200">
                        <thead>
                            <tr className="border-b border-gray-300 dark:border-gray-600">
                                <th className="py-3 px-4 font-semibold text-[#003049] dark:text-gray-200">Address</th>
                                <th className="py-3 px-4 font-semibold text-[#003049] dark:text-gray-200">City</th>
                                <th className="py-3 px-4 font-semibold text-[#003049] dark:text-gray-200">Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-300 dark:border-gray-600">
                                <td className="py-3 px-4">
                                    {userInfo.user?.address || 'N/A'}
                                </td>
                                <td className="py-3 px-4">
                                    {userInfo.user?.city || 'N/A'}
                                </td>
                                <td className="py-3 px-4">
                                    {userInfo.user?.country || 'N/A'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {!(userInfo.user?.address || userInfo.user?.city || userInfo.user?.country) && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                            No address provided. Click below to add one.
                        </p>
                    )}
                </div>
            )}

            {/* Add/Edit Address Button */}
            <Button onClick={() => setIsModalOpen(true)} className="mb-4">
                {userInfo.user?.address ? 'Edit Address' : '+ Add New Address'}
            </Button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-[9999] ">
                    <div className="bg-white dark:bg-dark p-6 rounded-2xl shadow-lg w-full max-w-2xl">
                        <h3 className="text-xl font-bold text-[#003049] dark:text-white mb-2">My Address</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            We may, from time to time, send you account statements or other important information in
                            the post. Please ensure your address is up to date at all times.
                        </p>

                        <form className="space-y-4" onSubmit={handleAddressSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Address Line 1 */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#003049] dark:text-gray-200 mb-1">
                                        Address Line 1
                                    </label>
                                    <input
                                        type="text"
                                        name="addressLine1"
                                        placeholder="House No. 123, Street No. 1"
                                        value={addressForm.addressLine1}
                                        onChange={handleAddressChange}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-dark text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-[#00B894]/50"
                                        required
                                    />
                                    {error.includes('Address Line 1') && (
                                        <p className="text-red-500 text-sm mt-1">Address Line 1 is required</p>
                                    )}
                                </div>

                                {/* Address Line 2 */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#003049] dark:text-gray-200 mb-1">
                                        Address Line 2
                                    </label>
                                    <input
                                        type="text"
                                        name="addressLine2"
                                        placeholder="Sector H, Phase 8, Bahria Town"
                                        value={addressForm.addressLine2}
                                        onChange={handleAddressChange}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-dark text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-[#00B894]/50"
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#003049] dark:text-gray-200 mb-1">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="Rawalpindi"
                                        value={addressForm.city}
                                        onChange={handleAddressChange}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-dark text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-[#00B894]/50"
                                    />
                                </div>

                                {/* Country */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#003049] dark:text-gray-200 mb-1">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Pakistan"
                                        value={addressForm.country}
                                        onChange={handleAddressChange}
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
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Saving...' : 'Save Address'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAddresses;