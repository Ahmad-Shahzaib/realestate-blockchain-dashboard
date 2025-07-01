import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Customers List",
};
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-4">
            customer
        </div>
    );
}