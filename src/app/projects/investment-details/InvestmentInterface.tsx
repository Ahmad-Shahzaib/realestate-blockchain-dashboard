"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Button from "@/common/Button";
import DocumentsSummary from "./explore-investment/DocumentsSummary";
import { TransactionService, Transaction } from "@/services/transaction.service";
import { getRequest } from "@/app/utils/requests";
import { getAxiosInstance } from "@/lib/axios";
import Image from "next/image";
import { createPayment, Payment } from "@/services/payment.service";

interface BankDetails {
    accountTitle: string;
    bankName: string;
    accountNumber: string;
    iban: string;
}

interface Project {
    bankDetails: BankDetails;
    name?: string;
    createdAt?: string;
    _id?: string;
}

interface TransactionPageProps {
    project: Project;
    transactionId?: string;
    transaction?: Transaction;
    transactionPayload?: {
        propertyId: string;
        customerId: string;
        totalPrice: number;
        totalSquareFeet: number;
        type: string;
    };
    onNextClick?: () => void; // Added prop
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME = new Set(["image/png", "image/jpeg", "application/pdf"]);
const ALLOWED_EXT = new Set(["png", "jpg", "jpeg", "pdf"]);

export default function TransactionPage({ project, onNextClick }: TransactionPageProps) {
    const steps = ["guide", "invoice", "payment-method", "payment-details", "completed"] as const;
    type Step = typeof steps[number];
    const [activeStep, setActiveStep] = useState<Step>("guide");
    const [subTab, setSubTab] = useState<"crypto" | "cash" | "bank">("crypto");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUploadingFile, setIsUploadingFile] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
    const searchParams = useSearchParams();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Read query params
    const transactionId = searchParams.get("_id");
    const projectId = project._id;

    const getDisplayPrice = () => {
        if (transaction && transaction.totalPrice) {
            return Number(transaction.totalPrice).toLocaleString();
        }
        return "";
    };

    useEffect(() => {
        const fetchTransaction = async () => {
            if (transactionId) {
                try {
                    setLoading(true);
                    const transactionData = await TransactionService.getTransactionById(transactionId);
                    setTransaction(transactionData);
                    setError(null);
                    return;
                } catch (err: any) {
                    const errorMessage = err.response?.data?.message || err.message || "Failed to fetch transaction";
                    setError(errorMessage);
                    toast.error(errorMessage);
                    console.error("Error fetching transaction:", err);
                } finally {
                    setLoading(false);
                }
            }

            if (projectId && !transactionId) {
                try {
                    setLoading(true);
                    const response = await TransactionService.getTransactionsByPropertyId(projectId);
                    if (response.data.transactions && response.data.transactions.length > 0) {
                        const projectTransaction = response.data.transactions[0];
                        setTransaction(projectTransaction);
                        setError(null);
                    } else {
                        setError("No transactions found for this project");
                    }
                } catch (err: any) {
                    const errorMessage = err.response?.data?.message || err.message || "Failed to fetch transactions for project";
                    setError(errorMessage);
                    toast.error(errorMessage);
                    console.error("Error fetching transactions by project ID:", err);
                } finally {
                    setLoading(false);
                }
            }

            if (!transactionId && !projectId) {
                setError("No transaction or project ID provided");
                setLoading(false);
            }
        };

        fetchTransaction();
    }, [transactionId, projectId]);

