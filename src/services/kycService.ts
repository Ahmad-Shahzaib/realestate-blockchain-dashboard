import { getAxiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";

// Configuration
const API_BASE_URL = "/api";

// Interfaces for request/response types
interface KycSubmitUserData {
    idType: "passport" | "drivers_license" | "national_id" | "other";
    idNumber: string;
    idFrontImage: string;
    idBackImage: string;
    selfieImage?: string;
}

interface KycDocument {
    type: string;
    url: string;
    filename: string;
    metadata?: Record<string, any>;
}

interface KycSubmitData {
    documents: KycDocument[];
}

interface KycStatusResponse {
    status: "pending" | "approved" | "rejected" | "not_submitted";
    documents: KycDocument[];
    submittedAt: string;
    rejectedReason: string | null;
}

interface KycUploadResponse {
    idFront?: string;
    idBack?: string;
    selfie?: string;
    [key: string]: string | undefined; // Flexible to handle dynamic keys
}

interface KycRecordResponse {
    id: string;
    userId: string;
    status: string;
    documents: KycDocument[];
    submittedAt: string;
    updatedAt: string;
    rejectedReason?: string;
}

// Error handling interface
interface KycApiError {
    message: string;
    code?: string;
    details?: any;
}

// KYC Service class
class KycService {
    private async handleApiError(error: unknown): Promise<KycApiError> {
        if (error instanceof AxiosError) {
            return {
                message: error.response?.data?.message || "API request failed",
                code: error.response?.data?.code,
                details: error.response?.data?.details,
            };
        }
        return { message: "An unexpected error occurred" };
    }

    // Submit KYC details (user route)
    async submitUserKyc(data: KycSubmitUserData): Promise<KycRecordResponse> {
        try {
            const axiosInstance = getAxiosInstance(API_BASE_URL);
            const response = await axiosInstance.post(`/api/users/kyc`, data, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (error) {
            throw await this.handleApiError(error);
        }
    }

    // Add this method to the KycService class
    async getKycUploadPresignedUrl(fileName: string, contentType: string): Promise<{ url: string }> {
        try {
            const axiosInstance = getAxiosInstance(API_BASE_URL);
            const response = await axiosInstance.get(`/api/upload_images?fileName=${encodeURIComponent(fileName)}&contentType=${encodeURIComponent(contentType)}&_=${Date.now()}`);
            return response.data;
        } catch (error) {
            throw await this.handleApiError(error);
        }
    }
    // Get KYC status
    async getKycStatus(): Promise<KycStatusResponse> {
        try {
            const axiosInstance = getAxiosInstance(API_BASE_URL);
            const response = await axiosInstance.get(`/api/users/kyc/status`);
            return response.data;
        } catch (error) {
            throw await this.handleApiError(error);
        }
    }

    // Upload KYC files
    async uploadKycFiles(formData: FormData): Promise<KycUploadResponse> {
        try {
            const axiosInstance = getAxiosInstance(API_BASE_URL);
            const response = await axiosInstance.post(`/api/kyc/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            throw await this.handleApiError(error);
        }
    }


    async submitKyc(data: KycSubmitData): Promise<KycRecordResponse> {
        console.log("submitKyc called with data:", data);
        try {
            const axiosInstance = getAxiosInstance(API_BASE_URL);
            const response = await axiosInstance.post(`/api/kyc`, data, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("submitKyc response:", response.data);
            return response.data;
        } catch (error) {
            console.error("submitKyc error:", error);
            throw await this.handleApiError(error);
        }
    }
    // Fetch current user's KYC record
    async getMyKycRecord(): Promise<KycRecordResponse> {
        try {
            const axiosInstance = getAxiosInstance(API_BASE_URL);
            const response = await axiosInstance.get(`/api/kyc/me`);
            return response.data;
        } catch (error) {
            throw await this.handleApiError(error);
        }
    }
}

// Singleton instance
const kycService = new KycService();
export default kycService;