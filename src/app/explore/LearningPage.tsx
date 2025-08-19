"use client"


import Image from "next/image"
import { Play, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"


export default function PropTechMasterClass() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const sliderRef = useRef<HTMLDivElement>(null)
    const cardsPerView = 3
    const videos = [
        {
            id: 1,
            title: "Are You Prepared for the Oncoming Economic Downturn?",
            subtitle: "JULY 2022 EDITION",
            thumbnail: "/placeholder.svg?height=200&width=350",
            part: null,
            featured: true,
        },
        {
            id: 2,
            title: "Outlook on Future Prices with Respect to Construction",
            subtitle: "OUTLOOK ON FUTURE PRICES WITH RESPECT TO CONSTRUCTION",
            speaker: "Ghaus Gadri",
            role: "Private Equity & Investment Adviser",
            part: "PART 10",
            thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
            id: 3,
            title: "Tax on Rental Income x Federal Budget 2022",
            subtitle: "TAX ON RENTAL INCOME X FEDERAL BUDGET 2022",
            speaker: "Ghaus Gadri",
            role: "Private Equity & Investment Adviser",
            part: "PART 9",
            thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
            id: 4,
            title: "Capital Gains Tax Budget",
            subtitle: "CAPITAL GAINS TAX SLABS X FEDERAL BUDGET",
            speaker: "Ghaus Gadri",
            role: "Private Equity & Investment Adviser",
            part: "PART 8",
            thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
            id: 5,
            title: "Real Estate Investment Strategies for 2024",
            subtitle: "INVESTMENT STRATEGIES FOR 2024",
            speaker: "Ghaus Gadri",
            role: "Private Equity & Investment Adviser",
            part: "PART 7",
            thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
            id: 6,
            title: "Property Market Analysis",
            subtitle: "COMPREHENSIVE MARKET ANALYSIS",
            speaker: "Ghaus Gadri",
            role: "Private Equity & Investment Adviser",
            part: "PART 6",
            thumbnail: "/placeholder.svg?height=200&width=350",
        },
    ]
    const maxSlide = Math.max(0, videos.length - cardsPerView)

    // Keyboard navigation for accessibility
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prevSlide()
            if (e.key === "ArrowRight") nextSlide()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    })

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1))
    }

    return (
        <div className="p-4 md:p-8 lg:p-12 bg-background text-black border-themebgColor min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-8 md:mb-12 flex flex-col items-center text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-black drop-shadow-sm">PropTech MasterClass</h1>
                    <p className="text-lg md:text-xl text-black opacity-80">Catch real estate industry experts in conversation</p>
                </header>

                {/* Slider Container */}
                <section className="relative">
                    {/* Left Arrow */}
                    <Button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black text-black rounded-[20px] shadow-lg  flex items-center justify-center hover:bg-themebgColor hover:text-white focus:ring-2 focus:ring-themebgColor transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentSlide === 0}
                        aria-label="Previous Slide"
                        tabIndex={0}
                        variant="ghost"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Button>

                    {/* Right Arrow */}
                    <Button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black text-black rounded-[20px] shadow-lg border-0 flex items-center justify-center hover:text-white focus:ring-2 focus:ring-themebgColor transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentSlide === maxSlide}
                        aria-label="Next Slide"
                        tabIndex={0}
                        variant="ghost"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </Button>

                    {/* Slider Content */}
                    <div className="overflow-hidden">
                        <div
                            ref={sliderRef}
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)`,
                            }}
                            aria-live="polite"
                        >
                            {videos.map((video, idx) => (
                                <div
                                    key={video.id}
                                    className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 px-2 md:px-3"
                                    tabIndex={0}
                                    aria-label={video.title}
                                >
                                    <div className="group cursor-pointer h-full flex flex-col">
                                        {/* Video Thumbnail */}
                                        <div className="relative aspect-video mb-4 rounded-xl overflow-hidden bg-background shadow-lg">
                                            <Image
                                                src={"https://fastly.clutch.ca/assets/stc_location_wolfedale_1.jpg"}
                                                alt={video.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 350px"
                                                priority={idx < cardsPerView}
                                            />

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-background bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-200" />

                                            {/* Play Button */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 bg-background bg-opacity-90 rounded-full flex items-center justify-center group-hover:bg-themebgColor group-hover:text-white transition-all duration-200 border border-themebgColor shadow-md">
                                                    <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                                                </div>
                                            </div>

                                            {/* Top Left Branding */}
                                            {!video.featured && (
                                                <div className="absolute top-3 left-3">
                                                    <div className="bg-background bg-opacity-80 px-2 py-1 rounded text-xs text-black font-medium border border-themebgColor shadow-sm">
                                                        PROPTECH MASTERCLASS
                                                    </div>
                                                </div>
                                            )}

                                            {/* Top Right Part Number */}
                                            {video.part && (
                                                <div className="absolute top-3 right-3">
                                                    <div className="bg-background bg-opacity-60 px-2 py-1 rounded text-xs text-black font-medium border border-themebgColor shadow-sm">
                                                        {video.part}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Bottom Left DAO PROPTECH */}
                                            {!video.featured && (
                                                <div className="absolute bottom-3 left-3">
                                                    <div className="flex items-center space-x-1 text-black text-xs">
                                                        <div className="w-2 h-2 bg-background rounded-full"></div>
                                                        <span className="font-medium">DAO PROPTECH</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Featured Video Text Overlay */}
                                            {video.featured && (
                                                <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-black">
                                                    <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight drop-shadow">
                                                        ARE YOU
                                                        <br />
                                                        PREPARED
                                                        <br />
                                                        FOR THE <span className="text-black">ECONOMIC<br />DOWNTURN?</span>
                                                    </h3>
                                                    <p className="text-xs opacity-90 mt-2">{video.subtitle}</p>
                                                </div>
                                            )}

                                            {/* Speaker Info for non-featured videos */}
                                            {!video.featured && video.speaker && (
                                                <div className="absolute bottom-12 left-3 text-black text-xs">
                                                    <div className="font-medium">{video.speaker}</div>
                                                    <div className="opacity-80">{video.role}</div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Video Info */}
                                        <div className="space-y-2 flex-1 flex flex-col justify-between">
                                            <h3 className="text-lg font-semibold text-black line-clamp-2 group-hover:text-themebgColor transition-colors">
                                                {video.title}
                                            </h3>

                                            <div className="flex items-center text-sm text-black opacity-70">
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
                    <nav className="flex justify-center mt-6 space-x-2" aria-label="Slider pagination">
                        {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                            <Button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-colors duration-200 border border-themebgColor shadow-sm ${currentSlide === index ? "bg-themebgColor" : "bg-background"}`}
                                title={`Go to slide ${index + 1}`}
                                aria-label={`Go to slide ${index + 1}`}
                                tabIndex={0}
                                variant="ghost"
                            />
                        ))}
                    </nav>
                </section>
            </div>
        </div>
    )
}
