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
                const response = await axios.get("https://proptechapi.softsuitetech.com/api/projects");
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
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                        <div className="flex items-center gap-4">
                            {/* <div className="w-12 h-18 bg-[#00D2B6] rounded-xl flex items-center justify-center">
                                <Image
                                    src={dao}
                                    alt="Qube Logo"
                                    className="h-8 w-8"
                                />
                            </div> */}
                            <div>
                                <h1 className="text-xl lg:text-xl font-semibold text-gray-800">
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
                                className="bg-[#00D2B6] text-white px-6 py-3 rounded-lg transition-colors font-medium"
                            >
                                Invest Now
                            </button>
                        </div>
                    </div>
                </div>
                {/* Project Slider and Table */}
                <div>
                    <ProjectSlider />
                </div>

                {/* Main Content Grid */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Section - Project Details (50% width) */}
                    <div className="flex-1 space-y-6">
                        {/* Contractual Occupancy */}
                        <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-100 hover:shadow-xl transition">
                            <div className="flex items-center gap-2 mb-4">
                                <CheckCircle className="w-5 h-5 text-[#00B894]" />
                                <span className="text-sm font-semibold text-[#003049] uppercase tracking-wide">
                                    Contractual Occupancy
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="w-full bg-[#F5F7FA] rounded-full h-3">
                                    <div className="bg-gradient-to-r from-[#00B894] to-[#00D2B6] h-3 rounded-full" style={{ width: "100%" }}></div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm text-gray-700">Progress</span>
                                    <span className="text-sm font-semibold text-[#00B894]">100%</span>
                                </div>
                            </div>

                            {/* Location and Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-[#0277BD] mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-700">Location</p>
                                            <p className="font-medium text-[#003049]">
                                                Plot 59, Block A Divine Gardens, Lahore, Punjab
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 bg-[#0277BD] rounded mt-0.5"></div>
                                        <div>
                                            <p className="text-sm text-gray-700">Type</p>
                                            <p className="font-medium text-[#003049]">Corporate Office</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-[#2F3E46] mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-700">Operational Since</p>
                                            <p className="font-medium text-[#003049]">12 December, 2022</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-700">Social:</span>
                                        <div className="flex gap-2">
                                            <a href="#" className="text-[#0277BD] hover:text-[#00B894]">
                                                <FaFacebookF size={16} />
                                            </a>
                                            <a href="#" className="text-[#0277BD] hover:text-[#00B894]">
                                                <FaInstagram size={16} />
                                            </a>
                                            <a href="#" className="text-[#0277BD] hover:text-[#00B894]">
                                                <FaLinkedinIn size={16} />
                                            </a>
                                            <a href="#" className="text-[#0277BD] hover:text-[#00B894]">
                                                <FaGlobe size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Investment Overview (50% width) */}
                    <div className="flex-1">
                        <div className="px-4 py-3 rounded-2xl shadow-md bg-white border border-gray-100 hover:shadow-xl transition">
                            <h3 className="text-lg font-bold text-[#003049] mb-2">Investment Overview</h3>

                            {/* 2x2 Grid for Investment Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Price per sq ft */}
                                <div className="p-3 bg-[#F5F7FA] rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                                            Price / sq. ft.
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-[#0277BD]" />
                                    </div>
                                    <div className="text-xl font-semibold text-[#003049]">28,000</div>
                                    <div className="text-sm text-gray-700">PKR / sq. ft.</div>
                                </div>

                                {/* Rental Yield */}
                                <div className="p-3 bg-[#F5F7FA] rounded-lg">
                                    <div className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-2">
                                        Rental Yield
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-semibold text-[#003049]">5.1%</span>
                                        <span className="bg-[#00B894]/20 text-[#00B894] text-xs font-medium px-2 py-1 rounded">
                                            Average
                                        </span>
                                    </div>
                                </div>

                                {/* Yearly Rental Returns */}
                                <div className="p-3 bg-[#F5F7FA] rounded-lg">
                                    <div className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-2">
                                        Yearly Rental Returns
                                    </div>
                                    <div className="text-xl font-semibold text-[#003049]">1,440</div>
                                    <div className="text-sm text-gray-700">PKR / sq. ft.</div>
                                </div>

                                {/* Area Available */}
                                <div className="p-3 bg-[#F5F7FA] rounded-lg">
                                    <div className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-2">
                                        Area Available for Sale
                                    </div>
                                    <div className="text-xl font-semibold text-[#003049]">20,059</div>
                                    <div className="text-sm text-gray-700">sq. ft.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ProjectDetailPlot