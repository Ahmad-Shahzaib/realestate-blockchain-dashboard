"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGlobe } from 'react-icons/fa';
import { ArrowRight, MapPin, Calendar, CheckCircle } from "lucide-react";
import ProjectSlider from "@/app/projects/project-detail/ProjectSlider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectService, { Project } from "@/services/project.service";
import { getUserProfile, UserProfile } from "@/services/user.services"; // Import the service

const ProjectDetailPlot = ({ params }: { params: { id: string } }) => {
    const projectId = params.id;
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [userRole, setUserRole] = useState<string | null>(null); // State for user role
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const projectData = await ProjectService.getProjectById(projectId);
                setProject(projectData);
                setLoading(false);
            } catch (err: any) {
                setError(err.message || "Failed to fetch project details.");
                setLoading(false);
            }
        };

        const fetchUserRole = async () => {
            try {
                const response = await getUserProfile();
                setUserRole(response.data.user.role || null); // Get role from user profile
            } catch (err) {
                console.error("Failed to fetch user role:", err);
                setUserRole(null); // Fallback to null if role fetch fails
            }
        };

        fetchProjectDetails();
        fetchUserRole();
    }, [projectId]);

    console.log("Projects fetched:", projects);

    const router = useRouter();
    const handleCardClick = () => {
        setIsRedirecting(true);
        router.push(`/projects/project-detail/${projectId}/project-plot-detail`);
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-8 shadow-sm">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading project details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-8 shadow-sm border border-red-200">
                    <div className="text-red-500 text-center">Error: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-6">
                {/* Project Header */}
                <div className="bg-white dark:bg-dark rounded-xl shadow-sm border border-gray-200 dark:text-white p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="text-xl lg:text-xl font-semibold text-gray-800 dark:text-white">
                                    {project?.name} | {project?.location.city}
                                </h1>
                                <span className="inline-block dark:text-white dark:bg-dark bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                    Mature
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-lg font-bold text-gray-800 dark:text-white">
                                    {project?.totalArea !== undefined
                                        ? `${Number(project.totalArea).toLocaleString()} sq ft`
                                        : ""}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-white">Total Area</div>
                            </div>
                            {userRole === "user" && (
                                <button
                                    onClick={handleCardClick}
                                    disabled={isRedirecting}
                                    className={`flex items-center justify-center gap-2 bg-[#00D2B6] text-white px-6 py-3 rounded-lg transition-colors font-medium ${isRedirecting ? "opacity-70 cursor-not-allowed" : ""}`}
                                >
                                    {isRedirecting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Redirecting...
                                        </>
                                    ) : (
                                        "Invest Now"
                                    )}
                                </button>
                            )}

                        </div>
                    </div>
                </div>
                {/* Project Slider and Table */}
                <div>
                    <ProjectSlider project={project} />
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailPlot;