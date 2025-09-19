import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

// Transaction interface
export interface Transaction {
    _id: string;
    propertyId: string;
    customerId: string;
    totalPrice: number;
    totalSquareFeet: number;
    type: string;
    createdAt: string;
    updatedAt: string;
}

// API Response structure for transactions
export interface TransactionResponse {
    status: string;
    data: Transaction | Transaction[]; // Support single or multiple transactions
    message?: string;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}

const API_BASE_URL = "https://dev.fractprop.com/api";

// Create Axios instance
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 second timeout
    headers: {
        "Content-Type": "application/json",
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
 * Service for handling transaction-related API requests
 */
export const TransactionService = {
    /**
     * Create a new transaction
     * @param payload Transaction data
     * @returns Promise with the created transaction data
     */
    createTransaction: async (payload: {
        propertyId: string;
        customerId: string;
        totalPrice: number;
        totalSquareFeet: number;
        type: string;
    }): Promise<TransactionResponse> => {
        try {
            const response: AxiosResponse<TransactionResponse> = await api.post(
                "/transactions",
                payload
            );
            return response.data;
        } catch (error: any) {
            throw error; // Error already handled by interceptor
        }
    },

    /**
     * Get all transactions (with optional pagination)
     * @param page Optional page number for pagination
     * @returns Promise with the API response
     */
    getAllTransactions: async (page?: number): Promise<TransactionResponse> => {
        try {
            const params = page ? { params: { page } } : {};
            const response: AxiosResponse<TransactionResponse> = await api.get(
                "/transactions",
                params
            );
            return response.data;
        } catch (error: any) {
            throw error; // Error already handled by interceptor
        }
    },

    /**
     * Get a single transaction by ID
     * @param id Transaction ID
     * @returns Promise with the transaction data
     */
    getTransactionById: async (id: string): Promise<Transaction> => {
        try {
            const response: AxiosResponse<TransactionResponse> = await api.get(
                `/transactions/${id}`
            );
            return response.data.data as Transaction;
        } catch (error: any) {
            throw error; // Error already handled by interceptor
        }
    },

    /**
     * Find a transaction by ID from a list of transactions
     * @param transactions List of transactions
     * @param id Transaction ID to find
     * @returns The found transaction or undefined
     */
    findTransactionById: (
        transactions: Transaction[],
        id: string
    ): Transaction | undefined => {
        return transactions.find((transaction) => transaction._id === id);
    },
};

export default TransactionService;