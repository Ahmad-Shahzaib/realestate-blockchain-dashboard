"use client"
import React, { useState, useCallback, useMemo } from "react";
// ShadeCDN upload helper (replace with your actual ShadeCDN endpoint and API key)
async function uploadToShadeCDN(file: File): Promise<string> {
    const apiKey = process.env.NEXT_PUBLIC_SHADECDN_API_KEY || ""; // Set in .env
    const endpoint = "https://api.shadecdn.com/v1/upload";
    const formData = new FormData();
    formData.append("file", file);
    try {
        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`
            },
            body: formData
        });
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        return data.url; // Adjust if ShadeCDN returns a different field
    } catch (err) {
        throw new Error("ShadeCDN upload error: " + ((err && typeof err === 'object' && 'message' in err) ? (err as any).message : String(err)));
    }
}
import {
    FaBuilding,
    FaMapMarkerAlt,
    FaUser,
    FaCalendarAlt,
    FaDollarSign,
    FaChartBar,
    FaCamera,
    FaStar,
    FaCoins
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from '@/redux/reducers/projectSlice';
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Types for form and floor
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
    customer: ""
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
    maxSqftBuy: ""
};

function useGlobeResidencyForm() {
    const [form, setForm] = useState<FormState>(initialFormState);
    const [floors, setFloors] = useState<Floor[]>([initialFloor]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([{ question: "", answer: "" }]);
    const [documents, setDocuments] = useState<string[]>([""]);
    const [uploading, setUploading] = useState(false);
    const dispatch = useDispatch();

    // Memoized validation
    const isValid = useMemo(() => {
        // Required fields
        if (!form.propertyName || !form.category || !form.address || !form.city || !form.country) return false;
        // Validate URLs
        if (form.developerWebsite && !/^https?:\/\/.+/.test(form.developerWebsite)) return false;
        if (form.developerLogo && !/^https?:\/\/.+/.test(form.developerLogo)) return false;
        if (form.mainImageUrl && !/^https?:\/\/.+/.test(form.mainImageUrl)) return false;
        // Validate numbers
        if (form.latitude && isNaN(Number(form.latitude))) return false;
        if (form.longitude && isNaN(Number(form.longitude))) return false;
        // Validate token fields
        if (form.tokenSupply && isNaN(Number(form.tokenSupply))) return false;
        if (form.pricePerToken && isNaN(Number(form.pricePerToken))) return false;
        // Validate floors
        for (const floor of floors) {
            if (!floor.name || !floor.floorNumber) return false;
            if (floor.floorPlanUrl && !/^https?:\/\/.+/.test(floor.floorPlanUrl)) return false;
        }
        // Validate documents (if not empty, must be valid URL)
        for (const doc of documents) {
            if (doc && !/^https?:\/\/.+/.test(doc)) return false;
        }
        return true;
    }, [form, floors, documents]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value, type } = e.target;
        setForm(f => ({
            ...f,
            [id]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
        }));
    }, []);

    const handleFloorChange = useCallback((idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFloors(floors => floors.map((floor, i) => i === idx ? { ...floor, [id]: value } : floor));
    }, []);

    const handleFloorSpecChange = useCallback((idx: number, field: "specifications" | "features", value: string) => {
        setFloors(floors => floors.map((floor, i) => i === idx ? { ...floor, [field]: value } : floor));
    }, []);

    // Add Floor function
    const addFloor = useCallback(() => {
        setFloors(floors => [...floors, { ...initialFloor }]);
    }, []);

    // FAQ handlers
    const handleFaqChange = useCallback((idx: number, field: "question" | "answer", value: string) => {
        setFaqs(faqs => faqs.map((faq, i) => i === idx ? { ...faq, [field]: value } : faq));
    }, []);
    const addFaq = useCallback(() => {
        setFaqs(faqs => [...faqs, { question: "", answer: "" }]);
    }, []);
    const removeFaq = useCallback((idx: number) => {
        setFaqs(faqs => faqs.filter((_, i) => i !== idx));
    }, []);

    // Document handlers
    const handleDocumentChange = useCallback((idx: number, value: string) => {
        setDocuments(docs => docs.map((doc, i) => i === idx ? value : doc));
    }, []);
    const handleDocumentFileChange = useCallback(async (idx: number, file: File) => {
        setUploading(true);
        setError(null);
        try {
            // Validate file type/size (example: max 10MB, pdf/jpg/png)
            if (file.size > 10 * 1024 * 1024) throw new Error("File too large (max 10MB)");
            if (!/(pdf|jpg|jpeg|png)$/i.test(file.name)) throw new Error("Invalid file type");
            const url = await uploadToShadeCDN(file);
            setDocuments(docs => docs.map((doc, i) => i === idx ? url : doc));
        } catch (err: any) {
            setError(err.message || "Document upload failed");
        }
        setUploading(false);
    }, []);

    // For developer logo upload (optional, if you want to allow file upload instead of URL)
    const handleDeveloperLogoFileChange = useCallback(async (file: File) => {
        setUploading(true);
        setError(null);
        try {
            if (file.size > 5 * 1024 * 1024) throw new Error("Logo too large (max 5MB)");
            if (!/(jpg|jpeg|png)$/i.test(file.name)) throw new Error("Invalid logo type");
            const url = await uploadToShadeCDN(file);
            setForm(f => ({ ...f, developerLogo: url }));
        } catch (err: any) {
            setError(err.message || "Logo upload failed");
        }
        setUploading(false);
    }, []);

    // For main image upload
    const handleMainImageFileChange = useCallback(async (file: File) => {
        setUploading(true);
        setError(null);
        try {
            if (file.size > 10 * 1024 * 1024) throw new Error("Image too large (max 10MB)");
            if (!/(jpg|jpeg|png)$/i.test(file.name)) throw new Error("Invalid image type");
            const url = await uploadToShadeCDN(file);
            setForm(f => ({ ...f, mainImageUrl: url }));
        } catch (err: any) {
            setError(err.message || "Image upload failed");
        }
        setUploading(false);
    }, []);
    const addDocument = useCallback(() => {
        setDocuments(docs => [...docs, ""]);
    }, []);
    const removeDocument = useCallback((idx: number) => {
        setDocuments(docs => docs.filter((_, i) => i !== idx));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading || uploading) return; // Prevent double submit
        setLoading(true);
        setError(null);
        setSuccess(false);
        if (!isValid) {
            setError("Please fill all required fields and ensure all fields are valid.");
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
                category: form.category || "residential",
                subcategory: form.subcategory,
                featured: !!form.featured,
                startDate: form.startDate ? new Date(form.startDate).toISOString() : "",
                completionDate: form.completionDate ? new Date(form.completionDate).toISOString() : "",
                sellableArea: Number(form.sellableArea) || 0,
                floors: floors.map(floor => ({
                    name: floor.name,
                    description: floor.description,
                    floorNumber: Number(floor.floorNumber) || 0,
                    floorPlanUrl: floor.floorPlanUrl,
                    totalUnits: Number(floor.totalUnits) || 0,
                    pricePerSqFt: Number(floor.pricePerSqFt) || 0,
                    minPrice: Number(floor.minPrice) || 0,
                    maxPrice: Number(floor.maxPrice) || 0,
                    totalSquareFootage: Number(floor.totalSquareFootage) || 0,
                    specifications: floor.specifications ? floor.specifications.split(",").map(s => s.trim()) : [],
                    features: floor.features ? floor.features.split(",").map(s => s.trim()) : []
                })),
                mainImageUrl: form.mainImageUrl,
                galleryImages: form.galleryImages ? form.galleryImages.split(",").map(s => s.trim()) : [],
                totalArea: Number(form.totalArea) || 0,
                priceRange: {
                    min: Number(form.priceMin) || 0,
                    max: Number(form.priceMax) || 0
                },
                totalUnits: Number(form.totalUnits) || 0,
                soldUnits: Number(form.soldUnits) || 0,
                reservedUnits: Number(form.reservedUnits) || 0,
                availableUnits: Number(form.availableUnits) || 0,
                views: Number(form.views) || 0,
                inquiries: Number(form.inquiries) || 0,
                amenities: form.amenities ? form.amenities.split(",").map(s => s.trim()) : [],
                token: {
                    name: form.tokenName,
                    symbol: form.tokenSymbol,
                    supply: Number(form.tokenSupply) || 0,
                    pricePerToken: Number(form.pricePerToken) || 0,
                    walletAddress: form.walletAddress
                },
                faqs: faqs.filter(f => f.question && f.answer),
                documents: documents.filter(d => d),
                customer: form.customer || undefined
            };
            // await dispatch(createProject(payload)).unwrap();
            setSuccess(true);
            setForm(initialFormState);
            setFloors([initialFloor]);
            setFaqs([{ question: "", answer: "" }]);
            setDocuments([""]);
        } catch (err: any) {
            if (typeof window !== 'undefined' && window.console) {
                console.error('Project creation failed:', err);
            }
            setError(err.message || (typeof err === 'string' ? err : "Submission failed"));
        }
        setLoading(false);
    }, [form, floors, isValid, faqs, documents, loading, uploading, dispatch]);

    return {
        form,
        floors,
        loading,
        uploading,
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
        handleDeveloperLogoFileChange,
        handleMainImageFileChange
    };
}

export default function GlobeResidencyForm() {
    // Dropdown state for project status and subcategory
    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
    const [subcategoryDropdownOpen, setSubcategoryDropdownOpen] = useState(false);
    const projectStatusOptions = [
        { value: "under_construction", label: "Under Construction" },
        { value: "completed", label: "Completed" },
        { value: "planning", label: "Planning" },
    ];
    const subcategoryOptions = [
        { value: "apartment", label: "Apartment" },
        { value: "villa", label: "Villa" },
        { value: "office", label: "Office" },
        { value: "retail", label: "Retail" },
        { value: "plot", label: "Plot" },
        { value: "penthouse", label: "Penthouse" },
        { value: "townhouse", label: "Townhouse" },
    ];
    const {
        form,
        floors,
        loading,
        uploading,
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
        handleDeveloperLogoFileChange,
        handleMainImageFileChange
    } = useGlobeResidencyForm();

    // Select customers from redux store
    const customers = useSelector((state: any) => state.customer?.customers || []);

    // Dropdown state for category
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const categoryOptions = [
        { value: "residential", label: "Residential" },
        { value: "commercial", label: "Commercial" },
        { value: "mixed", label: "Mixed Use" },
    ];

    return (
        <div className="min-h-screen flex flex-col px-4">
            <div className="max-w-6xl mx-auto flex flex-col">

                {/* Header */}
                <div className="text-left mb-8">
                    <div className=" gap-3">
                        <h1 className="text-4xl text-center font-bold">
                            Add Project
                        </h1>
                    </div>
                </div>
                <form className="space-y-8" onSubmit={handleSubmit} autoComplete="off" noValidate>
                    {success && <div className="text-green-600 mt-4 text-center">Project created successfully!</div>}
                    {error && <div className="text-red-600 mt-4 text-center">{error}</div>}
                    {/* Basic Information */}
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="bg-[#0FB9A8] text-white rounded-t-lg p-4">
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
                                <Input
                                    id="propertyName"
                                    placeholder="Luxury Towers"
                                    value={form.propertyName}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="category" className="text-sm font-semibold ">
                                    Category
                                </label>
                                <div className="relative">
                                    <Button
                                        type="button"
                                        className="w-full px-4 py-3.5 border rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-[#0FB9A8] transition"
                                        onClick={() => setDropdownOpen(open => !open)}
                                        variant="default"
                                    >
                                        <span className="w-full text-left">
                                            {form.category
                                                ? categoryOptions.find(opt => opt.value === form.category)?.label
                                                : "Select category"}
                                        </span>
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            ▼
                                        </span>
                                    </Button>
                                    {dropdownOpen && (
                                        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg animate-fade-in">
                                            {categoryOptions.map(option => (
                                                <div
                                                    key={option.value}
                                                    className={`px-4 py-2 cursor-pointer hover:bg-[#0FB9A8]/10 ${form.category === option.value ? 'bg-[#0FB9A8]/20 font-semibold text-[#0FB9A8]' : ''}`}
                                                    onClick={() => {
                                                        handleChange({
                                                            target: { id: 'category', value: option.value, name: 'category' }
                                                        } as any);
                                                        setDropdownOpen(false);
                                                    }}
                                                >
                                                    {option.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label htmlFor="description" className="text-sm font-semibold ">
                                    Description
                                </label>
                                <Textarea
                                    id="description"
                                    placeholder="Premium residential towers with world-class amenities..."
                                    rows={3}
                                    value={form.description}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location Details */}
                    <div className=" backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="bg-[#0FB9A8] text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaMapMarkerAlt className="w-5 h-5" />
                                Location Details
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Row 1: Address & City */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="address" className="text-sm font-semibold ">
                                        Address
                                    </label>
                                    <Input
                                        id="address"
                                        placeholder="123 Main Street"
                                        value={form.address}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="city" className="text-sm font-semibold ">
                                        City
                                    </label>
                                    <Input
                                        id="city"
                                        placeholder="New York"
                                        value={form.city}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Row 2: State & Country */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="state" className="text-sm font-semibold ">
                                        State
                                    </label>
                                    <Input
                                        id="state"
                                        placeholder="NY"
                                        value={form.state}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="country" className="text-sm font-semibold ">
                                        Country
                                    </label>
                                    <Input
                                        id="country"
                                        placeholder="USA"
                                        value={form.country}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Row 3: Latitude & Longitude */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="latitude" className="text-sm font-semibold ">
                                        Latitude
                                    </label>
                                    <Input
                                        id="latitude"
                                        type="number"
                                        step="any"
                                        placeholder="40.7128"
                                        value={form.latitude}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="longitude" className="text-sm font-semibold ">
                                        Longitude
                                    </label>
                                    <Input
                                        id="longitude"
                                        type="number"
                                        step="any"
                                        placeholder="-74.0060"
                                        value={form.longitude}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Developer Information */}
                    <div className=" backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="bg-[#0FB9A8] text-white rounded-t-lg p-4">
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
                                <Input
                                    id="developerName"
                                    placeholder="Prestige Developers"
                                    value={form.developerName}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="developerWebsite" className="text-sm font-semibold ">
                                    Website
                                </label>
                                <Input
                                    id="developerWebsite"
                                    type="url"
                                    placeholder="https://prestigedevelopers.com"
                                    value={form.developerWebsite}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label htmlFor="developerDescription" className="text-sm font-semibold ">
                                    Description
                                </label>
                                <Textarea
                                    id="developerDescription"
                                    placeholder="Leading luxury real estate developer..."
                                    rows={3}
                                    value={form.developerDescription}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label htmlFor="developerLogo" className="text-sm font-semibold ">
                                    Logo URL or Upload
                                </label>
                                <Input
                                    id="developerLogo"
                                    type="url"
                                    placeholder="https://example.com/logo.png"
                                    value={form.developerLogo}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                                <div className="mt-2">
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/jpg"
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                        onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                                handleDeveloperLogoFileChange(e.target.files[0]);
                                            }
                                        }}
                                        disabled={uploading}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project Timeline */}
                    <div className=" backdrop-blur-sm rounded-lg shadow-lg border overflow-visible">
                        <div className="bg-[#0FB9A8] text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaCalendarAlt className="w-5 h-5" />
                                Project Timeline & Status
                            </h2>
                        </div>
                        <div className="p-6 overflow-visible">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label htmlFor="projectStatus" className="text-sm font-semibold ">Project Status</label>
                                    <div className="relative">
                                        <Button
                                            type="button"
                                            className="w-full px-4 pr-12 pl-4 py-3.5 border rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-[#0FB9A8] transition"
                                            onClick={() => setStatusDropdownOpen(open => !open)}
                                            variant="default"
                                        >
                                            <span className="w-full text-left">
                                                {form.projectStatus
                                                    ? projectStatusOptions.find(opt => opt.value === form.projectStatus)?.label
                                                    : "Select status"}
                                            </span>
                                            <span className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 transition-transform ${statusDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                                        </Button>
                                        {statusDropdownOpen && (
                                            <div className="absolute z-[9999] mt-1 w-full bg-white border border-gray-200 rounded shadow-lg animate-fade-in max-h-48 overflow-y-auto">
                                                {projectStatusOptions.map(option => (
                                                    <div
                                                        key={option.value}
                                                        className={`px-4 py-2 cursor-pointer hover:bg-[#0FB9A8]/10 ${form.projectStatus === option.value ? 'bg-[#0FB9A8]/20 font-semibold text-[#0FB9A8]' : ''}`}
                                                        onClick={() => {
                                                            handleChange({
                                                                target: { id: 'projectStatus', value: option.value, name: 'projectStatus' }
                                                            } as any);
                                                            setStatusDropdownOpen(false);
                                                        }}
                                                    >
                                                        {option.label}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subcategory" className="text-sm font-semibold ">Subcategory</label>
                                    <div className="relative">
                                        <Button
                                            type="button"
                                            className="w-full px-4 pr-12 pl-4 py-3.5 border rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-[#0FB9A8] transition"
                                            onClick={() => setSubcategoryDropdownOpen(open => !open)}
                                            variant="default"
                                        >
                                            <span className="w-full text-left">
                                                {form.subcategory
                                                    ? subcategoryOptions.find(opt => opt.value === form.subcategory)?.label
                                                    : "Select subcategory"}
                                            </span>
                                            <span className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 transition-transform ${subcategoryDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                                        </Button>
                                        {subcategoryDropdownOpen && (
                                            <div className="absolute z-[9999] mt-1 w-full bg-white border border-gray-200 rounded shadow-lg animate-fade-in max-h-48 overflow-y-auto">
                                                {subcategoryOptions.map(option => (
                                                    <div
                                                        key={option.value}
                                                        className={`px-4 py-2 cursor-pointer hover:bg-[#0FB9A8]/10 ${form.subcategory === option.value ? 'bg-[#0FB9A8]/20 font-semibold text-[#0FB9A8]' : ''}`}
                                                        onClick={() => {
                                                            handleChange({
                                                                target: { id: 'subcategory', value: option.value, name: 'subcategory' }
                                                            } as any);
                                                            setSubcategoryDropdownOpen(false);
                                                        }}
                                                    >
                                                        {option.label}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="startDate" className="text-sm font-semibold ">
                                        Start Date
                                    </label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        value={form.startDate}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="completionDate" className="text-sm font-semibold ">
                                        Completion Date
                                    </label>
                                    <Input
                                        id="completionDate"
                                        type="date"
                                        value={form.completionDate}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 mt-6">
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
                        <div className="bg-[#0FB9A8] text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaDollarSign className="w-5 h-5" />
                                Pricing & Area Details
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Area inputs row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="totalArea" className="text-sm font-semibold ">
                                        Total Area (sq.ft)
                                    </label>
                                    <Input
                                        id="totalArea"
                                        type="number"
                                        placeholder="100,000"
                                        value={form.totalArea}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="sellableArea" className="text-sm font-semibold ">
                                        Sellable Area (sq.ft)
                                    </label>
                                    <Input
                                        id="sellableArea"
                                        type="number"
                                        placeholder="80,000"
                                        value={form.sellableArea}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Price inputs row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="priceMin" className="text-sm font-semibold ">
                                        Min Price
                                    </label>
                                    <Input
                                        id="priceMin"
                                        type="number"
                                        placeholder="800,000"
                                        value={form.priceMin}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="priceMax" className="text-sm font-semibold ">
                                        Max Price
                                    </label>
                                    <Input
                                        id="priceMax"
                                        type="number"
                                        placeholder="2,500,000"
                                        value={form.priceMax}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Statistics */}
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border border-gray-200">
                        <div className="bg-gradient-to-r from-[#0FB9A8] to-[#0DA695] text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaChartBar className="w-5 h-5" />
                                Project Statistics
                            </h2>
                        </div>
                        <div className="p-6 bg-white/50 space-y-6">
                            {/* Row 1: Total Units & Sold Units */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="totalUnits" className="text-sm font-semibold text-gray-700">
                                        Total Units
                                    </label>
                                    <Input
                                        id="totalUnits"
                                        type="number"
                                        placeholder="50"
                                        value={form.totalUnits}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 focus:border-[#0FB9A8] focus:ring-[#0FB9A8] transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="soldUnits" className="text-sm font-semibold text-gray-700">
                                        Sold Units
                                    </label>
                                    <Input
                                        id="soldUnits"
                                        type="number"
                                        placeholder="30"
                                        value={form.soldUnits}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 focus:border-[#0FB9A8] focus:ring-[#0FB9A8] transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Row 2: Reserved & Available */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="reservedUnits" className="text-sm font-semibold text-gray-700">
                                        Reserved
                                    </label>
                                    <Input
                                        id="reservedUnits"
                                        type="number"
                                        placeholder="5"
                                        value={form.reservedUnits}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 focus:border-[#0FB9A8] focus:ring-[#0FB9A8] transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="availableUnits" className="text-sm font-semibold text-gray-700">
                                        Available
                                    </label>
                                    <Input
                                        id="availableUnits"
                                        type="number"
                                        placeholder="15"
                                        value={form.availableUnits}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 focus:border-[#0FB9A8] focus:ring-[#0FB9A8] transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Row 3: Views & Inquiries */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="views" className="text-sm font-semibold text-gray-700">
                                        Views
                                    </label>
                                    <Input
                                        id="views"
                                        type="number"
                                        placeholder="1,200"
                                        value={form.views}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 focus:border-[#0FB9A8] focus:ring-[#0FB9A8] transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="inquiries" className="text-sm font-semibold text-gray-700">
                                        Inquiries
                                    </label>
                                    <Input
                                        id="inquiries"
                                        type="number"
                                        placeholder="85"
                                        value={form.inquiries}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 focus:border-[#0FB9A8] focus:ring-[#0FB9A8] transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Images & Media */}
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="bg-[#0FB9A8] text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaCamera className="w-5 h-5" />
                                Images & Media
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="mainImageUrl" className="text-sm font-semibold ">
                                    Main Image URL or Upload
                                </label>
                                <Input
                                    id="mainImageUrl"
                                    type="url"
                                    placeholder="https://example.com/main-image.jpg"
                                    value={form.mainImageUrl}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                                <div className="mt-2">
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/jpg"
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                                        onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                                handleMainImageFileChange(e.target.files[0]);
                                            }
                                        }}
                                        disabled={uploading}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="galleryImages" className="text-sm font-semibold ">
                                    Gallery Images (comma separated URLs)
                                </label>
                                <Textarea
                                    id="galleryImages"
                                    placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg, https://example.com/img3.jpg"
                                    rows={3}
                                    value={form.galleryImages}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Floors Section */}
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="bg-[#0FB9A8] text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FaBuilding className="w-5 h-5" />
                                Floor Details
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            {floors.map((floor, idx) => (
                                <div key={idx} className="border p-4 rounded-lg mb-4 ">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input id="name" placeholder="Name" value={floor.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFloorChange(idx, e)} className="w-full" />
                                        <Input id="floorNumber" type="number" placeholder="Floor Number" value={floor.floorNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFloorChange(idx, e)} className="w-full" />
                                        <Input id="floorPlanUrl" placeholder="Floor Plan URL" value={floor.floorPlanUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFloorChange(idx, e)} className="w-full" />
                                        <Input id="totalUnits" type="number" placeholder="Total Units" value={floor.totalUnits} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFloorChange(idx, e)} className="w-full" />
                                        <Input id="pricePerSqFt" type="number" placeholder="Price Per SqFt" value={floor.pricePerSqFt} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFloorChange(idx, e)} className="w-full" />
                                        <Input id="minPrice" type="number" placeholder="Min Price" value={floor.minPrice} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFloorChange(idx, e)} className="w-full" />
                                        <Input id="maxPrice" type="number" placeholder="Max Price" value={floor.maxPrice} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFloorChange(idx, e)} className="w-full" />
                                        <Input id="totalSquareFootage" type="number" placeholder="Total Square Footage" value={floor.totalSquareFootage} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFloorChange(idx, e)} className="w-full" />
                                        {/* New fields for min/max sqft buy */}
                                        <Input id="minSqftBuy" type="number" placeholder="Minimum Sqft Buy" value={floor.minSqftBuy || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFloorChange(idx, e)} className="w-full" />
                                        <Input id="maxSqftBuy" type="number" placeholder="Maximum Sqft Buy" value={floor.maxSqftBuy || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFloorChange(idx, e)} className="w-full" />
                                    </div>

                                    {/* Description row */}
                                    <div className="mt-4">
                                        <Textarea id="description" placeholder="Description" value={floor.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFloorChange(idx, e)} className="w-full" />
                                    </div>

                                    {/* Specifications row */}
                                    <div className="mt-4">
                                        <Textarea id="specifications" placeholder="Specifications (comma separated)" value={floor.specifications} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFloorSpecChange(idx, "specifications", e.target.value)} className="w-full" />
                                    </div>

                                    {/* Features row */}
                                    <div className="mt-4">
                                        <Textarea id="features" placeholder="Features (comma separated)" value={floor.features} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFloorSpecChange(idx, "features", e.target.value)} className="w-full" />
                                    </div>
                                </div>
                            ))}
                            <Button
                                type="button"
                                className="mt-2 flex items-center justify-center"
                                onClick={addFloor}
                                variant="default"
                            >
                                <span className="w-full text-center">Add Floor</span>
                            </Button>
                        </div>
                    </div>

                    {/* Token Information */}
                    <div className=" backdrop-blur-sm rounded-lg shadow-lg border">
                        <div className="bg-[#0FB9A8] text-white rounded-t-lg p-4">
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
                                <Input
                                    id="tokenName"
                                    placeholder="GlobeHouseToken"
                                    value={form.tokenName}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="tokenSymbol" className="text-sm font-semibold ">
                                    Token Symbol
                                </label>
                                <Input
                                    id="tokenSymbol"
                                    placeholder="GHT"
                                    value={form.tokenSymbol}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="tokenSupply" className="text-sm font-semibold ">
                                    Token Supply
                                </label>
                                <Input
                                    id="tokenSupply"
                                    type="number"
                                    placeholder="1"
                                    value={form.tokenSupply}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="pricePerToken" className="text-sm font-semibold ">
                                    Price Per Token (PKR)
                                </label>
                                <Input
                                    id="pricePerToken"
                                    type="number"
                                    placeholder="120,000,000"
                                    value={form.pricePerToken}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label htmlFor="walletAddress" className="text-sm font-semibold ">
                                    Wallet Address
                                </label>
                                <Input
                                    id="walletAddress"
                                    placeholder="User's Phantom Wallet Address"
                                    value={form.walletAddress}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Add FAQs Section */}
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border mt-8">
                        <div className="bg-[#0FB9A8] text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                FAQs
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="border p-4 rounded-lg mb-4">
                                    {/* Question row */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                                        <div className="flex-1 space-y-2">
                                            <label className="text-sm font-semibold">Question</label>
                                            <Input
                                                placeholder="Enter FAQ question"
                                                value={faq.question}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFaqChange(idx, "question", e.target.value)}
                                                className="w-full"
                                            />
                                        </div>
                                        {faqs.length > 1 && (
                                            <div className="w-full flex justify-center md:w-auto md:block">
                                            <Button
                                                type="button"
                                                className="mt-6 md:mt-0 flex items-center justify-center"
                                                onClick={() => removeFaq(idx)}
                                                variant="default"
                                            >
                                                Remove
                                            </Button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Answer row */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold">Answer</label>
                                        <Textarea
                                            placeholder="Enter FAQ answer"
                                            rows={2}
                                            value={faq.answer}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFaqChange(idx, "answer", e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            ))}
                            <Button
                                type="button"
                                className="mt-2 flex items-center justify-center"
                                onClick={addFaq}
                                variant="default"
                            >
                                <span className="w-full text-center">Add FAQ</span>
                            </Button>
                        </div>
                    </div>

                    {/* Documents Section */}
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border mt-8">
                        <div className="bg-[#0FB9A8] text-white rounded-t-lg p-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                Documents
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            {documents.map((doc, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                                    <div className="flex-1 space-y-2">
                                        <label className="text-sm font-semibold">Document URL or Upload</label>
                                        <Input
                                            type="text"
                                            placeholder="Enter document URL"
                                            value={doc}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDocumentChange(idx, e.target.value)}
                                            className="w-full"
                                        />
                                        <div className="mt-2">
                                            <input
                                                type="file"
                                                accept="application/pdf,image/png,image/jpeg,image/jpg"
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                onChange={e => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        handleDocumentFileChange(idx, e.target.files[0]);
                                                    }
                                                }}
                                                disabled={uploading}
                                            />
                                        </div>
                                    </div>
                                    {documents.length > 1 && (
                                        <div className="w-full flex justify-center md:w-auto md:block">
                                            <Button
                                                type="button"
                                                className="mt-6 md:mt-0 flex items-center justify-center"
                                                onClick={() => removeDocument(idx)}
                                                variant="default"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Button
                                type="button"
                                className="mt-2 flex items-center justify-center"
                                onClick={addDocument}
                                variant="default"
                            >
                                <span className="w-full text-center">Add Document</span>
                            </Button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-6">
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                            disabled={loading || uploading}
                            variant="default"
                        >
                            <span className="w-full text-center">{loading || uploading ? "Processing..." : "Submit"}</span>
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}