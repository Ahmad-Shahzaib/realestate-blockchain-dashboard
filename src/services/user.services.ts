import { getAxiosInstance } from "@/lib/axios";
import { deleteRequest, getRequest, putRequest } from "@/app/utils/requests";

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
    notes?: string;
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
    id?: string | number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    walletAddress?: string;
    createdAt?: string;
    [key: string]: any;
}

// ✅ Get logged-in user profile
export async function getUserProfile(): Promise<{
    status: string;
    data: { user: UserProfile };
}> {
    try {
        return await getRequest(getAxiosInstance('/api'), `/api/users/profile?_=${Date.now()}`);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
}

// ✅ Update logged-in user profile
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

// ✅ Get all users (admin only)
// ✅ Get all users (admin only)
export async function getUsersInfo(page: number = 1, limit: number = 10, searchTerm: string = ''): Promise<{
    status: string;
    data: { users: UserDetails[], pagination: { totalUsers: number, totalPages: number, currentPage: number, limit: number } };
}> {
    try {
        const query = `/api/admin/users?page=${page}&limit=${limit}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}&_=${Date.now()}`;
        return await getRequest(getAxiosInstance('/api'), query);
    } catch (error) {
        console.error("Error fetching users info:", error);
        throw error;
    }
}

// ✅ Update specific user by Admin
export async function updateUserByAdmin(userId: string, userData: Partial<UserProfile>): Promise<{
    status: string;
    data: { user: UserProfile };
}> {
    try {
        return await putRequest(getAxiosInstance('/api'), `/api/admin/users/${userId}`, userData);
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

// ✅ Delete user by Admin
export async function deleteUser(userId: string): Promise<{
    status: string;
    message: string;
}> {
    try {
        return await deleteRequest(getAxiosInstance('/api'), `/api/admin/users/${userId}`);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}
