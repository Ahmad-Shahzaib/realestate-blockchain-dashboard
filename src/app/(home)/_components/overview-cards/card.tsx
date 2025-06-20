"use client"; // Mark as client component for Next.js

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import property1 from "../../../../../public/images/cards/image1.jpg";
import property2 from "../../../../../public/images/cards/image2.jpg";
import property3 from "../../../../../public/images/cards/image3.jpg";
import type { JSX, SVGProps } from "react";
import { useRouter } from "next/navigation";
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
  item?: Project;
};

export interface Project {
  _id: string;
  name: string;
  category: string;
  status: string;
  mainImageUrl?: string;
  priceRange?: { min: number; max: number };
  location?: { city: string; state: string };
  stats?: { availableUnits: number };
  featured?: boolean;
  totalArea?: number;
}

export function OverviewCard({ item, initialImageIndex = 0, projectId }: PropsType) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex % 3);
  const defaultImages = [property1.src, property2.src, property3.src];
  const [projectImages, setProjectImages] = useState<string[]>(defaultImages);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      if (item.mainImageUrl) {
        const imageArray = [
          item.mainImageUrl,
          defaultImages[0],
          defaultImages[1]
        ];
        setProjectImages(imageArray);
      } else {
        setProjectImages(defaultImages);
      }
      setLoading(false);
    } else {
      setError("No project data provided.");
      setProjectImages(defaultImages);
      setLoading(false);
    }
  }, [item]);

  const project = item;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1));
  };

  const router = useRouter();
  const handleCardClick = () => {
    if (project && project._id) {
      router.push(`/project-pages/project_pages/${project._id}`);
    }
  }

  if (loading) {
    return <div className="w-full rounded-2xl shadow-lg p-6 text-center">Loading project data...</div>;
  }

  if (error) {
    return <div className="w-full rounded-2xl shadow-lg p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <button className="w-full" onClick={handleCardClick}>
      <div className="w-full rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer custom-border">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden p-2">
          <Image
            key={projectImages[currentImageIndex]}
            src={projectImages[currentImageIndex]}
            alt={`${project?.name || "Property"} aerial view ${currentImageIndex + 1}`}
            width={600}
            height={192}
            className="w-full h-full object-cover rounded-2xl transition-opacity duration-500"
            onError={(e) => {
              if (e.currentTarget.src !== defaultImages[0]) {
                e.currentTarget.src = defaultImages[0];
              }
            }}
            unoptimized={projectImages[currentImageIndex].startsWith('http')}
            priority
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
                className={`w-1.5 h-1.5 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/60"} transition-opacity`}
              ></div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 py-3">
          {/* Title and Type */}
          <div className="flex justify-between">
            <h2 className="text-md font-medium mb-1 text-left">{project?.name || "Globe Residency Apartments"}</h2>
            <p className="text-gray-500 text-sm mb-2">{project?.category ? project.category.charAt(0).toUpperCase() + project.category.slice(1) : "Residential"} Apartments</p>
          </div>

          {/* Price and Location */}
          <div className="text-left mb-4 mt-2">
            <div>
              <span className="text-sm">Retail Price </span>
              <span className="font-medium">{project?.priceRange ? `$${project.priceRange.min.toLocaleString()} - $${project.priceRange.max.toLocaleString()}` : "13,250"}</span>
            </div>
            <div className="flex items-center text-sm mt-2">
              <MapPin className="w-6 h-6 mr-1" />
              <span>{project?.location ? `${project.location.city}, ${project.location.state}` : "Naya Nazimabad, Karachi"}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-3">
            <div className="text-center">
              <div className="text-md font-bold">{project?.stats?.availableUnits || 156}</div>
              <div className="text-sm">Available Units</div>
            </div>
            <div className="text-center">
              <div className="text-md font-bold">{project?.featured ? "Featured" : "14"}</div>
              <div className="text-sm text-gray-500">{project?.featured ? "Status" : "Floors"}</div>
            </div>
            <div className="text-center">
              <div className="text-md font-bold">{project?.totalArea ? `${project.totalArea.toLocaleString()} sq ft` : ""}</div>
              <div className="text-sm text-gray-500">Area</div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}