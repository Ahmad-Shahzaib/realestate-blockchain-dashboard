"use client";
import React, { useEffect, useState, ReactNode } from "react";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import { Providers } from "./providers";
import { AuthWrapper } from "@/components/Layouts/auth-wrapper";
import { isAuthenticated } from "@/redux/auth/handler";
import { ToastProvider } from "@/components/ui/ToastProvider";

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticatedUser(isAuthenticated());
    };
    checkAuth();
    window.addEventListener("focus", checkAuth);
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("focus", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <>
      <ToastProvider />
      <Providers>
        <AuthWrapper>
          {isAuthenticatedUser ? (
            <div className="flex min-h-screen w-full">
                <Sidebar />
              <main className="flex-1 flex flex-col min-h-screen w-full md:ml-64">
                <Header />
                <section className="bg-background p-6  overflow-y-auto">
                  {children}
                </section>
              </main>
            </div>
          ) : (
            <main className="flex min-h-screen w-full bg-background">
              <section className="flex-1 p-6 min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center">
                {children}
              </section>
            </main>
          )}
        </AuthWrapper>
      </Providers>
    </>
  );
};

export default ClientLayout;