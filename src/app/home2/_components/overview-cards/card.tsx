"use client"; // Mark as client component for Next.js

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Star, Eye, ArrowRight, TrendingUp, Users, Building2 } from "lucide-react";
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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending_approval: { label: "Pending", color: "bg-[#F5F7FA] text-[#0277BD]" },
      active: { label: "Active", color: "bg-[#F5F7FA] text-[#00B894]" },
      mature: { label: "Mature", color: "bg-[#F5F7FA] text-[#003049]" },
      development: { label: "Development", color: "bg-[#F5F7FA] text-[#0277BD]" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return config;
  };

  const statusConfig = getStatusBadge(project?.status || "active");

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
        <div className="h-32 bg-[#F5F7FA]"></div>
        <div className="p-4">
          <div className="h-4 bg-[#F5F7FA] rounded mb-2"></div>
          <div className="h-3 bg-[#F5F7FA] rounded w-3/4 mb-3"></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-12 bg-[#F5F7FA] rounded"></div>
            <div className="h-12 bg-[#F5F7FA] rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
        <div className="text-gray-700 text-sm">{error}</div>
      </div>
    );
  }

  // Calculate mock data for enhanced display
  const mockAvailableUnits = project?.stats?.availableUnits || Math.floor(Math.random() * 50) + 10;
  const mockTotalUnits = mockAvailableUnits + Math.floor(Math.random() * 100) + 50;
  const occupancyRate = Math.round(((mockTotalUnits - mockAvailableUnits) / mockTotalUnits) * 100);
  const mockROI = (Math.random() * 10 + 8).toFixed(1);
  const mockInvestmentAmount = `$${(Math.random() * 5 + 1).toFixed(1)}M`;
  const mockInvestors = mockTotalUnits - mockAvailableUnits;
  const mockGrowth = `+${(Math.random() * 5 + 2).toFixed(1)}%`;

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white dark:bg-dark-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer max-w-sm"
    >
      {/* Compact Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          key={projectImages[currentImageIndex]}
          src={projectImages[currentImageIndex]}
          alt={`${project?.name || "Property"} view ${currentImageIndex + 1}`}
          width={400}
          height={128}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          onError={(e) => {
            if (e.currentTarget.src !== defaultImages[0]) {
              e.currentTarget.src = defaultImages[0];
            }
          }}
          unoptimized={projectImages[currentImageIndex].startsWith('http')}
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#003049]/20 via-transparent to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>

        {/* Featured Badge */}
        {project?.featured && (
          <div className="absolute top-2 right-2">
            <div className="bg-[#F5F7FA] dark:bg-dark-1 text-[#00B894] px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Star className="w-3 h-3" />
              Featured
            </div>
          </div>
        )}

        {/* Compact Navigation */}
        <div className="absolute bottom-9 right-3 flex gap-1">
          <button
            onClick={handlePrevImage}
            className="w-6 h-6 bg-white/80 dark:bg-dark-3 rounded-full flex items-center justify-center transition-all hover:bg-white dark:hover:bg-dark-2"
          >
            <ChevronLeft className="w-3 h-3 text-gray-700 dark:text-gray-200" />
          </button>
          <button
            onClick={handleNextImage}
            className="w-6 h-6 bg-white/80 dark:bg-dark-3 rounded-full flex items-center justify-center transition-all hover:bg-white dark:hover:bg-dark-2"
          >
            <ChevronRight className="w-3 h-3 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        {/* Mini Indicators */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {projectImages.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentImageIndex ? 'bg-[#00B894]' : 'bg-white/50 dark:bg-gray-500'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Compact Content Section */}
      <div className="p-3 bg-[#F5F7FA] dark:bg-dark">
        {/* Header */}
        <div className="mb-2">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-sm font-bold text-[#003049] dark:text-white group-hover:text-[#0277BD] transition-colors line-clamp-1">
              {project?.name || "Globe Residency Apartments"}
            </h3>
            <div className="text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-2 px-1.5 py-0.5 rounded">
              {project?.category ? project.category.charAt(0).toUpperCase() + project.category.slice(1) : "Commercial"}
            </div>
          </div>

          <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 text-xs mb-1.5">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{project?.location ? `${project.location.city}, ${project.location.state}` : "Location TBD"}</span>
          </div>

          {/* Compact Price */}
          <div className="bg-white dark:bg-dark-2 rounded-lg p-1.5 mb-2">
            <div className="text-gray-700 dark:text-gray-300 text-xs mb-0.5">RETAIL PRICE RANGE</div>
            <div className="text-[#003049] dark:text-white font-bold text-xs">
              {project?.priceRange ? `${project.priceRange.min.toLocaleString()} - ${project.priceRange.max.toLocaleString()}` : "Price on Request"}
            </div>
          </div>
        </div>

        {/* Compact Stats Grid */}
        <div className="grid grid-cols-2 gap-1.5 mb-2">
          <div className="bg-white dark:bg-dark-2 rounded-lg p-1.5">
            <div className="text-gray-700 dark:text-gray-300 text-xs mb-0.5">AVAILABLE</div>
            <div className="text-[#003049] dark:text-white font-bold text-xs">{mockAvailableUnits} Units</div>
          </div>
          <div className="bg-white dark:bg-dark-2 rounded-lg p-1.5">
            <div className="text-gray-700 dark:text-gray-300 text-xs mb-0.5">TOTAL AREA</div>
            <div className="text-[#003049] dark:text-white font-bold text-xs">
              {project?.totalArea !== undefined
                ? `${Number(project.totalArea).toLocaleString()} sq ft`
                : "TBD"}
            </div>
          </div>
          <div className="bg-white dark:bg-dark-2 rounded-lg p-1.5">
            <div className="text-gray-700 dark:text-gray-300 text-xs mb-0.5">EXPECTED ROI</div>
            <div className="text-[#00B894] font-bold text-xs">{mockROI}%</div>
          </div>
          <div className="bg-white dark:bg-dark-2 rounded-lg p-1.5">
            <div className="text-gray-700 dark:text-gray-300 text-xs mb-0.5">INVESTMENT</div>
            <div className="text-[#0277BD] font-bold text-xs">{mockInvestmentAmount}</div>
          </div>
        </div>
      </div>
    </div>

  );
}