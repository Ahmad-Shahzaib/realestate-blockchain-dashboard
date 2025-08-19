"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/redux/auth/handler";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/reducers/userInfoSlice";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";

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

      // Check if response exists and has success property
      if (user) {
        dispatch(setUser(user));
        toast.success("Successfully signed in!");
        router.replace("/");
      } else {
        // Handle case where response is undefined or unsuccessful
        const errorMessage = "Authentication failed. Please check your credentials and try again.";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        // Handle validation errors
        setError(err.errors[0] || "Please check your input");
        toast.error(err.errors[0] || "Please check your input");
      } else {
        // Handle other errors
        const msg = err?.message || "An error occurred during sign in. Please try again later.";
        setError(msg);
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold ">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="w-5 h-5" />
          </div>
          <Input
            id="email"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full pl-12" // Add left padding to prevent overlap
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-semibold ">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="w-5 h-5" />
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={data.password}
            onChange={handleChange}
            className="w-full pl-12" // Add left padding to prevent overlap
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

      {/* Error Message (hidden visually, for accessibility only) */}
      {error && (
        <div className="sr-only" aria-live="polite">{error}</div>
      )}

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label htmlFor="remember" className="flex items-center gap-3 cursor-pointer text-sm font-semibold">
          <Input
            id="remember"
            type="checkbox"
            name="remember"
            checked={data.remember}
            onChange={handleChange}
            className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-400 focus:ring-offset-0"
          />
          <span className="text-black text-sm">Remember me</span>
        </label>
        <Link
          href="/auth/forgot-password"
          className="text-black hover:text-white text-sm transition-colors"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Sign In Button */}
      <Button
        type="submit"
        disabled={loading}
        variant="default"
        className="w-full"
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
      </Button>
    </form>
  );
}