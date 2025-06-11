"use client";

import type React from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { handleRegister } from "@/redux/auth/handler";

// Define the validation schema using Yup
const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
        .required("Email is required")
        .email("Please enter a valid email"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
});

export default function Component() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(RegisterSchema),
        mode: "onSubmit",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) => {
        try {
            setLoading(true);
            setError("");
            await handleRegister({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            });
            // On success, redirect to a relevant page (e.g., login or dashboard)
            router.push("/auth/sign-in");
        } catch (err: any) {
            setError(err.message || "Failed to create account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            <div className="flex min-h-screen items-center justify-center">
                <div className="w-full xl:w-1/2">
                    <div className="p-4">
                        <div className="w-full shadow-xl dark:bg-dark-3 p-5 rounded-[10px]">
                            <div className="text-center mb-6">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-blue-100 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold">Create Account</h2>
                                <p className="mt-1">Enter your information to create your account</p>
                            </div>

                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                                            First Name
                                        </label>
                                        <Controller
                                            name="firstName"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <input
                                                    id="firstName"
                                                    name="firstName"
                                                    type="text"
                                                    placeholder="John"
                                                    value={value}
                                                    onChange={onChange}
                                                    className={`w-full px-3 py-2 border ${errors.firstName ? "border-red-500" : "border-gray-300"
                                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                                />
                                            )}
                                        />
                                        {errors.firstName && (
                                            <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                                            Last Name
                                        </label>
                                        <Controller
                                            name="lastName"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <input
                                                    id="lastName"
                                                    name="lastName"
                                                    type="text"
                                                    placeholder="Doe"
                                                    value={value}
                                                    onChange={onChange}
                                                    className={`w-full px-3 py-2 border ${errors.lastName ? "border-red-500" : "border-gray-300"
                                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                                />
                                            )}
                                        />
                                        {errors.lastName && (
                                            <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                                        Email
                                    </label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="john.doe@example.com"
                                                value={value}
                                                onChange={onChange}
                                                className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                            />
                                        )}
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-sm">{errors.email.message}</span>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Controller
                                            name="password"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your password"
                                                    value={value}
                                                    onChange={onChange}
                                                    className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-10`}
                                                />
                                            )}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <span className="text-red-500 text-sm">{errors.password.message}</span>
                                    )}
                                </div>

                                {error && (
                                    <p className="text-center text-red-500 text-sm">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-2 px-4 rounded-md text-white transition-colors duration-200 ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                >
                                    {loading ? "Creating Account..." : "Create Account"}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm">
                                    Already have an account?{" "}
                                    <a
                                        href="/auth/sign-in"
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Sign in
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}