"use client";
import Link from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/redux/auth/handler";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/reducers/userInfoSlice";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

// Define the validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function SigninWithPassword() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === 'checkbox' ? checked : value,
    });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate form data using Yup
      await LoginSchema.validate(data, { abortEarly: false });

      setLoading(true);
      setError("");

      // Call the handleLogin API
      const user = await handleLogin({
        email: data.email,
        password: data.password,
      });

      console.log("Login response:", user);

      // Check if response exists and has success property
      if (user) {
        // On success, redirect to the dashboard
        dispatch(setUser(user));
        router.replace("/");
      } else {
        // Handle case where response is undefined or unsuccessful
        const errorMessage = "Authentication failed. Please try again.";
        setError(errorMessage);
      }
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        // Handle validation errors
        setError(err.errors[0] || "Please check your input");
      } else {
        // Handle other errors
        setError(err?.message || "An error occurred during sign in");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Input */}
      <div className="space-y-2">
        <label className="text-white text-sm font-medium">Email Address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="w-5 h-5 text-blue-300" />
          </div>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label className="text-white text-sm font-medium">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="w-5 h-5 text-blue-300" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={data.password}
            onChange={handleChange}
            className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            placeholder="Enter your password"
            required
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
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-red-300 text-sm text-center">{error}</p>
        </div>
      )}

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="remember"
            checked={data.remember}
            onChange={handleChange}
            className="w-4 h-4 rounded border border-white/20 bg-white/10 text-blue-500 focus:ring-blue-400 focus:ring-offset-0"
          />
          <span className="text-blue-200 text-sm">Remember me</span>
        </label>
        <Link
          href="/auth/forgot-password"
          className="text-blue-300 hover:text-white text-sm transition-colors"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Signing In...
          </>
        ) : (
          <>
            Sign In
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}