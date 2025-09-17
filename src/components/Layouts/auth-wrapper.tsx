"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "@/redux/auth/handler";
import { useAppDispatch } from "@/redux/hooks";
import { fetchCustomers } from "@/redux/reducers/customerslice/customerSlice";
// import { canAccessRoute } from "@/utils/route-access";

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const isAuthenticatedUser = isAuthenticated();
   

    console.log("isAuthenticatedUser", isAuthenticatedUser);
    
    useEffect(() => {
        const isAuthPage = pathname?.includes("/auth/");

        if (isAuthenticatedUser && isAuthPage) {
            router.push("/");
        } else if (!isAuthenticatedUser && !isAuthPage) {
            // If user is not authenticated and trying to access protected routes
            router.push("/auth/sign-in");
        } else if (isAuthenticatedUser && !isAuthPage && pathname) {
            // Check if the user has permission to access the current route
            // if (!canAccessRoute(pathname)) {
            //     // Redirect to home if the user doesn't have permission
            //     router.push("/");
            // }
        }
    }, [pathname, router, isAuthenticatedUser]);

    return <>{children}</>;
};
