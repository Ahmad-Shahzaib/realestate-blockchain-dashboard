import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Manage Projects",
};

export default function Layout({ children }: PropsWithChildren) {
    return <>{children}</>;
}
