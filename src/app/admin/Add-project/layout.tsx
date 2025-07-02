import type { PropsWithChildren } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add Project",
};

export default function Layout({ children }: PropsWithChildren) {
    return children;
}
