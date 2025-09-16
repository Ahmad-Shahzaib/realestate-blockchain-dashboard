import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

// Payment interface
export interface Payment {
    _id: string;
    transactionId: string;
    paymentType: "cash" | "crypto" | "online";
    amount: number;
    currency?: string;
    status?: "pending" | "processing" | "completed" | "failed" | "cancelled";
    notes?: string;
    paymentSlip?: string; // URL to S3-stored file
    createdAt: string;
    updatedAt: string;
}

// API Response structure for payments
export interface PaymentResponse {
    status: string;
    data: Payment | Payment[]; // Support single or multiple payments
    message?: string;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}

const API_BASE_URL = "http://localhost:5000/api";

// Create Axios instance
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 second timeout
    headers: {
        "Content-Type": "multipart/form-data", // Default for file uploads
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        // Get token from cookies
        const tokenRow = document.cookie.split("; ").find((row) =>
            row.startsWith("token=")
        );
        const token = tokenRow ? tokenRow.split("=")[1] : "";
        // If token exists, set it in the Authorization header
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

// Response Interceptor
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
            return Promise.reject(new Error("Request timed out. API server may be down."));
        }
        if (error.response) {
            console.error("Response error:", error.response.status, error.response.data);
            // Handle specific status codes
            if (error.response.status === 401) {
                console.error("Unauthorized access - redirecting to login");
                // Optionally trigger a redirect or logout
            } else if (error.response.status === 404) {
                console.error("Resource not found");
            }
        } else if (!error.response) {
            console.error("Network error:", error.message);
            return Promise.reject(
                new Error("Network error. Please check your connection or if the API server is running.")
            );
        }
        return Promise.reject(error);
    }
);

/**
 * Service for handling payment-related API requests
 */
export const PaymentService = {
    /**
     * Create a new payment
     * @param payload Payment data including optional file upload
     * @returns Promise with the created payment data
     */
    createPayment: async (payload: {
        transactionId: string;
        paymentType: "cash" | "crypto" | "online";
        amount: number;
        currency?: string;
        status?: "pending" | "processing" | "completed" | "failed" | "cancelled";
        notes?: string;
        paymentSlip?: File;
    }): Promise<PaymentResponse> => {
        try {
            const formData = new FormData();
            formData.append("transactionId", payload.transactionId);
            formData.append("paymentType", payload.paymentType);
            formData.append("amount", payload.amount.toString());
            if (payload.currency) formData.append("currency", payload.currency);
            if (payload.status) formData.append("status", payload.status);
            if (payload.notes) formData.append("notes", payload.notes);
            if (payload.paymentSlip) formData.append("paymentSlip", payload.paymentSlip);

            const response: AxiosResponse<PaymentResponse> = await api.post(
                "/payments",
                formData
            );
            return response.data;
        } catch (error: any) {
            throw error; // Error already handled by interceptor
        }
    },

    /**
     * Get all payments (with optional pagination)
     * @param page Optional page number for pagination
     * @returns Promise with the API response
     */
    getAllPayments: async (page?: number): Promise<PaymentResponse> => {
        try {
            const params = page ? { params: { page } } : {};
            const response: AxiosResponse<PaymentResponse> = await api.get(
                "/payments",
                params
            );
            return response.data;
        } catch (error: any) {
            throw error; // Error already handled by interceptor
        }
    },

    /**
     * Get a single payment by ID
     * @param id Payment ID
     * @returns Promise with the payment data
     */
    getPaymentById: async (id: string): Promise<Payment> => {
        try {
            const response: AxiosResponse<PaymentResponse> = await api.get(
                `/payments/${id}`
            );
            return response.data.data as Payment;
        } catch (error: any) {
            throw error; // Error already handled by interceptor
        }
    },

    /**
     * Find a payment by ID from a list of payments
     * @param payments List of payments
     * @param id Payment ID to find
     * @returns The found payment or undefined
     */
    findPaymentById: (
        payments: Payment[],
        id: string
    ): Payment | undefined => {
        return payments.find((payment) => payment._id === id);
    },
};

export default PaymentService;