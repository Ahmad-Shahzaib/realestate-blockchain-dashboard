"use client"; // Mark as client component for Next.js

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
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
  initialImageIndex?: number; // 👈 important
  projectId?: string;
  item?: Project;
};

export interface Project {
  _id: string;
  name: string;
  category: string;
  status: string;
  mainImageUrl?: string;
  galleryImages?: string[]; // Updated to match the API response
  priceRange?: { min: number; max: number };
  location?: { city: string; state: string };
  stats?: { availableUnits: number };
  featured?: boolean;
  totalArea?: number;
  roi?: any;
  totalInvestment: any;
}

// Helper function to validate URLs
const isValidUrl = (url: string): boolean => {
  try {
    // Check if it's a relative path (starts with "/")
    if (url.startsWith("/")) return true;

    // Check if it's a valid absolute URL
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Helper function to validate if a string looks like an image URL
const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;

  // Check if it's a valid URL
  if (!isValidUrl(url)) return false;

  // Check if it has image file extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const hasImageExtension = imageExtensions.some(ext =>
    url.toLowerCase().includes(ext)
  );

  // Also check if it's from a CDN that might not have extensions
  const cdnPatterns = [
    's3.amazonaws.com',
    'cloudfront.net',
    'imgix.net',
    'images.unsplash.com'
  ];

  const hasCdnPattern = cdnPatterns.some(pattern =>
    url.toLowerCase().includes(pattern)
  );

  return hasImageExtension || hasCdnPattern;
};

