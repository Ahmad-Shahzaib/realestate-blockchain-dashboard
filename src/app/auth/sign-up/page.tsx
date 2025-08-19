"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { handleRegister } from "@/redux/auth/handler";
import { Building2, Shield, Zap, Globe, User, Mail, Lock, Eye, EyeOff, ArrowRight, UserPlus, ChevronRight } from "lucide-react";
import { toast } from "sonner";

// Define the validation schema using Yup (stronger validation)
const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("First name is required")
        .matches(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, apostrophes, and hyphens"),
    lastName: Yup.string()
        .required("Last name is required")
        .matches(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters, spaces, apostrophes, and hyphens"),
    email: Yup.string()
        .required("Email is required")
        .email("Please enter a valid email"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&#]/, "Password must contain at least one special character"),
});


export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
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
        setLoading(true);
        try {
            await handleRegister({
                firstName: data.firstName.trim(),
                lastName: data.lastName.trim(),
                email: data.email.trim().toLowerCase(),
                password: data.password,
            });
            toast.success("Account created successfully! Please sign in.");
            reset();
            router.push("/auth/sign-in");
        } catch (err: any) {
            const errorMsg =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to create account. Please try again.";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
            {/* Removed animated background and grid overlay */}

            <div className="relative z-10 min-h-screen flex flex-col lg:flex-row w-full items-center justify-center">
                {/* Left Side - Branding & Info */}
                <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-8 xl:px-16 max-lg:pt-16 max-lg:pb-8">
                    <div className="max-w-lg">
                        {/* Logo */}
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-black">BlockEstate</h1>
                                <p className="text-sm text-black">Future of Real Estate Investment</p>
                            </div>
                        </div>

                        {/* Hero Content */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-4xl xl:text-5xl font-bold text-black leading-tight mb-6">
                                    Join the
                                    <span className="text-black"> Revolution </span>
                                    in Real Estate
                                </h2>
                                <p className="text-xl text-black leading-relaxed">
                                    Start your journey with secure, transparent blockchain-powered property investments today.
                                </p>
                            </div>

                            {/* Features */}
                            <div className="space-y-4">
                                {[
                                    { icon: Shield, text: "Military-grade Security" },
                                    { icon: Zap, text: "Lightning Fast Setup" },
                                    { icon: Globe, text: "Worldwide Access" }
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center">
                                            <feature.icon className="w-6 h-6 text-black" />
                                        </div>
                                        <span className="text-black font-medium">{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Benefits */}
                            <div className="grid grid-cols-1 gap-4 pt-8 border-t border-white/10">
                                <div className="bg-background rounded-xl p-4">
                                    <div className="text-lg font-bold text-black mb-1">Zero Setup Fees</div>
                                    <div className="text-sm text-black">Start investing with no upfront costs</div>
                                </div>
                                <div className="bg-background rounded-xl p-4">
                                    <div className="text-lg font-bold text-black mb-1">24/7 Support</div>
                                    <div className="text-sm text-black">Expert help whenever you need it</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Sign Up Form */}
                <div className="w-full max-w-xl flex items-center justify-center px-4 sm:px-8 md:px-12 py-8 lg:w-1/2">
                    <div className="w-full max-w-md mx-auto">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-black" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-black">BlockEstate</h1>
                            </div>
                        </div>

                        {/* Sign Up Card */}
                        <div className="bg-background rounded-3xl p-4">
                            <div className="text-left mb-8">
                                <h2 className="text-3xl font-bold text-black mb-2">Create Account</h2>
                                <p className="text-black">Join thousands of successful investors</p>
                            </div>

                            {/* Sign Up Form */}
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                                {/* Name Fields */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-black text-sm font-medium">First Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="w-5 h-5 text-black" />
                                            </div>
                                            <Controller
                                                name="firstName"
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <Input
                                                        type="text"
                                                        value={value}
                                                        onChange={onChange}
                                                        className={`pl-12 pr-4 ${errors.firstName ? "border-red-400" : ""}`}
                                                        placeholder="John"
                                                        autoComplete="given-name"
                                                    />
                                                )}
                                            />
                                        </div>
                                        {errors.firstName && (
                                            <p className="text-red-400 text-sm">{errors.firstName.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-black text-sm font-medium">Last Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="w-5 h-5 text-black" />
                                            </div>
                                            <Controller
                                                name="lastName"
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <Input
                                                        type="text"
                                                        value={value}
                                                        onChange={onChange}
                                                        className={`pl-12 pr-4 ${errors.lastName ? "border-red-400" : ""}`}
                                                        placeholder="Doe"
                                                        autoComplete="family-name"
                                                    />
                                                )}
                                            />
                                        </div>
                                        {errors.lastName && (
                                            <p className="text-red-400 text-sm">{errors.lastName.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-black text-sm font-medium">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="w-5 h-5 text-black" />
                                        </div>
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <Input
                                                    type="email"
                                                    value={value}
                                                    onChange={onChange}
                                                    className={`pl-12 pr-4 ${errors.email ? "border-red-400" : ""}`}
                                                    placeholder="john.doe@example.com"
                                                    autoComplete="email"
                                                />
                                            )}
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-400 text-sm">{errors.email.message}</p>
                                    )}
                                </div>

                                {/* Password Input */}
                                <div className="space-y-2">
                                    <label className="text-black text-sm font-medium">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="w-5 h-5 text-black" />
                                        </div>
                                        <Controller
                                            name="password"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    value={value}
                                                    onChange={onChange}
                                                    className={`pl-12 pr-12 ${errors.password ? "border-red-400" : ""}`}
                                                    placeholder="Create a strong password"
                                                    autoComplete="new-password"
                                                />
                                            )}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5 text-black hover:text-black transition-colors" />
                                            ) : (
                                                <Eye className="w-5 h-5 text-black hover:text-black transition-colors" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-400 text-sm">{errors.password.message}</p>
                                    )}
                                </div>

                                {/* Error Message handled by toast, no inline error block needed */}

                                {/* Terms Notice */}
                                <div className="text-center">
                                    <p className="text-black text-sm">
                                        By creating an account, you agree to our{' '}
                                        <a href="/terms" className="text-black hover:text-black underline">Terms of Service</a>{' '}
                                        and{' '}
                                        <a href="/privacy" className="text-black hover:text-black underline">Privacy Policy</a>
                                    </p>
                                </div>

                                {/* Create Account Button */}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    variant="default"
                                    className="w-full"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </Button>
                            </form>

                            {/* Sign In Link */}
                            <div className="text-center mt-8 pt-6 border-t border-black/10">
                                <p className="text-black">
                                    Already have an account?{' '}
                                    <a
                                        href="/auth/sign-in"
                                        className="text-themebgColor hover:text-black font-semibold transition-colors inline-flex items-center gap-1"
                                    >
                                        Sign In
                                    </a>
                                </p>
                            </div>
                        </div>


                        {/* Security Notice */}
                        <div className="mt-6 text-center">
                            <p className="text-black text-xs flex items-center justify-center gap-2">
                                <Shield className="w-4 h-4 text-black" />
                                Your information is encrypted and secure
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}