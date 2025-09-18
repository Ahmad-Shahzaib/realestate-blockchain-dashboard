"use client";
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { AuthWrapper } from "@/components/Layouts/auth-wrapper";
import { metadata } from "./metadata";
import { isAuthenticated } from "@/redux/auth/handler";

const ClientLayout = ({ children }: any) => {
    const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Define public routes
    const publicRoutes = ['/auth/sign-in', '/sign-up', '/auth/sign-in', '/auth/sign-up', '/forgot-password', '/reset-password'];
    const isPublicRoute = publicRoutes.includes(pathname);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authStatus = isAuthenticated();

                if (authStatus) {
                    setAuthState('authenticated');
                    // If user is authenticated and on public route, redirect to dashboard
                    if (isPublicRoute) {
                        setShouldRedirect(true);
                        router.push('/');
                        return;
                    }
                } else {
                    setAuthState('unauthenticated');
                    // If user is not authenticated and on protected route, redirect to login
                    if (!isPublicRoute) {
                        setShouldRedirect(true);
                        router.push('/auth/sign-in');
                        return;
                    }
                }

                setShouldRedirect(false);
            } catch (error) {
                console.error('Auth check failed:', error);
                setAuthState('unauthenticated');
                if (!isPublicRoute) {
                    setShouldRedirect(true);
                    router.push('/auth/sign-in');
                }
            }
        };

        checkAuth();

        // Listen for storage changes (logout from another tab)
        const handleStorageChange = () => {
            checkAuth();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('focus', checkAuth);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('focus', checkAuth);
        };
    }, [pathname, router, isPublicRoute]);

    // Show loading while checking auth or redirecting
    if (authState === 'loading' || shouldRedirect) {
        return (
            <Providers>
                <Toaster position="top-right" />
                <div className="flex min-h-screen items-center justify-center dark:bg-[#020d1a] bg-gray-50">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
                    </div>
                </div>
            </Providers>
        );
    }

    // Authenticated users on protected routes - show full dashboard layout
    if (authState === 'authenticated' && !isPublicRoute) {
        return (
            <Providers>
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

    // Unauthenticated users or authenticated users on public routes - simple layout
    if (authState === 'unauthenticated' && isPublicRoute) {
        return (
            <Providers>
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

    // Fallback - should not reach here but just in case
    return (
        <Providers>
            <Toaster position="top-right" />
            <div className="flex min-h-screen items-center justify-center dark:bg-[#020d1a] bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Redirecting...</p>
                </div>
            </div>
        </Providers>
    );
}

export default ClientLayout