export function OverviewCard({
  item,
  initialImageIndex = 0,
  projectId,
}: PropsType) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);
  // Initialize projectImages to an empty array
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      // Build image array using mainImageUrl and galleryImages from the project data
      const potentialImages = [
        ...(item.mainImageUrl ? [item.mainImageUrl] : []),
        ...(item.galleryImages || []),
      ];

      // Filter out invalid image URLs
      const validImages = potentialImages.filter(url =>
        url && isValidImageUrl(url)
      );

      // Use only valid images, no fallback to static images
      setProjectImages(validImages);
      setLoading(false);
    } else {
      setError("No project data provided.");
      setProjectImages([]);
      setLoading(false);
    }
  }, [item]);

  const router = useRouter();
  const handleCardClick = () => {
    if (item && item._id) {
      router.push(`/projects/project-detail/${item._id}`);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? projectImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === projectImages.length - 1 ? 0 : prev + 1
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending_approval: {
        label: "Pending",
        color: "bg-[#F5F7FA] text-[#0277BD]",
      },
      active: { label: "Active", color: "bg-[#F5F7FA] text-[#00B894]" },
      mature: { label: "Mature", color: "bg-[#F5F7FA] text-[#003049]" },
      development: {
        label: "Development",
        color: "bg-[#F5F7FA] text-[#0277BD]",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return config;
  };

  const statusConfig = getStatusBadge(item?.status || "active");

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

  // Mock stats
  const mockAvailableUnits =
    item?.stats?.availableUnits || Math.floor(Math.random() * 50) + 10;
  const mockTotalUnits =
    mockAvailableUnits + Math.floor(Math.random() * 100) + 50;
  const occupancyRate = Math.round(
    ((mockTotalUnits - mockAvailableUnits) / mockTotalUnits) * 100
  );
  // const mockROI = (Math.random() * 10 + 2).toFixed(1);
  const mockInvestmentAmount = `PKR ${(Math.random() * 5 + 1).toFixed(1)}M`;

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white dark:bg-dark-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer max-w-sm"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {projectImages.length > 0 ? (
          <>
            <Image
              key={projectImages[currentImageIndex]}
              src={
                projectImages[currentImageIndex] &&
                  projectImages[currentImageIndex].startsWith("http")
                  ? projectImages[currentImageIndex]
                  : "https://placehold.co/400x200?text=No+Image"
              }
              alt={`${item?.name || "Property"} view ${currentImageIndex + 1}`}
              width={400}
              height={128}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              onError={(e) => {
                // If image fails to load, remove it from the array
                setProjectImages(prev => prev.filter((_, idx) => idx !== currentImageIndex));
              }}
              unoptimized={true} // Disable optimization for external URLs
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#003049]/20 via-transparent to-transparent" />

            {/* Status */}
            <div className="absolute top-2 left-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
              >
                {statusConfig.label}
              </span>
            </div>

            {/* Featured */}
            {item?.featured && (
              <div className="absolute top-2 right-2">
                <div className="bg-[#F5F7FA] dark:bg-dark-1 text-[#00B894] px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Featured
                </div>
              </div>
            )}

            {/* Navigation - Only show if there are multiple images */}
            {projectImages.length > 1 && (
              <div className="absolute bottom-9 right-3 flex gap-1">
                <button
                  onClick={handlePrevImage}
                  type="button"
                  aria-label="Previous image"
                  className="w-6 h-6 bg-white/80 dark:bg-dark-3 rounded-full flex items-center justify-center transition-all hover:bg-white dark:hover:bg-dark-2"
                >
                  <ChevronLeft className="w-3 h-3 text-gray-700 dark:text-gray-200" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  aria-label="Next image"
                  className="w-6 h-6 bg-white/80 dark:bg-dark-3 rounded-full flex items-center justify-center transition-all hover:bg-white dark:hover:bg-dark-2"
                >
                  <ChevronRight className="w-3 h-3 text-gray-700 dark:text-gray-200" />
                </button>
              </div>
            )}

            {/* Indicators - Only show if there are multiple images */}
            {projectImages.length > 1 && (
              <div className="absolute bottom-2 left-2 flex gap-1">
                {projectImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentImageIndex
                      ? "bg-[#00B894]"
                      : "bg-white/50 dark:bg-gray-500"
                      }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          // Empty state when no images are available
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="text-gray-400 dark:text-gray-500 text-sm">No image available</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 bg-[#F5F7FA] dark:bg-dark">
        <div className="mb-2">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-sm font-bold text-[#003049] dark:text-white group-hover:text-[#0277BD] transition-colors line-clamp-1">
              {item?.name || "Globe Residency Apartments"}
            </h3>
            <div className="text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-2 px-1.5 py-0.5 rounded">
              {item?.category
                ? item.category.charAt(0).toUpperCase() +
                item.category.slice(1)
                : "Commercial"}
            </div>
          </div>

          <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 text-xs mb-1.5">
            <MapPin className="w-3 h-3" />
            <span className="truncate">
              {item?.location
                ? `${item.location.city}, ${item.location.state}`
                : "Location TBD"}
            </span>
          </div>

          <div className="bg-white dark:bg-dark-2 rounded-lg p-1.5 mb-2">
            <div className="text-gray-700 dark:text-gray-300 text-xs mb-0.5">
              RETAIL PRICE RANGE
            </div>
            <div className="text-[#003049] dark:text-white font-bold text-xs">
              {item?.priceRange
                ? `${item.priceRange.min.toLocaleString()} - ${item.priceRange.max.toLocaleString()}`
                : "Price on Request"}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-1.5 mb-2">
          <div className="bg-white dark:bg-dark-2 rounded-lg p-1.5">
            <div className="text-gray-700 dark:text-gray-300 text-xs mb-0.5">
              AVAILABLE
            </div>
            <div className="text-[#003049] dark:text-white font-bold text-xs">
              {mockAvailableUnits} Units
            </div>
          </div>
          <div className="bg-white dark:bg-dark-2 rounded-lg p-1.5">
            <div className="text-gray-700 dark:text-gray-300 text-xs mb-0.5">
              TOTAL AREA
            </div>
            <div className="text-[#003049] dark:text-white font-bold text-xs">
              {item?.totalArea !== undefined
                ? `${Number(item.totalArea).toLocaleString()} sq ft`
                : "TBD"}
            </div>
          </div>
          <div className="bg-white dark:bg-dark-2 rounded-lg p-1.5">
            <div className="text-gray-700 dark:text-gray-300 text-xs mb-0.5">
              EXPECTED ROI
            </div>
            <div className="text-[#00B894] font-bold text-xs">
              {item?.roi ? `${item.roi}%` : "0"}
            </div>
          </div>
          <div className="bg-white dark:bg-dark-2 rounded-lg p-1.5">
            <div className="text-gray-700 dark:text-gray-300 text-xs mb-0.5">
              INVESTMENT
            </div>
            <div className="text-[#0277BD] font-bold text-xs">
              PKR {item?.totalInvestment ? Number(item.totalInvestment).toLocaleString() : "0"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}