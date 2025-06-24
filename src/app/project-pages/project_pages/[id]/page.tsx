"use client";

import Image from "next/image";
import dao from "@/assets/logos/dao.svg";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGlobe } from 'react-icons/fa';
import { ArrowRight } from "lucide-react"
import ProjectSlider from "@/app/project-pages/project_pages/ProjectSlider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectService, { Project } from "@/services/project.service";
import axios from "axios";

const defaultImages: { src: string }[] = [
    { src: "/images/images1.jpg" },
    { src: "/images/images2.jpg" },
    { src: "/images/images3.jpg" }
];

const ProjectDetailPlot = ({ params }: { params: { id: string } }) => {
    const projectId = params.id;
    console.log("project Id ", projectId)
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectImages, setProjectImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                // Direct Axios GET request
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

    if (loading) {
        return <div>Loading project details...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }




    const router = useRouter();
    const handleCardClick = () => {
        router.push("/project-pages/project-plot-detail");
    };
    return (
        <div className="w-full rounded-lg p-2 shadow-sm" >
            <div className="w-full  border custom-border rounded-lg p-2 sm:p-3 shadow-sm" >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
                    <div className="flex items-center space-x-2">
                        <Image
                            src={dao}
                            alt="Qube Logo"
                            className="h-10 w-10 sm:h-15 sm:w-15"
                        />
                        <h2 className="text-xl sm:text-2xl font-bold ">{project?.name} | {project?.location.city}</h2>
                        <span className="  text-xs sm:text-sm px-2 py-1 rounded-full">Mature</span>
                    </div>
                    <div className=" font-semibold text-sm sm:text-base">
                        {project?.totalArea !== undefined
                  ? `${Number(project.totalArea).toLocaleString()} sq ft`
                  : ""}

                    </div>
                    <button onClick={handleCardClick} className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded">Invest Now</button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row  space-y-4 lg:space-y-0 lg:space-x-5 pt-3  ">
                <div className="w-full lg:w-2/3 custom-border shadow-lg rounded-lg p-3 sm:p-4">
                    {/* Contractual Occupancy Section */}
                    <div className="flex  mb-4">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                            <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold">CONTRACTUAL OCCUPANCY</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-1/4  rounded-full h-2.5 mb-4 flex items-center space-x-2">
                        <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: "100%" }}
                        ></div>
                        <div className="text-green-500 font-semibold text-sm">100%</div>
                    </div>

                    <div className="w-full max-w-4xl mx-auto custom-border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start gap-4">
                        {/* Left Section: Location and Office */}
                        <div className="flex-1 w-full sm:w-auto">
                            <div className="flex items-center mb-2">
                                <svg
                                    className="w-5 h-5 text-teal-500 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span className=" text-sm">
                                    Plot 59, Block A Divine Gardens, Lahore, Punjab
                                </span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                                <span className=" text-sm">Corporate Office</span>
                            </div>
                        </div>

                        {/* Right Section: Operational Since and Social Media Icons */}
                        <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-4">
                            {/* Operational Since */}
                            <div className="text-left sm:text-right border-l-2 pl-2 border-gray-5 border-r-2 pr-2">
                                <div className="flex items-center justify-start sm:justify-end mb-1">
                                    <svg
                                        className="w-5 h-5 text-gray-500 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2-a2 2 0 00-2-2H3a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v8m-2 0h2m0 0v2m-4-2h2"
                                        />
                                    </svg>
                                    <span className=" text-xs font-semibold uppercase">
                                        Operational Since
                                    </span>
                                </div>
                                <span className=" text-sm block sm:text-right">
                                    12 December, 2022
                                </span>
                            </div>

                            {/* Social Media Icons */}
                            <div className="flex space-x-3 ">
                                <a href="#" className="text-blue-600">
                                    <FaFacebookF size={20} />
                                </a>
                                <a href="#" className="text-pink-500">
                                    <FaInstagram size={20} />
                                </a>
                                <a href="#" className="text-blue-700">
                                    <FaLinkedinIn size={20} />
                                </a>
                                <a href="#" className="text-gray-600">
                                    <FaGlobe size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 custom-border shadow-lg rounded-lg p-3 sm:p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 rounded-lg overflow-hidden">
                        {/* Price per sq ft */}
                        <div className="p-4 sm:p-6 border-b sm:border-r border-gray-200">
                            <div className="text-xs sm:text-sm  uppercase tracking-wide mb-2">PRICE / SQ. FT.</div>
                            <div className="flex items-center gap-2">
                                <span className="text-xl sm:text-2xl font-bold ">28,000</span>
                                <span className="text-xs sm:text-sm ">PKR / sq. ft.</span>
                                <ArrowRight className="w-4 h-4 text-blue-600 ml-1" />
                            </div>
                        </div>

                        {/* Rental Yield */}
                        <div className="p-4 sm:p-6 border-b border-gray-200">
                            <div className="text-sm uppercase tracking-wide mb-2">RENTAL YIELD</div>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold ">5.1%</span>
                                <span className="px-2 py-1 bg-orange-100  text-xs font-medium rounded">Average</span>
                            </div>
                        </div>

                        {/* Yearly Rental Returns */}
                        <div className="p-4 sm:p-6 border-b sm:border-b-0 sm:border-r border-gray-200">
                            <div className="text-sm 0 uppercase tracking-wide mb-2">YEARLY RENTAL RETURNS</div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold ">1,440</span>
                                <span className="text-sm ">PKR / sq. ft.</span>
                            </div>
                        </div>

                        {/* Area Available for Sale */}
                        <div className="p-4 sm:p-6">
                            <div className="text-sm  uppercase tracking-wide mb-2">AREA AVAILABLE FOR SALE</div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold ">20,059</span>
                                <span className="text-sm ">sq. ft.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                <ProjectSlider />
            </div>
        </div>
    )
}

export default ProjectDetailPlot