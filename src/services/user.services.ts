import { getAxiosInstance } from "@/lib/axios";
import { getRequest, putRequest } from "@/app/utils/requests";

export interface UserProfile {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    gender?: string;
    [key: string]: any;
}


export async function getUserProfile(): Promise<{
    status: string;
    data: { user: UserProfile };
}> {
    try {
        return await getRequest(getAxiosInstance('/api'), "/api/users/profile");
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
//  get all user detai https://proptechapi.softsuitetech.com//api/admin/users'

export interface UserDetails {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    [key: string]: any;
    phone: string;
    address: string;
    city: string;
    country: string
}

export async function getUsersInfo(): Promise<{
    status: string;
    data: { users: UserDetails[] };
}> {
    try {
        return await getRequest(getAxiosInstance('/api'), "/api/admin/users");
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
}
