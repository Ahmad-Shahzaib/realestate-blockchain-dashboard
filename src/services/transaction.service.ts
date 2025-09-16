import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";


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

const API_BASE_URL = 'https://api.fractprop.com/api';
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
    },
});
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
     * @param payload Transaction payload
     * @returns Promise with created transaction
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
            throw error; // handled by interceptor
        }
    },

    /**
     * Get all transactions (optionally with pagination)
     */
    getAllTransactions: async (): Promise<Transaction[]> => {
        try {
            const response: AxiosResponse<{ status: string; data: Transaction[] }> =
                await api.get("/transactions");
            return response.data.data;
        } catch (error: any) {
            throw error;
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
            throw error;
        }
    },
};

export default TransactionService;
