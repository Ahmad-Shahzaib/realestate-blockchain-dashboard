"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setUser } from '@/redux/reducers/userinfoslice/userInfoSlice';
import { getAxiosInstance } from "@/lib/axios";
import { getRequest, putRequest } from "@/app/utils/requests";

type Nullable<T> = T | null | undefined;

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
    profileImage?: string;
    avatar?: string;
    [key: string]: any;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME = new Set(["image/png", "image/jpeg"]);
const ALLOWED_EXT = new Set(["png", "jpg", "jpeg"]);

export default function PersonalDetails() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfo);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(() => ({
        name: "",
        email: "",
        phoneNumber: "",
        dob: "",
        gender: "",
        country: "",
        city: "",
        address: "",
        imageUrl: "",
    }));

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // helper: split full name into first/last
    const splitName = (fullName: string) => {
        const parts = fullName.trim().split(" ").filter(Boolean);
        return {
            firstName: parts[0] || "",
            lastName: parts.slice(1).join(" ") || "",
        };
    };

    // fetch profile with cancellation support
    useEffect(() => {
        const controller = new AbortController();
        let mounted = true;

        const fetchUserProfile = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // getRequest abstraction doesn't accept a signal in current signature; call without it
                const result = await getRequest(getAxiosInstance('/api'), "/api/users/profile");
                if (!mounted) return;
                if (result && result.status === "success" && result.data?.user) {
                    const user: UserProfile = result.data.user;
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
                        imageUrl: user.profileImage || user.avatar || user.imageUrl || "",
                    });
                } else {
                    setError('Unable to load profile.');
                }
            } catch (err: any) {
                if (err?.name === 'AbortError') return;
                setError(err?.message || 'Unable to load profile.');
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        fetchUserProfile();

        return () => {
            mounted = false;
            controller.abort();
        };
    }, [dispatch]);

    // Generic field change
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleGenderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, gender: value }));
    }, []);

    const validateBeforeSubmit = (data: typeof formData) => {
        if (!data.name.trim()) return 'Full name is required.';
        if (data.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) return 'Please provide a valid email.';
        if (data.phoneNumber && data.phoneNumber.length < 6) return 'Please provide a valid phone number.';
        return null;
    };

    const handleSubmit = useCallback(async () => {
        setError(null);
        const clientValidation = validateBeforeSubmit(formData);
        if (clientValidation) {
            setError(clientValidation);
            return;
        }

        setIsLoading(true);
        try {
            const { firstName, lastName } = splitName(formData.name);
            const payload: UserProfile = {
                firstName,
                lastName,
                email: formData.email || undefined,
                phoneNumber: formData.phoneNumber || undefined,
                dateOfBirth: formData.dob || undefined,
                gender: formData.gender || undefined,
                country: formData.country || undefined,
                city: formData.city || undefined,
                address: formData.address || undefined,
            };

            const result = await putRequest(getAxiosInstance('/api'), "/api/users/profile", payload);
            if (result && result.status === 'success') {
                // merge local changes into redux user
                const baseUser = userInfo.user || {};
                dispatch(setUser({ ...(baseUser as any), ...payload } as any));
                setIsEditing(false);
            } else {
                setError('Unable to update profile.');
            }
        } catch (err: any) {
            setError(err?.message || 'Unable to update profile.');
        } finally {
            setIsLoading(false);
        }
    }, [formData, dispatch, userInfo.user]);

    // File upload handler separated for readability and testability
    const handleFileSelect = useCallback(async (file: File | null) => {
        setUploadError(null);
        if (!file) return;

        // basic validations
        if (file.size > MAX_IMAGE_SIZE) {
            setUploadError('Image must be smaller than 5MB.');
            return;
        }

        const ext = (file.name.split('.').pop() || '').toLowerCase();
        const mime = file.type || '';

        // Require extension to be one of the allowed types. Even if the browser
        // reports a valid MIME type, we reject files whose extension isn't png/jpg/jpeg
        // to prevent cases like `file.txxt` from being accepted.
        if (!ALLOWED_EXT.has(ext)) {
            setUploadError('Only PNG or JPG images are allowed (file extension).');
            return;
        }

        // If a MIME type is present, also ensure it matches allowed image MIME types.
        if (mime && !ALLOWED_MIME.has(mime)) {
            setUploadError('Only PNG or JPG images are allowed (invalid file type).');
            return;
        }

        setIsUploadingImage(true);
        try {
            // sanitize contentType
            const sanitizeType = (t: string | undefined) => {
                if (!t) return '';
                let s = t;
                try { s = decodeURIComponent(s); } catch { /* ignore */ }
                s = s.trim().toLowerCase();
                s = s.replace(/^content-?type\s*[:=]\s*/, '');
                if (s.indexOf(';') > -1) s = s.split(';')[0];
                if (s.indexOf(' ') > -1) s = s.split(' ')[0];
                return s;
            };

            const sanitized = sanitizeType(mime) || (ext === 'png' ? 'image/png' : 'image/jpeg');

            // Build a safe filename that preserves/forces a valid image extension.
            // This prevents uploads from ending up as `.txt` on S3 when the original
            // filename or server behavior would otherwise cause that.
            const originalExt = (file.name.split('.').pop() || '').toLowerCase();
            const useExt = ALLOWED_EXT.has(originalExt) ? originalExt : (sanitized.includes('png') ? 'png' : 'jpg');
            const baseName = (file.name.replace(/\.[^/.]+$/, '') || 'upload')
                .replace(/[^a-zA-Z0-9_-]/g, '-')
                .substring(0, 50);
            const safeFileName = `${baseName}-${Date.now()}.${useExt}`;

            // request presigned URL (use the safe filename)
            const presign = await getRequest(getAxiosInstance('/api'), `/api/upload_images?fileName=${encodeURIComponent(safeFileName)}&contentType=${encodeURIComponent(sanitized)}`);
            if (!presign || presign.status !== 'success' || !presign.url) {
                throw new Error('Failed to get upload URL from server.');
            }

            console.log('Presigned URL obtained:', presign.url.split('?')[0], sanitized, 'filename:', safeFileName);

            const uploadResp = await fetch(presign.url, {
                method: 'PUT',
                body: file,
                headers: { 'Content-Type': sanitized },
            });

            console.log('Upload response:', presign.url.split('?')[0]);
            if (!uploadResp.ok) throw new Error(`Upload failed (${uploadResp.status}).`);

            const publicUrl = presign.url.split('?')[0];
            console.log('Image uploaded to:', publicUrl);
            const result = await putRequest(getAxiosInstance('/api'), "/api/users/profile", { profileImage: publicUrl, avatar: publicUrl });
            if (result && result.status === 'success') {
                const baseUser = userInfo.user || {};
                dispatch(setUser({ ...(baseUser as any), profileImage: publicUrl, avatar: publicUrl } as any));
                setFormData((prev) => ({ ...prev, imageUrl: publicUrl }));
            } else {
                throw new Error('Failed to update profile with new image.');
            }
        } catch (err: any) {
            setUploadError(err?.message || 'Image upload failed.');
        } finally {
            setIsUploadingImage(false);
        }
    }, [dispatch, userInfo.user]);

    // input onChange wrapper for file input to keep JSX clean
    const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        void handleFileSelect(file);
        // reset input so selecting same file again still triggers change
        if (fileInputRef.current) fileInputRef.current.value = '';
    }, [handleFileSelect]);

    return (
        <div className="bg-white dark:bg-dark p-6 transition-colors">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-[#003049] dark:text-white">Personal Details</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Please keep your personal information up-to-date at all times. We do not share your information with any third party.
                    </p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-[#0277BD] hover:text-[#00B894] underline text-sm font-medium transition dark:text-[#00D2B6]"
                        aria-label="Edit personal details"
                        type="button"
                    >
                        Edit
                    </button>
                )}
            </div>

            {isLoading && !isEditing && (
                <div className="flex justify-center py-8" role="status" aria-live="polite">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00B894]" />
                </div>
            )}

            {(error || uploadError) && (
                <div className="mb-4">
                    {error && <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded">{error}</div>}
                    {uploadError && <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-200 px-4 py-3 rounded mt-2">{uploadError}</div>}
                </div>
            )}

            {!isLoading && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold mb-1 text-[#003049] dark:text-gray-200">Full Name (Legal)</label>
                            {isEditing ? (
                                <input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#00B894]/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Enter your full legal name"
                                    aria-required
                                />
                            ) : (
                                <div className="border rounded-md px-4 py-2 text-gray-700 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-700">{formData.name || '-'}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1 text-[#003049] dark:text-gray-200">Photo</label>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Image src={
                                        formData.imageUrl || '/images/user.png'} alt="Profile" width={40} height={40} className="rounded-full" />
                                    {isUploadingImage && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                                        </div>
                                    )}
                                </div>

                                {isEditing && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setUploadError(null);
                                                fileInputRef.current?.click();
                                            }}
                                            className="text-[#0277BD] hover:text-[#00B894] underline text-sm transition dark:text-[#00D2B6]"
                                        >
                                            Change
                                        </button>

                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/png,image/jpeg"
                                            className="hidden"
                                            onChange={onFileChange}
                                            aria-label="Upload profile photo"
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold mb-1 text-[#003049] dark:text-gray-200">Email</label>
                            {isEditing ? (
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#00B894]/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            ) : (
                                <div className="border rounded-md px-4 py-2 text-gray-700 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-700">{formData.email || '-'}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1 text-[#003049] dark:text-gray-200">Phone</label>
                            <div className="flex items-center border rounded-md px-2 py-2 gap-2 dark:bg-gray-700 dark:border-gray-600">
                                <span className="flex items-center gap-1 px-2"><span className="text-sm dark:text-gray-200">+92</span></span>
                                {isEditing ? (
                                    <>
                                        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full border-0 focus:ring-0 dark:bg-gray-700 dark:text-white" placeholder="Enter your phone number" />
                                        <button className="bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white text-sm px-4 py-1.5 rounded-full shadow-md hover:opacity-90 transition" type="button">Verify</button>
                                    </>
                                ) : (
                                    <span className="text-gray-700 dark:text-gray-200 text-sm">{formData.phoneNumber || '-'}</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1 text-[#003049] dark:text-gray-200">Date Of Birth</label>
                            {isEditing ? (
                                <input name="dob" type="date" value={formData.dob} onChange={handleChange} className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#00B894]/50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            ) : (
                                <div className="border rounded-md px-4 py-2 min-h-[42px] text-gray-700 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-700">{formData.dob || '-'}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1 text-[#003049] dark:text-gray-200">Gender</label>
                            {isEditing ? (
                                <div className="flex gap-6 text-gray-700 dark:text-gray-200">
                                    <label className="flex items-center gap-2 text-sm">
                                        <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleGenderChange} /> Male
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                                        <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleGenderChange} /> Female
                                    </label>
                                </div>
                            ) : (
                                <div className="border rounded-md px-4 py-2 text-gray-700 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-700">{formData.gender || '-'}</div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {isEditing && (
                <div className="mt-6 flex justify-end gap-4">
                    <button onClick={() => setIsEditing(false)} className="text-gray-600 dark:text-gray-300 font-medium hover:text-[#003049] dark:hover:text-white transition" disabled={isLoading} type="button">Cancel</button>
                    <button onClick={handleSubmit} className={`bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white px-6 py-2 rounded-md font-semibold shadow-md flex items-center hover:opacity-90 transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`} disabled={isLoading} type="button">
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