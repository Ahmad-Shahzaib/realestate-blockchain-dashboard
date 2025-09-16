"use client";

import type React from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import logo from "../../../assets/logos/fractprop.png";
import { handleRegister } from "@/redux/auth/handler";
import {
    Building2,
    Shield,
    Zap,
    Globe,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    UserPlus,
    ChevronRight,
} from "lucide-react";

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

export default function SignUp() {
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
            // On success, redirect to login
            router.push("/auth/sign-in");
        } catch (err: any) {
            setError(err.message || "Failed to create account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-tr from-[#E6F0FA] via-[#D6EAF8] to-[#C3E2E6] relative overflow-hidden flex items-center justify-center">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-[#0277BD]/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-96 sm:h-96 bg-[#00B894]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-32 h-32 sm:w-48 sm:h-48 bg-[#00D2B6]/20 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 pointer-events-none"></div>

            <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen">
                <div className="flex flex-col-reverse lg:flex-row w-full max-w-6xl items-center justify-center mx-auto px-4 sm:px-8 py-8 gap-8">
                    {/* Left Side - Branding & Info */}
                    <div className="w-full max-w-lg flex flex-col justify-center items-center px-2 sm:px-8 xl:px-16 mb-2 lg:mb-0">
                        {/* Logo */}
                        <div className="lg:flex items-center gap-4">
                            <img src={logo.src} alt="BlockEstate Logo" style={
                                {
                                    width: "50%",
                                    height: "auto",
                                    filter: "brightness(0.5)",
                                }
                            } />
                        </div>

                        {/* Hero Content */}
                        <div className="space-y-2 w-full  lg:mt-0">
                            <div>
                                <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#003049] leading-tight mb-6 text-center lg:text-left">
                                    Join the
                                    <span className="bg-gradient-to-r from-[#1d453d] to-[#1b3834] bg-clip-text text-transparent">
                                        {" "}
                                        Revolution{" "}
                                    </span>
                                    in Real Estate
                                </h2>
                                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-center lg:text-left">
                                    Start your journey with secure, transparent
                                    blockchain-powered property investments today.
                                </p>
                            </div>

                            {/* Features */}
                            <div className="space-y-4 mt-4">
                                {[
                                    { icon: Shield, text: "Military-grade Security" },
                                    { icon: Zap, text: "Lightning Fast Setup" },
                                    { icon: Globe, text: "Worldwide Access" },
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 group justify-center lg:justify-start"
                                    >
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F5F7FA] rounded-xl flex items-center justify-center transition-all duration-300">
                                            <feature.icon className="w-6 h-6 text-[#0277BD] group-hover:text-[#00B894]" />
                                        </div>
                                        <span className="text-[#003049] font-medium">
                                            {feature.text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Stats / Benefits */}
                            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-8 border-t border-gray-100">
                                <div className="text-center lg:text-left">
                                    <div className="text-2xl sm:text-3xl font-bold text-[#003049]">
                                        Zero Fees
                                    </div>
                                    <div className="text-gray-700 text-xs sm:text-sm">
                                        No upfront setup cost
                                    </div>
                                </div>
                                <div className="text-center lg:text-left">
                                    <div className="text-2xl sm:text-3xl font-bold text-[#003049]">
                                        24/7
                                    </div>
                                    <div className="text-gray-700 text-xs sm:text-sm">
                                        Expert support
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Sign Up Form */}
                    <div className="w-full max-w-md flex flex-col items-center justify-center mx-auto">


                        {/* Sign Up Card */}
                        <div className="w-full bg-[#003049] text-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-100 hover:shadow-xl transition">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <UserPlus className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    Create Account
                                </h2>
                                <p className="text-white">
                                    Join thousands of successful investors
                                </p>
                            </div>

                            {/* Sign Up Form */}
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                {/* Name Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-white text-sm font-medium">
                                            First Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="w-5 h-5 text-blue-300" />
                                            </div>
                                            <Controller
                                                name="firstName"
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <input
                                                        type="text"
                                                        value={value}
                                                        onChange={onChange}
                                                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                                        placeholder="John"
                                                    />
                                                )}
                                            />
                                        </div>
                                        {errors.firstName && (
                                            <p className="text-red-300 text-sm">
                                                {errors.firstName.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-white text-sm font-medium">
                                            Last Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="w-5 h-5 text-blue-300" />
                                            </div>
                                            <Controller
                                                name="lastName"
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <input
                                                        type="text"
                                                        value={value}
                                                        onChange={onChange}
                                                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                                        placeholder="Doe"
                                                    />
                                                )}
                                            />
                                        </div>
                                        {errors.lastName && (
                                            <p className="text-red-300 text-sm">
                                                {errors.lastName.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-white text-sm font-medium">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="w-5 h-5 text-blue-300" />
                                        </div>
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <input
                                                    type="email"
                                                    value={value}
                                                    onChange={onChange}
                                                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                                    placeholder="john.doe@example.com"
                                                />
                                            )}
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-300 text-sm">{errors.email.message}</p>
                                    )}
                                </div>

                                {/* Password Input */}
                                <div className="space-y-2">
                                    <label className="text-white text-sm font-medium">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="w-5 h-5 text-blue-300" />
                                        </div>
                                        <Controller
                                            name="password"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={value}
                                                    onChange={onChange}
                                                    className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                                    placeholder="Create a strong password"
                                                />
                                            )}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5 text-blue-300 hover:text-white transition-colors" />
                                            ) : (
                                                <Eye className="w-5 h-5 text-blue-300 hover:text-white transition-colors" />
                                            )}
                                        </button>
                                    </div>
                                    {/* resferal code  */}
                                    <div className="space-y-2">
                                        <label className="text-white text-sm font-medium">
                                            Referal Code
                                        </label>
                                        <div>
                                            <input type="text"
                                                required
                                                className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                                placeholder="Enter Referal Code" />
                                        </div>

                                    </div>



                                    {errors.password && (
                                        <p className="text-red-300 text-sm">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                        <p className="text-red-300 text-sm text-center">{error}</p>
                                    </div>
                                )}

                                {/* Terms Notice */}
                                <div className="text-center">
                                    <p className="text-blue-200 text-sm">
                                        By creating an account, you agree to our{" "}
                                        <a
                                            href="/terms"
                                            className="text-white hover:text-blue-300 underline"
                                        >
                                            Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a
                                            href="/privacy"
                                            className="text-white hover:text-blue-300 underline"
                                        >
                                            Privacy Policy
                                        </a>
                                    </p>
                                </div>

                                {/* Create Account Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
                                </button>
                            </form>

                            {/* Sign In Link */}
                            <div className="text-center mt-8 pt-6 border-t border-white/10">
                                <p className="text-blue-200">
                                    Already have an account?{" "}
                                    <a
                                        href="/auth/sign-in"
                                        className="text-white hover:text-blue-300 font-semibold transition-colors inline-flex items-center gap-1"
                                    >
                                        Sign In
                                        <ChevronRight className="w-4 h-4" />
                                    </a>
                                </p>
                            </div>
                            {/* Security Notice */}
                            <div className="mt-6 text-center">
                                <p className="text-white text-xs flex items-center justify-center gap-2">
                                    <Shield className="w-4 h-4 text-[#0277BD]" />
                                    Your information is encrypted and secure
                                </p>
                            </div>
                        </div>


                    </div>


                </div>
            </div>
        </div>
    );
}   
