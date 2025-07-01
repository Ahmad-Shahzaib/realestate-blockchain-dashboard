"use client";

import Image from "next/image";
import dao from "@/assets/logos/dao.svg";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGlobe } from 'react-icons/fa';
import { ArrowRight, MapPin, Calendar, CheckCircle } from "lucide-react"
import ProjectSlider from "@/app/project-pages/project_pages/ProjectSlider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectService, { Project } from "@/services/project.service";
import axios from "axios";

const ProjectDetailPlot = ({ params }: { params: { id: string } }) => {
    const projectId = params.id;
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:5000/api/projects");
                if (response.data && response.data.data && response.data.data.length > 0) {
                    setProjects(response.data.data);
                }
            } catch (err: any) {
                setError(err.message || "Failed to fetch projects.");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

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

        fetchProjectDetails();
    }, [projectId]);

    const router = useRouter();
    const handleCardClick = () => {
        router.push("/project-pages/project-plot-detail");
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
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-6">
                {/* Project Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                <Image
                                    src={dao}
                                    alt="Qube Logo"
                                    className="h-8 w-8"
                                />
                            </div>
                            <div>
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
                                    {project?.name} | {project?.location.city}
                                </h1>
                                <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                    Mature
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-lg font-bold text-gray-800">
                                    {project?.totalArea !== undefined
                                        ? `${Number(project.totalArea).toLocaleString()} sq ft`
                                        : ""}
                                </div>
                                <div className="text-sm text-gray-500">Total Area</div>
                            </div>
                            <button 
                                onClick={handleCardClick} 
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Invest Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Left Section - Project Details */}
                    <div className="xl:col-span-2 space-y-6">
                        {/* Contractual Occupancy */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                    Contractual Occupancy
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div className="bg-green-500 h-3 rounded-full" style={{ width: "100%" }}></div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm text-gray-500">Progress</span>
                                    <span className="text-sm font-semibold text-green-600">100%</span>
                                </div>
                            </div>

                            {/* Location and Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-600">Location</p>
                                            <p className="font-medium text-gray-800">
                                                Plot 59, Block A Divine Gardens, Lahore, Punjab
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 bg-blue-500 rounded mt-0.5"></div>
                                        <div>
                                            <p className="text-sm text-gray-600">Type</p>
                                            <p className="font-medium text-gray-800">Corporate Office</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-600">Operational Since</p>
                                            <p className="font-medium text-gray-800">12 December, 2022</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-600">Social:</span>
                                        <div className="flex gap-2">
                                            <a href="#" className="text-blue-600 hover:text-blue-700">
                                                <FaFacebookF size={16} />
                                            </a>
                                            <a href="#" className="text-pink-500 hover:text-pink-600">
                                                <FaInstagram size={16} />
                                            </a>
                                            <a href="#" className="text-blue-700 hover:text-blue-800">
                                                <FaLinkedinIn size={16} />
                                            </a>
                                            <a href="#" className="text-gray-600 hover:text-gray-700">
                                                <FaGlobe size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Stats */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Investment Overview</h3>
                        
                        <div className="space-y-6">
                            {/* Price per sq ft */}
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                                        Price / sq. ft.
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="text-2xl font-bold text-gray-800">28,000</div>
                                <div className="text-sm text-gray-500">PKR / sq. ft.</div>
                            </div>

                            {/* Rental Yield */}
                            <div className="p-4 bg-green-50 rounded-lg">
                                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
                                    Rental Yield
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-gray-800">5.1%</span>
                                    <span className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded">
                                        Average
                                    </span>
                                </div>
                            </div>

                            {/* Yearly Rental Returns */}
                            <div className="p-4 bg-purple-50 rounded-lg">
                                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
                                    Yearly Rental Returns
                                </div>
                                <div className="text-2xl font-bold text-gray-800">1,440</div>
                                <div className="text-sm text-gray-500">PKR / sq. ft.</div>
                            </div>

                            {/* Area Available */}
                            <div className="p-4 bg-amber-50 rounded-lg">
                                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
                                    Area Available for Sale
                                </div>
                                <div className="text-2xl font-bold text-gray-800">20,059</div>
                                <div className="text-sm text-gray-500">sq. ft.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Slider and Table */}
                <div>
                    <ProjectSlider />
                </div>
            </div>
        </div>
    )
}

export default ProjectDetailPlot