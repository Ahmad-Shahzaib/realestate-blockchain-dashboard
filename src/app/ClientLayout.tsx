"use client";
import React, { useEffect, useState } from 'react';

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { AuthWrapper } from "@/components/Layouts/auth-wrapper";
import { metadata } from "./metadata";
import { isAuthenticated } from "@/redux/auth/handler"
const ClientLayout = ({ children }: any) => {
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
    
    useEffect(() => {
        // Check authentication status on component mount and whenever focus returns to the window
        const checkAuth = () => {
            const authStatus = isAuthenticated();
            setIsAuthenticatedUser(authStatus);
        };
        
        checkAuth(); // Initial check
        
        // Add event listeners for focus and storage changes
        window.addEventListener('focus', checkAuth);
        window.addEventListener('storage', checkAuth);
        
        // Cleanup event listeners
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
                            <Sidebar />
                            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
                                <Header />
                                <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                                    {children}
                                </main>
                            </div>
                        </div>
                    </AuthWrapper>
                </Providers>
            ) : (<>
                <Providers>
                    <AuthWrapper>
                        <div className="flex min-h-screen">
                            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
                                <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                                    {children}
                                </main>
                            </div>
                        </div>
                    </AuthWrapper>
                </Providers>
            </>)}
        </>
    )
}

export default ClientLayout