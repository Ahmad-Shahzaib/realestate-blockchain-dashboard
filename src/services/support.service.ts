import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { BASE_URL } from "../config/apiUrls"; // Using same config as ReferralService

export type SupportTicket = {
    _id: string;
    ticketId: number;
    ticketCode: string;
    title: string;
    description: string;
    userId: string;
    category: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export interface SupportApiResponse {
    status: string;
    data: SupportTicket;
}

export interface SupportApiListResponse {
    status: string;
    data: SupportTicket[];
}

// Using same Axios instance configuration as ReferralService
const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor (shared with ReferralService)
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

// Response Interceptor (shared with ReferralService)
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

export const SupportService = {
    // Create a new support ticket
    createSupportTicket: async (data: {
        title: string;
        description: string;
        userId: string;
        category: string;
    }): Promise<SupportTicket> => {
        try {
            const response = await api.post<SupportApiResponse>(`${BASE_URL}/support`, data);
            return response.data.data;
        } catch (error: any) {
            throw error; // Handled by interceptor
        }
    },

    // Get a specific support ticket by ID
    getSupportTicket: async (id: string): Promise<SupportTicket> => {
        try {
            const response = await api.get<SupportApiResponse>(`${BASE_URL}/support/${id}`);
            return response.data.data;
        } catch (error: any) {
            throw error; // Handled by interceptor
        }
    },

    // Get list of support tickets
    getSupportTickets: async (): Promise<SupportTicket[]> => {
        try {
            const response = await api.get<SupportApiListResponse>(`${BASE_URL}/support`);
            return response.data.data;
        } catch (error: any) {
            throw error; // Handled by interceptor
        }
    },

    // Update a support ticket
    updateSupportTicket: async (id: string, data: Partial<SupportTicket>): Promise<SupportTicket> => {
        try {
            const response = await api.put<SupportApiResponse>(`${BASE_URL}/support/${id}`, data);
            return response.data.data;
        } catch (error: any) {
            throw error; // Handled by interceptor
        }
    },

    // Delete a support ticket
    deleteSupportTicket: async (id: string): Promise<void> => {
        try {
            await api.delete(`${BASE_URL}/support/${id}`);
        } catch (error: any) {
            throw error; // Handled by interceptor
        }
    },
};

export default SupportService;