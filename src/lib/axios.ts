import axios from "axios";
import type { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

const BASE_URL = "http://localhost:5000/";
const instanceCache: { [key: string]: AxiosInstance } = {};

export function getAxiosInstance(serviceName: string, version = "1.0.0") {
    const cacheKey = `${serviceName}_${version}`;
    if (instanceCache[cacheKey]) {
        return instanceCache[cacheKey];
    }

    const instance = axios.create({
        baseURL: serviceName.startsWith('/api') ? BASE_URL : `${BASE_URL}/service/${serviceName}/${version}`,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
        },
    });

    instance.interceptors.request.use(
        (config) => {
            const token = getCookie("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error),
    );

    instance.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(error),
    );

    instanceCache[cacheKey] = instance;
    return instance;
}