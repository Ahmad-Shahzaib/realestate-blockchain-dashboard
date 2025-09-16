import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Investment Detail",
};

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
