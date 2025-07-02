import Signin from "@/components/Auth/Signin";
import type { Metadata } from "next";
import { Building2, Shield, Zap, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In - BlockEstate",
  description: "Sign in to your blockchain real estate investment platform"
};

export default function SignIn() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 sm:w-48 sm:h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 pointer-events-none"></div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col-reverse lg:flex-row w-full max-w-6xl items-center justify-center mx-auto px-4 sm:px-8 py-8 gap-8">
          {/* Right Side - Login Form */}
          <div className="w-full max-w-md flex flex-col items-center justify-center mx-auto">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">BlockEstate</h1>
              </div>
            </div>

            {/* Login Card */}
            <div className="w-full bg-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-blue-200">Sign in to your investment dashboard</p>
              </div>

              <Signin />

              {/* Security Notice */}
              <div className="mt-6 text-center">
                <p className="text-blue-300 text-xs flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  Your data is protected with end-to-end encryption
                </p>
              </div>
            </div>
          </div>

          {/* Left Side - Branding & Info */}
          <div className="w-full max-w-lg flex flex-col justify-center items-center px-2 sm:px-8 xl:px-16 mb-8 lg:mb-0">
            {/* Logo */}
            <div className="hidden lg:flex items-center gap-4 mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">BlockEstate</h1>
                <p className="text-blue-300 text-sm">Future of Real Estate Investment</p>
              </div>
            </div>

            {/* Hero Content */}
            <div className="space-y-8 w-full">
              <div>
                <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-white leading-tight mb-6 text-center lg:text-left">
                  Invest in the
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Future </span>
                  of Real Estate
                </h2>
                <p className="text-lg sm:text-xl text-blue-200 leading-relaxed text-center lg:text-left">
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
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                      <feature.icon className="w-6 h-6 text-blue-300" />
                    </div>
                    <span className="text-white font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-white/10">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white">$2.4B+</div>
                  <div className="text-blue-300 text-xs sm:text-sm">Total Invested</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white">15K+</div>
                  <div className="text-blue-300 text-xs sm:text-sm">Properties</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white">98%</div>
                  <div className="text-blue-300 text-xs sm:text-sm">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}