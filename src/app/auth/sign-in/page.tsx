import Signin from "@/components/Auth/Signin";
import type { Metadata } from "next";
import { Building2, Shield, Zap, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In - BlockEstate",
  description: "Sign in to your blockchain real estate investment platform"
};

export default function SignIn() {
  return (
    <div className="min-h-screen w-full bg-background ">
      <div className="relative z-10 w-full flex flex-col ">
        <div className="flex flex-col-reverse lg:flex-row-reverse w-full max-w-6xl items-center justify-center mx-auto px-8 py-8 gap-8">
          <div className="w-full max-w-md flex flex-col items-center justify-center mx-auto p-8">
            <div className="lg:hidden flex items-center justify-start gap-3 mb-8">
              <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-left text-black">BlockEstate</h1>
              </div>
            </div>

            {/* Login Card */}
            <div className="w-full bg-background">
              <div className="text-left mb-8">
                <h2 className="text-3xl font-bold text-black mb-2">Welcome Back</h2>
                <p className="text-black">Sign in to your investment dashboard</p>
              </div>

              <Signin />

              {/* Security Notice */}
              <div className="mt-6 text-center">
                <p className="text-black text-xs flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  Your data is protected with end-to-end encryption
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Branding & Info (now on left for desktop) */}
          <div className="w-full max-w-lg flex flex-col justify-center items-center p-8">
            {/* Logo */}
            <div className="hidden lg:flex w-full gap-4 mb-12">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center ">
                <Building2 className="w-8 h-8 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-black">BlockEstate</h1>
                <p className="text-black text-sm">Future of Real Estate Investment</p>
              </div>
            </div>

            {/* Hero Content */}
            <div className="space-y-8 w-full">
              <div>
                <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-black leading-tight mb-6 text-center lg:text-left">
                  Invest in the
                  <span className="text-black"> Future </span>
                  of Real Estate
                </h2>
                <p className="text-lg sm:text-xl text-black leading-relaxed text-center lg:text-left">
                  Secure, transparent, and decentralized property investments powered by blockchain technology.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {[
                  { icon: Shield, text: "Bank-level Security" },
                  { icon: Zap, text: "Instant Transactions" },
                  { icon: Globe, text: "Global Accessibility" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 group justify-center lg:justify-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-background rounded-xl flex items-center justify-center transition-all duration-300">
                      <feature.icon className="w-6 h-6 text-blue-300" />
                    </div>
                    <span className="text-black font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-white/10">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-black">$2.4B+</div>
                  <div className="text-black text-xs sm:text-sm">Total Invested</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-black">15K+</div>
                  <div className="text-black text-xs sm:text-sm">Properties</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-black">98%</div>
                  <div className="text-black text-xs sm:text-sm">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}