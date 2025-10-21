"use client";

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { getAxiosInstance } from "@/lib/axios";
import store from "../store";

export const handleLogin = async (credentials: {
    email: string;
    password: string;
}) => {
    try {
        const response = await getAxiosInstance('/api/auth').post("/api/auth/login", credentials);
        const { user, accessToken, refreshToken } = response.data.data;
        console.log("response from backend", response.data);
        console.log("Login response:", user);

        // Set cookies using cookies-next
        setCookie("token", accessToken, {
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        setCookie("refreshToken", refreshToken, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        // Store user data including role in cookie
        setCookie("user", JSON.stringify(user), {
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        // Dispatch a custom event to notify components about login
        window.dispatchEvent(new Event('storage'));

        return user;
    } catch (error) {
        throw error;
    }
};

export const handleRegister = async (credentials: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    referralCode?: string;
}) => {
    try {
        const response = await getAxiosInstance('/api/auth').post("/api/auth/register", {
            ...credentials,
        });
        return response.data.user;
    } catch (error:any) {
        console.error("Registration error:", error);
        const message =
            error?.response?.data?.message || error?.message || 'Registration failed';
        throw new Error(message);
    }
};


export const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("refreshToken");
    deleteCookie("user");
    store.dispatch({ type: 'RESET_ALL' });
    // empty all the store 
    
    // Dispatch a custom event before redirecting
    window.dispatchEvent(new Event('storage'));
    window.location.href = "/auth/sign-in";
};
export const isAuthenticated = () => {
    const token = getCookie("token");
    return !!token;
};

export const getUserRole = (): 'user' | 'admin' | 'superadmin' | "customer" | null => {
    const user = getUserFromCookie();
    return user?.role || null;
};

export const isUser = (): boolean => {
    const role = getUserRole();
    return role === 'user';
};

export const isAdmin = (): boolean => {
    const role = getUserRole();
    return role === 'admin';
};

export const isSuperAdmin = (): boolean => {
    const role = getUserRole();
    return role === 'superadmin';
};

export const isCustomer = (): boolean => {
    const role = getUserRole();
    return role === 'customer';
};

export const getUserFromCookie = () => {
    try {
        const userJson = getCookie("user");
        if (!userJson) return null;
        return JSON.parse(String(userJson));
    } catch (error) {
        console.error("Error parsing user from cookie:", error);
        return null;
    }
};