"use client"

import Image from "next/image"
import { Play, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function PropTechMasterClass() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const videos = [
        {
            id: 1,
            title: "Are You Prepared for the Oncoming Economic Downturn?",
            subtitle: "JULY 2022 EDITION",
            thumbnail: "/placeholder.svg?height=300&width=500",
            featured: true,
        },
        {
            id: 2,
            title: "Outlook on Future Prices with Respect to Construction",
            subtitle: "OUTLOOK ON FUTURE PRICES",
            speaker: "Ghaus Gadri",
            role: "Private Equity & Investment Adviser",
            part: "PART 10",
            thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
            id: 3,
            title: "Tax on Rental Income x Federal Budget 2022",
            subtitle: "TAX ON RENTAL INCOME",
            speaker: "Ghaus Gadri",
            role: "Private Equity & Investment Adviser",
            part: "PART 9",
            thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
            id: 4,
            title: "Capital Gains Tax Budget Breakdown",
            subtitle: "CAPITAL GAINS TAX SLABS",
            speaker: "Ghaus Gadri",
            role: "Private Equity & Investment Adviser",
            part: "PART 8",
            thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
            id: 5,
            title: "Real Estate Investment Strategies 2024",
            subtitle: "INVESTMENT STRATEGIES",
            speaker: "Ghaus Gadri",
            role: "Private Equity & Investment Adviser",
            part: "PART 7",
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
        <div className="min-h-screen bg-gray-50 dark:bg-[#0F1115] p-6 ">
            <div className="w-full mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
                        FractPropTech MasterClass
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                        Insights from industry experts shaping real estate
                    </p>
                </div>

                {/* Featured Video */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg mb-12 group">
                    <Image
                        src={videos[0].thumbnail}
                        alt={videos[0].title}
                        width={1200}
                        height={500}
                        className="object-cover w-full h-[400px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-snug">
                            {videos[0].title}
                        </h2>
                        <p className="text-sm text-gray-200">{videos[0].subtitle}</p>
                    </div>
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-16 h-16 rounded-full bg-white/90 text-gray-900 flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                            <Play className="w-7 h-7" fill="currentColor" />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div className="relative">
                    {/* Left Arrow */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 bg-white dark:bg-[#1A1A1A] rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        disabled={currentSlide === 0}
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 bg-white dark:bg-[#1A1A1A] rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        disabled={currentSlide === maxSlide}
                    >
                        <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>

                    {/* Videos */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)`,
                            }}
                        >
                            {videos.slice(1).map((video) => (
                                <div key={video.id} className="w-1/3 flex-shrink-0 px-4">
                                    <div className="bg-white dark:bg-[#1C1E23] rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all">
                                        <div className="relative aspect-video">
                                            <Image
                                                src={video.thumbnail}
                                                alt={video.title}
                                                fill
                                                className="object-cover"
                                            />
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                                            {/* Play Button */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                                    <Play className="w-5 h-5 text-gray-900" fill="currentColor" />
                                                </div>
                                            </div>
                                            {/* Part Number */}
                                            {video.part && (
                                                <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                                    {video.part}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 space-y-2">
                                            <h3 className="text-md font-semibold text-gray-900 dark:text-white line-clamp-2">
                                                {video.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                                {video.speaker} • {video.role}
                                            </p>
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

                    {/* Dots */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-colors duration-200 ${currentSlide === index
                                    ? "bg-blue-600"
                                    : "bg-gray-300 dark:bg-gray-600"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