    const handleFileSelect = useCallback(async (file: File | null) => {
        setUploadError(null);
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            setUploadError("File size exceeds 5MB.");
            toast.error("File size exceeds 5MB");
            return;
        }

        const ext = (file.name.split('.').pop() || '').toLowerCase();
        const mime = file.type || '';

        if (!ALLOWED_EXT.has(ext)) {
            setUploadError("Only PNG, JPG, or PDF files are allowed (file extension).");
            toast.error("Only PNG, JPG, or PDF files are allowed (file extension)");
            return;
        }

        if (mime && !ALLOWED_MIME.has(mime)) {
            setUploadError("Only PNG, JPG, or PDF files are allowed (invalid file type).");
            toast.error("Only PNG, JPG, or PDF files are allowed (invalid file type)");
            return;
        }

        setIsUploadingFile(true);
        try {
            const sanitizeType = (t: string | undefined) => {
                if (!t) return '';
                let s = t;
                try { s = decodeURIComponent(s); } catch { /* ignore */ }
                s = s.trim().toLowerCase();
                s = s.replace(/^content-?type\s*[:=]\s*/, '');
                if (s.indexOf(';') > -1) s = s.split(';')[0];
                if (s.indexOf(' ') > -1) s = s.split(' ')[0];
                return s;
            };

            const sanitized = sanitizeType(mime) || (ext === 'pdf' ? 'application/pdf' : ext === 'png' ? 'image/png' : 'image/jpeg');

            const originalExt = (file.name.split('.').pop() || '').toLowerCase();
            const useExt = ALLOWED_EXT.has(originalExt) ? originalExt : (sanitized.includes('pdf') ? 'pdf' : sanitized.includes('png') ? 'png' : 'jpg');
            const baseName = (file.name.replace(/\.[^/.]+$/, '') || 'upload')
                .replace(/[^a-zA-Z0-9_-]/g, '-')
                .substring(0, 50);
            const safeFileName = `${baseName}-${Date.now()}.${useExt}`;

            const presign = await getRequest(
                getAxiosInstance('/api'),
                `/api/upload_images?filename=${encodeURIComponent(safeFileName)}&mimetype=${encodeURIComponent(sanitized)}`
            );
            if (!presign || presign.status !== 'success' || !presign.url) {
                throw new Error('Failed to get upload URL from server.');
            }

            const uploadResp = await fetch(presign.url, {
                method: 'PUT',
                body: file,
                headers: { 'Content-Type': sanitized },
            });

            if (!uploadResp.ok) throw new Error(`Upload failed (${uploadResp.status}).`);

            const publicUrl = presign.url.split('?')[0];
            setUploadedFileUrl(publicUrl);
            toast.success("File uploaded successfully");
        } catch (err: any) {
            setUploadError(err?.message || 'File upload failed.');
            toast.error(err?.message || 'File upload failed.');
        } finally {
            setIsUploadingFile(false);
        }
    }, []);

    const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        void handleFileSelect(file);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }, [handleFileSelect]);

    const currentStepIndex = steps.indexOf(activeStep);

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setActiveStep(steps[currentStepIndex + 1]);
            onNextClick?.(); // Call the onNextClick callback
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setActiveStep(steps[currentStepIndex - 1]);
        }
    };

    const handleCryptoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const transactionUrl = formData.get("transactionUrl") as string;

        if (!transactionUrl) {
            toast.error("Please enter a transaction URL");
            return;
        }

        if (!uploadedFileUrl) {
            toast.error("Please upload a file");
            return;
        }

        const idToUse = transaction?._id || transactionId;
        if (!idToUse) {
            toast.error("Transaction ID is missing. Please refresh the page and try again.");
            return;
        }

        setIsSubmitting(true);
        try {
            const paymentData: Partial<Payment> = {
                transactionId: idToUse,
                paymentType: "crypto",
                paymentSlip: uploadedFileUrl,
                amount: transaction?.totalPrice || 0,
            };
            await createPayment(paymentData);
            handleNext();
        } catch (err: any) {
            toast.error(err?.message || "Submission failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCashSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const amount = formData.get("amount") as string;

        if (!amount || Number(amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        if (!uploadedFileUrl) {
            toast.error("Please upload a file");
            return;
        }

        const idToUse = transaction?._id || transactionId;
        if (!idToUse) {
            toast.error("Transaction ID is missing. Please refresh the page and try again.");
            return;
        }

        setIsSubmitting(true);
        try {
            const paymentData: Partial<Payment> = {
                transactionId: idToUse,
                paymentType: "cash",
                paymentSlip: uploadedFileUrl,
                amount: Number(amount),
            };
            await createPayment(paymentData);
            handleNext();
        } catch (err: any) {
            toast.error(err?.message || "Submission failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBankSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const bankName = formData.get("bankName") as string;
        const accountNumber = formData.get("accountNumber") as string;

        if (!bankName || !accountNumber) {
            toast.error("Please fill in all bank details");
            return;
        }

        if (!uploadedFileUrl) {
            toast.error("Please upload a file");
            return;
        }

        const idToUse = transaction?._id || transactionId;
        if (!idToUse) {
            toast.error("Transaction ID is missing. Please refresh the page and try again.");
            return;
        }

        setIsSubmitting(true);
        try {
            const paymentData: Partial<Payment> = {
                transactionId: idToUse,
                paymentType: "online",
                paymentSlip: uploadedFileUrl,
                amount: transaction?.totalPrice || 0,
                bankName,
                accountNumber,
            };
            await createPayment(paymentData);
            handleNext();
        } catch (err: any) {
            toast.error(err?.message || "Submission failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePaymentMethodSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (subTab === "cash") {
            setActiveStep("payment-details");
        } else {
            handleNext();
        }
    };

    const banks = [
        { name: "FracProp", accountNumber: "1234567890", iban: "AB12345678901234567890" },
    ];

    return (
        <div className="bg-gray-100 dark:bg-gray-900 flex justify-center items-start py-3">
            <Toaster position="top-right" />
            <div className="w-full max-w-6xl px-6 grid grid-cols-1 gap-4">
                <div className="mb-6">
                    <div className="flex items-center justify-between relative">
                        {["Explore investment", "Review Invoice", "Choose Payment", "Proof Submit", "Completed"].map((step, index) => (
                            <div key={step} className="flex-1 flex flex-col items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${index <= currentStepIndex
                                        ? "bg-[#19D6BD] text-black"
                                        : "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white"
                                        }`}
                                >
                                    {index < currentStepIndex ? "✓" : index + 1}
                                </div>
                                <div
                                    className={`text-sm mt-2 text-center ${index <= currentStepIndex ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"
                                        }`}
                                >
                                    {step}
                                </div>
                            </div>
                        ))}
                        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 dark:bg-gray-600">
                            <div
                                className="h-full bg-[#19D6BD] transition-all duration-300"
                                style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {uploadError && (
                    <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-200 px-4 py-3 rounded mt-2">
                        {uploadError}
                    </div>
                )}

                {activeStep === "guide" && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                        <DocumentsSummary transaction={transaction} loading={loading} error={error} />
                        <div className="flex justify-end mt-6">
                            <Button
                                onClick={handleNext}
                                disabled={loading || !transaction || !!error}
                                className="bg-[#19D6BD] text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}

                {activeStep === "invoice" && (
                    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-10 mx-auto ">
                        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                            <div>
                                <h2 className="font-bold text-3xl text-gray-800 dark:text-white">INVOICE</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Date: {project.createdAt || "N/A"}</p>
                            </div>
                            <div className="text-right">
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{project.bankDetails.accountTitle}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">{project.bankDetails.bankName}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Acc No: {project.bankDetails.accountNumber}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">IBAN: {project.bankDetails.iban}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">Billed From</h3>
                                <p className="text-gray-700 dark:text-gray-300">Title: {project.bankDetails.accountTitle}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Name: {project.bankDetails.bankName}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Acc No: {project.bankDetails.accountNumber}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">IBAN: {project.bankDetails.iban}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">Billed To</h3>
                                <p className="text-gray-700 dark:text-gray-300">Ahmad Shahzaib</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">FracProp-80103</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Member Since: Mar 12, 2025</p>
                                <p className="text-gray-700 dark:text-gray-300">+923040057791</p>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-700">
                                        <th className="text-left p-3 text-gray-800 dark:text-white">Description</th>
                                        <th className="text-right p-3 text-gray-800 dark:text-white">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-t border-gray-200 dark:border-gray-700">
                                        <td className="p-3 text-gray-700 dark:text-gray-300">Project name</td>
                                        <td className="p-3 text-right text-gray-700 dark:text-gray-300">{project.name || "N/A"}</td>
                                    </tr>
                                    <tr className="border-t border-gray-200 dark:border-gray-700">
                                        <td className="p-3 text-gray-700 dark:text-gray-300">Total Investment</td>
                                        <td className="p-3 text-right text-gray-700 dark:text-gray-300">{getDisplayPrice()} PKR</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between mt-8">
                            <Button
                                onClick={handleBack}
                                className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-lg font-semibold"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleNext}
                                disabled={loading || !transaction || !!error}
                                className="bg-[#19D6BD] text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}

                {activeStep === "payment-method" && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                        <h2 className="font-bold text-2xl text-gray-800 dark:text-white mb-6 text-center">Select Payment Method</h2>
                        <form onSubmit={handlePaymentMethodSubmit}>
                            <div className="flex gap-4 mb-6 justify-center">
                                {["crypto", "cash", "bank"].map((tab) => (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => setSubTab(tab as any)}
                                        className={`px-6 py-2 rounded-full font-semibold capitalize transition-all ${subTab === tab
                                            ? "bg-[#19D6BD] text-white shadow-md"
                                            : "text-gray-500 dark:text-white dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            {subTab === "crypto" && (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value="0x1234abcd5678efgh9012ijklmnopqrstuv"
                                        readOnly
                                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none shadow-sm transition duration-200 cursor-not-allowed"
                                    />
                                </div>
                            )}
                            {subTab === "bank" && (
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-4">Available Banks</h3>
                                    {banks.map((bank, index) => (
                                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                                            <p className="font-semibold text-gray-800 dark:text-white">{bank.name}</p>
                                            <div className="flex items-center mt-2">
                                                <span className="text-black dark:text-white font-medium mr-2">Acc No:</span>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{bank.accountNumber}</p>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <span className="text-black dark:text-white font-medium mr-2">IBAN:</span>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{bank.iban}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {subTab === "cash" && (
                                <div className="text-center text-gray-700 dark:text-gray-200">
                                    <p>Please proceed to enter the payment details in the next step.</p>
                                </div>
                            )}
                            <div className="flex justify-between mt-6">
                                <Button
                                    onClick={handleBack}
                                    className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-lg font-semibold"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-[#19D6BD] text-white px-6 py-2 rounded-lg font-semibold"
                                >
                                    Next
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {activeStep === "payment-details" && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
                        <h2 className="font-bold text-2xl text-gray-800 dark:text-white mb-8 text-center">
                            Enter Payment Details
                        </h2>

                        <div className="flex gap-4 mb-8 justify-center">
                            {["crypto", "cash", "bank"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setSubTab(tab as any)}
                                    className={`px-6 py-2 rounded-full font-semibold capitalize transition-all duration-300 ${subTab === tab
                                        ? "bg-[#19D6BD] text-white shadow-lg"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {subTab === "crypto" && (
                            <form onSubmit={handleCryptoSubmit} className="space-y-6">
                                <input
                                    type="url"
                                    name="transactionUrl"
                                    placeholder="Paste transaction URL"
                                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#19D6BD] shadow-sm transition"
                                />

                                <div
                                    onClick={() => {
                                        setUploadError(null);
                                        fileInputRef.current?.click();
                                    }}
                                    className="relative w-full h-44 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#19D6BD] transition-all duration-300 bg-gray-50 dark:bg-gray-700 group"
                                >
                                    {isUploadingFile ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                                        </div>
                                    ) : uploadedFileUrl ? (
                                        <Image
                                            src={uploadedFileUrl.includes(".pdf") ? "/images/pdf-icon.png" : uploadedFileUrl}
                                            alt="Uploaded file"
                                            fill
                                            className="object-contain rounded-xl"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-500 dark:text-gray-300">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-10 w-10 mb-2 group-hover:text-[#19D6BD] transition"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 16V4m0 0l3 3m-3-3L4 7m13 8v4m0 0l3-3m-3 3l-3-3"
                                                />
                                            </svg>
                                            <span className="font-medium text-sm group-hover:text-[#19D6BD] transition">
                                                Click or Drag & Drop to Upload Proof
                                            </span>
                                            <span className="text-xs text-gray-400 mt-1">PNG, JPG or PDF</span>
                                        </div>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/png,image/jpeg,application/pdf"
                                        className="hidden"
                                        onChange={onFileChange}
                                        aria-label="Upload proof of payment"
                                    />
                                </div>

                                <div className="flex justify-between mt-8">
                                    <Button
                                        onClick={handleBack}
                                        className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || !uploadedFileUrl}
                                        className="bg-[#19D6BD] text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50 hover:bg-[#15bda5] transition"
                                    >
                                        {isSubmitting ? "Submitting..." : "Next"}
                                    </Button>
                                </div>
                            </form>
                        )}

                        {subTab === "cash" && (
                            <form onSubmit={handleCashSubmit} className="space-y-6">
                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="Enter amount"
                                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#19D6BD] shadow-sm transition"
                                />

                                <div
                                    onClick={() => {
                                        setUploadError(null);
                                        fileInputRef.current?.click();
                                    }}
                                    className="relative w-full h-44 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#19D6BD] transition-all duration-300 bg-gray-50 dark:bg-gray-700 group"
                                >
                                    {isUploadingFile ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                                        </div>
                                    ) : uploadedFileUrl ? (
                                        <Image
                                            src={uploadedFileUrl.includes(".pdf") ? "/images/pdf-icon.png" : uploadedFileUrl}
                                            alt="Uploaded file"
                                            fill
                                            className="object-contain rounded-xl"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-500 dark:text-gray-300">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-10 w-10 mb-2 group-hover:text-[#19D6BD] transition"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 16V4m0 0l3 3m-3-3L4 7m13 8v4m0 0l3-3m-3 3l-3-3"
                                                />
                                            </svg>
                                            <span className="font-medium text-sm group-hover:text-[#19D6BD] transition">
                                                Click or Drag & Drop to Upload Proof
                                            </span>
                                            <span className="text-xs text-gray-400 mt-1">PNG, JPG or PDF</span>
                                        </div>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/png,image/jpeg,application/pdf"
                                        className="hidden"
                                        onChange={onFileChange}
                                        aria-label="Upload proof of payment"
                                    />
                                </div>

                                <div className="flex justify-between mt-8">
                                    <Button
                                        onClick={handleBack}
                                        className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || !uploadedFileUrl}
                                        className="bg-[#19D6BD] text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50 hover:bg-[#15bda5] transition"
                                    >
                                        {isSubmitting ? "Submitting..." : "Next"}
                                    </Button>
                                </div>
                            </form>
                        )}

                        {subTab === "bank" && (
                            <form onSubmit={handleBankSubmit} className="space-y-6">
                                <input
                                    type="text"
                                    name="bankName"
                                    placeholder="Bank Name"
                                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#19D6BD] shadow-sm transition"
                                />
                                <input
                                    type="text"
                                    name="accountNumber"
                                    placeholder="Account Number"
                                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#19D6BD] shadow-sm transition"
                                />

                                <div
                                    onClick={() => {
                                        setUploadError(null);
                                        fileInputRef.current?.click();
                                    }}
                                    className="relative w-full h-44 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#19D6BD] transition-all duration-300 bg-gray-50 dark:bg-gray-700 group"
                                >
                                    {isUploadingFile ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                                        </div>
                                    ) : uploadedFileUrl ? (
                                        <Image
                                            src={uploadedFileUrl.includes(".pdf") ? "/images/pdf-icon.png" : uploadedFileUrl}
                                            alt="Uploaded file"
                                            fill
                                            className="object-contain rounded-xl"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-500 dark:text-gray-300">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-10 w-10 mb-2 group-hover:text-[#19D6BD] transition"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 16V4m0 0l3 3m-3-3L4 7m13 8v4m0 0l3-3m-3 3l-3-3"
                                                />
                                            </svg>
                                            <span className="font-medium text-sm group-hover:text-[#19D6BD] transition">
                                                Click or Drag & Drop to Upload Proof
                                            </span>
                                            <span className="text-xs text-gray-400 mt-1">PNG, JPG or PDF</span>
                                        </div>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/png,image/jpeg,application/pdf"
                                        className="hidden"
                                        onChange={onFileChange}
                                        aria-label="Upload proof of payment"
                                    />
                                </div>

                                <div className="flex justify-between mt-8">
                                    <Button
                                        onClick={handleBack}
                                        className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || !uploadedFileUrl}
                                        className="bg-[#19D6BD] text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50 hover:bg-[#15bda5] transition"
                                    >
                                        {isSubmitting ? "Submitting..." : "Next"}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                )}

                {activeStep === "completed" && (
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-8 rounded-2xl shadow-md text-center">
                        <h2 className="text-2xl font-bold">🎉 Transaction Completed!</h2>
                        <p className="mt-2">Your payment has been confirmed and recorded successfully.</p>
                    </div>
                )}
            </div>
        </div>
    );
}