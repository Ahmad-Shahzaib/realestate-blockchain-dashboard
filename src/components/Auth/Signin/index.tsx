import Link from "next/link";
import SigninWithPassword from "../SigninWithPassword";

export default function Signin() {
  return (
    <div className="max-w-md mx-auto flex flex-col gap-8">
      <div className="w-full">
        <SigninWithPassword />
      </div>
      <div className="text-center mt-8 px-2">
        <p className="text-black">
          Don't have an account?{' '}
          <Link
            href="/auth/sign-up"
            className="text-themebgColor hover:text-accent font-semibold transition-colors inline-flex items-center gap-1"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}