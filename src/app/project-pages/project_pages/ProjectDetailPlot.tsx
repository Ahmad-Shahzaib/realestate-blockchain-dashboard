"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGlobe } from 'react-icons/fa';
import { ArrowRight } from "lucide-react"
import ProjectSlider from "@/app/project-pages/project_pages/ProjectSlider";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProjectService, { Project } from "@/services/project.service";
import { JSX, SVGProps, useEffect, useState } from "react";

type PropsType = {
    label?: string;
    data?: {
        value: number | string;
        growthRate: number;
    };
    Icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    initialImageIndex?: number;
    projectId?: string;
    item?: Project;
};

// Placeholder default images (replace with your actual images)
const defaultImages: { src: string }[] = [
    { src: "/images/images1.jpg" },
    { src: "/images/images2.jpg" },
    { src: "/images/images3.jpg" }
];

const ProjectDetailPlot = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
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
                    const project = response.data.data;
                    const defaultImageUrls = defaultImages.map(img => img.src);
                    if (project.mainImageUrl) {
                        const imageArray = [
                            project.mainImageUrl,
                            defaultImageUrls[0],
                            defaultImageUrls[1]
                        ];
                        setProjectImages(imageArray);
                    } else {
                        setProjectImages(defaultImageUrls);
                    }
                    setError(null);
                } else {
                    setError("No projects available. Please check back later.");
                    setProjectImages(defaultImages.map(img => img.src));
                }
            } catch (err: any) {
                setError(err.message || "Failed to load projects. Please try again later.");
                setProjectImages(defaultImages.map(img => img.src));
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const project = projects.length > 0 ? projects[0] : null;
    console.log("Projects fetched:", project);

    const handlePrevImage = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent Link navigation
        e.stopPropagation(); // Prevent triggering card click
        setCurrentImageIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1));
    };

    const handleNextImage = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent Link navigation
        e.stopPropagation(); // Prevent triggering card click
        setCurrentImageIndex((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1));
    };

    if (loading) {
        return <div className="w-full rounded-2xl shadow-lg p-6 text-center">Loading project data...</div>;
    }

    if (error) {
        return <div className="w-full rounded-2xl shadow-lg p-6 text-center text-red-500">{error}</div>;
    }
    const router = useRouter();
    const handleCardClick = () => {
        router.push("/project-pages/project-plot-detail");
    };
    return (
        <div className="w-full rounded-lg p-2 shadow-sm dark:bg-dark">
            <div className="w-full  border custom-border rounded-lg p-2 sm:p-3 shadow-sm">
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
                    <div className=" font-semibold text-sm sm:text-base">{project?.totalArea ? `${project.totalArea.toLocaleString()} sq. ft.` : ""}</div>
                    <button onClick={handleCardClick} className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded">Invest Now</button>
                </div>
            </div>


            <div className="pt-4">
                <ProjectSlider project={project} />
            </div>
        </div>
    )
}

export default ProjectDetailPlot