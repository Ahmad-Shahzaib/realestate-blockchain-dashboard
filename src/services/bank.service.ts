import { getAxiosInstance } from "@/lib/axios";
import { deleteRequest, getRequest, postRequest, putRequest } from "@/app/utils/requests";

// Define BankDetail interface to match server response
export interface BankDetail {
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
    bankCode?: string;
    swiftCode?: string;
    iban?: string;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
    [key: string]: any;
}

// Add or update single bank details
export async function addOrUpdateBankDetails(bankData: Partial<BankDetail>): Promise<{
    status: string;
    data: { bankDetail: BankDetail };
}> {
    try {
        const response = await postRequest(getAxiosInstance('/api'), '/api/users/bank-details', bankData);
        console.log('addOrUpdateBankDetails response:', JSON.stringify(response, null, 2));
        return response;
    } catch (error) {
        console.error('Error adding/updating bank details:', error);
        throw error;
    }
}

// Get single bank details
export async function getBankDetails(): Promise<{
    status: string;
    data: { bankDetails: BankDetail[] };
}> {
    try {
        const response = await getRequest(getAxiosInstance('/api'), `/api/users/bank-details?_=${Date.now()}`);
        console.log('getBankDetails response:', JSON.stringify(response, null, 2));
        return response;
    } catch (error) {
        console.error('Error fetching bank details:', error);
        throw error;
    }
}

// Add a new bank account (multiple accounts)
export async function addBankAccount(bankData: Partial<BankDetail>): Promise<{
    status: string;
    data: { bankDetail: BankDetail };
}> {
    try {
        const response = await postRequest(getAxiosInstance('/api'), '/api/users/bank-accounts', bankData);
        console.log('addBankAccount response:', JSON.stringify(response, null, 2));
        return response;
    } catch (error) {
        console.error('Error adding bank account:', error);
        throw error;
    }
}

// Get all bank accounts
export async function getAllBankAccounts(): Promise<{
    status: string;
    data: { bankDetails: BankDetail[] };
}> {
    try {
        const response = await getRequest(getAxiosInstance('/api'), `/api/users/bank-accounts?_=${Date.now()}`);
        console.log('getAllBankAccounts response:', JSON.stringify(response, null, 2));
        return response;
    } catch (error) {
        console.error('Error fetching all bank accounts:', error);
        throw error;
    }
}

// Update a bank account by ID
export async function updateBankAccount(id: string, bankData: Partial<BankDetail>): Promise<{
    status: string;
    data: { bankDetail: BankDetail };
}> {
    try {
        const response = await putRequest(getAxiosInstance('/api'), `/api/users/bank-accounts/${id}`, bankData);
        console.log('updateBankAccount response:', JSON.stringify(response, null, 2));
        return response;
    } catch (error) {
        console.error('Error updating bank account:', error);
        throw error;
    }
}

// Delete a bank account by ID
export async function deleteBankAccount(id: string): Promise<{
    status: string;
    message: string;
}> {
    try {
        const response = await deleteRequest(getAxiosInstance('/api'), `/api/users/bank-accounts/${id}`);
        console.log('deleteBankAccount response:', JSON.stringify(response, null, 2));
        return response;
    } catch (error) {
        console.error('Error deleting bank account:', error);
        throw error;
    }
}