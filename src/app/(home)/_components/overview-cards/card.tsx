"use client"; // Mark as client component for Next.js

import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import property1 from "../../../../../public/images/cards/images.jpg"; // Replace with actual image paths
import property2 from "../../../../../public/images/cards/cards-01.png";
import property3 from "../../../../../public/images/cards/images.jpg";
import type { JSX, SVGProps } from "react";
import Link from "next/link";

type PropsType = {
  label: string;
  data: {
    value: number | string;
    growthRate: number;
  };
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export function OverviewCard() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [property1, property2, property3];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Link href="/project/globe-residency" className="block">

      <div className="w-full bg-white rounded shadow-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer border-gray-4 border">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden p-2 ">
          <img
            src={images[currentImageIndex].src}
            alt={`Globe Residency Apartments aerial view ${currentImageIndex + 1}`}
            width={600}
            height={192}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          {/* New Listing Badge */}
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2.5 py-1 rounded-md text-xs font-medium">
            New Listing
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevImage}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-sm transition-colors"
            title="Previous image"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-sm transition-colors"
            title="Next image"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/60"
                  } transition-opacity`}
              ></div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title and Type */}
          <h2 className="text-xl font-bold text-gray-900 mb-1">Globe Residency Apartments</h2>
          <p className="text-gray-500 text-sm mb-4">Residential Apartments</p>

          {/* Price and Location */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-gray-600 text-sm">Retail Price </span>
              <span className="font-semibold text-gray-900">13,250 PKR</span>
              <span className="text-gray-500 text-sm"> / sq.ft.</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Naya Nazimabad, Karachi</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-sm text-gray-500">Apartments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">14</div>
              <div className="text-sm text-gray-500">Floors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">12,490</div>
              <div className="text-sm text-gray-500">Area</div>
            </div>
          </div>

          {/* Investment Details */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Forcasted Annual Return</span>
              <span className="font-semibold text-gray-900">20%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Forcasted Completion</span>
              <span className="font-semibold text-gray-900">March 2026</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Total Investors</span>
              <span className="font-semibold text-gray-900">24</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}