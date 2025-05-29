"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Eye } from "lucide-react";
import ProjectTable from "./ProjectTable";

export default function ProjectSlider() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Sample property images and videos
    const propertyImages = [
        {
            id: 1,
            src: "/images/images1.jpg", // Ensure this file exists in public/images/
            alt: "Property exterior view",
            isVideo: false,
        },
        {
            id: 2,
            src: "/images/images4.jpg", // Ensure this file exists in public/images/
            alt: "Property front view",
            isVideo: false,
        },
        {
            id: 3,
            src: "/videos/property-video.mp4", // Ensure this file exists in public/videos/
            alt: "Property video tour",
            isVideo: true,
        },
        {
            id: 4,
            src: "/images/images2.jpg", // Ensure this file exists in public/images/
            alt: "Property side view",
            isVideo: false,
        },
        {
            id: 5,
            src: "/images/images3.jpg", // Ensure this file exists in public/images/
            alt: "Property aerial view",
            isVideo: false,
        },
    ];

    const nextImage = () => {
        setCurrentImageIndex((prev) => {
            const next = prev === propertyImages.length - 1 ? 0 : prev + 1;
            console.log("Next index:", next, "Src:", propertyImages[next].src); // Debugging
            return next;
        });
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => {
            const prevIndex = prev === 0 ? propertyImages.length - 1 : prev - 1;
            console.log("Previous index:", prevIndex, "Src:", propertyImages[prevIndex].src); // Debugging
            return prevIndex;
        });
    };

    const goToImage = (index: number) => {
        console.log("Going to index:", index, "Src:", propertyImages[index].src); // Debugging
        setCurrentImageIndex(index);
    };

    return (
        <>

            <div className="w-full mx-auto bg-white rounded-lg overflow-hidden">
                {/* Main Image/Video Display */}
                <div className="relative aspect-video bg-gray-100">
                    {propertyImages[currentImageIndex].isVideo ? (
                        <video
                            src={propertyImages[currentImageIndex].src}
                            className="object-cover w-full h-full"
                            controls
                            aria-label={propertyImages[currentImageIndex].alt}
                            onError={(e) => console.error("Video loading error:", e)} // Debugging
                        />
                    ) : (
                        <Image
                            src={propertyImages[currentImageIndex].src || "/placeholder.svg"}
                            alt={propertyImages[currentImageIndex].alt}
                            fill
                            className="object-cover"
                            onError={(e) => console.error("Image loading error:", propertyImages[currentImageIndex].src)} // Debugging
                        />
                    )}

                    {/* Navigation Arrows */}
                    <button
                        aria-label="Previous image"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full w-10 h-10"
                        onClick={prevImage}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                        aria-label="Next image"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full w-10 h-10"
                        onClick={nextImage}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Image/Video Counter */}
                    <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1}/{propertyImages.length}
                    </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                            {propertyImages.map((image, index) => (
                                <button
                                    key={image.id}
                                    onClick={() => goToImage(index)}
                                    className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex
                                        ? "border-blue-500 ring-2 ring-blue-200"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    {image.isVideo ? (
                                        <video
                                            src={image.src}
                                            className="object-cover w-full h-full"
                                            muted
                                            aria-label={image.alt}
                                        />
                                    ) : (
                                        <Image
                                            src={image.src || "/placeholder.svg"}
                                            alt={image.alt}
                                            fill
                                            className="object-cover"
                                            onError={(e) => console.error("Thumbnail loading error:", image.src)} // Debugging
                                        />
                                    )}
                                    {image.isVideo && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <Play className="w-3 h-3 text-white" fill="currentColor" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <button className="ml-4 flex-shrink-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <Eye className="w-4 h-4 mr-2" />
                            SEE FULL GALLERY
                        </button>
                    </div>
                </div>
            </div>
            <div className="pt-3">
                <ProjectTable />
            </div>
        </>
    );
}