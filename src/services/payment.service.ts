import { getAxiosInstance } from "@/lib/axios";
import { deleteRequest, getRequest, postRequest, putRequest } from "@/app/utils/requests";

// Define Payment interface to match server request/response
export interface Payment {
    transactionId?: string;
    paymentType?: string;
    amount?: number;
    paymentSlip?: string;
    bankName?: string;
    accountNumber?: string;
    transactionUrl?: string;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
    [key: string]: any;
}

// Create a new payment
export async function createPayment(paymentData: Partial<Payment>): Promise<{
    status: string;
    data: { payment: Payment };
}> {
    try {
        // Validate required fields before sending
        if (!paymentData.transactionId) {
            throw new Error("Transaction ID is required");
        }

        console.log('Sending payment data to /api/payments:', paymentData);
        const response = await postRequest(getAxiosInstance('/api'), '/api/payments', paymentData);
        console.log('createPayment response:', JSON.stringify(response, null, 2));
        return response;
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
}

// ... other methods remain the same ...

// Get all payments
export async function getPayments(): Promise<{
    status: string;
    data: { payments: Payment[] };
}> {
    try {
        const response = await getRequest(getAxiosInstance('/api'), `/api/payments?_=${Date.now()}`);
        console.log('getPayments response:', JSON.stringify(response, null, 2));
        return response;
    } catch (error) {
        console.error('Error fetching payments:', error);
        throw error;
    }
}

// Update a payment by ID
export async function updatePayment(id: string, paymentData: Partial<Payment>): Promise<{
    status: string;
    data: { payment: Payment };
}> {
    try {
        console.log('Sending update data for payment ID', id, ':', paymentData);
        const response = await putRequest(getAxiosInstance('/api'), `/api/payments/${id}`, paymentData);
        console.log('updatePayment response:', JSON.stringify(response, null, 2));
        return response;
    } catch (error) {
        console.error('Error updating payment:', error);
        throw error;
    }
}

// Delete a payment by ID
export async function deletePayment(id: string): Promise<{
    status: string;
    message: string;
}> {
    try {
        const response = await deleteRequest(getAxiosInstance('/api'), `/api/payments/${id}`);
        console.log('deletePayment response:', JSON.stringify(response, null, 2));
        return response;
    } catch (error) {
        console.error('Error deleting payment:', error);
        throw error;
    }
}