"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import Link from "next/link";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import { UseDispatch } from "react-redux";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/redux/auth/handler"; // Adjust the import path based on your project structure
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/reducers/userInfoSlice";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
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
        dispatch(setUser(user))
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
    <form onSubmit={handleSubmit}>
      <InputGroup
        type="email"
        label="Email"
        className="mb-4 [&_input]:py-[10px]"
        placeholder="Enter your email"
        name="email"
        handleChange={handleChange}
        value={data.email}
        icon={<EmailIcon />}
      />

      <InputGroup
        type="password"
        label="Password"
        className="mb-5 [&_input]:py-[10px]"
        placeholder="Enter your password"
        name="password"
        handleChange={handleChange}
        value={data.password}
        icon={<PasswordIcon />}
      />

      {error && (
        <p className="mb-4 text-center text-red-500 text-sm">{error}</p>
      )}

      <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
        <Checkbox
          label="Remember me"
          name="remember"
          withIcon="check"
          minimal
          radius="md"
          onChange={(e) =>
            setData({
              ...data,
              remember: e.target.checked,
            })
          }
        />

        <Link
          href="/auth/forgot-password"
          className="hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          disabled={loading}
          className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 ${loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
        >
          Sign In
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>
    </form>
  );
}