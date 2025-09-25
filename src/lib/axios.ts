import axios from "axios";
import type { AxiosInstance } from "axios";
import { getCookie, deleteCookie } from "cookies-next";

const BASE_URL = "https://api.fractprop.com";
const instanceCache: { [key: string]: AxiosInstance } = {};

export function getAxiosInstance(serviceName: string, version = "1.0.0") {
    const cacheKey = `${serviceName}_${version}`;
    if (instanceCache[cacheKey]) {
        return instanceCache[cacheKey];
    }

    const instance = axios.create({
        baseURL: serviceName.startsWith("/api")
            ? BASE_URL
            : `${BASE_URL}/service/${serviceName}/${version}`,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // ✅ Request Interceptor
    instance.interceptors.request.use(
        (config) => {
            const token = getCookie("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // ✅ Response Interceptor (session expiry handling)
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                // Remove expired token
                deleteCookie("token");
                // Redirect to login
                if (typeof window !== "undefined") {
                    window.location.href = "/auth/sign-in";
                }
            }
            return Promise.reject(error);
        }
    );

    instanceCache[cacheKey] = instance;
    return instance;
}
