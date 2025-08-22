"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Eye, ArrowRight, Calendar, MapPin, CheckCircle } from "lucide-react";
import ProjectTable from "./ProjectTable";
import { FaFacebookF, FaGlobe, FaInstagram, FaLinkedinIn } from "react-icons/fa";

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

            <div className="w-full mx-auto bg-white rounded-lg overflow-hidden">

                <div className="relative aspect-video bg-gray-100">
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


                    <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1}/{propertyImages.length}
                    </div>
                </div>

                <div className="p-4 dark:bg-dark ">
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
                                            onError={(e) => console.error("Thumbnail loading error:", image.src)}
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
            {/* Main Content Grid */}
            <div className="flex flex-col lg:flex-row gap-6 pt-3">
                {/* Left Section - Project Details (50% width) */}
                <div className="flex-1 space-y-6">
                    {/* Contractual Occupancy */}
                    <div className="p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition 
                  bg-white dark:bg-gray-900 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle className="w-5 h-5 text-[#00B894]" />
                            <span className="text-sm font-semibold text-[#003049] uppercase tracking-wide dark:text-white">
                                Contractual Occupancy
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="w-full bg-[#F5F7FA] dark:bg-gray-700 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-[#00B894] to-[#00D2B6] h-3 rounded-full"
                                    style={{ width: "100%" }}
                                ></div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm text-gray-700 dark:text-gray-300">Progress</span>
                                <span className="text-sm font-semibold text-[#00B894]">100%</span>
                            </div>
                        </div>

                        {/* Location and Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-[#0277BD] mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">Location</p>
                                        <p className="font-medium text-[#003049] dark:text-white">
                                            Plot 59, Block A Divine Gardens, Lahore, Punjab
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 bg-[#0277BD] rounded mt-0.5"></div>
                                    <div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">Type</p>
                                        <p className="font-medium text-[#003049] dark:text-white">
                                            Corporate Office
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-[#2F3E46] mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">Operational Since</p>
                                        <p className="font-medium text-[#003049] dark:text-white">
                                            12 December, 2022
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Social:</span>
                                    <div className="flex gap-2">
                                        <a href="#" className="text-[#0277BD] hover:text-[#00B894]">
                                            <FaFacebookF size={16} />
                                        </a>
                                        <a href="#" className="text-[#0277BD] hover:text-[#00B894]">
                                            <FaInstagram size={16} />
                                        </a>
                                        <a href="#" className="text-[#0277BD] hover:text-[#00B894]">
                                            <FaLinkedinIn size={16} />
                                        </a>
                                        <a href="#" className="text-[#0277BD] hover:text-[#00B894]">
                                            <FaGlobe size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Right Section - Investment Overview (50% width) */}
                <div className="flex-1">
                    <div className="px-4 py-3 rounded-2xl shadow-md bg-white border border-gray-100 hover:shadow-xl transition dark:bg-dark dark:border-gray-700">
                        <h3 className="text-lg font-bold text-[#003049] mb-2 dark:text-white">
                            Investment Overview
                        </h3>

                        {/* 2x2 Grid for Investment Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Price per sq ft */}
                            <div className="p-3 bg-[#F5F7FA] rounded-lg dark:bg-[#334155]">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700 uppercase tracking-wide dark:text-gray-300">
                                        Price / sq. ft.
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-[#0277BD]" />
                                </div>
                                <div className="text-xl font-semibold text-[#003049] dark:text-white">28,000</div>
                                <div className="text-sm text-gray-700 dark:text-gray-400">PKR / sq. ft.</div>
                            </div>

                            {/* Rental Yield */}
                            <div className="p-3 bg-[#F5F7FA] rounded-lg dark:bg-[#334155]">
                                <div className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-2 dark:text-gray-300">
                                    Rental Yield
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-semibold text-[#003049] dark:text-white">5.1%</span>
                                    <span className="bg-[#00B894]/20 text-[#00B894] text-xs font-medium px-2 py-1 rounded">
                                        Average
                                    </span>
                                </div>
                            </div>

                            {/* Yearly Rental Returns */}
                            <div className="p-3 bg-[#F5F7FA] rounded-lg dark:bg-[#334155]">
                                <div className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-2 dark:text-gray-300">
                                    Yearly Rental Returns
                                </div>
                                <div className="text-xl font-semibold text-[#003049] dark:text-white">1,440</div>
                                <div className="text-sm text-gray-700 dark:text-gray-400">PKR / sq. ft.</div>
                            </div>

                            {/* Area Available */}
                            <div className="p-3 bg-[#F5F7FA] rounded-lg dark:bg-[#334155]">
                                <div className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-2 dark:text-gray-300">
                                    Area Available for Sale
                                </div>
                                <div className="text-xl font-semibold text-[#003049] dark:text-white">20,059</div>
                                <div className="text-sm text-gray-700 dark:text-gray-400">sq. ft.</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="pt-3">
                <ProjectTable />
            </div>
        </>
    );
}