"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Mail, Phone, Send } from "lucide-react";
import { SupportService } from "@/services/support.service";

const SupportClient = () => {
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        userId: "64a8d4f2c8a9a3f1b2c3d4e5", // Hardcoded for now; replace with actual userId from auth context
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const faqs = [
        {
            question: "How do I check my bill payment status?",
            answer: "Log in to your account at my.softsuite.com using your registered mobile number to verify payment status. Payments may take 24-48 hours to process.",
        },
        {
            question: "What should I do if my internet is not working?",
            answer: "Restart your modem, check for a red blinking light on the ONT, and contact support at helpdesk@softsuite.com or call 111-1-STORM (78676).",
        },
        {
            question: "How can I escalate an unresolved issue?",
            answer: "If your issue persists, file a complaint with the Pakistan Telecommunication Authority (PTA) via their online portal or helpline, including your ticket number.",
        },
    ];

    // Auto-dismiss toast after 3 seconds
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleFAQToggle = (index: number) => {
        setExpandedFAQ(expandedFAQ === index ? null : index);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setToast(null);

        try {
            // Call the createSupportTicket API
            const response = await SupportService.createSupportTicket({
                title: formData.title,
                description: formData.description,
                userId: formData.userId,
                category: formData.category,
            });

            // Show success toast
            setToast({ message: `Support ticket created successfully! Ticket Code: ${response.ticketCode}`, type: "success" });
            setFormData({
                title: "",
                description: "",
                category: "",
                userId: formData.userId, // Preserve userId
            });
        } catch (error: any) {
            // Show error toast
            setToast({ message: error.message || "Failed to submit support request. Please try again.", type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen dark:bg-dark py-12 px-4 sm:px-6 lg:px-8 transition-colors">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#003049] dark:text-white">
                        Help & Support
                    </h1>
                    <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                        We're here to assist you. Find answers to common questions or get in touch with our team.
                    </p>
                </div>

                {/* FAQ Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-semibold text-[#003049] dark:text-white mb-6">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl shadow-md bg-white dark:bg-dark border border-gray-100 dark:border-gray-700 hover:shadow-xl transition"
                            >
                                <button
                                    className="w-full flex justify-between items-center text-left"
                                    onClick={() => handleFAQToggle(index)}
                                >
                                    <span className="text-lg font-semibold text-[#003049] dark:text-white">
                                        {faq.question}
                                    </span>
                                    {expandedFAQ === index ? (
                                        <ChevronUp className="w-5 h-5 text-[#0277BD]" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-[#0277BD]" />
                                    )}
                                </button>
                                {expandedFAQ === index && (
                                    <p className="mt-4 text-gray-700 dark:text-gray-300">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Options */}
                <div className="mb-16">
                    <h2 className="text-2xl font-semibold text-[#003049] dark:text-white mb-6">
                        Contact Us
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-dark border border-gray-100 dark:border-gray-700 hover:shadow-xl transition">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="w-6 h-6 text-[#00B894]" />
                                <h3 className="text-lg font-semibold text-[#003049] dark:text-white">
                                    Email Support
                                </h3>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Reach out to our support team for quick assistance.
                            </p>
                            <a
                                href="mailto:helpdesk@fractprop.com"
                                className="text-[#0277BD] hover:text-[#00B894] font-medium transition"
                            >
                                helpdesk@fractprop.com
                            </a>
                        </div>
                        <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-dark border border-gray-100 dark:border-gray-700 hover:shadow-xl transition">
                            <div className="flex items-center gap-3 mb-4">
                                <Phone className="w-6 h-6 text-[#00B894]" />
                                <h3 className="text-lg font-semibold text-[#003049] dark:text-white">
                                    Phone Support
                                </h3>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Call our helpline for immediate help.
                            </p>
                            <a
                                href="tel:03151012287"
                                className="text-[#0277BD] hover:text-[#00B894] font-medium transition"
                            >
                                0315 1012287
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="p-8 rounded-2xl shadow-md bg-gradient-to-r from-[#00B894]/10 to-[#00D2B6]/10 dark:from-[#00B894]/10 dark:bg-dark border border-gray-100 dark:border-gray-700 relative">
                    <h2 className="text-2xl font-semibold text-[#003049] dark:text-white mb-6">
                        Submit a Support Request
                    </h2>
                    {/* Toast Message */}
                    {toast && (
                        <div
                            className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg text-white text-sm font-medium animate-slide-down ${toast.type === "success" ? "bg-[#00B894]" : "bg-red-500"
                                }`}
                        >
                            {toast.message}
                        </div>
                    )}
                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Subject
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="mt-1 w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2A2A2A] focus:ring-[#00B894] focus:border-[#00B894] text-gray-700 dark:text-gray-200"
                                placeholder="Enter subject..."
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Category
                            </label>
                            <select
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="mt-1 w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2A2A2A] focus:ring-[#00B894] focus:border-[#00B894] text-gray-700 dark:text-gray-200"
                            >
                                <option value="">Select a category</option>
                                <option value="Technical">Technical Issue</option>
                                <option value="Billing">Billing</option>
                                <option value="General">General Inquiry</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                className="mt-1 w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2A2A2A] focus:ring-[#00B894] focus:border-[#00B894] text-gray-700 dark:text-gray-200"
                                placeholder="Describe your issue in detail..."
                            />
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-lg hover:opacity-90 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Send className="w-5 h-5" />
                                <span>{isSubmitting ? "Submitting..." : "Submit Request"}</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-12 text-center">
                    <p className="text-gray-700 dark:text-gray-300">
                        Need urgent help? Visit our{" "}
                        <a
                            href="https://softsuite.com"
                            className="text-[#0277BD] hover:text-[#00B894] font-medium transition"
                        >
                            Help Center
                        </a>{" "}
                        or reach out via{" "}
                        <a
                            href="mailto:helpdesk@fractprop.com"
                            className="text-[#0277BD] hover:text-[#00B894] font-medium transition"
                        >
                            helpdesk@fractprop.com
                        </a>
                        .
                    </p>
                </div>
            </div>

            {/* Tailwind Animation for Toast */}
            <style jsx>{`
                @keyframes slide-down {
                    0% {
                        opacity: 0;
                        transform: translate(-50%, -20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                }
                .animate-slide-down {
                    animation: slide-down 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default SupportClient;