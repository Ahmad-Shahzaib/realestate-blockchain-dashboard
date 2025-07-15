"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import type { JSX, SVGProps } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type PropsType = {
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

export function OverviewCard({ item }: PropsType) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/images/cards/image1.jpg",
    "/images/cards/image2.jpg",
    "/images/cards/image3.jpg",
  ];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending_approval: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
      active: { label: "Active", color: "bg-green-100 text-green-800" },
      mature: { label: "Mature", color: "bg-blue-100 text-blue-800" },
      development: { label: "Development", color: "bg-purple-100 text-purple-800" },
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  };

  const statusConfig = getStatusBadge(item?.status || "active");
  const project = item || {
    _id: "1",
    name: "Hadassah Boyle",
    category: "Commercial",
    status: "active",
    featured: true,
    priceRange: { min: 0, max: 0 },
    location: { city: "Inventore voluptatem", state: "Assumenda fugiat si" },
    stats: { availableUnits: 32 },
    totalArea: 40
  };

  return (
    <div className="w-[352px] h-[371px] flex flex-col overflow-hidden rounded-xl shadow-md border border-gray-200 bg-white" 
    onClick={()=>{
      router.push(`/project-pages/project_pages/${project._id}`);
    }}
    >
      {/* Image Section */}
      <div className="relative h-[140px]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
        <Image
          src={images[currentImageIndex]}
          alt={`${project.name} view`}
          fill
          className="object-cover"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-20 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3" />
            Featured
          </div>
        )}

        {/* Navigation Controls */}
        <div className="absolute bottom-3 right-3 z-20 flex gap-1">
          <button
            onClick={handlePrevImage}
            className="w-6 h-6 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
          >
            <ChevronLeft className="w-3 h-3 text-white" />
          </button>
          <button
            onClick={handleNextImage}
            className="w-6 h-6 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
          >
            <ChevronRight className="w-3 h-3 text-white" />
          </button>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-3 left-3 z-20 flex gap-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === currentImageIndex 
                  ? "bg-white" 
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {project.name}
          </h3>
          <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {project.category}
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span className="truncate">
            {project.location?.city}, {project.location?.state}
          </span>
        </div>

        <div className="mb-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            Retail Price Range
          </div>
          <div className="text-gray-900 font-medium">
            {project.priceRange?.min 
              ? `$${project.priceRange.min.toLocaleString()} - $${project.priceRange.max.toLocaleString()}`
              : "Price on Request"}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Available</div>
            <div className="text-gray-900 font-semibold">{project.stats?.availableUnits || 32} Units</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Total Area</div>
            <div className="text-gray-900 font-semibold">{project.totalArea || 40} sq ft</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Investment</div>
            <div className="text-gray-900 font-semibold">$2.8M</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Occupancy</div>
            <div className="text-gray-900 font-semibold">97%</div>
          </div>
        </div>
      </div>
    </div>
  );
}