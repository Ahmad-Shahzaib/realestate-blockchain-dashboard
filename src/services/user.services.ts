import { getAxiosInstance } from "@/lib/axios";
import { getRequest, putRequest } from "@/app/utils/requests";

// Define BankDetail interface to match server response
export interface BankDetail {
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
    bankCode?: string;
    swiftCode?: string;
    iban?: string;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
    [key: string]: any;
}

// Update UserProfile interface to include bankDetails
export interface UserProfile {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    gender?: string;
    bankDetails?: BankDetail[];
    address?: string;
    city?: string;
    country?: string;
    solanaWalletAddress?: string;
    isVerified?: boolean;
    role?: string;
    kycStatus?: string;
    notificationPreferences?: {
        email?: boolean;
        sms?: boolean;
        push?: boolean;
        marketingEmails?: boolean;
    };
    referralCode?: string;
    referredBy?: string | null;
    referralCount?: number;
    accountStatus?: string;
    [key: string]: any;
}

// Define UserDetails interface for admin users endpoint
export interface UserDetails {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    walletAddress?: string;
    [key: string]: any;
}

export async function getUserProfile(): Promise<{
    status: string;
    data: { user: UserProfile };
}> {
    try {
        // Add cache-busting query parameter to prevent stale data
        return await getRequest(getAxiosInstance('/api'), `/api/users/profile?_=${Date.now()}`);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
}

export async function updateUserProfile(userData: UserProfile): Promise<{
    status: string;
    data: { user: UserProfile };
}> {
    try {
        return await putRequest(getAxiosInstance('/api'), "/api/users/profile", userData);
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
}

export async function getUsersInfo(): Promise<{
    status: string;
    data: { users: UserDetails[] };
}> {
    try {
        return await getRequest(getAxiosInstance('/api'), "/api/admin/users");
    } catch (error) {
        console.error("Error fetching users info:", error);
        throw error;
    }
}