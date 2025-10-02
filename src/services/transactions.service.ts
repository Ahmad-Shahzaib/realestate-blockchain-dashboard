
export async function fetchCustomerTransactions(customerId: string): Promise<any> {
    return apiRequest(`/transactions/customer/${customerId}`, { method: "GET" });
}

// Helper: import the generic apiRequest from customers.service
import { apiRequest } from "./customers.service";
