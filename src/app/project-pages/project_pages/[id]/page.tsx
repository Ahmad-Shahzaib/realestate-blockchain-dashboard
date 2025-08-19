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
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="bg-background rounded-lg p-8 shadow-sm border border-themebgColor">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-themebgColor mx-auto"></div>
                    <p className="text-black mt-4">Loading project details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="bg-background rounded-lg p-8 shadow-sm border border-themebgColor">
                    <div className="text-black text-center">Error: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-6">
                {/* Project Header */}
                <div className="bg-background rounded-xl shadow-sm border border-themebgColor p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center border border-themebgColor">
                                <Image
                                    src={dao}
                                    alt="Qube Logo"
                                    className="h-8 w-8"
                                />
                            </div>
                            <div>
                                <h1 className="text-xl lg:text-2xl font-bold text-black">
                                    {project?.name} | {project?.location.city}
                                </h1>
                                <span className="inline-block bg-background text-black text-xs px-2 py-1 rounded-full font-medium border border-themebgColor">
                                    Mature
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-lg font-bold text-black">
                                    {project?.totalArea !== undefined
                                        ? `${Number(project.totalArea).toLocaleString()} sq ft`
                                        : ""}
                                </div>
                                <div className="text-sm text-black">Total Area</div>
                            </div>
                            <button 
                                onClick={handleCardClick} 
                                className="bg-background text-black px-6 py-3 rounded-lg border border-themebgColor hover:bg-background transition-colors font-medium"
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
                        <div className="bg-background rounded-xl shadow-sm border border-themebgColor p-4 lg:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <CheckCircle className="w-5 h-5 text-black" />
                                <span className="text-sm font-semibold text-black uppercase tracking-wide">
                                    Contractual Occupancy
                                </span>
                            </div>

                            {/* Progress Bar */}
                            {/* <div className="mb-6">
                                <div className="w-full bg-background rounded-full h-3 border border-themebgColor">
                                    <div className="bg-background h-3 rounded-full border border-themebgColor" style={{ width: "100%" }}></div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm text-black">Progress</span>
                                    <span className="text-sm font-semibold text-black">100%</span>
                                </div>
                            </div> */}

                            {/* Location and Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-black mt-0.5" />
                                        <div>
                                            <p className="text-sm text-black">Location</p>
                                            <p className="font-medium text-black">
                                                Plot 59, Block A Divine Gardens, Lahore, Punjab
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 bg-background rounded mt-0.5 border border-themebgColor"></div>
                                        <div>
                                            <p className="text-sm text-black">Type</p>
                                            <p className="font-medium text-black">Corporate Office</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-black mt-0.5" />
                                        <div>
                                            <p className="text-sm text-black">Operational Since</p>
                                            <p className="font-medium text-black">12 December, 2022</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-black">Social:</span>
                                        <div className="flex gap-2">
                                            <a href="#" className="text-black hover:text-black">
                                                <FaFacebookF size={16} />
                                            </a>
                                            <a href="#" className="text-black hover:text-black">
                                                <FaInstagram size={16} />
                                            </a>
                                            <a href="#" className="text-black hover:text-black">
                                                <FaLinkedinIn size={16} />
                                            </a>
                                            <a href="#" className="text-black hover:text-black">
                                                <FaGlobe size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Stats */}
                    <div className="bg-background rounded-xl shadow-sm  p-4 lg:p-6">
                        <h3 className="text-lg font-bold text-black mb-6">Investment Overview</h3>
                        
                        <div className="space-y-6">
                            {/* Price per sq ft */}
                            <div className="p-4 bg-background rounded-lg border border-themebgColor">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-black uppercase tracking-wide">
                                        Price / sq. ft.
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-black" />
                                </div>
                                <div className="text-2xl font-bold text-black">28,000</div>
                                <div className="text-sm text-black">PKR / sq. ft.</div>
                            </div>

                            {/* Rental Yield */}
                            <div className="p-4 bg-background rounded-lg border border-themebgColor">
                                <div className="text-sm font-medium text-black uppercase tracking-wide mb-2">
                                    Rental Yield
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-black">5.1%</span>
                                    <span className="bg-background text-black text-xs font-medium px-2 py-1 rounded border border-themebgColor">
                                        Average
                                    </span>
                                </div>
                            </div>

                            {/* Yearly Rental Returns */}
                            <div className="p-4 bg-background rounded-lg border border-themebgColor">
                                <div className="text-sm font-medium text-black uppercase tracking-wide mb-2">
                                    Yearly Rental Returns
                                </div>
                                <div className="text-2xl font-bold text-black">1,440</div>
                                <div className="text-sm text-black">PKR / sq. ft.</div>
                            </div>

                            {/* Area Available */}
                            <div className="p-4 bg-background rounded-lg border border-themebgColor">
                                <div className="text-sm font-medium text-black uppercase tracking-wide mb-2">
                                    Area Available for Sale
                                </div>
                                <div className="text-2xl font-bold text-black">20,059</div>
                                <div className="text-sm text-black">sq. ft.</div>
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