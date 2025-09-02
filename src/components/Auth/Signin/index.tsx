import Link from "next/link";
// import GoogleSigninButton from "../GoogleSigninButton";
import SigninWithPassword from "../SigninWithPassword";
import { ChevronRight } from "lucide-react";

export default function Signin() {
  return (
    <>
      {/* <GoogleSigninButton text="Sign in" /> */}

      {/* Divider */}
      {/* <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-[#ECF0F1] "></div>
        <span className="text-white text-sm">or sign in with email</span>
        <div className="flex-1 h-px bg-[#ECF0F1]"></div>
      </div> */}

      <div>
        <SigninWithPassword />
      </div>

      {/* Sign Up Link */}
      <div className="text-center mt-8 pt-6 border-t border-[#ECF0F1]">
        <p className="text-white">
          Don't have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-[#3498DB] hover:text-[#2980B9] font-semibold transition-colors inline-flex items-center gap-1"
          >
            Sign Up
            <ChevronRight className="w-4 h-4" />
          </Link>
        </p>
      </div>
    </>
  );
}
