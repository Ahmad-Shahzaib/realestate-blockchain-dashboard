"use client"

import Image from "next/image"
import { Play, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function PropTechMasterClass() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const videos = [
        {
            id: 1,
            title: "Are You Prepared for the Oncoming Econom...",
            subtitle: "JULY 2022 EDITION",
            thumbnail: "/placeholder.svg?height=200&width=350",
            part: null,
            featured: true,
        },
        {
            id: 2,
            title: "Outlook on Future Prices with Respect to...",
            subtitle: "OUTLOOK ON FUTURE PRICES WITH RESPECT TO CONSTRUCTION",
            speaker: "Ghaus Gadri",
            role: "Private Equity & Investment Adviser",
            part: "PART 10",
            thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
            id: 3,
            title: "Tax on Rental Income x Federal Budget 20...",
            subtitle: "TAX ON RENTAL INCOME X FEDERAL BUDGET 2022",
            speaker: "Ghaus Gadri",
            role: "Private Equity & Investment Adviser",
            part: "PART 9",
            thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
            id: 4,
            title: "Capital Gains Tax Budget...",
            subtitle: "CAPITAL GAINS TAX SLABS X FEDERAL BUDGET",
            speaker: "Ghaus Gadri",
            role: "Private Equity & Investment Adviser",
            part: "PART 8",
            thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
            id: 5,
            title: "Real Estate Investment Strategies...",
            subtitle: "INVESTMENT STRATEGIES FOR 2024",
            speaker: "Ghaus Gadri",
            role: "Private Equity & Investment Adviser",
            part: "PART 7",
            thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
            id: 6,
            title: "Property Market Analysis...",
            subtitle: "COMPREHENSIVE MARKET ANALYSIS",
            speaker: "Ghaus Gadri",
            role: "Private Equity & Investment Adviser",
            part: "PART 6",
            thumbnail: "/placeholder.svg?height=200&width=350",
        },
    ]

    const cardsPerView = 3
    const maxSlide = Math.max(0, videos.length - cardsPerView)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1))
    }

    return (
        <div className="h-screen p-6 md:p-8 lg:p-12 dark:bg-dark">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 md:mb-12">
                    <h1 className="text-3xl text-black  dark:text-white md:text-4xl lg:text-5xl font-bold mb-2">
                        FractPropTech MasterClass
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
                        catch real estate industry experts in conversation
                    </p>
                </div>

                {/* Slider Container */}
                <div className="relative">
                    {/* Left Arrow */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white dark:bg-dark rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentSlide === 0}
                        aria-label="Previous Slide"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white dark:bg-[#1E1E1E] rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentSlide === maxSlide}
                        aria-label="Next Slide"
                        title="Next Slide"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>

                    {/* Slider Content */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)`,
                            }}
                        >
                            {videos.map((video) => (
                                <div key={video.id} className="w-1/3 flex-shrink-0 px-3">
                                    <div className="group cursor-pointer">
                                        {/* Video Thumbnail */}
                                        <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-gray-900">
                                            <Image
                                                src={video.thumbnail || "/placeholder.svg"}
                                                alt={video.title}
                                                fill
                                                className="object-cover"
                                            />

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200" />

                                            {/* Play Button */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 bg-white dark:bg-gray-200 bg-opacity-90 rounded-full flex items-center justify-center group-hover:bg-opacity-100 transition-all duration-200">
                                                    <Play className="w-5 h-5 text-gray-900 dark:text-gray-800 ml-0.5" fill="currentColor" />
                                                </div>
                                            </div>

                                            {/* Top Left Branding */}
                                            {!video.featured && (
                                                <div className="absolute top-3 left-3">
                                                    <div className="bg-blue-600 bg-opacity-80 px-2 py-1 rounded text-xs text-white font-medium">
                                                        PROPTECH MASTERCLASS
                                                    </div>
                                                </div>
                                            )}

                                            {/* Top Right Part Number */}
                                            {video.part && (
                                                <div className="absolute top-3 right-3">
                                                    <div className="bg-black bg-opacity-60 px-2 py-1 rounded text-xs text-white font-medium">
                                                        {video.part}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Bottom Left DAO PROPTECH */}
                                            {!video.featured && (
                                                <div className="absolute bottom-3 left-3">
                                                    <div className="flex items-center space-x-1 text-white text-xs">
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        <span className="font-medium">Fract PROPTECH</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Featured Video Text Overlay */}
                                            {video.featured && (
                                                <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-white">
                                                    <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
                                                        ARE YOU
                                                        <br />
                                                        PREPARED
                                                        <br />
                                                        FOR THE{" "}
                                                        <span className="text-yellow-400">
                                                            ECONOMIC
                                                            <br />
                                                            DOWNTURN?
                                                        </span>
                                                    </h3>
                                                    <p className="text-xs opacity-90 mt-2">{video.subtitle}</p>
                                                </div>
                                            )}

                                            {/* Speaker Info for non-featured videos */}
                                            {!video.featured && video.speaker && (
                                                <div className="absolute bottom-12 left-3 text-white text-xs">
                                                    <div className="font-medium">{video.speaker}</div>
                                                    <div className="opacity-80">{video.role}</div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Video Info */}
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                                {video.title}
                                            </h3>

                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                <span>2 years ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Slide Indicators */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-colors duration-200 ${currentSlide === index
                                    ? "bg-blue-600"
                                    : "bg-gray-300 dark:bg-gray-600"
                                    }`}
                                title={`Go to slide ${index + 1}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}
