"use client"; // Mark as client component for Next.js

import { useEffect, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import property1 from "../../../../../public/images/cards/image1.jpg";
import property2 from "../../../../../public/images/cards/image2.jpg";
import property3 from "../../../../../public/images/cards/image3.jpg";
import type { JSX, SVGProps } from "react";
import { useRouter } from "next/navigation";
import { button } from "@material-tailwind/react";
import ProjectService, { Project } from "@/services/project.service";
import Image from "next/image";

type PropsType = {
  label?: string;
  data?: {
    value: number | string;
    growthRate: number;
  };
  Icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  initialImageIndex?: number;
  projectId?: string;
};

export function OverviewCard({ initialImageIndex = 0, projectId }: PropsType) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex % 3);
  const defaultImages = [property1, property2, property3];
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create project images array for carousel
  const [projectImages, setProjectImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await ProjectService.getAllProjects();

        if (response && response.data && response.data.length > 0) {
          setProjects(response.data);

          // Create an array of images for the carousel
          const project = response.data[0];
          
          // Create default array from local images
          const defaultImageUrls = defaultImages.map(img => img.src);
          
          if (project.mainImageUrl) {
            console.log("API image URL:", project.mainImageUrl);
            
            // Create an array with the API image and fallback images
            const imageArray = [
              project.mainImageUrl,
              defaultImageUrls[0],
              defaultImageUrls[1]
            ];
            
            console.log("Project images array:", imageArray);
            setProjectImages(imageArray);
          } else {
            console.warn("No mainImageUrl found in project data");
            setProjectImages(defaultImageUrls);
          }

          setError(null);
        } else {
          console.warn("No projects found in the API response");
          setError("No projects available. Please check back later.");
          setProjectImages(defaultImages.map(img => img.src));
        }
      } catch (err: any) {
        console.error("Failed to fetch projects:", err);
        setError(err.message || "Failed to load projects. Please try again later.");
        setProjectImages(defaultImages.map(img => img.src));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Use the first project from the API if available, otherwise show placeholder data
  const project = projects.length > 0 ? projects[0] : null;

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

  const router = useRouter();
  const handleCardClick = () => {
    // If we have a project, navigate to its specific page
    if (project) {
      router.push(`/project-pages/project_pages?id=${project._id}`);
    } else {
      router.push("/project-pages/project_pages");
    }
  };

  if (loading) {
    return <div className="w-full rounded-2xl shadow-lg p-6 text-center">Loading project data...</div>;
  }

  if (error) {
    return <div className="w-full rounded-2xl shadow-lg p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <button className="w-full" onClick={handleCardClick}>
      <div className="w-full rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer custom-border">        {/* Image Section */}
        <div className="relative h-48 overflow-hidden p-2 ">
          {/* Using key to force re-render when image source changes */}
          <img
            key={projectImages[currentImageIndex]}
            src={projectImages[currentImageIndex]}
            alt={`${project?.name || "Property"} aerial view ${currentImageIndex + 1}`}
            width={600}
            height={192}
            className="w-full h-full object-cover rounded-2xl transition-opacity duration-500"
            onError={(e) => {
              console.error("Image failed to load:", e);
              // Fallback to default image on error
              e.currentTarget.src = defaultImages[0].src;
            }}
          />

          {/* New Listing Badge */}
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2.5 py-1 rounded-md text-xs font-medium">
            {project?.status === "pending_approval" ? "Pending Approval" : "New Listing"}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevImage}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-sm transition-colors z-10"
            title="Previous image"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-sm transition-colors z-10"
            title="Next image"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
            {projectImages.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/60"
                  } transition-opacity`}
              ></div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 py-3">
          {/* Title and Type */}
          <h2 className="text-xl font-medium mb-1 text-left">{project?.name || "Globe Residency Apartments"}</h2>
          <p className="text-gray-500 text-sm mb-4">{project?.category ? project.category.charAt(0).toUpperCase() + project.category.slice(1) : "Residential"} Apartments</p>

          {/* Price and Location */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-sm">Retail Price </span>
              <span className="font-semibold ">{project?.priceRange ? `$${project.priceRange.min.toLocaleString()} - $${project.priceRange.max.toLocaleString()}` : "13,250"}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="w-6 h-6 mr-1" />
              <span>{project?.location ? `${project.location.city}, ${project.location.state}` : "Naya Nazimabad, Karachi"}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-xl font-bold ">{project?.stats?.availableUnits || 156}</div>
              <div className="text-sm ">Available Units</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{project?.featured ? "Featured" : "14"}</div>
              <div className="text-sm text-gray-500">{project?.featured ? "Status" : "Floors"}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">12,490</div>
              <div className="text-sm text-gray-500">Area</div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}