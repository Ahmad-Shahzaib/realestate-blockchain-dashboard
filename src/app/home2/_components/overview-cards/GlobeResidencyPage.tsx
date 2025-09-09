"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
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
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "@/redux/reducers/projectslice/projectSlice";
import { fetchCustomers } from "@/redux/reducers/customerslice/customerSlice";
import Button from "@/common/Button";

// Types for form and floor (unchanged)
interface Floor {
    name: string;
    description: string;
    floorNumber: string;
    floorPlanUrl: string;
    totalUnits: string;
    pricePerSqFt: string;
    minPrice: string;
    maxPrice: string;
    totalSquareFootage: string;
    specifications: string;
    features: string;
    minSqftBuy?: string;
    maxSqftBuy?: string;
}

interface FormState {
    propertyName: string;
    category: string;
    subcategory: string;
    description: string;
    address: string;
    city: string;
    state: string;
    country: string;
    latitude: string;
    longitude: string;
    developerName: string;
    developerWebsite: string;
    developerDescription: string;
    developerLogo: string;
    projectStatus: string;
    startDate: string;
    completionDate: string;
    featured: boolean;
    totalArea: string;
    sellableArea: string;
    priceMin: string;
    priceMax: string;
    totalUnits: string;
    soldUnits: string;
    reservedUnits: string;
    availableUnits: string;
    views: string;
    inquiries: string;
    mainImageUrl: string;
    galleryImages: string;
    amenities: string;
    tokenName: string;
    tokenSymbol: string;
    tokenSupply: string;
    pricePerToken: string;
    walletAddress: string;
    customer?: string;
    bankDetails?: {
        bankName: string;
        accountNumber: string;
        accountTitle: string;
        iban?: string | null;
    }
}

const initialFormState: FormState = {
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
    walletAddress: "",
    customer: "68b7f3511ff5d34a6c9d723b",
    bankDetails: {
        bankName: "",
        accountNumber: "",
        accountTitle: "",
        iban: "",
    }
};

const initialFloor: Floor = {
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
    features: "",
    minSqftBuy: "",
    maxSqftBuy: "",
};

