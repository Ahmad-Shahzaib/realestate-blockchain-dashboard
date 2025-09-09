import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { BASE_URL } from "../config/apiUrls"; // ✅ use central config

export type Referral = {
    _id: string;
    level: number;
    percentage: number;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export interface ReferralApiResponse {
    status: string;
    data: Referral;
}

// ✅ Create Axios instance using BASE_URL from config
const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Request Interceptor
api.interceptors.request.use(
    (config) => {
        const tokenRow = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="));
        const token = tokenRow ? tokenRow.split("=")[1] : "";

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        console.log(
            "Request sent:",
            (config.method ?? "GET").toUpperCase(),
            config.url,
            config
        );
        return config;
    },
    (error: AxiosError) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// ✅ Response Interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log(
            "Response received:",
            response.config.method?.toUpperCase(),
            response.config.url,
            response.data
        );
        return response;
    },
    (error: AxiosError) => {
        if (error.code === "ECONNABORTED") {
            console.error("Request timed out:", error.message);
            return Promise.reject(
                new Error("Request timed out. API server may be down.")
            );
        }
        if (error.response) {
            console.error(
                "Response error:",
                error.response.status,
                error.response.data
            );
            if (error.response.status === 401) {
                console.error("Unauthorized - redirect to login");
            } else if (error.response.status === 404) {
                console.error("Resource not found");
            }
        } else if (!error.response) {
            console.error("Network error:", error.message);
            return Promise.reject(
                new Error(
                    "Network error. Please check your connection or if the API server is running."
                )
            );
        }
        return Promise.reject(error);
    }
);

// ✅ Referral Service (using API_URLS from config)
export const ReferralService = {
    // Get referral code
    getReferralCode: async (): Promise<Referral> => {
        try {
            const response = await api.get<ReferralApiResponse>(`${BASE_URL}/admin/refer-settings`);
            return response.data.data;
        } catch (error: any) {
            throw error; // Already handled by interceptor
        }
    },

    // ✅ Create referral (missing before)
    createReferral: async (data: Partial<Referral>): Promise<Referral> => {
        try {
            const response = await api.post<ReferralApiResponse>(`${BASE_URL}/admin/refer-settings`, data);
            return response.data.data;
        } catch (error: any) {
            throw error; // Already handled by interceptor
        }
    },
};

export default ReferralService;

