"use client";
import React, { useEffect, useState } from 'react';

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { AuthWrapper } from "@/components/Layouts/auth-wrapper";
import { metadata } from "./metadata";
import { isAuthenticated } from "@/redux/auth/handler";
import dynamic from 'next/dynamic';

// Dynamically import the RoleSwitcher component


const ClientLayout = ({ children }: any) => {
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
    const isDev = process.env.NODE_ENV === 'development';

    useEffect(() => {

        const checkAuth = () => {
            const authStatus = isAuthenticated();
            setIsAuthenticatedUser(authStatus);
        };

        checkAuth();


        window.addEventListener('focus', checkAuth);
        window.addEventListener('storage', checkAuth);


        return () => {
            window.removeEventListener('focus', checkAuth);
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    return (
        <>
            {isAuthenticatedUser ? (
                <Providers>
                    <AuthWrapper>
                        <div className="flex min-h-screen">
                            {/* Sidebar: fixed, so main content needs left margin */}
                            <Sidebar />
                            <div className="flex-1 ml-0 lg:ml-64">
                                <Header />
                                <div className="min-h-screen bg-gradient-to-br from-[theme('colors.background.gradientFrom')] via-[theme('colors.background.gradientVia')] to-[theme('colors.background.gradientTo')] relative overflow-hidden">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </AuthWrapper>
                </Providers>
            ) : (
                <Providers>
                    <AuthWrapper>
                        <div className="flex min-h-screen">
                            <div className="w-full bg-[theme('colors.background.secondary')] dark:bg-[theme('colors.background.dark')]">
                                <div className="min-h-screen bg-gradient-to-br from-[theme('colors.background.gradientFrom')] via-[theme('colors.background.gradientVia')] to-[theme('colors.background.gradientTo')] relative overflow-hidden">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </AuthWrapper>
                </Providers>
            )}
        </>
    )
}

export default ClientLayout