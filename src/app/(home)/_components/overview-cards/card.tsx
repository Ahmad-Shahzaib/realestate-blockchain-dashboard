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
      pending_approval: { label: "Pending Approval", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      active: { label: "Active", color: "bg-green-500/20 text-green-400 border-green-500/30" },
      mature: { label: "Mature", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      development: { label: "In Development", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return config;
  };

  const statusConfig = getStatusBadge(project?.status || "active");

  if (loading) {
    return (
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 animate-pulse">
        <div className="h-48 bg-slate-800 rounded-xl mb-4"></div>
        <div className="h-6 bg-slate-800 rounded mb-2"></div>
        <div className="h-4 bg-slate-800 rounded w-3/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900/50 backdrop-blur-xl border border-red-500/50 rounded-2xl p-6 text-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  // Calculate mock data for enhanced display
  const mockAvailableUnits = project?.stats?.availableUnits || Math.floor(Math.random() * 50) + 10;
  const mockTotalUnits = mockAvailableUnits + Math.floor(Math.random() * 100) + 50;
  const occupancyRate = Math.round(((mockTotalUnits - mockAvailableUnits) / mockTotalUnits) * 100);
  const mockROI = (Math.random() * 10 + 8).toFixed(1);
  const mockInvestmentAmount = `$${(Math.random() * 5 + 1).toFixed(1)}M`;

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          key={projectImages[currentImageIndex]}
          src={projectImages[currentImageIndex]}
          alt={`${project?.name || "Property"} aerial view ${currentImageIndex + 1}`}
          width={600}
          height={192}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>

        {/* Featured Badge */}
        {project?.featured && (
          <div className="absolute top-3 right-3">
            <div className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Star className="w-3 h-3" />
              Featured
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
          {projectImages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Quick Action Button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all">
          <button className="bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400 p-2 rounded-lg hover:bg-blue-500/30 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
              {project?.name || "Globe Residency Apartments"}
            </h3>
            <div className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-md">
              {project?.category ? project.category.charAt(0).toUpperCase() + project.category.slice(1) : "Commercial"}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>{project?.location ? `${project.location.city}, ${project.location.state}` : "Location TBD"}</span>
          </div>

          {/* Price Range */}
          <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
            <div className="text-slate-400 text-xs uppercase tracking-wide mb-1">Retail Price Range</div>
            <div className="text-white font-bold text-lg">
              {project?.priceRange ? `$${project.priceRange.min.toLocaleString()} - $${project.priceRange.max.toLocaleString()}` : "Price on Request"}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-slate-400 text-xs uppercase tracking-wide mb-1">Available</div>
            <div className="text-white font-semibold">{mockAvailableUnits} Units</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-slate-400 text-xs uppercase tracking-wide mb-1">Total Area</div>
            <div className="text-white font-semibold">
              {project?.totalArea !== undefined
                ? `${Number(project.totalArea).toLocaleString()} sq ft`
                : "TBD"}
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-slate-400 text-xs uppercase tracking-wide mb-1">Expected ROI</div>
            <div className="text-green-400 font-semibold">{mockROI}%</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-slate-400 text-xs uppercase tracking-wide mb-1">Investment</div>
            <div className="text-blue-400 font-semibold">{mockInvestmentAmount}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Occupancy Rate</span>
            <span className="text-white font-medium">{occupancyRate}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">
              {mockTotalUnits - mockAvailableUnits} Investors
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium">
              +{(Math.random() * 5 + 2).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group">
            <Building2 className="w-4 h-4" />
            View Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}