function useGlobeResidencyForm() {
    const [form, setForm] = useState<FormState>(initialFormState);
    const [floors, setFloors] = useState<Floor[]>([initialFloor]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([
        { question: "", answer: "" },
    ]);
    const [documents, setDocuments] = useState<string[]>([""]);
    const dispatch = useDispatch();

    // Memoized validation
    const isValid = useMemo(() => {
        return !!form.propertyName && !!form.category && !!form.address && !!form.city && !!form.country;
    }, [form]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { id, value, type } = e.target;
            setForm((f) => ({
                ...f,
                [id]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
            }));
        },
        []
    );

    const handleFloorChange = useCallback(
        (idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { id, value } = e.target;
            setFloors((floors) =>
                floors.map((floor, i) => (i === idx ? { ...floor, [id]: value } : floor))
            );
        },
        []
    );

    const handleFloorSpecChange = useCallback(
        (idx: number, field: "specifications" | "features", value: string) => {
            setFloors((floors) =>
                floors.map((floor, i) => (i === idx ? { ...floor, [field]: value } : floor))
            );
        },
        []
    );

    const addFloor = useCallback(() => {
        setFloors((floors) => [...floors, { ...initialFloor }]);
    }, []);

    const handleFaqChange = useCallback(
        (idx: number, field: "question" | "answer", value: string) => {
            setFaqs((faqs) =>
                faqs.map((faq, i) => (i === idx ? { ...faq, [field]: value } : faq))
            );
        },
        []
    );

    const addFaq = useCallback(() => {
        setFaqs((faqs) => [...faqs, { question: "", answer: "" }]);
    }, []);

    const removeFaq = useCallback((idx: number) => {
        setFaqs((faqs) => faqs.filter((_, i) => i !== idx));
    }, []);

    const handleDocumentChange = useCallback((idx: number, value: string) => {
        setDocuments((docs) => docs.map((doc, i) => (i === idx ? value : doc)));
    }, []);

    const handleDocumentFileChange = useCallback((idx: number, file: File) => {
        setDocuments((docs) => docs.map((doc, i) => (i === idx ? file.name : doc)));
        // TODO: Implement actual upload logic and setDocuments with the uploaded file URL
    }, []);

    const addDocument = useCallback(() => {
        setDocuments((docs) => [...docs, ""]);
    }, []);

    const removeDocument = useCallback((idx: number) => {
        setDocuments((docs) => docs.filter((_, i) => i !== idx));
    }, []);

    // Handle bank details change
    const handleBankDetailsChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { id, value } = e.target;
            setForm((f) => ({
                ...f,
                bankDetails: {
                    bankName: f.bankDetails?.bankName ?? "",
                    accountNumber: f.bankDetails?.accountNumber ?? "",
                    accountTitle: f.bankDetails?.accountTitle ?? "",
                    iban: f.bankDetails?.iban ?? "",
                    [id]: value,
                },
            }));
        },
        []
    );

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (loading) return;
            setLoading(true);
            setError(null);
            setSuccess(false);
            if (!isValid) {
                setError("Please fill all required fields.");
                setLoading(false);
                return;
            }
            try {
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
                            longitude: Number(form.longitude) || 0,
                        },
                    },
                    developer: {
                        name: form.developerName,
                        description: form.developerDescription,
                        logoUrl: form.developerLogo,
                        website: form.developerWebsite,
                    },
                    status: form.projectStatus || "planning",
                    category: form.category || "residential",
                    subcategory: form.subcategory,
                    featured: !!form.featured,
                    startDate: form.startDate ? new Date(form.startDate).toISOString() : "",
                    completionDate: form.completionDate ? new Date(form.completionDate).toISOString() : "",
                    sellableArea: Number(form.sellableArea) || 0,
                    floors: floors.map((floor) => ({
                        name: floor.name,
                        description: floor.description,
                        floorNumber: Number(floor.floorNumber) || 0,
                        floorPlanUrl: floor.floorPlanUrl,
                        totalUnits: Number(floor.totalUnits) || 0,
                        pricePerSqFt: Number(floor.pricePerSqFt) || 0,
                        minPrice: Number(floor.minPrice) || 0,
                        maxPrice: Number(floor.maxPrice) || 0,
                        totalSquareFootage: Number(floor.totalSquareFootage) || 0,
                        specifications: floor.specifications ? floor.specifications.split(",").map((s) => s.trim()) : [],
                        features: floor.features ? floor.features.split(",").map((s) => s.trim()) : [],
                    })),
                    mainImageUrl: form.mainImageUrl,
                    galleryImages: form.galleryImages ? form.galleryImages.split(",").map((s) => s.trim()) : [],
                    totalArea: Number(form.totalArea) || 0,
                    priceRange: {
                        min: Number(form.priceMin) || 0,
                        max: Number(form.priceMax) || 0,
                    },
                    totalUnits: Number(form.totalUnits) || 0,
                    soldUnits: Number(form.soldUnits) || 0,
                    reservedUnits: Number(form.reservedUnits) || 0,
                    availableUnits: Number(form.availableUnits) || 0,
                    views: Number(form.views) || 0,
                    inquiries: Number(form.inquiries) || 0,
                    amenities: form.amenities ? form.amenities.split(",").map((s) => s.trim()) : [],
                    token: {
                        name: form.tokenName,
                        symbol: form.tokenSymbol,
                        supply: Number(form.tokenSupply) || 0,
                        pricePerToken: Number(form.pricePerToken) || 0,
                        walletAddress: form.walletAddress,
                    },
                    faqs: faqs.filter((f) => f.question && f.answer),
                    documents: documents.filter((d) => d),
                    customer: "68b7f3511ff5d34a6c9d723b",
                    bankDetails: {
                        bankName: form.bankDetails?.bankName || "",
                        accountNumber: form.bankDetails?.accountNumber || "",
                        accountTitle: form.bankDetails?.accountTitle || "",
                        iban: form.bankDetails?.iban || null,
                    },
                };
                await dispatch(createProject(payload)).unwrap();
                setSuccess(true);
            } catch (err: any) {
                setError(err?.message || "Failed to create project.");
            } finally {
                setLoading(false);
            }
        },
        [
            form,
            floors,
            faqs,
            documents,
            isValid,
            dispatch
        ]
    );

    return {
        form,
        floors,
        loading,
        success,
        error,
        handleChange,
        handleFloorChange,
        handleFloorSpecChange,
        handleSubmit,
        addFloor,
        faqs,
        handleFaqChange,
        addFaq,
        removeFaq,
        documents,
        handleDocumentChange,
        handleDocumentFileChange,
        addDocument,
        removeDocument,
        handleBankDetailsChange,
    };
}

