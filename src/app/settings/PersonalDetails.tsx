"use client";

import { useState } from "react";
import Image from "next/image";

export default function PersonalDetails() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "Softsuite Technologies",
        email: "info@softsuitetech.com",
        phone: "+92315 1012287",
        dob: "",
        gender: "Male",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, gender: e.target.value });
    };

    const handleSubmit = () => {
        setIsEditing(false);
        // Optionally send formData to backend here
    };

    return (
        <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Personal Details</h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Please keep your personal information up-to-date at all times. We do not share your information with any third party.
                    </p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-700 underline text-sm font-medium"
                    >
                        Edit
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Full Name (Legal)</label>
                    {isEditing ? (
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded-md px-4 py-2"
                            placeholder="Enter your full legal name"
                            title="Full Name (Legal)"
                        />
                    ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-2">{formData.name}</div>
                    )}
                </div>

                {/* Photo */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Photo</label>
                    <div className="flex items-center gap-3">
                        <Image
                            src="/profile.jpg"
                            alt="Profile"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        {isEditing && (
                            <a href="#" className="text-blue-600 underline text-sm">Change</a>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Email</label>
                    {isEditing ? (
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-md px-4 py-2"
                        />
                    ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-2">{formData.email}</div>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Phone</label>
                    <div className="flex items-center border rounded-md px-2 py-2 gap-2">
                        <span className="flex items-center gap-1 px-2">
                            🇵🇰 <span className="text-sm">+92</span>
                        </span>
                        {isEditing ? (
                            <>
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full border-none focus:ring-0"
                                    title="Phone Number"
                                    placeholder="Enter your phone number"
                                />
                                <button className="bg-blue-700 text-white text-sm px-4 py-1.5 rounded-full">Verify</button>
                            </>
                        ) : (
                            <span className="text-gray-700 text-sm">{formData.phone}</span>
                        )}
                    </div>
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Date Of Birth</label>
                    {isEditing ? (
                        <input
                            name="dob"
                            type="date"
                            placeholder="Select your date of birth"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full border rounded-md px-4 py-2"
                        />
                    ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-2 min-h-[42px]">
                            {formData.dob || "-"}
                        </div>
                    )}
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Gender</label>
                    {isEditing ? (
                        <div className="flex gap-6">
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
                        <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-gray-600">
                            {formData.gender}
                        </div>
                    )}
                </div>
            </div>

            {/* Buttons */}
            {isEditing && (
                <div className="mt-6 flex justify-end gap-4">
                    <button onClick={() => setIsEditing(false)} className="text-black font-medium">Cancel</button>
                    <button onClick={handleSubmit} className="bg-blue-700 text-white px-6 py-2 rounded-md font-semibold">Update</button>
                </div>
            )}
        </div>
    );
}
