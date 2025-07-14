"use client";
// import { compactFormat } from "@/lib/format-number";
import { OverviewCard } from "../home2/_components/overview-cards/card";
import { useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { FaConnectdevelop } from "react-icons/fa";
import { MdOutlineSignalCellularAlt2Bar } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import Tabs, { TabItem } from "@/components/ui/Tabs";
import ProjectService, { Project } from "@/services/project.service";

const tabs: TabItem[] = [
    { id: "all", label: "Home", icon: IoHome },
    { id: "residential", label: "Development", icon: FaConnectdevelop },
    { id: "commercial", label: "Mature", icon: MdOutlineSignalCellularAlt2Bar },
    { id: "plots", label: "Up Comming", icon: FaCalendarAlt },
];

export function OverviewCards() {
    const [activeTab, setActiveTab] = useState("all");
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // Track total pages
    const [loadingMore, setLoadingMore] = useState(false); // Track loading state for pagination

    // Fetch projects for a given page
    const fetchProjects = async (pageNum = 1, reset = false) => {
        try {
            if (pageNum === 1) setLoading(true);
            else setLoadingMore(true);
            // Update API to support pagination: /projects?page=pageNum
            const response = await ProjectService.getAllProjects(pageNum);
            if (response && response.data && response.data.length > 0) {
                setProjects(prev => reset ? response.data : [...prev, ...response.data]);
                setTotalPages(response.pagination.pages || 1);
                setError(null);
            } else if (pageNum === 1) {
                setProjects([]);
                setError("No projects available. Please check back later.");
            }
        } catch (err: any) {
            setError(err.message || "Failed to load projects. Please try again later.");
        } finally {
            if (pageNum === 1) setLoading(false);
            else setLoadingMore(false);
        }
    };

    useEffect(() => {
        setPage(1);
        fetchProjects(1, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const handleTabChange = (id: string) => {
        setActiveTab(id);
        setPage(1);
    };

    const handleLoadMore = () => {
        if (page < totalPages && !loadingMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchProjects(nextPage);
        }
    };

    // Filter projects by active tab
    let filteredProjects = projects;
    if (activeTab === "residential") {
        filteredProjects = projects.filter(p => p.category === "residential");
    } else if (activeTab === "commercial") {
        filteredProjects = projects.filter(p => p.category === "commercial");
    } else if (activeTab === "plots") {
        filteredProjects = projects.filter(p => p.category === "plots");
    }
    const hasMore = page < totalPages;

    return (
        <>
            <div className="w-full p-6">
                {/* Generic Tabs */}
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

                {/* Cards Grid */}
                <div className="grid gap-12" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))' }}>
                    {loading ? <div>Loading...</div> : error ? <div>{error}</div> : filteredProjects.map((project, index) => (
                        <OverviewCard key={project._id || index} item={project} />
                    ))}
                </div>
                <div className="w-full flex justify-end mt-10">
                    <button
                        className={`bg-accent text-accent-foreground py-3 px-6 rounded-lg text-lg font-medium shadow transition-colors ${!hasMore ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent-hover'}`}
                        onClick={handleLoadMore}
                        disabled={!hasMore || loadingMore}
                    >
                        {loadingMore ? 'Loading...' : hasMore ? 'Load More Projects' : 'No More Projects'}
                    </button>
                </div>
            </div>
        </>
    );
}

export default function ProjectPage() {
    return <OverviewCards />;
}


