"use client"
import React, { useState } from "react";
import {
    FaBuilding,
    FaMapMarkerAlt,
    FaUser,
    FaCalendarAlt,
    FaDollarSign,
    FaChartBar,
    FaCamera,
    FaStar,
    FaCoins,
    FaHome,
    FaPlus,
    FaMinus
} from "react-icons/fa";
import createProject from "@/services/project.service";

export default function GlobeResidencyForm() {
    const [form, setForm] = useState({
        propertyName: "",
        category: "",
        subcategory: "",
        description: "",
        address: "",
        city: "",
        state: "",
        country: "",
        latitude: "",
        longitude: "",
        developerName: "",
        developerWebsite: "",
        developerDescription: "",
        developerLogo: "",
        projectStatus: "",
        startDate: "",
        completionDate: "",
        featured: false,
        totalArea: "",
        sellableArea: "", 
        priceMin: "",
        priceMax: "",
        totalUnits: "",
        soldUnits: "",
        reservedUnits: "",
        availableUnits: "",
        views: "",
        inquiries: "",
        mainImageUrl: "",
        galleryImages: "",
        amenities: "",
        tokenName: "",
        tokenSymbol: "",
        tokenSupply: "",
        pricePerToken: "",
        walletAddress: ""
    });
    const [floors, setFloors] = useState([
        {
            name: "",
            description: "",
            floorNumber: "",
            floorPlanUrl: "",
            totalUnits: "",
            pricePerSqFt: "",
            minPrice: "",
            maxPrice: "",
            totalSquareFootage: "", // Added totalSquareFootage
            specifications: "",
            features: ""
        }
    ]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { id, value, type } = e.target;
        setForm(f => ({
            ...f,
            [id]: type === "checkbox"
                ? (e.target as HTMLInputElement).checked
                : value
        }));
    }

    function handleFloorChange(idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { id, value } = e.target;
        setFloors(floors => floors.map((floor, i) => i === idx ? { ...floor, [id]: value } : floor));
    }

    function handleFloorSpecChange(idx: number, field: "specifications" | "features", value: string) {
        setFloors(floors => floors.map((floor, i) => i === idx ? { ...floor, [field]: value } : floor));
    }




    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            // Map form state to API payload
            const payload = {
                name: form.propertyName,
                description: form.description,
                location: {
                    address: form.address,
                    city: form.city,
                    state: form.state,
                    country: form.country,
                    coordinates: {
                        latitude: Number(form.latitude) || 0,
                        longitude: Number(form.longitude) || 0
                    }
                },
                developer: {
                    name: form.developerName,
                    description: form.developerDescription,
                    logoUrl: form.developerLogo,
                    website: form.developerWebsite
                },
                status: form.projectStatus || "planning",
                category: form.category || "residential" || "mixeduse" || "commercial",
                subcategory: form.subcategory,
                featured: !!form.featured,
                startDate: form.startDate,
                completionDate: form.completionDate,
                sellableArea: Number(form.sellableArea) || 0, // Added sellableArea
                floors: floors.map(floor => ({
                    name: floor.name,
                    description: floor.description,
                    floorNumber: Number(floor.floorNumber) || 0,
                    floorPlanUrl: floor.floorPlanUrl,
                    totalUnits: Number(floor.totalUnits) || 0,
                    pricePerSqFt: Number(floor.pricePerSqFt) || 0,
                    minPrice: Number(floor.minPrice) || 0,
                    maxPrice: Number(floor.maxPrice) || 0,
                    totalSquareFootage: Number(floor.totalSquareFootage) || 0, // Added totalSquareFootage
                    specifications: floor.specifications ? floor.specifications.split(",").map(s => s.trim()) : [],
                    features: floor.features ? floor.features.split(",").map(s => s.trim()) : []
                })),
                mainImageUrl: form.mainImageUrl,
                galleryImages: form.galleryImages ? form.galleryImages.split(",").map(s => s.trim()) : [],
                totalArea: Number(form.totalArea) || 0,
                priceRange: {
                    min: Number(form.priceMin) || 0,
                    max: Number(form.priceMax) || 0
                }
            };
            await createProject.createProject(payload);
            setSuccess(true);
            setForm({
                propertyName: "",
                category: "",
                subcategory: "",
                description: "",
                address: "",
                city: "",
                state: "",
                country: "",
                latitude: "",
                longitude: "",
                developerName: "",
                developerWebsite: "",
                developerDescription: "",
                developerLogo: "",
                projectStatus: "",
                startDate: "",
                completionDate: "",
                featured: false,
                totalArea: "",
                sellableArea: "",
                priceMin: "",
                priceMax: "",
                totalUnits: "",
                soldUnits: "",
                reservedUnits: "",
                availableUnits: "",
                views: "",
                inquiries: "",
                mainImageUrl: "",
                galleryImages: "",
                amenities: "",
                tokenName: "",
                tokenSymbol: "",
                tokenSupply: "",
                pricePerToken: "",
                walletAddress: ""
            });
            setFloors([
                {
                    name: "",
                    description: "",
                    floorNumber: "",
                    floorPlanUrl: "",
                    totalUnits: "",
                    pricePerSqFt: "",
                    minPrice: "",
                    maxPrice: "",
                    totalSquareFootage: "",
                    specifications: "",
                    features: ""
                }
            ]);
        } catch (err: any) {
            setError(err.message || "Submission failed");
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen shadow-lg rounded-md py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-left mb-8">
                    <div className=" gap-3 mb-4">
                        <h1 className="text-4xl font-bold text-left">
                            Add Project
                        </h1>
                    </div>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    {success && <div className="text-green-600 mt-4">Project created successfully!</div>}
                    {error && <div className="text-red-600 mt-4">{error}</div>}
                    {/* Basic Information */}
                    <div className=" backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="bg-black text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaBuilding className="w-5 h-5" />
                                Basic Information
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="propertyName" className="text-sm font-semibold ">
                                    Property Name
                                </label>
                                <input
                                    id="propertyName"
                                    placeholder="Luxury Towers"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={form.propertyName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="category" className="text-sm font-semibold ">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={form.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select category</option>
                                    <option value="residential">residential</option>
                                    <option value="commercial">commercial</option>
                                    <option value="mixed">Mixed Use</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label htmlFor="description" className="text-sm font-semibold ">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    placeholder="Premium residential towers with world-class amenities..."
                                    rows={3}
                                    className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={form.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location Details */}
                    <div className=" backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="bg-black text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaMapMarkerAlt className="w-5 h-5" />
                                Location Details
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="address" className="text-sm font-semibold ">
                                    Address
                                </label>
                                <input
                                    id="address"
                                    placeholder="123 Main Street"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
                                    value={form.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="city" className="text-sm font-semibold ">
                                    City
                                </label>
                                <input
                                    id="city"
                                    placeholder="New York"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
                                    value={form.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="state" className="text-sm font-semibold ">
                                    State
                                </label>
                                <input
                                    id="state"
                                    placeholder="NY"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
                                    value={form.state}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="country" className="text-sm font-semibold ">
                                    Country
                                </label>
                                <input
                                    id="country"
                                    placeholder="USA"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
                                    value={form.country}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="latitude" className="text-sm font-semibold ">
                                    Latitude
                                </label>
                                <input
                                    id="latitude"
                                    type="number"
                                    step="any"
                                    placeholder="40.7128"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
                                    value={form.latitude}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="longitude" className="text-sm font-semibold ">
                                    Longitude
                                </label>
                                <input
                                    id="longitude"
                                    type="number"
                                    step="any"
                                    placeholder="-74.0060"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
                                    value={form.longitude}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Developer Information */}
                    <div className=" backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="bg-black text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaUser className="w-5 h-5" />
                                Developer Information
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="developerName" className="text-sm font-semibold ">
                                    Developer Name
                                </label>
                                <input
                                    id="developerName"
                                    placeholder="Prestige Developers"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none"
                                    value={form.developerName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="developerWebsite" className="text-sm font-semibold ">
                                    Website
                                </label>
                                <input
                                    id="developerWebsite"
                                    type="url"
                                    placeholder="https://prestigedevelopers.com"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none"
                                    value={form.developerWebsite}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="developerDescription" className="text-sm font-semibold ">
                                    Description
                                </label>
                                <textarea
                                    id="developerDescription"
                                    placeholder="Leading luxury real estate developer..."
                                    rows={3}
                                    className="w-full p-2 border border-gray-200 rounded focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none"
                                    value={form.developerDescription}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="developerLogo" className="text-sm font-semibold ">
                                    Logo URL
                                </label>
                                <input
                                    id="developerLogo"
                                    type="url"
                                    placeholder="https://example.com/logo.png"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none"
                                    value={form.developerLogo}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Project Timeline */}
                    <div className=" backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="bg-black text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaCalendarAlt className="w-5 h-5" />
                                Project Timeline & Status
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="projectStatus" className="text-sm font-semibold ">
                                    Project Status
                                </label>
                                <select
                                    id="projectStatus"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none"
                                    value={form.projectStatus}
                                    onChange={handleChange}
                                >
                                    <option value="">Select status</option>
                                    <option value="under_construction">Under Construction</option>
                                    <option value="completed">Completed</option>
                                    <option value="planning">Planning</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subcategory" className="text-sm font-semibold ">
                                    Subcategory
                                </label>
                                <select
                                    id="subcategory"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none"
                                    value={form.subcategory}
                                    onChange={handleChange}
                                >
                                    <option value="">Select subcategory</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="villa">Villa</option>
                                    <option value="office">Office</option>
                                    <option value="retail">Retail</option>
                                    <option value="plot">Plot</option>
                                    <option value="penthouse">Penthouse</option>
                                    <option value="townhouse">Townhouse</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="startDate" className="text-sm font-semibold ">
                                    Start Date
                                </label>
                                <input
                                    id="startDate"
                                    type="date"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none"
                                    value={form.startDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="completionDate" className="text-sm font-semibold ">
                                    Completion Date
                                </label>
                                <input
                                    id="completionDate"
                                    type="date"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none"
                                    value={form.completionDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ">Featured Property</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        id="featured"
                                        type="checkbox"
                                        checked={form.featured}
                                        onChange={handleChange}
                                    />
                                    <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm hover:bg-yellow-200">
                                        <FaStar className="w-3 h-3 mr-1" />
                                        Featured
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Area */}
                    <div className=" backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="bg-black text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaDollarSign className="w-5 h-5" />
                                Pricing & Area Details
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="totalArea" className="text-sm font-semibold ">
                                    Total Area (sq.ft)
                                </label>
                                <input
                                    id="totalArea"
                                    type="number"
                                    placeholder="100,000"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                                    value={form.totalArea}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="sellableArea" className="text-sm font-semibold ">
                                    Sellable Area (sq.ft)
                                </label>
                                <input
                                    id="sellableArea"
                                    type="number"
                                    placeholder="80,000"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                                    value={form.sellableArea}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="priceMin" className="text-sm font-semibold ">
                                    Min Price
                                </label>
                                <input
                                    id="priceMin"
                                    type="number"
                                    placeholder="800,000"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                                    value={form.priceMin}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="priceMax" className="text-sm font-semibold ">
                                    Max Price
                                </label>
                                <input
                                    id="priceMax"
                                    type="number"
                                    placeholder="2,500,000"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                                    value={form.priceMax}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className=" backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="bg-black text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaChartBar className="w-5 h-5" />
                                Project Statistics
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="totalUnits" className="text-sm font-semibold ">
                                    Total Units
                                </label>
                                <input
                                    id="totalUnits"
                                    type="number"
                                    placeholder="50"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none"
                                    value={form.totalUnits}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="soldUnits" className="text-sm font-semibold ">
                                    Sold Units
                                </label>
                                <input
                                    id="soldUnits"
                                    type="number"
                                    placeholder="30"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none"
                                    value={form.soldUnits}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="reservedUnits" className="text-sm font-semibold ">
                                    Reserved
                                </label>
                                <input
                                    id="reservedUnits"
                                    type="number"
                                    placeholder="5"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none"
                                    value={form.reservedUnits}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="availableUnits" className="text-sm font-semibold ">
                                    Available
                                </label>
                                <input
                                    id="availableUnits"
                                    type="number"
                                    placeholder="15"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none"
                                    value={form.availableUnits}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="views" className="text-sm font-semibold ">
                                    Views
                                </label>
                                <input
                                    id="views"
                                    type="number"
                                    placeholder="1,200"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none"
                                    value={form.views}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="inquiries" className="text-sm font-semibold ">
                                    Inquiries
                                </label>
                                <input
                                    id="inquiries"
                                    type="number"
                                    placeholder="85"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none"
                                    value={form.inquiries}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Images & Media */}
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="bg-black text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaCamera className="w-5 h-5" />
                                Images & Media
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="mainImageUrl" className="text-sm font-semibold ">
                                    Main Image URL
                                </label>
                                <input
                                    id="mainImageUrl"
                                    type="url"
                                    placeholder="https://example.com/main-image.jpg"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-pink-500 focus:ring-2 focus:ring-pink-500 outline-none"
                                    value={form.mainImageUrl}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="galleryImages" className="text-sm font-semibold ">
                                    Gallery Images (comma separated URLs)
                                </label>
                                <textarea
                                    id="galleryImages"
                                    placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg, https://example.com/img3.jpg"
                                    rows={3}
                                    className="w-full p-2 border border-gray-200 rounded focus:border-pink-500 focus:ring-2 focus:ring-pink-500 outline-none"
                                    value={form.galleryImages}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Floors Section */}
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="bg-black text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaBuilding className="w-5 h-5" />
                                Floor Details
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            {floors.map((floor, idx) => (
                                <div key={idx} className="border p-4 rounded-lg mb-4 ">

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input id="name" placeholder="Name" className="p-2 border rounded" value={floor.name} onChange={e => handleFloorChange(idx, e)} />
                                        <input id="floorNumber" type="number" placeholder="Floor Number" className="p-2 border rounded" value={floor.floorNumber} onChange={e => handleFloorChange(idx, e)} />
                                        <input id="floorPlanUrl" placeholder="Floor Plan URL" className="p-2 border rounded" value={floor.floorPlanUrl} onChange={e => handleFloorChange(idx, e)} />
                                        <input id="totalUnits" type="number" placeholder="Total Units" className="p-2 border rounded" value={floor.totalUnits} onChange={e => handleFloorChange(idx, e)} />
                                        <input id="pricePerSqFt" type="number" placeholder="Price Per SqFt" className="p-2 border rounded" value={floor.pricePerSqFt} onChange={e => handleFloorChange(idx, e)} />
                                        <input id="minPrice" type="number" placeholder="Min Price" className="p-2 border rounded" value={floor.minPrice} onChange={e => handleFloorChange(idx, e)} />
                                        <input id="maxPrice" type="number" placeholder="Max Price" className="p-2 border rounded" value={floor.maxPrice} onChange={e => handleFloorChange(idx, e)} />
                                        <input id="totalSquareFootage" type="number" placeholder="Total Square Footage" className="p-2 border rounded" value={floor.totalSquareFootage} onChange={e => handleFloorChange(idx, e)} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                        <textarea id="description" placeholder="Description" className="p-2 border rounded" value={floor.description} onChange={e => handleFloorChange(idx, e)} />
                                        <textarea id="specifications" placeholder="Specifications (comma separated)" className="p-2 border rounded" value={floor.specifications} onChange={e => handleFloorSpecChange(idx, "specifications", e.target.value)} />
                                        <textarea id="features" placeholder="Features (comma separated)" className="p-2 border rounded" value={floor.features} onChange={e => handleFloorSpecChange(idx, "features", e.target.value)} />
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Token Information */}
                    <div className=" backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="bg-black text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaCoins className="w-5 h-5" />
                                Token Information
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="tokenName" className="text-sm font-semibold ">
                                    Token Name
                                </label>
                                <input
                                    id="tokenName"
                                    placeholder="GlobeHouseToken"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={form.tokenName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="tokenSymbol" className="text-sm font-semibold ">
                                    Token Symbol
                                </label>
                                <input
                                    id="tokenSymbol"
                                    placeholder="GHT"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={form.tokenSymbol}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="tokenSupply" className="text-sm font-semibold ">
                                    Token Supply
                                </label>
                                <input
                                    id="tokenSupply"
                                    type="number"
                                    placeholder="1"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={form.tokenSupply}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="pricePerToken" className="text-sm font-semibold ">
                                    Price Per Token (PKR)
                                </label>
                                <input
                                    id="pricePerToken"
                                    type="number"
                                    placeholder="120,000,000"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={form.pricePerToken}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label htmlFor="walletAddress" className="text-sm font-semibold ">
                                    Wallet Address
                                </label>
                                <input
                                    id="walletAddress"
                                    placeholder="User's Phantom Wallet Address"
                                    className="w-full p-2 border border-gray-200 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={form.walletAddress}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Submit"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}