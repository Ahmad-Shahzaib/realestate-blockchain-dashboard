"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Mail, Phone, Send } from "lucide-react";

const SupportClient = () => {
    const [expandedFAQ, setExpandedFAQ] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

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

    const handleFAQToggle = (index) => {
        setExpandedFAQ(expandedFAQ === index ? null : index);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        // Simulate form submission (replace with API call in production)
        console.log("Form submitted:", formData);
        alert("Your message has been sent! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen  dark:bg-dark py-12 px-4 sm:px-6 lg:px-8 transition-colors">
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
                                href="https://softsuite.com"
                                className="text-[#0277BD] hover:text-[#00B894] font-medium transition"
                            >
                                helpdesk@softsuite.com
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
                                href="0315 1012287"
                                className="text-[#0277BD] hover:text-[#00B894] font-medium transition"
                            >
                                0315 1012287
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="p-8 rounded-2xl shadow-md bg-gradient-to-r from-[#00B894]/10 to-[#00D2B6]/10 dark:from-[#00B894]/10 dark:bg-dark border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-semibold text-[#003049] dark:text-white mb-6">
                        Send Us a Message
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mt-1 w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2A2A2A] focus:ring-[#00B894] focus:border-[#00B894] text-gray-700 dark:text-gray-200"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2A2A2A] focus:ring-[#00B894] focus:border-[#00B894] text-gray-700 dark:text-gray-200"
                                placeholder="softsuite@gmail.com"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Message
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows="4"
                                className="mt-1 w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2A2A2A] focus:ring-[#00B894] focus:border-[#00B894] text-gray-700 dark:text-gray-200"
                                placeholder="Describe your issue or question..."
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-lg hover:opacity-90 transition"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Send className="w-5 h-5" />
                                <span>Send Message</span>
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
                            href="https://softsuite.com"
                            className="text-[#0277BD] hover:text-[#00B894] font-medium transition"
                        >
                            @SoftsuiteCare
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>

    );
};

export default SupportClient;