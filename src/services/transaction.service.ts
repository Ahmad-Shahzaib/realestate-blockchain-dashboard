import axios, { AxiosInstance, AxiosResponse } from "axios";

// Transaction interface (based on your example)
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

const API_BASE_URL = "https://api.fractprop.com/api";

// Axios instance
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 second timeout
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Add interceptor to inject token into every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        console.log("🔑 Token from localStorage:", token);

        if (token) {
            // Try this first (most common)
            config.headers.Authorization = `Bearer ${token}`;

            // Or uncomment this if your backend uses x-auth-token
            // config.headers["x-auth-token"] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);



// API Response structure for transaction
export interface TransactionResponse {
    status: string;
    data: {
        transaction: Transaction;
    };
    message: string;
}

export const TransactionService = {
    /**
     * Create a new transaction
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
            throw error.response?.data || error;
        }
    },

    /**
     * Get all transactions
     */
    getAllTransactions: async (): Promise<Transaction[]> => {
        try {
            const response: AxiosResponse<{ status: string; data: Transaction[] }> =
                await api.get("/transactions");
            return response.data.data;
        } catch (error: any) {
            throw error.response?.data || error;
        }
    },

    /**
     * Get a single transaction by ID
     */
    getTransactionById: async (id: string): Promise<Transaction> => {
        try {
            const response: AxiosResponse<{ status: string; data: Transaction }> =
                await api.get(`/transactions/${id}`);
            return response.data.data;
        } catch (error: any) {
            throw error.response?.data || error;
        }
    },
};

export default TransactionService;
