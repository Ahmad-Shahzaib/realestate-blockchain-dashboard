// services/uploadService.ts

const API_BASE_URL = "https://api.fractprop.com/api";

export interface UploadResponse {
    status: string;
    url: string; // Presigned URL
    key: string; // S3 object key
}

/**
 * Step 1: Get presigned URL from backend
 */
export async function getPresignedUrl(file: File, token?: string): Promise<UploadResponse> {
    const res = await fetch(
        `${API_BASE_URL}/upload_images?filename=${encodeURIComponent(file.name)}`,
        {
            method: "GET",
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to get presigned URL");
    }

    return res.json();
}

/**
 * Step 2: Upload file to S3 using presigned URL
 */
export async function uploadFileToS3(file: File, token?: string): Promise<string> {
    const { url, key } = await getPresignedUrl(file, token);

    const uploadRes = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "text/plain", // ✅ force to match presigned URL
        },
        body: file,
    });

    if (!uploadRes.ok) {
        const errorText = await uploadRes.text();
        console.error("S3 upload error:", errorText);
        throw new Error(`Upload to S3 failed: ${errorText}`);
    }

    return `https://fractprop.s3.eu-north-1.amazonaws.com/${key}`;
}
