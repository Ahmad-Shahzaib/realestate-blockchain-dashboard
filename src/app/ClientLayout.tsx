"use client";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import { Providers } from "./providers";
import { AuthWrapper } from "@/components/Layouts/auth-wrapper";
import { isAuthenticated } from "@/redux/auth/handler";
import GlobalLoader from "./loader/GlobalLoader"; // ✅ add this import

const ClientLayout = ({ children }: any) => {
  const [authState, setAuthState] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = [
    "/auth/sign-in",
    "/sign-up",
    "/auth/sign-up",
    "/forgot-password",
    "/reset-password",
  ];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = isAuthenticated();

        if (authStatus) {
          setAuthState("authenticated");
          if (isPublicRoute) {
            setShouldRedirect(true);
            router.push("/");
            return;
          }
        } else {
          setAuthState("unauthenticated");
          if (!isPublicRoute) {
            setShouldRedirect(true);
            router.push("/auth/sign-in");
            return;
          }
        }

        setShouldRedirect(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        setAuthState("unauthenticated");
        if (!isPublicRoute) {
          setShouldRedirect(true);
          router.push("/auth/sign-in");
        }
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("focus", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("focus", checkAuth);
    };
  }, [pathname, router, isPublicRoute]);

  if (authState === "loading" || shouldRedirect) {
    return (
      <Providers>
        <GlobalLoader /> {/* ✅ show loader globally */}
        <Toaster position="top-right" />
      </Providers>
    );
  }

  if (authState === "authenticated" && !isPublicRoute) {
    return (
      <Providers>
        <GlobalLoader /> {/* ✅ show loader globally */}
        <Toaster position="top-right" />
        <AuthWrapper>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="w-full dark:bg-[#020d1a]">
              <Header />
              <main className="isolate mx-auto w-full overflow-hidden">
                {children}
              </main>
            </div>
          </div>
        </AuthWrapper>
      </Providers>
    );
  }

  if (authState === "unauthenticated" && isPublicRoute) {
    return (
      <Providers>
        <GlobalLoader /> {/* ✅ show loader globally */}
        <Toaster position="top-right" />
        <AuthWrapper>
          <div className="min-h-screen dark:bg-[#020d1a]">
            <main className="isolate mx-auto w-full overflow-hidden">
              {children}
            </main>
          </div>
        </AuthWrapper>
      </Providers>
    );
  }

  return (
    <Providers>
      <GlobalLoader /> {/* ✅ show loader globally */}
      <Toaster position="top-right" />
    </Providers>
  );
};

export default ClientLayout;
