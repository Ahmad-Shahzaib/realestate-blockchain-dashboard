"use client";

import { OverviewCard } from "../home2/_components/overview-cards/card";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { IoHome } from "react-icons/io5";
import { FaConnectdevelop } from "react-icons/fa";
import { MdOutlineSignalCellularAlt2Bar } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import ProjectService, { Project } from "@/services/project.service";

// Constants moved outside component to prevent recreation
const TABS = [
    { id: "all" as const, label: "Home", icon: IoHome },
    { id: "residential" as const, label: "Development", icon: FaConnectdevelop },
    { id: "commercial" as const, label: "Mature", icon: MdOutlineSignalCellularAlt2Bar },
    { id: "plots" as const, label: "Up Coming", icon: FaCalendarAlt },
] as const;

const PROJECTS_PER_PAGE = 6;
const SCROLL_THRESHOLD = 200;

type TabId = typeof TABS[number]['id'];

interface ProjectsState {
    data: Project[];
    loading: boolean;
    loadingMore: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
    totalPages: number;
}

// Custom hook for projects data management
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
        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        try {
            setState(prev => ({
                ...prev,
                loading: pageNum === 1,
                loadingMore: pageNum > 1,
                error: null,
            }));

            const response = await ProjectService.getAllProjects(pageNum);

            if (abortController.signal.aborted) return;

            if (response?.data?.length > 0) {
                setState(prev => ({
                    ...prev,
                    data: reset ? response.data : [...prev.data, ...response.data],
                    totalPages: response.pagination?.pages || 1,
                    hasMore: pageNum < (response.pagination?.pages || 1),
                    page: pageNum,
                    loading: false,
                    loadingMore: false,
                }));
            } else if (pageNum === 1) {
                setState(prev => ({
                    ...prev,
                    data: [],
                    hasMore: false,
                    loading: false,
                    loadingMore: false,
                    error: "No projects available. Please check back later.",
                }));
            } else {
                setState(prev => ({
                    ...prev,
                    hasMore: false,
                    loadingMore: false,
                }));
            }
        } catch (error: any) {
            if (error.name === 'AbortError') return;
            
            setState(prev => ({
                ...prev,
                error: error.message || "Failed to load projects. Please try again later.",
                hasMore: false,
                loading: false,
                loadingMore: false,
            }));
        }
    }, []);

    const resetAndFetch = useCallback(() => {
        setState(prev => ({
            ...prev,
            data: [],
            page: 1,
            hasMore: true,
            error: null,
        }));
        fetchProjects(1, true);
    }, [fetchProjects]);

    const loadMore = useCallback(() => {
        if (!state.loadingMore && state.hasMore) {
            fetchProjects(state.page + 1);
        }
    }, [fetchProjects, state.loadingMore, state.hasMore, state.page]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return {
        ...state,
        fetchProjects,
        resetAndFetch,
        loadMore,
    };
}

// Custom hook for infinite scroll
function useInfiniteScroll(loadMore: () => void, canLoadMore: boolean) {
    const handleScroll = useCallback(() => {
        if (!canLoadMore) return;

        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        
        if (scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD) {
            loadMore();
        }
    }, [loadMore, canLoadMore]);

    useEffect(() => {
        const throttledHandler = throttle(handleScroll, 100);
        window.addEventListener('scroll', throttledHandler, { passive: true });
        return () => window.removeEventListener('scroll', throttledHandler);
    }, [handleScroll]);
}

// Utility function for throttling
function throttle<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;
    
    return ((...args: Parameters<T>) => {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func(...args);
            lastExecTime = currentTime;
        } else {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    }) as T;
}

// Memoized loading skeleton component
const LoadingSkeleton = ({ count = 6 }: { count?: number }) => (
    <>
        {Array.from({ length: count }, (_, index) => (
            <div key={index} className="bg-gray-200 dark:bg-dark-2 animate-pulse rounded-lg h-64">
                <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
                </div>
            </div>
        ))}
    </>
);

export function OverviewCards() {
    const [activeTab, setActiveTab] = useState<TabId>("all");
    const projectsData = useProjectsData();

    // Filter projects based on active tab
    const filteredProjects = useMemo(() => {
        if (activeTab === "all") return projectsData.data;
        return projectsData.data.filter(project => project.category === activeTab);
    }, [projectsData.data, activeTab]);

    // Setup infinite scroll
    useInfiniteScroll(
        projectsData.loadMore,
        !projectsData.loadingMore && projectsData.hasMore
    );

    // Handle tab change
    const handleTabChange = useCallback((tabId: TabId) => {
        setActiveTab(tabId);
        projectsData.resetAndFetch();
    }, [projectsData]);

    // Initial data fetch
    useEffect(() => {
        projectsData.resetAndFetch();
    }, []); // Empty dependency array is intentional

    // Memoized tab buttons
    const tabButtons = useMemo(() => 
        TABS.map((tab) => (
            <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center px-4 py-2 text-lg font-medium rounded-lg whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                        ? "bg-[#00D2B6] dark:bg-[#0971a8] text-white"
                        : "bg-white text-[#003049] dark:text-white dark:bg-[#003049] hover:bg-gray-100 dark:hover:bg-dark-3"
                }`}
                aria-pressed={activeTab === tab.id}
            >
                <tab.icon className="w-6 h-6 mr-2" aria-hidden="true" />
                {tab.label}
            </button>
        )),
    [activeTab, handleTabChange]);

    // Memoized project cards
    const projectCards = useMemo(() => 
        filteredProjects.map((project, index) => (
            <OverviewCard
                key={project._id || `project-${index}`}
                initialImageIndex={index}
                item={project}
            />
        )),
    [filteredProjects]);

    return (
        <>
            {/* Header */}
            <header className="w-full px-10 mb-6 mt-3 border-b pb-2">
                <h1 className="text-2xl font-bold text-[#003049] dark:text-gray-2">
                    All Projects
                </h1>
            </header>

            <div className="w-full px-10">
                {/* Navigation Tabs */}
                <nav className="flex space-x-4 mb-6 overflow-x-auto" role="tablist">
                    {tabButtons}
                </nav>

                {/* Project Grid */}
                <div className="grid gap-2 sm:gap-6 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {projectsData.loading ? (
                        <LoadingSkeleton />
                    ) : projectsData.error ? (
                        <div className="col-span-full text-center text-red-600 dark:text-red-400 py-8">
                            <p>{projectsData.error}</p>
                            <button
                                onClick={projectsData.resetAndFetch}
                                className="mt-4 px-4 py-2 bg-[#00D2B6] text-white rounded-lg hover:bg-[#00B5A0] transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        projectCards
                    )}
                </div>

                {/* Loading More Indicator */}
                {projectsData.loadingMore && (
                    <div className="flex justify-center items-center py-8" role="status" aria-live="polite">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00D2B6]" aria-hidden="true" />
                        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading more projects...</span>
                    </div>
                )}

                {/* End of Results Indicator */}
                {!projectsData.loading && !projectsData.loadingMore && !projectsData.hasMore && filteredProjects.length > 0 && (
                    <div className="flex justify-center py-8">
                        <div className="text-gray-500 dark:text-gray-400 text-center">
                            <div className="h-px bg-gray-300 dark:bg-gray-600 w-24 mx-auto mb-4" />
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