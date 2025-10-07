"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import { Upload, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import Image from "next/image";
import kycService from "@/services/kycService";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME = new Set(["image/png", "image/jpeg", "application/pdf"]);
const ALLOWED_EXT = new Set(["png", "jpg", "jpeg", "pdf"]);

interface KycDocument {
    type: string;
    url: string;
    filename: string;
    uploadedAt?: string; // Added this field from API response
    metadata?: Record<string, any>;
}

interface KycRecord {
    _id: string; // Changed from id to _id to match API
    user: string; // Changed from userId to user to match API
    status: string;
    documents: KycDocument[];
    createdAt: string; // Changed from submittedAt to createdAt
    updatedAt: string;
    submittedAt?: string; // Keep this for compatibility
    rejectedReason?: string;
}

export default function LegalInformation() {
    const [kycRecord, setKycRecord] = useState<KycRecord | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState({
        passport: false,
        cnicFront: false,
        cnicBack: false,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fileInputRefs = {
        passport: useRef<HTMLInputElement | null>(null),
        cnicFront: useRef<HTMLInputElement | null>(null),
        cnicBack: useRef<HTMLInputElement | null>(null),
    };

    // Fetch KYC status on component mount
    useEffect(() => {
        const fetchKycStatus = async () => {
            try {
                const status = await kycService.getKycStatus();
                if (status.status === "not_submitted") {
                    setKycRecord(null);
                } else {
                    const response = await kycService.getMyKycRecord();
                    // FIX: Extract the actual data from the response
                    const record = response.data;
                    // Ensure documents is always an array
                    if (record && !record.documents) {
                        record.documents = [];
                    }
                    setKycRecord(record);
                }
            } catch (error) {
                console.error("Failed to fetch KYC status:", error);
                setUploadError("Failed to load your KYC information");
                setKycRecord(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchKycStatus();
    }, []);

    // Log KYC record when it changes
    useEffect(() => {
        if (kycRecord) {
            console.log("KYC Record updated:", kycRecord);
            console.log("Documents:", kycRecord.documents);
        }
    }, [kycRecord]);

    const handleFileSelect = useCallback(
        async (file: File | null, field: keyof typeof isUploading) => {
            setUploadError(null);
            if (!file) return;

            if (file.size > MAX_FILE_SIZE) {
                setUploadError("File must be smaller than 5MB.");
                return;
            }

            const ext = (file.name.split(".").pop() || "").toLowerCase();
            const mime = file.type || "";

            if (!ALLOWED_EXT.has(ext)) {
                setUploadError("Only PNG, JPG, or PDF files are allowed (file extension).");
                return;
            }

            if (mime && !ALLOWED_MIME.has(mime)) {
                setUploadError("Only PNG, JPG, or PDF files are allowed (invalid file type).");
                return;
            }

            setIsUploading((prev) => ({ ...prev, [field]: true }));
            try {
                const sanitizeType = (t: string | undefined) => {
                    if (!t) return "application/pdf";
                    let s = t.trim().toLowerCase();
                    s = s.replace(/^content-?type\s*[:=]\s*/, "");
                    if (s.indexOf(";") > -1) s = s.split(";")[0];
                    if (s.indexOf(" ") > -1) s = s.split(" ")[0];
                    return ALLOWED_MIME.has(s) ? s : "application/pdf";
                };

                const sanitized = sanitizeType(mime) || (ext === "pdf" ? "application/pdf" : ext === "png" ? "image/png" : "image/jpeg");

                const originalExt = (file.name.split(".").pop() || "").toLowerCase();
                const useExt = ALLOWED_EXT.has(originalExt) ? originalExt : "pdf";
                const baseName = (file.name.replace(/\.[^/.]+$/, "") || "upload")
                    .replace(/[^a-zA-Z0-9_-]/g, "-")
                    .substring(0, 50);
                const safeFileName = `${baseName}-${Date.now()}.${useExt}`;

                // Get presigned URL from KYC service
                const presign = await kycService.getKycUploadPresignedUrl(safeFileName, sanitized);

                if (!presign || !presign.url) {
                    throw new Error("Failed to get upload URL from server.");
                }

                const uploadResp = await fetch(presign.url, {
                    method: "PUT",
                    body: file,
                    headers: { "Content-Type": sanitized },
                });

                if (!uploadResp.ok) throw new Error(`Upload failed (${uploadResp.status}).`);

                const publicUrl = presign.url.split("?")[0];

                // Determine document type
                let documentType = "";
                if (field === "passport") documentType = "passport";
                else if (field === "cnicFront") documentType = "national_id_front";
                else if (field === "cnicBack") documentType = "national_id_back";

                // Create new document object
                const newDocument: KycDocument = {
                    type: documentType,
                    url: publicUrl,
                    filename: safeFileName,
                    uploadedAt: new Date().toISOString(),
                };

                // Prepare documents array - ensure it's always an array
                const existingDocuments = kycRecord?.documents || [];
                const updatedDocuments = existingDocuments.filter(doc => doc.type !== documentType);
                updatedDocuments.push(newDocument);

                // Update local state - FIX: Create a new KYC record if none exists
                setKycRecord(prev => {
                    if (prev) {
                        return { ...prev, documents: updatedDocuments };
                    } else {
                        // Create a new KYC record with this document
                        return {
                            _id: "",
                            user: "",
                            status: "not_submitted",
                            documents: updatedDocuments,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                        };
                    }
                });
            } catch (err: any) {
                setUploadError(err?.message || "Document upload failed.");
            } finally {
                setIsUploading((prev) => ({ ...prev, [field]: false }));
            }
        },
        [kycRecord]
    );

    const handleSubmitKyc = useCallback(async () => {
        console.log("Submit button clicked");
        console.log("Current kycRecord:", kycRecord);

        // FIX: Add proper check for documents array
        if (!kycRecord || !kycRecord.documents || kycRecord.documents.length === 0) {
            console.log("No documents to submit");
            setUploadError("Please upload at least one document before submitting.");
            return;
        }

        console.log("Submitting documents:", kycRecord.documents);
        setIsSubmitting(true);

        try {
            // Always use POST API to submit documents regardless of current status
            const response = await kycService.submitKyc({ documents: kycRecord.documents });
            console.log("Submit response:", response);
            // FIX: Extract the actual data from the response
            const result = response.data;
            // Ensure documents is always an array in the result
            if (result && !result.documents) {
                result.documents = [];
            }
            setKycRecord(result);
        } catch (err: any) {
            console.error("Error submitting KYC:", err);
            setUploadError(err?.message || "Failed to submit KYC documents.");
        } finally {
            setIsSubmitting(false);
        }
    }, [kycRecord]);

    const onFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof isUploading) => {
            const file = e.target.files?.[0] || null;
            void handleFileSelect(file, field);
            if (fileInputRefs[field].current) fileInputRefs[field].current!.value = "";
        },
        [handleFileSelect]
    );

    // Helper to determine if a URL is an image
    const isImageUrl = (url: string) => {
        return url.toLowerCase().endsWith(".png") || url.toLowerCase().endsWith(".jpg") || url.toLowerCase().endsWith(".jpeg");
    };

    // Helper to get document URL by type - Simplified
    const getDocumentUrl = (type: string) => {
        if (!kycRecord || !kycRecord.documents) return null;

        // Try the exact type first
        const doc = kycRecord.documents.find(d => d.type === type);
        return doc ? doc.url : null;
    };

    // Get status icon
    const getStatusIcon = () => {
        if (!kycRecord) return <Clock className="h-5 w-5 text-yellow-500" />;

        switch (kycRecord.status) {
            case "approved":
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case "rejected":
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <Clock className="h-5 w-5 text-yellow-500" />;
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-900 p-6 transition flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00B894]"></div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 p-6 transition">
            <div>
                <h2 className="text-2xl font-bold text-[#003049] dark:text-white">Legal Information</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Your personal information is completely secure and we don&apos;t share it with anyone.
                </p>
            </div>

            {/* KYC Status Display */}
            <div className="mt-4">
                <div className={`px-4 py-3 rounded flex items-center ${kycRecord?.status === "approved"
                    ? "bg-green-50 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200"
                    : kycRecord?.status === "rejected"
                        ? "bg-red-50 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200"
                        : "bg-yellow-50 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-200"
                    }`}>
                    <div className="mr-2">
                        {getStatusIcon()}
                    </div>
                    <div>
                        <p className="font-medium">
                            KYC Status: <span className="capitalize">{kycRecord?.status || "Not Submitted"}</span>
                        </p>
                        {kycRecord?.status === "rejected" && kycRecord.rejectedReason && (
                            <p className="mt-1 text-sm">Reason: {kycRecord.rejectedReason}</p>
                        )}
                        {!kycRecord && (
                            <p className="mt-1 text-sm">Please upload your documents to complete verification</p>
                        )}
                    </div>
                </div>
            </div>

            {uploadError && (
                <div className="mt-4">
                    <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-200 px-4 py-3 rounded">
                        {uploadError}
                    </div>
                </div>
            )}



            {/* Upload Section - Only show if KYC is not approved */}
            {kycRecord?.status !== "approved" && (
                <>
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-[#003049] dark:text-white">
                            Passport{" "}
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                (PNG, JPG, PDF - less than 5 mb)
                            </span>
                        </h3>
                        <div className="mt-4">
                            <div
                                className="rounded-xl border border-gray-200 dark:border-gray-700 
                bg-[#F5F7FA] dark:bg-gray-800 hover:border-[#00B894] transition"
                            >
                                <input
                                    type="file"
                                    id="passport"
                                    className="hidden"
                                    accept="image/png,image/jpeg,application/pdf"
                                    ref={fileInputRefs.passport}
                                    onChange={(e) => onFileChange(e, "passport")}
                                />
                                <label
                                    htmlFor="passport"
                                    className="flex cursor-pointer flex-col items-center justify-center p-6"
                                >
                                    {getDocumentUrl("passport") ? (
                                        isImageUrl(getDocumentUrl("passport")!) ? (
                                            <div className="relative mb-2">
                                                <Image
                                                    src={getDocumentUrl("passport")!}
                                                    alt="Passport preview"
                                                    width={100}
                                                    height={100}
                                                    className="rounded-lg object-cover"
                                                />
                                                {isUploading.passport && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="mb-2 flex items-center justify-center">
                                                <FileText className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                                            </div>
                                        )
                                    ) : (
                                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-md">
                                            {isUploading.passport ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                                            ) : (
                                                <Upload className="h-5 w-5" />
                                            )}
                                        </div>
                                    )}
                                    <p className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {getDocumentUrl("passport") ? "Uploaded Passport" : "Upload Passport"}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Click to {getDocumentUrl("passport") ? "view or replace" : "browse"} files
                                    </p>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-[#003049] dark:text-white">
                            CNIC Front & Back{" "}
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                (PNG, JPG, PDF - less than 5 mb)
                            </span>
                        </h3>
                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            {["Front", "Back"].map((side) => (
                                <div
                                    key={side}
                                    className="rounded-xl border border-gray-200 dark:border-gray-700 
                  bg-[#F5F7FA] dark:bg-gray-800 hover:border-[#00B894] transition"
                                >
                                    <input
                                        type="file"
                                        id={`cnic${side.toLowerCase()}`}
                                        className="hidden"
                                        accept="image/png,image/jpeg,application/pdf"
                                        ref={fileInputRefs[`cnic${side}` as keyof typeof fileInputRefs]}
                                        onChange={(e) => onFileChange(e, `cnic${side}` as keyof typeof isUploading)}
                                    />
                                    <label
                                        htmlFor={`cnic${side.toLowerCase()}`}
                                        className="flex cursor-pointer flex-col items-center justify-center p-6"
                                    >
                                        {getDocumentUrl(`national_id_${side.toLowerCase()}`) ? (
                                            isImageUrl(getDocumentUrl(`national_id_${side.toLowerCase()}`)!) ? (
                                                <div className="relative mb-2">
                                                    <Image
                                                        src={getDocumentUrl(`national_id_${side.toLowerCase()}`)!}
                                                        alt={`CNIC ${side} preview`}
                                                        width={100}
                                                        height={100}
                                                        className="rounded-lg object-cover"
                                                    />
                                                    {isUploading[`cnic${side}` as keyof typeof isUploading] && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="mb-2 flex items-center justify-center">
                                                    <FileText className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                                                </div>
                                            )
                                        ) : (
                                            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-md">
                                                {isUploading[`cnic${side}` as keyof typeof isUploading] ? (
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                                                ) : (
                                                    <Upload className="h-5 w-5" />
                                                )}
                                            </div>
                                        )}
                                        <p className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {getDocumentUrl(`national_id_${side.toLowerCase()}`)
                                                ? `Uploaded CNIC ${side.toLowerCase()}`
                                                : `Upload CNIC ${side.toLowerCase()}`}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Click to {getDocumentUrl(`national_id_${side.toLowerCase()}`) ? "view or replace" : "browse"} files
                                        </p>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {!getDocumentUrl("passport") &&
                        !getDocumentUrl("national_id_front") &&
                        !getDocumentUrl("national_id_back") && (
                            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
                                <p className="text-blue-700 dark:text-blue-200">
                                    Please upload your passport and CNIC documents to complete your KYC verification.
                                </p>
                            </div>
                        )}

                    <div className="mt-6 flex justify-end">
                        <button
                            className={`px-6 py-2 rounded-xl font-semibold 
              bg-gradient-to-r from-[#00B894] to-[#00D2B6] 
              text-white shadow-md hover:opacity-90 transition
              ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                            type="button"
                            onClick={handleSubmitKyc}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Submitting...
                                </div>
                            ) : (
                                "Submit Documents"
                            )}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}