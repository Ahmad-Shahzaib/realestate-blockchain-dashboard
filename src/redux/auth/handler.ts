"use client";

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { getAxiosInstance } from "@/lib/axios";



export const handleLogin = async (credentials: {
    email: string;
    password: string;
}) => {
    try {
        const response = await getAxiosInstance('/api/auth').post("/api/auth/login", credentials);
        const { user, accessToken, refreshToken } = response.data.data;
        console.log("response from backend", response.data)
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

}) => {
    try {
        const response = await getAxiosInstance('/api/auth').post("/api/auth/register", {
            ...credentials,
        });

        return response.data.user;
    } catch (error) {
        throw error;
    }
};


export const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("refreshToken");
    window.location.href = "/auth/login";
};
export const isAuthenticated = () => {
    const token = getCookie("token");
    return !!token;
};