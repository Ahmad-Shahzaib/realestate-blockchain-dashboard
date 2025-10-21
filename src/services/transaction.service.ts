import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

// Transaction interface
export interface Transaction {
    _id: string;
    propertyId: string | Property;
    customerId: string;
    userId: string | null;
    totalPrice: number;
    totalSquareFeet: number;
    type: string;
    status: string;
    paymentSuccess: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Property {
    name?: string;
    location?: {
        coordinates?: {
            latitude: number;
            longitude: number;
        };
        address?: string;
    };
    address?: string;
    city?: string;
    state?: string;
    country?: string;
}

// API Response structure for transactions
export interface TransactionResponse {
    status: string;
    data: {
        transactions?: Transaction[];
        transaction?: Transaction;
        pagination?: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
        stats?: {
            totalTransactions: number;
            totalRevenue: number;
            averagePrice: number;
            totalSquareFeet: number;
            successfulPayments: number;
            pendingTransactions: number;
            completedTransactions: number;
            failedTransactions: number;
        };
    };
    message?: string;
}

const API_BASE_URL = "https://api.fractprop.com/api";

// Create Axios instance
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const tokenRow = document.cookie.split("; ").find((row) =>
            row.startsWith("token=")
        );
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
            if (error.response.status === 401) {
                console.error("Unauthorized access - redirecting to login");
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
        type: "average" | "chosen";
        userId?: string;
        status?: "pending" | "completed" | "failed";
        paymentSuccess?: boolean;
        floorId?: string;
    }): Promise<TransactionResponse> => {
        try {
            const response: AxiosResponse<TransactionResponse> = await api.post(
                "/transactions",
                payload
            );
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },

    /**
     * Get all transactions with filters and pagination
     * @param params Query parameters for pagination and filtering
     * @returns Promise with the API response
     */
    getAllTransactions: async (currentPage: number, itemsPerPage: number, searchTerm: string, params: {
        page?: number;
        limit?: number;
        status?: string;
        type?: string;
        paymentSuccess?: boolean;
        startDate?: string;
        endDate?: string;
        minPrice?: number;
        maxPrice?: number;
        userId?: string;
        customerId?: string;
        propertyId?: string;
        sort?: string;
    } = {}): Promise<TransactionResponse> => {
        try {
            const response: AxiosResponse<TransactionResponse> = await api.get(
                "/transactions",
                { params }
            );
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },

    /**
     * Get a single transaction by ID
     * @param id Transaction ID
     * @returns Promise with the transaction data
     */
    getTransactionById: async (id: string): Promise<TransactionResponse> => {
        try {
            const response: AxiosResponse<TransactionResponse> = await api.get(
                `/transactions/${id}`
            );
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },

    /**
     * Update a transaction (Admin-only)
     * @param id Transaction ID
     * @param payload Updated transaction data
     * @returns Promise with the updated transaction data
     */
    updateTransaction: async (
        id: string,
        payload: {
            totalPrice?: number;
            totalSquareFeet?: number;
            status?: "pending" | "completed" | "failed";
            type?: "average" | "chosen";
            paymentSuccess?: boolean;
        }
    ): Promise<TransactionResponse> => {
        try {
            const response: AxiosResponse<TransactionResponse> = await api.put(
                `/transactions/${id}`,
                payload
            );
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },

    /**
     * Delete a transaction (Admin-only)
     * @param id Transaction ID
     * @returns Promise with the API response
     */
    deleteTransaction: async (id: string): Promise<TransactionResponse> => {
        try {
            const response: AxiosResponse<TransactionResponse> = await api.delete(
                `/transactions/${id}`
            );
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },

    /**
     * Get transactions for the authenticated user
     * @param params Query parameters for pagination and sorting
     * @returns Promise with the API response containing user's transactions
     */
    getUserTransactions: async (params: {
        page?: number;
        limit?: number;
        sort?: string;
    } = {}): Promise<TransactionResponse> => {
        try {
            const response: AxiosResponse<TransactionResponse> = await api.get(
                "/transactions/user/my",
                { params }
            );
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },

    /**
     * Get transactions by user ID (Admin-only)
     * @param userId User ID to filter transactions
     * @param params Query parameters for pagination and sorting
     * @returns Promise with the API response containing transactions for the user
     */
    getTransactionsByUserId: async (
        userId: string,
        params: {
            page?: number;
            limit?: number;
            sort?: string;
        } = {}
    ): Promise<TransactionResponse> => {
        try {
            const response: AxiosResponse<TransactionResponse> = await api.get(
                `/transactions/user/${userId}`,
                { params }
            );
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },

    /**
     * Get transactions by customer ID (Admin-only)
     * @param customerId Customer ID to filter transactions
     * @param params Query parameters for pagination
     * @returns Promise with the API response containing transactions for the customer
     */
    getTransactionsByCustomerId: async (
        customerId: string,
        params: {
            page?: number;
            limit?: number;
            sort?: string;
        } = {}
    ): Promise<TransactionResponse> => {
        try {
            const response: AxiosResponse<TransactionResponse> = await api.get(
                `/transactions/customer/${customerId}`,
                { params }
            );
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },

    /**
     * Get transactions by property ID
     * @param propertyId Property ID to filter transactions
     * @param params Query parameters for pagination
     * @returns Promise with the API response containing transactions for the property
     */
    getTransactionsByPropertyId: async (
        propertyId: string,
        params: {
            page?: number;
            limit?: number;
            sort?: string;
        } = {}
    ): Promise<TransactionResponse> => {
        try {
            const response: AxiosResponse<TransactionResponse> = await api.get(
                `/transactions/property/${propertyId}`,
                { params }
            );
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },

    /**
     * Update payment status of a transaction (Admin-only)
     * @param id Transaction ID
     * @param paymentSuccess Payment status
     * @returns Promise with the updated transaction data
     */
    updatePaymentStatus: async (
        id: string,
        paymentSuccess: boolean
    ): Promise<TransactionResponse> => {
        try {
            const response: AxiosResponse<TransactionResponse> = await api.patch(
                `/transactions/${id}/payment`,
                { paymentSuccess }
            );
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },

    /**
     * Get transaction statistics overview
     * @param params Query parameters for filtering stats
     * @returns Promise with the API response containing transaction statistics
     */
    getTransactionStats: async (params: {
        userId?: string;
        customerId?: string;
        propertyId?: string;
        startDate?: string;
        endDate?: string;
    } = {}): Promise<TransactionResponse> => {
        try {
            const response: AxiosResponse<TransactionResponse> = await api.get(
                "/transactions/stats/overview",
                { params }
            );
            return response.data;
        } catch (error: any) {
            throw error;
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