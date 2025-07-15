"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Eye } from "lucide-react";
import ProjectTable from "./ProjectTable";

export default function ProjectSlider() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    const propertyImages = [
        {
            id: 1,
            src: "/images/images1.jpg",
            alt: "Property exterior view",
            isVideo: false,
        },
        {
            id: 2,
            src: "/images/images4.jpg",
            alt: "Property front view",
            isVideo: false,
        },
        {
            id: 3,
            src: "/videos/property-video.mp4",
            alt: "Property video tour",
            isVideo: true,
        },
        {
            id: 4,
            src: "/images/images2.jpg",
            alt: "Property side view",
            isVideo: false,
        },
        {
            id: 5,
            src: "/images/images3.jpg",
            alt: "Property aerial view",
            isVideo: false,
        },
    ];

    const nextImage = () => {
        setCurrentImageIndex((prev) => {
            const next = prev === propertyImages.length - 1 ? 0 : prev + 1;
            console.log("Next index:", next, "Src:", propertyImages[next].src);
            return next;
        });
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => {
            const prevIndex = prev === 0 ? propertyImages.length - 1 : prev - 1;
            console.log("Previous index:", prevIndex, "Src:", propertyImages[prevIndex].src);
            return prevIndex;
        });
    };

    const goToImage = (index: number) => {
        console.log("Going to index:", index, "Src:", propertyImages[index].src);
        setCurrentImageIndex(index);
    };

    return (
        <>
            <div className="w-full mx-auto bg-background rounded-lg overflow-hidden p-4">

                <div className="relative bg-background rounded-lg" style={{ height: '320px' }}>
                    {propertyImages[currentImageIndex].isVideo ? (
                        <video
                            src={propertyImages[currentImageIndex].src}
                            className="object-cover w-full h-full"
                            controls
                            aria-label={propertyImages[currentImageIndex].alt}
                            onError={(e) => console.error("Video loading error:", e)}
                        />
                    ) : (
                        <Image
                            src={propertyImages[currentImageIndex].src || "/placeholder.svg"}
                            alt={propertyImages[currentImageIndex].alt}
                            fill
                            className="object-cover"
                            onError={(e) => console.error("Image loading error:", propertyImages[currentImageIndex].src)}
                        />
                    )}


                    <button
                        aria-label="Previous image"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background rounded-full w-8 h-8 border border-themebgColor flex items-center justify-center shadow"
                        onClick={prevImage}
                    >
                        <ChevronLeft className="w-4 h-4 text-black" />
                    </button>

                    <button
                        aria-label="Next image"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background rounded-full w-8 h-8 border border-themebgColor flex items-center justify-center shadow"
                        onClick={nextImage}
                    >
                        <ChevronRight className="w-4 h-4 text-black" />
                    </button>

                    <div className="absolute bottom-2 left-2 bg-background text-black px-2 py-1 rounded-full text-xs border border-themebgColor">
                        {currentImageIndex + 1}/{propertyImages.length}
                    </div>
                </div>

                <div className="pt-4 bg-background">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                            {propertyImages.map((image, index) => (
                                <button
                                    key={image.id}
                                    onClick={() => goToImage(index)}
                                    className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all text-black ${index === currentImageIndex
                                        ? "border-themebgColor ring-2 ring-themebgColor"
                                        : "border-themebgColor hover:border-themebgColor"
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
                                            onError={(e) => console.error("Thumbnail loading error:", image.src)}
                                        />
                                    )}
                                    {image.isVideo && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-background/20">
                                            <Play className="w-3 h-3 text-black" fill="currentColor" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <button className="ml-4 flex-shrink-0 inline-flex items-center px-4 py-2 border border-themebgColor rounded-md text-sm font-medium text-black bg-background">
                            <Eye className="w-4 h-4 mr-2 text-black" />
                            SEE FULL GALLERY
                        </button>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                <ProjectTable />
            </div>
        </>
    );
}