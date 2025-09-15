"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setUser } from '@/redux/reducers/userinfoslice/userInfoSlice';
import { getAxiosInstance } from "@/lib/axios";
import { getRequest, putRequest } from "@/app/utils/requests";

interface UserProfile {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    gender?: string;
    country?: string;
    city?: string;
    address?: string;
    [key: string]: any;
}

export default function PersonalDetails() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfo);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        dob: "",
        gender: "",
        country: "",
        city: "",
        address: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setIsLoading(true);
                setError('');
                const result = await getRequest(getAxiosInstance('/api'), "/api/users/profile");
                console.log('getUserProfile response:', JSON.stringify(result, null, 2));
                if (result.status === "success") {
                    const user = result.data.user;
                    console.log('Fetched user data:', JSON.stringify(user, null, 2));
                    dispatch(setUser(user));
                    setFormData({
                        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
                        email: user.email || "",
                        phoneNumber: user.phoneNumber || "",
                        dob: user.dateOfBirth || "",
                        gender: user.gender || "",
                        country: user.country || "",
                        city: user.city || "",
                        address: user.address || "",
                    });
                } else {
                    setError('Failed to load user profile: Invalid response status');
                }
            } catch (error: any) {
                console.error("Failed to fetch profile:", error);
                setError(error.message || 'Failed to load user profile. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserProfile();
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, gender: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setError('');
            const nameParts = formData.name.trim().split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';
            const userData: UserProfile = {
                firstName,
                lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                dateOfBirth: formData.dob || undefined,
                gender: formData.gender || undefined,
                country: formData.country || undefined,
                city: formData.city || undefined,
                address: formData.address || undefined,
            };
            console.log('Sending payload to updateUserProfile:', JSON.stringify(userData, null, 2));
            const result = await putRequest(getAxiosInstance('/api'), "/api/users/profile", userData);
            console.log('updateUserProfile response:', JSON.stringify(result, null, 2));
            if (result.status === "success") {
                dispatch(setUser({ ...userInfo.user, ...userData }));
                setIsEditing(false);
            } else {
                setError('Failed to update profile: Invalid response status');
            }
        } catch (error: any) {
            console.error("Failed to update profile:", error);
            setError(error.message || 'Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-colors">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-[#003049] dark:text-white">Personal Details</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Please keep your personal information up-to-date at all times.
                        We do not share your information with any third party.
                    </p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-[#0277BD] hover:text-[#00B894] underline text-sm font-medium transition dark:text-[#00D2B6]"
                    >
                        Edit
                    </button>
                )}
            </div>

            {isLoading && !isEditing && (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00B894]"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {!isLoading && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-[#003049] dark:text-gray-200">
                                Full Name (Legal)
                            </label>
                            {isEditing ? (
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#00B894]/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Enter your full legal name"
                                />
                            ) : (
                                <div className="border rounded-md px-4 py-2 text-gray-700 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-700">
                                    {formData.name || "-"}
                                </div>
                            )}
                        </div>

                        {/* Photo */}
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-[#003049] dark:text-gray-200">Photo</label>
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/profile.jpg"
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                                {isEditing && (
                                    <a href="#" className="text-[#0277BD] hover:text-[#00B894] underline text-sm transition dark:text-[#00D2B6]">
                                        Change
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-[#003049] dark:text-gray-200">Email</label>
                            {isEditing ? (
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#00B894]/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            ) : (
                                <div className="border rounded-md px-4 py-2 text-gray-700 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-700">
                                    {formData.email || "-"}
                                </div>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-[#003049] dark:text-gray-200">Phone</label>
                            <div className="flex items-center border rounded-md px-2 py-2 gap-2 dark:bg-gray-700 dark:border-gray-600">
                                <span className="flex items-center gap-1 px-2">
                                    <span className="text-sm dark:text-gray-200">+92</span>
                                </span>
                                {isEditing ? (
                                    <>
                                        <input
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className="w-full border-0 focus:ring-0 dark:bg-gray-700 dark:text-white"
                                            placeholder="Enter your phone number"
                                        />

                                        <button className="bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white text-sm px-4 py-1.5 rounded-full shadow-md hover:opacity-90 transition">
                                            Verify
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-gray-700 dark:text-gray-200 text-sm">{formData.phoneNumber || "-"}</span>
                                )}
                            </div>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-[#003049] dark:text-gray-200">Date Of Birth</label>
                            {isEditing ? (
                                <input
                                    name="dob"
                                    type="date"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#00B894]/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            ) : (
                                <div className="border rounded-md px-4 py-2 min-h-[42px] text-gray-700 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-700">
                                    {formData.dob || "-"}
                                </div>
                            )}
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-[#003049] dark:text-gray-200">Gender</label>
                            {isEditing ? (
                                <div className="flex gap-6 text-gray-700 dark:text-gray-200">
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            checked={formData.gender === "Male"}
                                            onChange={handleGenderChange}
                                        />
                                        Male
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            checked={formData.gender === "Female"}
                                            onChange={handleGenderChange}
                                        />
                                        Female
                                    </label>
                                </div>
                            ) : (
                                <div className="border rounded-md px-4 py-2 text-gray-700 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-700">
                                    {formData.gender || "-"}
                                </div>
                            )}
                        </div>
                    </div>


                </>
            )}

            {/* Buttons */}
            {isEditing && (
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="text-gray-600 dark:text-gray-300 font-medium hover:text-[#003049] dark:hover:text-white transition"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className={`bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white px-6 py-2 rounded-md font-semibold shadow-md flex items-center hover:opacity-90 transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {isLoading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            )}
        </div>
    );
}