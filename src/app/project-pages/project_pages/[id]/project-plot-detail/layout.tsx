import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Project Plot Details",
};

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
