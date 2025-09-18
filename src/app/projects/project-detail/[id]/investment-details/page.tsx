"use client";

import { useEffect, useState } from "react";
import ProjectService, { Project } from "@/services/project.service";
import InvestmentInterface from "@/app/projects/investment-details/TransactionPage";
import TransactionPage from "@/app/projects/investment-details/InvestmentInterface";

const Page = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await ProjectService.getProjectById(id);
                setProject(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch project details.");
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    if (loading) return <p className="p-6">Loading...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="space-y-3">
            {/* Pass project to your components if they need it */}
            <InvestmentInterface project={project} />
            <TransactionPage project={project} />
        </div>
    );
};

export default Page;
