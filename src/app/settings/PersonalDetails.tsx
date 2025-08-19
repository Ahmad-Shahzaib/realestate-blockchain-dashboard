"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setUser } from '@/redux/reducers/userInfoSlice';
import { getAxiosInstance } from "@/lib/axios";
import { getRequest, putRequest } from "@/app/utils/requests";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserProfile {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    gender?: string;
    [key: string]: any;
}

export default function PersonalDetails() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfo);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setIsLoading(true);

                const result = await getRequest(
                    getAxiosInstance('/api'),
                    "/api/users/profile"
                );

                if (result.status === "success") {
                    const user = result.data.user;


                    dispatch(setUser(user));


                    setFormData({
                        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
                        email: user.email || "",
                        phone: user.phoneNumber || "",
                        dob: user.dateOfBirth || "",
                        gender: user.gender || "",
                    });
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                setError('Failed to load user profile. Please try again later.');
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
                phoneNumber: formData.phone,
                dateOfBirth: formData.dob,
                gender: formData.gender
            };


            const result = await putRequest(
                getAxiosInstance('/api'),
                "/api/users/profile",
                userData
            );

            if (result.status === "success") {

                dispatch(setUser({
                    ...userInfo.user,
                    ...userData
                }));


                setIsEditing(false);
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
            setError('Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

return (
    <div className="rounded-xl p-6 shadow-sm bg-background border border-themebgColor text-black">
        <div className="flex justify-between items-start mb-6">
            <div>
                <h2 className="text-2xl font-semibold text-black">Personal Details</h2>
                <p className="text-sm text-black/70 mt-1">
                    Please keep your personal information up-to-date at all times. We do not share your information with any third party.
                </p>
            </div>
            {!isEditing && (
                <Button
                    variant="ghost"
                    onClick={() => setIsEditing(true)}
                    className="underline text-sm font-medium text-black"
                >
                    Edit
                </Button>
            )}
        </div>

        {isLoading && !isEditing && (
            <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-themebgColor"></div>
            </div>
        )}

        {error && (
            <div className="bg-red-900/10 border border-red-400 text-red-300 px-4 py-3 rounded mb-4">
                {error}
            </div>
        )}

        {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-semibold mb-1 text-black">Full Name (Legal)</label>
                    {isEditing ? (
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full legal name"
                            title="Full Name (Legal)"
                            className="w-full border border-themebgColor bg-background text-black rounded-md px-4 py-2"
                        />
                    ) : (
                        <div className="border border-themebgColor bg-background text-black rounded-md px-4 py-2">{formData.name || "-"}</div>
                    )}
                </div>

                {/* Photo */}
                <div>
                    <label className="block text-sm font-semibold mb-1 text-black">Photo</label>
                    <div className="flex items-center gap-3">
                        <Image
                            src="/profile.jpg"
                            alt="Profile"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        {isEditing && (
                            <a href="#" className="text-black underline text-sm">Change</a>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold mb-1 text-black">Email</label>
                    {isEditing ? (
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-themebgColor bg-background text-black rounded-md px-4 py-2"
                        />
                    ) : (
                        <div className="border border-themebgColor bg-background text-black rounded-md px-4 py-2">{formData.email || "-"}</div>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-semibold mb-1 text-black">Phone</label>
                    <div className="flex items-center border border-themebgColor bg-background text-black rounded-md px-2 py-2 gap-2">
                        <span className="flex items-center gap-1 px-2">
                            <span className="text-sm text-black">+92</span>
                        </span>
                        {isEditing ? (
                            <>
                                <Input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    title="Phone Number"
                                    placeholder="Enter your phone number"
                                    className="w-full border-none bg-background text-black focus:ring-0"
                                />
                                <Button className="bg-background border border-themebgColor text-black text-sm px-4 py-1.5 rounded-full">Verify</Button>
                            </>
                        ) : (
                            <span className="text-black text-sm">{formData.phone || "-"}</span>
                        )}
                    </div>
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block text-sm font-semibold mb-1 text-black">Date Of Birth</label>
                    {isEditing ? (
                        <Input
                            name="dob"
                            type="date"
                            placeholder="Select your date of birth"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full border border-themebgColor bg-background text-black rounded-md px-4 py-2"
                        />
                    ) : (
                        <div className="border border-themebgColor bg-background text-black rounded-md px-4 py-2 min-h-[42px]">
                            {formData.dob || "-"}
                        </div>
                    )}
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-sm font-semibold mb-1 text-black">Gender</label>
                    {isEditing ? (
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 text-sm text-black">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === "Male"}
                                    onChange={handleGenderChange}
                                />
                                Male
                            </label>
                            <label className="flex items-center gap-2 text-sm text-black">
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
                        <div className="border border-themebgColor bg-background text-black rounded-md px-4 py-2">
                            {formData.gender || "-"}
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* Buttons */}
        {isEditing && (
            <div className="mt-6 flex justify-end gap-4">
                <Button
                    variant="ghost"
                    onClick={() => setIsEditing(false)}
                    className="font-medium text-black"
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    className={`bg-background border border-themebgColor text-black px-6 py-2 rounded-md font-semibold flex items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading && (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    {isLoading ? 'Updating...' : 'Update'}
                </Button>
            </div>
        )}
    </div>
);
}
