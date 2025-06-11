"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("token");
        const isAuthPage = pathname?.includes("/auth/");

        if (isAuthenticated && isAuthPage) {
            // If user is authenticated and on auth page, redirect to home
            router.push("/");
        } else if (!isAuthenticated && !isAuthPage) {
            // If user is not authenticated and trying to access protected routes
            router.push("/auth/sign-in");
        }
    }, [pathname, router]);

    return <>{children}</>;
};