export default function GlobeResidencyForm() {
    const {
        form,
        floors,
        loading,
        success,
        error,
        handleChange,
        handleFloorChange,
        handleFloorSpecChange,
        handleSubmit,
        addFloor,
        faqs,
        handleFaqChange,
        addFaq,
        removeFaq,
        documents,
        handleDocumentChange,
        handleDocumentFileChange,
        addDocument,
        removeDocument,
        handleBankDetailsChange, // add this
    } = useGlobeResidencyForm();

    const dispatch = useDispatch();
    // Select customers and their status from Redux store
    const { customers, status: customerStatus, error: customerError } = useSelector(
        (state: any) => state.customer || { customers: [], status: "", error: null }
    );

    // Fetch customers when component mounts
    useEffect(() => {
        if (customerStatus === "") {
            dispatch(fetchCustomers());
        }
    }, [customerStatus, dispatch]);

    // Placeholder for banks API
    const [banks, setBanks] = useState<{ name: string; code: string }[]>([]);
    useEffect(() => {
        // TODO: Replace with real API call
        setBanks([
            { name: "Meezan Bank", code: "MEEZAN" },
            { name: "HBL", code: "HBL" },
            { name: "UBL", code: "UBL" },
            { name: "MCB", code: "MCB" },
        ]);
    }, []);

    return (
        <div className="min-h-screen shadow-lg rounded-md py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Customer Dropdown */}
                {/* <div className="mb-8">
                    <label htmlFor="customer" className="block text-sm font-semibold mb-2">
                        Customer
                    </label>
                    {customerStatus === "loading" && (
                        <div className="text-gray-600">Loading customers...</div>
                    )}
                    {customerError && (
                        <div className="text-red-600">Error: {customerError}</div>
                    )}
                    <select
                        id="customer"
                        className="w-full p-2 border border-gray-200 rounded outline-none"
                        value={form.customer || ""}
                        onChange={handleChange}
                        disabled={customerStatus === "loading"}
                    >
                        <option value="">Select customer</option>
                        {customers.map((customer: any) => (
                            <option key={customer.id || customer._id} value={customer.id || customer._id}>
                                {customer.fullName || customer.lastName || customer.email || "Unknown Customer"}
                            </option>
                        ))}
                    </select>
                </div> */}
                {/* Header */}
                <div className="text-left mb-8">
                    <div className="gap-3 mb-4">
                        <h1 className="text-4xl font-bold text-left text-black dark:text-white">Add Project</h1>
                    </div>
                </div>
                <form className="space-y-8" onSubmit={handleSubmit} autoComplete="off" noValidate>
                    {success && <div className="text-green-600 mt-4">Project created successfully!</div>}
                    {error && <div className="text-red-600 mt-4">{error}</div>}
                    {/* Basic Information */}
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="dark:text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaBuilding className="w-5 h-5" />
                                Basic Information
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="propertyName" className="text-sm font-semibold">
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
                                <label htmlFor="category" className="text-sm font-semibold">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    className="w-full p-2.5 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={form.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select category</option>
                                    <option value="residential">Residential</option>
                                    <option value="commercial">Commercial</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subcategory" className="text-sm font-semibold">
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
                                    <option value="penthouse">Penthouse</option>
                                    <option value="townhouse">Townhouse</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label htmlFor="description" className="text-sm font-semibold">
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
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="dark:text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaMapMarkerAlt className="w-5 h-5" />
                                Location Details
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="address" className="text-sm font-semibold">
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
                                <label htmlFor="city" className="text-sm font-semibold">
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
                                <label htmlFor="state" className="text-sm font-semibold">
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
                                <label htmlFor="country" className="text-sm font-semibold">
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
                                <label htmlFor="latitude" className="text-sm font-semibold">
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
                                <label htmlFor="longitude" className="text-sm font-semibold">
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
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="dark:text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaUser className="w-5 h-5" />
                                Developer Information
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="developerName" className="text-sm font-semibold">
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
                                <label htmlFor="developerWebsite" className="text-sm font-semibold">
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
                                <label htmlFor="developerDescription" className="text-sm font-semibold">
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
                                <label htmlFor="developerLogo" className="text-sm font-semibold">
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
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="dark:text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaCalendarAlt className="w-5 h-5" />
                                Project Timeline & Status
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="projectStatus" className="text-sm font-semibold">
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
                                <label htmlFor="startDate" className="text-sm font-semibold">
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
                                <label htmlFor="completionDate" className="text-sm font-semibold">
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
                                <label className="text-sm font-semibold">Featured Property</label>
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
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="dark:text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaDollarSign className="w-5 h-5" />
                                Pricing & Area Details
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="totalArea" className="text-sm font-semibold">
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
                                <label htmlFor="sellableArea" className="text-sm font-semibold">
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
                                <label htmlFor="priceMin" className="text-sm font-semibold">
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
                                <label htmlFor="priceMax" className="text-sm font-semibold">
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
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="dark:text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaChartBar className="w-5 h-5" />
                                Project Statistics
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="totalUnits" className="text-sm font-semibold">
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
                                <label htmlFor="soldUnits" className="text-sm font-semibold">
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
                                <label htmlFor="reservedUnits" className="text-sm font-semibold">
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
                                <label htmlFor="availableUnits" className="text-sm font-semibold">
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
                                <label htmlFor="views" className="text-sm font-semibold">
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
                                <label htmlFor="inquiries" className="text-sm font-semibold">
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
                        <div className="dark:text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaCamera className="w-5 h-5" />
                                Images & Media
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="mainImageUrl" className="text-sm font-semibold">
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
                                <label htmlFor="galleryImages" className="text-sm font-semibold">
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
                        <div className="dark:text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaBuilding className="w-5 h-5" />
                                Floor Details
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            {floors.map((floor, idx) => (
                                <div key={idx} className="border p-4 rounded-lg mb-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            id="name"
                                            placeholder="Name"
                                            className="p-2 border rounded"
                                            value={floor.name}
                                            onChange={(e) => handleFloorChange(idx, e)}
                                        />
                                        <input
                                            id="floorNumber"
                                            type="number"
                                            placeholder="Floor Number"
                                            className="p-2 border rounded"
                                            value={floor.floorNumber}
                                            onChange={(e) => handleFloorChange(idx, e)}
                                        />
                                        <input
                                            id="floorPlanUrl"
                                            placeholder="Floor Plan URL"
                                            className="p-2 border rounded"
                                            value={floor.floorPlanUrl}
                                            onChange={(e) => handleFloorChange(idx, e)}
                                        />
                                        <input
                                            id="totalUnits"
                                            type="number"
                                            placeholder="Total Units"
                                            className="p-2 border rounded"
                                            value={floor.totalUnits}
                                            onChange={(e) => handleFloorChange(idx, e)}
                                        />
                                        <input
                                            id="pricePerSqFt"
                                            type="number"
                                            placeholder="Price Per SqFt"
                                            className="p-2 border rounded"
                                            value={floor.pricePerSqFt}
                                            onChange={(e) => handleFloorChange(idx, e)}
                                        />
                                        <input
                                            id="minPrice"
                                            type="number"
                                            placeholder="Min Price"
                                            className="p-2 border rounded"
                                            value={floor.minPrice}
                                            onChange={(e) => handleFloorChange(idx, e)}
                                        />
                                        <input
                                            id="maxPrice"
                                            type="number"
                                            placeholder="Max Price"
                                            className="p-2 border rounded"
                                            value={floor.maxPrice}
                                            onChange={(e) => handleFloorChange(idx, e)}
                                        />
                                        <input
                                            id="totalSquareFootage"
                                            type="number"
                                            placeholder="Total Square Footage"
                                            className="p-2 border rounded"
                                            value={floor.totalSquareFootage}
                                            onChange={(e) => handleFloorChange(idx, e)}
                                        />
                                        <input
                                            id="minSqftBuy"
                                            type="number"
                                            placeholder="Minimum Sqft Buy"
                                            className="p-2 border rounded"
                                            value={floor.minSqftBuy || ""}
                                            onChange={(e) => handleFloorChange(idx, e)}
                                        />
                                        <input
                                            id="maxSqftBuy"
                                            type="number"
                                            placeholder="Maximum Sqft Buy"
                                            className="p-2 border rounded"
                                            value={floor.maxSqftBuy || ""}
                                            onChange={(e) => handleFloorChange(idx, e)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                        <textarea
                                            id="description"
                                            placeholder="Description"
                                            className="p-2 border rounded"
                                            value={floor.description}
                                            onChange={(e) => handleFloorChange(idx, e)}
                                        />
                                        <textarea
                                            id="specifications"
                                            placeholder="Specifications (comma separated)"
                                            className="p-2 border rounded"
                                            value={floor.specifications}
                                            onChange={(e) => handleFloorSpecChange(idx, "specifications", e.target.value)}
                                        />
                                        <textarea
                                            id="features"
                                            placeholder="Features (comma separated)"
                                            className="p-2 border rounded"
                                            value={floor.features}
                                            onChange={(e) => handleFloorSpecChange(idx, "features", e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                            <Button
                                type="button"

                                onClick={addFloor}
                            >
                                Add Floor
                            </Button>
                        </div>
                    </div>

                    {/* Token Information */}
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="dark:text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaCoins className="w-5 h-5" />
                                Token Information
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="tokenName" className="text-sm font-semibold">
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
                                <label htmlFor="tokenSymbol" className="text-sm font-semibold">
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
                                <label htmlFor="tokenSupply" className="text-sm font-semibold">
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
                                <label htmlFor="pricePerToken" className="text-sm font-semibold">
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
                                <label htmlFor="walletAddress" className="text-sm font-semibold">
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

                    {/* FAQs Section */}
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border mt-8">
                        <div className="dark:text-white rounded-t-lg p-4">

                            <h2 className="flex items-center gap-2 text-lg font-semibold">

                                FAQs
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                                    <div className="flex-1 space-y-2">
                                        <label className="text-sm font-semibold">Question</label>
                                        <input
                                            placeholder="Enter FAQ question"
                                            className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={faq.question}
                                            onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <label className="text-sm font-semibold">Answer</label>
                                        <textarea
                                            placeholder="Enter FAQ answer"
                                            rows={2}
                                            className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={faq.answer}
                                            onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        type="button"

                                        onClick={() => removeFaq(idx)}
                                        disabled={faqs.length === 1}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"

                                onClick={addFaq}
                            >
                                Add FAQ
                            </Button>
                        </div>
                    </div>
                    {/* bank detail */}
                    <div className="flex items-center justify-center ">
                        <div className=" w-full  p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4 ">Add Bank Details</h2>

                            {/* Bank Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 dark:text-white">
                                    Bank Name
                                </label>
                                <select
                                    id="bankName"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={form.bankDetails?.bankName || ""}
                                    onChange={handleBankDetailsChange}
                                >
                                    <option value="">Select Bank</option>
                                    {banks.map((bank) => (
                                        <option key={bank.code} value={bank.name}>{bank.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Account Number */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 dark:text-white">Account Number</label>
                                <input
                                    id="accountNumber"
                                    type="text"
                                    placeholder="1234567890123456"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={form.bankDetails?.accountNumber || ""}
                                    onChange={handleBankDetailsChange}
                                />
                            </div>

                            {/* Account Title */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 dark:text-white">Account Title</label>
                                <input
                                    id="accountTitle"
                                    type="text"
                                    placeholder="Muhammad Shakeel"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={form.bankDetails?.accountTitle || ""}
                                    onChange={handleBankDetailsChange}
                                />
                            </div>

                            {/* IBAN */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 dark:text-white">
                                    IBAN <span className="text-gray-400">(Optional)</span>
                                </label>
                                <input
                                    id="iban"
                                    type="text"
                                    placeholder="PK36SCBL000000123456702"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={form.bankDetails?.iban || ""}
                                    onChange={handleBankDetailsChange}
                                />
                            </div>

                            {/* Note */}
                            <p className="text-xs text-gray-500 mb-4">
                                All account information is accurate & I am responsible for the information provided above.
                            </p>


                        </div>
                    </div>
                    {/* Documents Section */}
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border mt-8">
                        <div className="dark:text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                Documents
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            {documents.map((doc, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                                    <div className="flex-1 space-y-2">
                                        <label className="text-sm font-semibold">Document URL or Upload</label>
                                        <input
                                            type="text"
                                            placeholder="Enter document URL"
                                            className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={doc}
                                            onChange={(e) => handleDocumentChange(idx, e.target.value)}
                                        />
                                        <div className="mt-3">
                                            <input
                                                type="file"
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        handleDocumentFileChange(idx, e.target.files[0]);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <Button

                                        onClick={() => removeDocument(idx)}
                                        disabled={documents.length === 1}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button


                                onClick={addDocument}
                            >
                                Add Document
                            </Button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-6">
                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}