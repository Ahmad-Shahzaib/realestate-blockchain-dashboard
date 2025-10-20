"use client";

import { OverviewCard } from "../home2/_components/overview-cards/card";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { IoHome } from "react-icons/io5";
import { FaConnectdevelop } from "react-icons/fa";
import { MdOutlineSignalCellularAlt2Bar } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import ProjectService, { Project } from "@/services/project.service";

const TABS = [
    { id: "all" as const, label: "All", icon: IoHome },
    { id: "residential" as const, label: "Residential", icon: FaConnectdevelop },
    { id: "commercial" as const, label: "Commercial", icon: MdOutlineSignalCellularAlt2Bar },
    { id: "plots" as const, label: "Up Coming", icon: FaCalendarAlt },
] as const;

const SCROLL_THRESHOLD = 12;

type TabId = typeof TABS[number]["id"];

interface ProjectsState {
    data: Project[];
    loading: boolean;
    loadingMore: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
    totalPages: number;
}

// Custom hook for fetching projects
function useProjectsData() {
    const [state, setState] = useState<ProjectsState>({
        data: [],
        loading: true,
        loadingMore: false,
        error: null,
        page: 1,
        hasMore: true,
        totalPages: 1,
    });

    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchProjects = useCallback(async (pageNum = 1, reset = false) => {
        if (abortControllerRef.current) abortControllerRef.current.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            setState((prev) => ({
                ...prev,
                loading: pageNum === 1,
                loadingMore: pageNum > 1,
                error: null,
            }));

            const response = await ProjectService.getAllProjects(pageNum);

            if (controller.signal.aborted) return;

            if (response?.data?.length > 0) {
                setState((prev) => ({
                    ...prev,
                    data: reset ? response.data : [...prev.data, ...response.data],
                    totalPages: response.pagination?.pages || 1,
                    hasMore: pageNum < (response.pagination?.pages || 1),
                    page: pageNum,
                    loading: false,
                    loadingMore: false,
                }));
            } else {
                setState((prev) => ({
                    ...prev,
                    data: [],
                    hasMore: false,
                    loading: false,
                    loadingMore: false,
                    error: "No projects available.",
                }));
            }
        } catch (error: any) {
            if (error.name === "AbortError") return;
            setState((prev) => ({
                ...prev,
                error: error.message || "Failed to load projects.",
                hasMore: false,
                loading: false,
                loadingMore: false,
            }));
        }
    }, []);

    const resetAndFetch = useCallback(() => {
        setState((prev) => ({ ...prev, data: [], page: 1, hasMore: true, error: null }));
        fetchProjects(1, true);
    }, [fetchProjects]);

    const loadMore = useCallback(() => {
        if (!state.loadingMore && state.hasMore) fetchProjects(state.page + 1);
    }, [fetchProjects, state.loadingMore, state.hasMore, state.page]);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    }, []);

    return { ...state, fetchProjects, resetAndFetch, loadMore };
}

// Throttle helper
function throttle<T extends (...args: any[]) => void>(fn: T, delay: number): T {
    let lastExec = 0;
    let timeout: NodeJS.Timeout | null = null;
    return ((...args: Parameters<T>) => {
        const now = Date.now();
        if (now - lastExec >= delay) {
            fn(...args);
            lastExec = now;
        } else {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                fn(...args);
                lastExec = Date.now();
            }, delay - (now - lastExec));
        }
    }) as T;
}

function useInfiniteScroll(loadMore: () => void, canLoadMore: boolean) {
    const handleScroll = useCallback(() => {
        if (!canLoadMore) return;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD) loadMore();
    }, [loadMore, canLoadMore]);

    useEffect(() => {
        const throttled = throttle(handleScroll, 200);
        window.addEventListener("scroll", throttled, { passive: true });
        return () => window.removeEventListener("scroll", throttled);
    }, [handleScroll]);
}

export function OverviewCards() {
    const [activeTab, setActiveTab] = useState<TabId>("all");
    const [searchTerm, setSearchTerm] = useState("");
    const projectsData = useProjectsData();

    // Filter logic for search + category
    const filteredProjects = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();

        return projectsData.data.filter((project) => {
            const matchesTab = activeTab === "all" || project.category === activeTab;
            const matchesSearch =
                !term ||
                project.name?.toLowerCase().includes(term) ||
                project.category?.toLowerCase().includes(term) ||
                project.location?.city?.toLowerCase().includes(term) ||
                project.location?.state?.toLowerCase().includes(term);

            return matchesTab && matchesSearch;
        });
    }, [projectsData.data, activeTab, searchTerm]);

    useInfiniteScroll(projectsData.loadMore, !projectsData.loadingMore && projectsData.hasMore);

    useEffect(() => {
        projectsData.resetAndFetch();
    }, []);

    return (
        <>
            <header className="w-full px-10 mb-6 mt-3 border-b pb-2">
                <h1 className="text-2xl font-bold text-[#003049] dark:text-gray-2">All Projects</h1>
            </header>

            <div className="w-full px-10">
                <nav className="flex items-center justify-between mb-6 flex-wrap gap-3">
                    {/* Tabs */}
                    <div className="flex space-x-4 overflow-x-auto">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${activeTab === tab.id
                                    ? "bg-[#00D2B6] dark:bg-[#0971a8] text-white"
                                    : "bg-white text-[#003049] dark:text-white dark:bg-[#003049] hover:bg-gray-100 dark:hover:bg-dark-3"
                                    }`}
                            >
                                <tab.icon className="w-5 h-5 mr-2" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <input
                        type="search"
                        placeholder="Search projects..."
                        className="w-64 md:w-80 px-3 py-2 border border-gray-300 rounded-md dark:bg-dark-2 dark:text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </nav>

                {/* Project Cards Grid */}
                <div className="grid gap-4 sm:gap-6 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {projectsData.loading ? (
                        <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
                            Loading projects...
                        </p>
                    ) : filteredProjects.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
                            No matching projects found.
                        </p>
                    ) : (
                        filteredProjects.map((project, index) => (
                            <OverviewCard key={project._id || index} item={project} />
                        ))
                    )}
                </div>

                {projectsData.loadingMore && (
                    <div className="flex justify-center py-8 text-gray-600 dark:text-gray-400">
                        Loading more projects...
                    </div>
                )}
            </div>
        </>
    );
}

export default function ProjectPage() {
    return <OverviewCards />;
}
