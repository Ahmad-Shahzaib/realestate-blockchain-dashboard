"use client";
// import { compactFormat } from "@/lib/format-number";
import { OverviewCard } from "../home2/_components/overview-cards/card";
import { useState, useEffect, useCallback } from "react";
import { IoHome } from "react-icons/io5";
import { FaConnectdevelop } from "react-icons/fa";
import { MdOutlineSignalCellularAlt2Bar } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import ProjectService, { Project } from "@/services/project.service";

const tabs = [
    {
        id: "all", label: "Home", icon: IoHome
    },
    {
        id: "residential", label: "Development", icon: FaConnectdevelop
    },
    {
        id: "commercial", label: "Mature", icon: MdOutlineSignalCellularAlt2Bar
    },
    {
        id: "plots", label: "Up Coming", icon: FaCalendarAlt
    },
];

const PROJECTS_PER_PAGE = 6; // 2 rows x 3 columns

export function OverviewCards() {
    const [activeTab, setActiveTab] = useState("all");
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // Track total pages
    const [loadingMore, setLoadingMore] = useState(false); // Track loading state for pagination
    const [hasMore, setHasMore] = useState(true);

    // Fetch projects for a given page
    const fetchProjects = async (pageMUX = 1, reset = false) => {
        try {
            if (pageMUX === 1) setLoading(true);
            else setLoadingMore(true);

            // Update API to support pagination with limit: /projects?page=pageNum&limit=6
            const response = await ProjectService.getAllProjects(pageMUX, PROJECTS_PER_PAGE);

            if (response && response.data && response.data.length > 0) {
                setProjects(prev => reset ? response.data : [...prev, ...response.data]);
                setTotalPages(response.pagination.pages || 1);
                setHasMore(pageMUX < (response.pagination.pages || 1));
                setError(null);
            } else if (pageMUX === 1) {
                setProjects([]);
                setHasMore(false);
                setError("No projects available. Please check back later.");
            } else {
                setHasMore(false);
            }
        } catch (err: any) {
            setError(err.message || "Failed to load projects. Please try again later.");
            setHasMore(false);
        } finally {
            if (pageMUX === 1) setLoading(false);
            else setLoadingMore(false);
        }
    };

    // Scroll handler for lazy loading
    const handleScroll = useCallback(() => {
        if (loadingMore || !hasMore) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        // Load more when user is 200px from bottom
        if (scrollTop + clientHeight >= scrollHeight - 200) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchProjects(nextPage);
        }
    }, [page, loadingMore, hasMore]);

    // Add scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        setPage(1);
        setHasMore(true);
        fetchProjects(1, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const renderCards = () => {
        let filteredProjects = projects;
        if (activeTab === "residential") {
            filteredProjects = projects.filter(p => p.category === "residential");
        } else if (activeTab === "commercial") {
            filteredProjects = projects.filter(p => p.category === "commercial");
        } else if (activeTab === "plots") {
            filteredProjects = projects.filter(p => p.category === "plots");
        }
        return filteredProjects.map((project, index) => (
            <OverviewCard key={project._id || index} initialImageIndex={index} item={project} />
        ));
    };

    // Determine filtered projects count for display
    let filteredProjects = projects;
    if (activeTab === "residential") {
        filteredProjects = projects.filter(p => p.category === "residential");
    } else if (activeTab === "commercial") {
        filteredProjects = projects.filter(p => p.category === "commercial");
    } else if (activeTab === "plots") {
        filteredProjects = projects.filter(p => p.category === "plots");
    }

    return (
        <>
            <div className="w-full px-10 mb-6 mt-3 border-b pb-2 ">
                <h1 className="text-2xl font-bold text-[#003049] dark:text-gray-2">
                    All Projects
                </h1>
            </div>

            <div className="w-full px-10 ">
                {/* Tabs */}
                <div className="flex space-x-4 mb-6 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setPage(1);
                                setProjects([]); // Clear projects when switching tabs
                            }}
                            className={`flex items-center px-4 py-2 text-lg font-medium rounded-lg whitespace-nowrap ${activeTab === tab.id
                                ? " bg-[#00D2B6] dark:bg-[#0971a8] text-white"
                                : "bg-white text-[#003049] dark:text-white dark:bg-[#003049]   hover:bg-gray-100 dark:bg-dark-1  dark:hover:bg-dark-3"
                                }`}
                        >
                            <tab.icon className="w-6 h-6 mr-2" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Cards Grid - Fixed 3 columns layout */}
                <div className="grid gap-2 sm:gap-6 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        // Show 6 loading placeholders
                        Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="bg-gray-200 dark:bg-dark-2 animate-pulse rounded-lg h-64">
                                <div className="p-4">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))
                    ) : error ? (
                        <div className="col-span-full text-center text-gray-700 dark:text-red-400 py-8">
                            {error}
                        </div>
                    ) : (
                        renderCards()
                    )}
                </div>

                {/* Loading indicator for lazy loading */}
                {loadingMore && (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00D2B6]"></div>
                        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading more projects...</span>
                    </div>
                )}

                {/* End of results indicator */}
                {!loading && !loadingMore && !hasMore && filteredProjects.length > 0 && (
                    <div className="flex justify-center py-8">
                        <div className="text-gray-500 dark:text-gray-400 text-center">
                            <div className="h-px bg-gray-300 dark:bg-gray-600 w-24 mx-auto mb-4"></div>
                            <p>You've reached the end of the projects</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default function ProjectPage() {
    return <OverviewCards />;
}