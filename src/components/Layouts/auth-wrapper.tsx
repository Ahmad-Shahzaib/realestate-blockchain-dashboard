"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "@/redux/auth/handler"
export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {    const router = useRouter();
    const pathname = usePathname();
    const isAuthenticatedUser = isAuthenticated();
    console.log("isAuthenticatedUser", isAuthenticatedUser);useEffect(() => {
        const isAuthPage = pathname?.includes("/auth/");

        if (isAuthenticatedUser && isAuthPage) {
            router.push("/");
        } else if (!isAuthenticatedUser && !isAuthPage) {
            // If user is not authenticated and trying to access protected routes
            router.push("/auth/sign-in");
        }
    }, [pathname, router, isAuthenticatedUser]);

    return <>{children}</>;
};
