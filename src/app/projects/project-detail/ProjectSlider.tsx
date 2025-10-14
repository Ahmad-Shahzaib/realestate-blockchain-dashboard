"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Eye, ArrowRight, Calendar, MapPin, CheckCircle, X } from "lucide-react";
import ProjectTable from "./ProjectTable";
import { FaFacebookF, FaGlobe, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Project } from "@/services/project.service";

type ProjectSliderProps = {
    project?: Project | null;
};

export default function ProjectSlider({ project }: ProjectSliderProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
    const [fullScreenImageIndex, setFullScreenImageIndex] = useState(0);

    const galleryImages = project?.galleryImages || ["/placeholder.svg"];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    };

    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    // Full screen gallery functions
    const openFullScreen = () => {
        setFullScreenImageIndex(currentImageIndex);
        setIsFullScreenOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeFullScreen = () => {
        setIsFullScreenOpen(false);
        document.body.style.overflow = "unset";
    };

    const nextFullScreenImage = () => {
        setFullScreenImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    };

    const prevFullScreenImage = () => {
        setFullScreenImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    };

    const goToFullScreenImage = (index: number) => {
        setFullScreenImageIndex(index);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowRight") nextFullScreenImage();
        if (e.key === "ArrowLeft") prevFullScreenImage();
        if (e.key === "Escape") closeFullScreen();
    };

    return (
        <>
            {/* Main Slider */}
            <div className="w-full mx-auto bg-white rounded-lg overflow-hidden">
                <div className="relative aspect-video bg-gray-100">
                    <Image
                        src={galleryImages[currentImageIndex]}
                        alt="Property Image"
                        fill
                        className="object-cover"
                    />

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
                        {currentImageIndex + 1}/{galleryImages.length}
                    </div>
                </div>

                <div className="p-4 dark:bg-dark ">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                            {galleryImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToImage(index)}
                                    className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex
                                        ? "border-blue-500 ring-2 ring-blue-200"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    {image.includes(".mp4") || image.includes(".webm") ? (
                                        <video src={image} className="object-cover w-full h-full" muted />
                                    ) : (
                                        <Image src={image} alt={`Gallery image ${index + 1}`} fill className="object-cover" />
                                    )}
                                    {(image.includes(".mp4") || image.includes(".webm")) && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <Play className="w-3 h-3 text-white" fill="currentColor" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={openFullScreen}
                            className="ml-4 flex-shrink-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            SEE FULL GALLERY
                        </button>
                    </div>
                </div>
            </div>

            {/* Half-Screen Gallery Modal */}
            {isFullScreenOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-0 flex items-center justify-center"
                    onClick={closeFullScreen}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    {/* Modal Box (half screen) */}
                    <div
                        className="relative w-full max-w-5xl h-1/2 bg-black rounded-xl overflow-hidden flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeFullScreen}
                            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute top-4 left-4 z-10 bg-black/60 text-white px-4 py-1 rounded-full text-sm">
                            {fullScreenImageIndex + 1} / {galleryImages.length}
                        </div>

                        {/* Image/Video */}
                        <Image
                            src={galleryImages[fullScreenImageIndex]}
                            alt={`Gallery image ${fullScreenImageIndex + 1}`}
                            width={1280}
                            height={720}
                            className="max-w-full max-h-full object-contain"
                        />

                        {/* Navigation */}
                        <button
                            onClick={prevFullScreenImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 text-white"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextFullScreenImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 text-white"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content Grid */}
            <div className="flex flex-col lg:flex-row gap-6 pt-3">
                {/* Left Section */}
                <div className="flex-1 space-y-6">
                    <div className="p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition bg-white dark:bg-gray-900 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle className="w-5 h-5 text-[#00B894]" />
                            <span className="text-sm font-semibold text-[#003049] uppercase tracking-wide dark:text-white">
                                Contractual Occupancy
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="w-full bg-[#F5F7FA] dark:bg-gray-700 rounded-full h-3">
                                <div className="bg-gradient-to-r from-[#00B894] to-[#00D2B6] h-3 rounded-full" style={{ width: "100%" }}></div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm text-gray-700 dark:text-gray-300">Progress</span>
                                <span className="text-sm font-semibold text-[#00B894]">100%</span>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-[#0277BD] mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">Location</p>
                                        <p className="font-medium text-[#003049] dark:text-white">
                                            {project?.location?.city || "No location available"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 bg-[#0277BD] rounded mt-0.5"></div>
                                    <div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">Type</p>
                                        <p className="font-medium text-[#003049] dark:text-white">Corporate Office</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-[#2F3E46] mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">Operational Since</p>
                                        <p className="font-medium text-[#003049] dark:text-white">
                                            {project?.startDate ? new Date(project.startDate).toLocaleDateString() : "N/A"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Social:</span>
                                    <div className="flex gap-2">
                                        <a href="#" className="text-[#0277BD] hover:text-[#00B894]"><FaFacebookF size={16} /></a>
                                        <a href="#" className="text-[#0277BD] hover:text-[#00B894]"><FaInstagram size={16} /></a>
                                        <a href="#" className="text-[#0277BD] hover:text-[#00B894]"><FaLinkedinIn size={16} /></a>
                                        <a href="#" className="text-[#0277BD] hover:text-[#00B894]"><FaGlobe size={16} /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-1">
                    <div className="px-4 py-3 rounded-2xl shadow-md bg-white border border-gray-100 hover:shadow-xl transition dark:bg-dark dark:border-gray-700">
                        <h3 className="text-lg font-bold text-[#003049] mb-2 dark:text-white">Investment Overview</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-3 bg-[#F5F7FA] rounded-lg dark:bg-[#334155]">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700 uppercase tracking-wide dark:text-gray-300">Price / sq. ft.</span>
                                    <ArrowRight className="w-4 h-4 text-[#0277BD]" />
                                </div>
                                <div className="text-xl font-semibold text-[#003049] dark:text-white">
                                    {project?.floors?.[0]?.pricePerSqFt || "N/A"}
                                </div>
                                <div className="text-sm text-gray-700 dark:text-gray-400">PKR / sq. ft.</div>
                            </div>

                            <div className="p-3 bg-[#F5F7FA] rounded-lg dark:bg-[#334155]">
                                <div className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-2 dark:text-gray-300">Rental Yield</div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-semibold text-[#003049] dark:text-white">5.1%</span>
                                    <span className="bg-[#00B894]/20 text-[#00B894] text-xs font-medium px-2 py-1 rounded">Average</span>
                                </div>
                            </div>

                            <div className="p-3 bg-[#F5F7FA] rounded-lg dark:bg-[#334155]">
                                <div className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-2 dark:text-gray-300">Yearly Rental Returns</div>
                                <div className="text-xl font-semibold text-[#003049] dark:text-white">1,440</div>
                                <div className="text-sm text-gray-700 dark:text-gray-400">PKR / sq. ft.</div>
                            </div>

                            <div className="p-3 bg-[#F5F7FA] rounded-lg dark:bg-[#334155]">
                                <div className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-2 dark:text-gray-300">Area Available for Sale</div>
                                <div className="text-xl font-semibold text-[#003049] dark:text-white">
                                    {project?.totalArea ? project.totalArea.toLocaleString() : "N/A"}
                                </div>
                                <div className="text-sm text-gray-700 dark:text-gray-400">sq. ft.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-3">
                <ProjectTable key={project?._id} project={project} />
            </div>
        </>
    );
}