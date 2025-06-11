"use client";
import React from 'react'

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { AuthWrapper } from "@/components/Layouts/auth-wrapper";
import { metadata } from "./metadata";
import { isAuthenticated } from "@/redux/auth/handler"
const ClientLayout = ({ children }: any) => {
    const isAuthenticatedUser = isAuthenticated();
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