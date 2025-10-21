"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
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
import { getRequest } from "@/app/utils/requests";
import { getAxiosInstance } from "@/lib/axios";

// Types for form and floor (unchanged)
interface FileWithPreview extends File {
    preview?: string;
}

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
    roi?: number;
    // totalInvestment?: number;
}

interface FormState {
    propertyName: string;
    category: string;
    subcategory: string;
    description: string;
    address: string;
    city: string;
    roi: number | null;
    // totalInvestment: number | null;
    state: string;
    country: string;
    latitude: string;
    longitude: string;
    developerName: string;
    developerWebsite: string;
    developerDescription: string;
    // developerLogo: string;
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
    customer: string;
    bankDetails?: {
        bankName: string;
        accountNumber: string;
        accountTitle: string;
        iban?: string | null;
    }
}

const folderPath = `projects/globe_residency`;


function useGlobeResidencyForm(project?: any, rawSlug?: string) {
    console.log("Initializing GlobeResidencyForm with project:", project, "and rawSlug:", rawSlug);

    const initialFormState: FormState = {
        propertyName: "",
        category: "",
        subcategory: "",
        description: "",
        address: "",
        roi: null,
        // totalInvestment: null,
        city: "",
        state: "",
        country: "",
        latitude: "",
        longitude: "",
        developerName: "",
        developerWebsite: "",
        developerDescription: "",
        // developerLogo: "",
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
        customer: "",
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


    const [form, setForm] = useState<FormState>(initialFormState);
    const [floors, setFloors] = useState<Floor[]>([initialFloor]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [selectedGalleryImages, setSelectedGalleryImages] = useState<FileWithPreview[]>([]);

    function mapProjectToFloors(project: any): Floor[] {
        if (!project.floors || !Array.isArray(project.floors)) {
            return [initialFloor];
        }
        return project.floors.map((floor: any) => ({
            ...initialFloor,
            name: floor.name || initialFloor.name,
            description: floor.description || initialFloor.description,
            floorNumber: floor.floorNumber?.toString() || initialFloor.floorNumber,
            floorPlanUrl: floor.floorPlanUrl || initialFloor.floorPlanUrl,
            totalUnits: floor.totalUnits?.toString() || initialFloor.totalUnits,
            pricePerSqFt: floor.pricePerSqFt?.toString() || initialFloor.pricePerSqFt,
            minPrice: floor.minPrice?.toString() || initialFloor.minPrice,
            maxPrice: floor.maxPrice?.toString() || initialFloor.maxPrice,
            totalSquareFootage: floor.totalSquareFootage?.toString() || initialFloor.totalSquareFootage,
            specifications: floor.specifications?.join(", ") || initialFloor.specifications,
            features: floor.features?.join(", ") || initialFloor.features,
        }));
    }


    function mapProjectToFormState(project: any): FormState {
        console.log("Mapping project to form state:", project);
        return {
            ...initialFormState,
            propertyName: project?.name || initialFormState.propertyName,
            description: project.description || initialFormState.description,
            address: project.location?.address || initialFormState.address,
            city: project.location?.city || initialFormState.city,
            state: project.location?.state || initialFormState.state,
            country: project.location?.country || initialFormState.country,
            latitude: project.location?.coordinates?.latitude?.toString() || initialFormState.latitude,
            longitude: project.location?.coordinates?.longitude?.toString() || initialFormState.longitude,
            roi: project.roi ?? initialFormState.roi, // note: project.roi might be 0, so we use nullish coalescing
            developerName: project.developer?.name || initialFormState.developerName,
            developerWebsite: project.developer?.website || initialFormState.developerWebsite,
            developerDescription: project.developer?.description || initialFormState.developerDescription,
            // developerLogo: project.developer?.logoUrl || initialFormState.developerLogo,
            projectStatus: project.status || initialFormState.projectStatus,
            category: project.category || initialFormState.category,
            subcategory: project.subcategory || initialFormState.subcategory,
            featured: project.featured || initialFormState.featured,
            startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : initialFormState.startDate,
            completionDate: project.completionDate ? new Date(project.completionDate).toISOString().split('T')[0] : initialFormState.completionDate,
            totalArea: project.totalArea?.toString() || initialFormState.totalArea,
            sellableArea: project.sellableArea?.toString() || initialFormState.sellableArea,
            priceMin: project.priceRange?.min?.toString() || initialFormState.priceMin,
            priceMax: project.priceRange?.max?.toString() || initialFormState.priceMax,
            totalUnits: project.totalUnits?.toString() || initialFormState.totalUnits,
            soldUnits: project.soldUnits?.toString() || initialFormState.soldUnits,
            reservedUnits: project.reservedUnits?.toString() || initialFormState.reservedUnits,
            availableUnits: project.availableUnits?.toString() || initialFormState.availableUnits,
            views: project.views?.toString() || initialFormState.views,
            inquiries: project.inquiries?.toString() || initialFormState.inquiries,
            mainImageUrl: project.mainImageUrl || initialFormState.mainImageUrl,
            galleryImages: "", // we are not using this field for now
            amenities: project.amenities?.join(", ") || initialFormState.amenities,
            tokenName: project.token?.name || initialFormState.tokenName,
            tokenSymbol: project.token?.symbol || initialFormState.tokenSymbol,
            tokenSupply: project.token?.supply?.toString() || initialFormState.tokenSupply,
            pricePerToken: project.token?.pricePerToken?.toString() || initialFormState.pricePerToken,
            walletAddress: project.token?.walletAddress || initialFormState.walletAddress,
            customer: project.customerId || initialFormState.customer,
            bankDetails: {
                bankName: project.bankDetails?.bankName || initialFormState?.bankDetails?.bankName,
                accountNumber: project.bankDetails?.accountNumber || initialFormState?.bankDetails?.accountNumber,
                accountTitle: project.bankDetails?.accountTitle || initialFormState?.bankDetails?.accountTitle,
                iban: project.bankDetails?.iban || initialFormState?.bankDetails?.iban,
            }
        };
    }


    function mapProjectToFaqs(project: any): { question: string; answer: string }[] {
        if (!project.faqs || !Array.isArray(project.faqs)) {
            return [{ question: "", answer: "" }];
        }
        return project.faqs.map((faq: any) => ({
            question: faq.question || "",
            answer: faq.answer || "",
        }));
    }

    function mapProjectToDocuments(project: any): string[] {
        if (!project.documents || !Array.isArray(project.documents)) {
            return [""];
        }
        return project.documents;
    }


    useEffect(() => {
        console.log("useEffect triggered with project:", project, project?.rawSlug);
        if (project?.rawSlug) {
            console.log("Mapping project data to form state for slug:", project?.rawSlug);
            setForm(mapProjectToFormState(project?.project));
            setFloors(mapProjectToFloors(project?.project));
            setFaqs(mapProjectToFaqs(project?.project));
            setDocuments(mapProjectToDocuments(project?.project));
            // Reset other states
            setError(null);
            setSuccess(false);
            setTouched({});
            setValidationErrors({});
        }
    }, [project, rawSlug]);


    // Shared function to handle file uploads
    const handleFileUpload = async (file: File, purpose: string): Promise<string | null> => {
        const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const sanitized = file.type;

        console.log("Uploading file:", safeFileName, "of type:", sanitized, "for purpose:", purpose);

        try {
            const presign = await getRequest(
                getAxiosInstance('/api'),
                `/api/upload_images?filename=${encodeURIComponent(safeFileName)}&mimetype=${encodeURIComponent(sanitized)}&folder=${encodeURIComponent(folderPath)}`
            );




            if (!presign || presign.status !== 'success' || !presign.url) {
                toast.error(`Failed to get upload URL for ${safeFileName}`);
                return null;
            }

            const uploadResp = await fetch(presign.url, {
                method: 'PUT',
                body: file,
                headers: { 'Content-Type': sanitized },
            });

            if (!uploadResp.ok) {
                toast.error(`Failed to upload ${safeFileName}`);
                return null;
            }

            const publicUrl = presign.url.split('?')[0];
            toast.success(`Successfully uploaded ${purpose}`);
            return publicUrl;
        } catch (error) {
            toast.error(`Error uploading ${purpose}: ${error}`);
            return null;
        }
    };

    const uploadGalleryImages = async () => {
        if (!selectedGalleryImages.length) return [];

        const uploadedUrls: string[] = [];

        try {
            // Upload each image in parallel
            const uploadPromises = selectedGalleryImages.map(async (file) => {
                // Create safe filename
                const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
                const sanitized = file.type;

                // Get presigned URL
                const presign = await getRequest(
                    getAxiosInstance('/api'),
                    `/api/upload_images?filename=${encodeURIComponent(safeFileName)}&mimetype=${encodeURIComponent(sanitized)}&folder=${encodeURIComponent(folderPath)}`
                );


                if (!presign || presign.status !== 'success' || !presign.url) {
                    throw new Error(`Failed to get upload URL for ${safeFileName}`);
                }

                // Upload the file
                const uploadResp = await fetch(presign.url, {
                    method: 'PUT',
                    body: file,
                    headers: { 'Content-Type': sanitized },
                });

                if (!uploadResp.ok) {
                    throw new Error(`Failed to upload ${safeFileName} (${uploadResp.status})`);
                }

                // Get the public URL
                const publicUrl = presign.url.split('?')[0];
                return publicUrl;
            });

            // Wait for all uploads to complete
            const results = await Promise.all(uploadPromises);
            uploadedUrls.push(...results);

            return uploadedUrls;
        } catch (error) {
            console.error('Error uploading gallery images:', error);
            throw new Error('Failed to upload one or more gallery images');
        }
    };
    const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([{ question: "", answer: "" }]);
    const [documents, setDocuments] = useState<string[]>([""]);
    const dispatch = useDispatch();

    // Memoized validation: only depends on a few fields
    // validation: require virtually every field
    useEffect(() => {
        const errs: Record<string, string> = {};

        // top-level fields
        if (!form.propertyName) errs.propertyName = "Property name is required.";
        if (!form.category) errs.category = "Category is required.";
        if (!form.subcategory) errs.subcategory = "Subcategory is required.";
        if (!form.description) errs.description = "Description is required.";
        if (!form.customer) errs.customer = "Customer is required.";
        if (!form.address) errs.address = "Address is required.";
        if (!form.city) errs.city = "City is required.";
        if (!form.state) errs.state = "State is required.";
        if (!form.country) errs.country = "Country is required.";
        if (!form.latitude) errs.latitude = "Latitude is required.";
        if (!form.longitude) errs.longitude = "Longitude is required.";
        if (form.roi === null || form.roi === undefined) errs.roi = "ROI is required.";
        // if (form.totalInvestment === null || form.totalInvestment === undefined) errs.totalInvestment = "Total investment is required.";


        // developer
        if (!form.developerName) errs.developerName = "Developer name is required.";
        if (!form.developerWebsite) errs.developerWebsite = "Developer website is required.";
        if (!form.developerDescription) errs.developerDescription = "Developer description is required.";
        // if (!form.developerLogo) errs.developerLogo = "Developer logo URL is required.";

        // timeline
        if (!form.projectStatus) errs.projectStatus = "Project status is required.";
        if (!form.startDate) errs.startDate = "Start date is required.";
        if (!form.completionDate) errs.completionDate = "Completion date is required.";

        // pricing/area
        if (!form.totalArea) errs.totalArea = "Total area is required.";
        if (!form.sellableArea) errs.sellableArea = "Sellable area is required.";
        if (!form.priceMin) errs.priceMin = "Min price is required.";
        if (!form.priceMax) errs.priceMax = "Max price is required.";

        // stats
        if (!form.totalUnits) errs.totalUnits = "Total units is required.";
        if (!form.soldUnits) errs.soldUnits = "Sold units is required.";
        if (!form.reservedUnits) errs.reservedUnits = "Reserved units is required.";
        if (!form.availableUnits) errs.availableUnits = "Available units is required.";

        // media
        if (!form.mainImageUrl) errs.mainImageUrl = "Main image URL is required.";
        if (!form.galleryImages) errs.galleryImages = "Gallery images are required.";

        // token
        if (!form.tokenName) errs.tokenName = "Token name is required.";
        if (!form.tokenSymbol) errs.tokenSymbol = "Token symbol is required.";
        if (!form.tokenSupply) errs.tokenSupply = "Token supply is required.";
        if (!form.pricePerToken) errs.pricePerToken = "Price per token is required.";
        if (!form.walletAddress) errs.walletAddress = "Contract address is required.";

        // bank details
        const bd = form.bankDetails ?? { bankName: "", accountNumber: "", accountTitle: "", iban: "" };
        if (!bd.bankName) errs.bankName = "Bank name is required.";
        if (!bd.accountNumber) errs.accountNumber = "Account number is required.";
        if (!bd.accountTitle) errs.accountTitle = "Account title is required.";

        // floors
        floors.forEach((f, idx) => {
            const prefix = `floor-${idx}-`;
            if (!f.name) errs[`${prefix}name`] = "Floor name is required.";
            if (!f.floorNumber) errs[`${prefix}floorNumber`] = "Floor number is required.";
            if (!f.totalUnits) errs[`${prefix}totalUnits`] = "Floor total units are required.";
            if (!f.pricePerSqFt && !f.minPrice) errs[`${prefix}price`] = "Floor price info is required.";
            if (!f.totalSquareFootage) errs[`${prefix}totalSquareFootage`] = "Floor square footage is required.";
        });

        // faqs
        faqs.forEach((q, idx) => {
            if (!q.question) errs[`faq-${idx}-question`] = "FAQ question is required.";
            if (!q.answer) errs[`faq-${idx}-answer`] = "FAQ answer is required.";
        });

        // documents should be optional, no validation
        documents.forEach((d, idx) => {

            if (d && typeof d !== "string") {
                errs[`document-${idx}`] = "Invalid document format.";
            }
        });



        setValidationErrors(errs);
    }, [
        form,
        floors,
        faqs,
        documents,
    ]);

    const isValid = useMemo(() => Object.keys(validationErrors).length === 0, [validationErrors]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { id, value, type } = e.target;
            setForm((prev) => ({
                ...prev,
                [id]:
                    id === "roi" || id === ""
                        ? value === "" ? null : Number(value)
                        : type === "checkbox"
                            ? (e.target as HTMLInputElement).checked
                            : value,
            }));
        },
        []
    );

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id } = e.target;
        setTouched((prev) => ({ ...prev, [id]: true }));
    }, []);

    const handleFloorBlur = useCallback((idx: number, field: string) => {
        setTouched((prev) => ({ ...prev, [`floor-${idx}-${field}`]: true }));
    }, []);

    const handleFaqBlur = useCallback((idx: number, field: 'question' | 'answer') => {
        setTouched((prev) => ({ ...prev, [`faq-${idx}-${field}`]: true }));
    }, []);

    const handleDocumentBlur = useCallback((idx: number) => {
        setTouched((prev) => ({ ...prev, [`document-${idx}`]: true }));
    }, []);

    const markAllTouched = useCallback(() => {
        const t: Record<string, boolean> = {};
        // mark top-level
        Object.keys(initialFormState).forEach((k) => (t[k] = true));
        // mark bank details
        t['bankName'] = true;
        t['accountNumber'] = true;
        t['accountTitle'] = true;
        // floors/faqs/documents
        floors.forEach((_, i) => {
            ['name', 'floorNumber', 'totalUnits', 'pricePerSqFt', 'minPrice', 'maxPrice', 'totalSquareFootage'].forEach((f) => (t[`floor-${i}-${f}`] = true));
        });
        faqs.forEach((_, i) => {
            t[`faq-${i}-question`] = true;
            t[`faq-${i}-answer`] = true;
        });
        documents.forEach((_, i) => (t[`document-${i}`] = true));
        setTouched(t);
    }, [floors, faqs, documents]);

    const handleFloorChange = useCallback((idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // use data-field attribute to avoid duplicate DOM ids across repeated floor items
        const target = e.target as HTMLInputElement & { dataset?: DOMStringMap };
        const field = (target.dataset && target.dataset.field) || target.id;
        const value = target.value;
        setFloors((prev) => prev.map((f, i) => (i === idx ? { ...f, [field]: value } : f)));
    }, []);

    const handleFloorSpecChange = useCallback((idx: number, field: "specifications" | "features", value: string) => {
        setFloors((prev) => prev.map((f, i) => (i === idx ? { ...f, [field]: value } : f)));
    }, []);

    const addFloor = useCallback(() => setFloors((prev) => [...prev, { ...initialFloor }]), []);

    const handleFaqChange = useCallback((idx: number, field: "question" | "answer", value: string) => {
        setFaqs((prev) => prev.map((f, i) => (i === idx ? { ...f, [field]: value } : f)));
    }, []);

    const addFaq = useCallback(() => setFaqs((prev) => [...prev, { question: "", answer: "" }]), []);
    const removeFaq = useCallback((idx: number) => setFaqs((prev) => prev.filter((_, i) => i !== idx)), []);

    const handleDocumentChange = useCallback((idx: number, value: string) => {
        setDocuments((prev) => prev.map((d, i) => (i === idx ? value : d)));
    }, []);

    const handleDocumentFileChange = useCallback((idx: number, file: File) => {
        setDocuments((prev) => prev.map((d, i) => (i === idx ? file.name : d)));
        // TODO: implement upload and replace with URL
    }, []);

    const addDocument = useCallback(() => setDocuments((prev) => [...prev, ""]), []);
    const removeDocument = useCallback((idx: number) => setDocuments((prev) => prev.filter((_, i) => i !== idx)), []);

    // Handle bank details change
    const handleBankDetailsChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setForm((prev) => {
            const existing = prev.bankDetails ?? { bankName: "", accountNumber: "", accountTitle: "", iban: "" };
            const updated: NonNullable<FormState['bankDetails']> = {
                bankName: existing.bankName || "",
                accountNumber: existing.accountNumber || "",
                accountTitle: existing.accountTitle || "",
                iban: existing.iban ?? "",
                // overwrite the field matching id
                ...(id === 'bankName' ? { bankName: value } : {}),
                ...(id === 'accountNumber' ? { accountNumber: value } : {}),
                ...(id === 'accountTitle' ? { accountTitle: value } : {}),
                ...(id === 'iban' ? { iban: value } : {}),
            };
            return { ...prev, bankDetails: updated };
        });
    }, []);

    const resetAll = useCallback(() => {
        setForm(initialFormState);
        setFloors([initialFloor]);
        setFaqs([{ question: "", answer: "" }]);
        // image uploads shuold reset
        setSelectedGalleryImages([]);
        setDocuments([""]);
        setError(null);
        setLoading(false);
        setSuccess(false);
        // clear touched and validation errors so UI doesn't show validation after reset
        setTouched({});
        setValidationErrors({});
    }, []);

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (loading) return;
            // mark everything touched so errors show
            markAllTouched();
            setLoading(true);
            setError(null);
            setSuccess(false);

            if (!isValid) {
                setError("Please fill all required required fields. See highlighted errors.");
                setLoading(false);
                return;
            }

            try {
                // First upload gallery images
                let galleryUrls: string[] = [];
                if (selectedGalleryImages.length > 0) {
                    try {
                        toast.loading('Uploading gallery images...');
                        galleryUrls = await uploadGalleryImages();
                        toast.success('Gallery images uploaded successfully');
                    } catch (error) {
                        const msg = error instanceof Error ? error.message : 'Failed to upload gallery images';
                        toast.error(msg);
                        setError(msg);
                        setLoading(false);
                        return;
                    }
                }

                const payload = {
                    name: form.propertyName,
                    description: form.description,
                    location: {
                        address: form.address,
                        city: form.city,
                        state: form.state,
                        country: form.country,
                        roi: Number(form.roi) || 0,
                        // totalInvestment: Number(form.totalInvestment) || 0,
                        coordinates: { latitude: Number(form.latitude) || 0, longitude: Number(form.longitude) || 0 },
                    },
                    developer: { name: form.developerName, description: form.developerDescription, website: form.developerWebsite },
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
                    galleryImages: galleryUrls.length > 0 ? galleryUrls : [],
                    totalArea: Number(form.totalArea) || 0,
                    priceRange: { min: Number(form.priceMin) || 0, max: Number(form.priceMax) || 0 },
                    totalUnits: Number(form.totalUnits) || 0,
                    soldUnits: Number(form.soldUnits) || 0,
                    reservedUnits: Number(form.reservedUnits) || 0,
                    availableUnits: Number(form.availableUnits) || 0,
                    views: Number(form.views) || 0,
                    inquiries: Number(form.inquiries) || 0,
                    amenities: form.amenities ? form.amenities.split(",").map((s) => s.trim()) : [],
                    token: { name: form.tokenName, symbol: form.tokenSymbol, supply: Number(form.tokenSupply) || 0, pricePerToken: Number(form.pricePerToken) || 0, walletAddress: form.walletAddress },
                    faqs: faqs.filter((f) => f.question && f.answer),
                    documents: documents.filter((d) => d),
                    customerId: form.customer,
                    bankDetails: { bankName: form.bankDetails?.bankName || "", accountNumber: form.bankDetails?.accountNumber || "", accountTitle: form.bankDetails?.accountTitle || "", iban: form.bankDetails?.iban || null },
                    roi: 0,
                };

                // cast dispatch to any to avoid AsyncThunk typing issues in this file
                await (dispatch as any)(createProject(payload)).unwrap();

                // show success toast and reset form
                toast.success("Project created successfully.");
                resetAll();
                setSuccess(true);
            } catch (err: any) {
                const msg = err?.message || "Failed to create project.";
                setError(msg);
                toast.error(msg);
            } finally {
                setLoading(false);
            }
        },
        [dispatch, form, floors, faqs, documents, isValid, resetAll, loading, uploadGalleryImages, selectedGalleryImages]
    );

    return {
        form,
        setForm,
        floors,
        loading,
        success,
        error,
        touched,
        validationErrors,
        isValid,
        handleChange,
        handleBlur,
        handleFloorBlur,
        handleFaqBlur,
        handleDocumentBlur,
        handleFloorChange,
        handleFloorSpecChange,
        handleSubmit,
        addFloor,
        faqs,
        handleFaqChange,
        addFaq,
        removeFaq,
        documents,
        setDocuments,
        handleDocumentChange,
        handleDocumentFileChange,
        addDocument,
        removeDocument,
        handleBankDetailsChange,
        selectedGalleryImages,
        setSelectedGalleryImages,
        handleFileUpload,
        setFloors,
    };
}

export default function GlobeResidencyForm(project?: any, rawSlug?: string) {
    const {
        form,
        setForm,
        floors,
        loading,
        success,
        error,
        handleChange,
        touched,
        validationErrors,
        handleBlur,
        handleFloorBlur,
        handleFaqBlur,
        handleDocumentBlur,
        isValid,
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
        selectedGalleryImages,
        setSelectedGalleryImages,
        handleFileUpload,
        setFloors,
        setDocuments,
    } = useGlobeResidencyForm(project, rawSlug);

    const dispatch = useDispatch();
    // Select customers and their status from Redux store
    const { customers, loading: customerLoading, error: customerError } = useSelector(
        (state: any) => state.customer || { customers: [], loading: false, error: null }
    );
    console.log("Customers from Redux:", customers, "Loading:", customerLoading, "Error:", customerError);

    // Fetch customers when component mounts
    useEffect(() => {
        if (!customerLoading && customers.length === 0) {
            (dispatch as any)(fetchCustomers({ page: 1, limit: 50, search: '', status: '' }));
        }
    }, [customerLoading, customers.length, dispatch]);

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
        <div className="min-h-screen shadow-lg rounded-md py-8 px-4 ">
            <Toaster position="top-right" />
            <div className="max-w-6xl mx-auto">
                <div className="text-left mb-8">
                    <div className="gap-3 mb-4">
                        <h1 className="text-4xl font-bold text-left text-black dark:text-white">{rawSlug ? "Edit Project" : "Add Project"}</h1>
                    </div>
                </div>
                <form className="space-y-8" onSubmit={handleSubmit} autoComplete="off" noValidate>
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
                                <label htmlFor="propertyName" className="text-sm font-semibold dark:text-white">
                                    * Property Name
                                </label>
                                <input
                                    id="propertyName"
                                    placeholder=""
                                    className={`w-full p-2 border rounded outline-none  dark:bg-dark ${touched.propertyName && validationErrors.propertyName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'}`}
                                    value={form.propertyName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.propertyName && validationErrors.propertyName && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.propertyName}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="category" className="text-sm font-semibold dark:text-white">
                                    * Category
                                </label>
                                <select
                                    id="category"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.category && validationErrors.category ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'}`}
                                    value={form.category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Select category</option>
                                    <option value="residential">Residential</option>
                                    <option value="commercial">Commercial</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="roi" className="text-sm font-semibold dark:text-white">
                                    * ROI (%)
                                </label>
                                <input
                                    id="roi"
                                    type="number"
                                    step="0.1"
                                    placeholder="5.5"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark  ${touched.roi && validationErrors.roi
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                        : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        }`}
                                    value={form.roi ?? ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.roi && validationErrors.roi && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.roi}</div>
                                )}
                            </div>
                            {/* <div className="space-y-2">
                                <label htmlFor="totalInvestment" className="text-sm font-semibold dark:text-white">
                                    * Total Investment
                                </label>
                                <input
                                    id="totalInvestment"
                                    type="number"
                                    placeholder="1000000"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark  ${touched.totalInvestment && validationErrors.totalInvestment
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                        : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        }`}
                                    value={form.totalInvestment ?? ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.totalInvestment && validationErrors.totalInvestment && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.totalInvestment}</div>
                                )}
                            </div> */}
                            <div className="space-y-2">
                                <label htmlFor="subcategory" className="text-sm font-semibold dark:text-white">
                                    * Subcategory
                                </label>
                                <select
                                    id="subcategory"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark  ${touched.subcategory && validationErrors.subcategory ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500'}`}
                                    value={form.subcategory}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Select subcategory</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="villa">Villa</option>
                                    <option value="office">Office</option>
                                    <option value="retail">Retail</option>
                                    <option value="townhouse">Townhouse</option>
                                </select>
                                {touched.subcategory && validationErrors.subcategory && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.subcategory}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="customer" className="text-sm font-semibold dark:text-white">
                                    * Customer
                                </label>
                                <select
                                    id="customer"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark  ${touched.customer && validationErrors.customer ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'}`}
                                    value={form.customer}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={customerLoading}
                                >
                                    <option value="">Select customer</option>
                                    {/* Fix: support both customers.customers and customers as array */}
                                    {(Array.isArray(customers?.customers) ? customers.customers : Array.isArray(customers) ? customers : []).map((customer: any) => (
                                        <option key={customer._id} value={customer._id}>
                                            {customer.name || customer.email || customer._id}
                                        </option>
                                    ))}
                                </select>
                                {touched.customer && validationErrors.customer && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.customer}</div>
                                )}
                                {customerLoading && <div className="text-sm text-gray-500 mt-1">Loading customers...</div>}
                                {/* {customerError && <div className="text-sm text-red-600 mt-1">{customerError}</div>} */}
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label htmlFor="description" className="text-sm font-semibold dark:text-white">
                                    * Description
                                </label>
                                <textarea
                                    id="description"
                                    placeholder=" "
                                    rows={3}
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark  ${touched.description && validationErrors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'}`}
                                    value={form.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.description && validationErrors.description && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.description}</div>
                                )}
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
                                <label htmlFor="address" className="text-sm font-semibold dark:text-white">
                                    * Address
                                </label>
                                <input
                                    id="address"
                                    placeholder="123 Main Street"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.address && validationErrors.address ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500'}`}
                                    value={form.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.address && validationErrors.address && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.address}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="city" className="text-sm font-semibold dark:text-white">
                                    * City
                                </label>
                                <input
                                    id="city"
                                    placeholder="Lahore"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.city && validationErrors.city ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500'}`}
                                    value={form.city}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.city && validationErrors.city && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.city}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="state" className="text-sm font-semibold dark:text-white">
                                    * State
                                </label>
                                <input
                                    id="state"
                                    placeholder=""
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.state && validationErrors.state ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500'}`}
                                    value={form.state}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.state && validationErrors.state && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.state}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="country" className="text-sm font-semibold dark:text-white">
                                    * Country
                                </label>
                                <input
                                    id="country"
                                    placeholder="Pakistan"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.country && validationErrors.country ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500'}`}
                                    value={form.country}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.country && validationErrors.country && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.country}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="latitude" className="text-sm font-semibold dark:text-white">
                                    * Latitude
                                </label>
                                <input
                                    id="latitude"
                                    type="number"
                                    step="any"
                                    placeholder="40.7128"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.latitude && validationErrors.latitude ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500'}`}
                                    value={form.latitude}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.latitude && validationErrors.latitude && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.latitude}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="longitude" className="text-sm font-semibold dark:text-white">
                                    * Longitude
                                </label>
                                <input
                                    id="longitude"
                                    type="number"
                                    step="any"
                                    placeholder="-74.0060"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.longitude && validationErrors.longitude ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500'}`}
                                    value={form.longitude}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.longitude && validationErrors.longitude && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.longitude}</div>
                                )}
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
                                <label htmlFor="developerName" className="text-sm font-semibold dark:text-white">
                                    * Developer Name
                                </label>
                                <input
                                    id="developerName"
                                    placeholder=" "
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.developerName && validationErrors.developerName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500'}`}
                                    value={form.developerName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.developerName && validationErrors.developerName && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.developerName}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="developerWebsite" className="text-sm font-semibold dark:text-white">
                                    * Website
                                </label>
                                <input
                                    id="developerWebsite"
                                    type="url"
                                    placeholder="https://prestigedevelopers.com"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.developerWebsite && validationErrors.developerWebsite ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500'}`}
                                    value={form.developerWebsite}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.developerWebsite && validationErrors.developerWebsite && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.developerWebsite}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="developerDescription" className="text-sm font-semibold dark:text-white">
                                    * Description
                                </label>
                                <textarea
                                    id="developerDescription"
                                    placeholder=" "
                                    rows={3}
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.developerDescription && validationErrors.developerDescription ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500'}`}
                                    value={form.developerDescription}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.developerDescription && validationErrors.developerDescription && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.developerDescription}</div>
                                )}
                            </div>
                            {/* <div className="space-y-2">
                                <label htmlFor="developerLogo" className="text-sm font-semibold dark:text-white">
                                    * Logo URL
                                </label>
                                <input
                                    id="developerLogo"
                                    type="url"
                                    placeholder="https://example.com/logo.png"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.developerLogo && validationErrors.developerLogo ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500'}`}
                                    value={form.developerLogo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.developerLogo && validationErrors.developerLogo && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.developerLogo}</div>
                                )}
                            </div> */}
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
                                <label htmlFor="projectStatus" className="text-sm font-semibold dark:text-white">
                                    * Project Status
                                </label>
                                <select
                                    id="projectStatus"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.projectStatus && validationErrors.projectStatus ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500'}`}
                                    value={form.projectStatus}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Select status</option>
                                    <option value="under_construction">Under Construction</option>
                                    <option value="completed">Completed</option>
                                    <option value="planning">Planning</option>
                                </select>
                                {touched.projectStatus && validationErrors.projectStatus && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.projectStatus}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="startDate" className="text-sm font-semibold dark:text-white">
                                    * Start Date
                                </label>
                                <input
                                    id="startDate"
                                    type="date"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.startDate && validationErrors.startDate ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500'}`}
                                    value={form.startDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.startDate && validationErrors.startDate && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.startDate}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="completionDate" className="text-sm font-semibold dark:text-white">
                                    * Expected Completion Date
                                </label>
                                <input
                                    id="completionDate"
                                    type="date"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.completionDate && validationErrors.completionDate ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500'}`}
                                    value={form.completionDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.completionDate && validationErrors.completionDate && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.completionDate}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold dark:text-white">Featured Property</label>
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
                                <label htmlFor="totalArea" className="text-sm font-semibold dark:text-white">
                                    * Total Area (sq.ft)
                                </label>
                                <input
                                    id="totalArea"
                                    type="number"
                                    placeholder="100,000"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.totalArea && validationErrors.totalArea ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500'}`}
                                    value={form.totalArea}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.totalArea && validationErrors.totalArea && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.totalArea}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="sellableArea" className="text-sm font-semibold dark:text-white">
                                    * Sellable Area (sq.ft)
                                </label>
                                <input
                                    id="sellableArea"
                                    type="number"
                                    placeholder="80,000"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.sellableArea && validationErrors.sellableArea ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500'}`}
                                    value={form.sellableArea}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.sellableArea && validationErrors.sellableArea && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.sellableArea}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="priceMin" className="text-sm font-semibold dark:text-white">
                                    * Min Price
                                </label>
                                <input
                                    id="priceMin"
                                    type="number"
                                    placeholder="800,000"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.priceMin && validationErrors.priceMin ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500'}`}
                                    value={form.priceMin}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.priceMin && validationErrors.priceMin && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.priceMin}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="priceMax" className="text-sm font-semibold dark:text-white">
                                    * Max Price
                                </label>
                                <input
                                    id="priceMax"
                                    type="number"
                                    placeholder="2,500,000"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.priceMax && validationErrors.priceMax ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500'}`}
                                    value={form.priceMax}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.priceMax && validationErrors.priceMax && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.priceMax}</div>
                                )}
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
                                <label htmlFor="totalUnits" className="text-sm font-semibold dark:text-white">
                                    * Total Units
                                </label>
                                <input
                                    id="totalUnits"
                                    type="number"
                                    placeholder="50"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.totalUnits && validationErrors.totalUnits ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`}
                                    value={form.totalUnits}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.totalUnits && validationErrors.totalUnits && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.totalUnits}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="soldUnits" className="text-sm font-semibold dark:text-white">
                                    * Sold Units
                                </label>
                                <input
                                    id="soldUnits"
                                    type="number"
                                    placeholder="30"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.soldUnits && validationErrors.soldUnits ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`}
                                    value={form.soldUnits}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.soldUnits && validationErrors.soldUnits && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.soldUnits}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="reservedUnits" className="text-sm font-semibold dark:text-white">
                                    * Reserved
                                </label>
                                <input
                                    id="reservedUnits"
                                    type="number"
                                    placeholder="5"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.reservedUnits && validationErrors.reservedUnits ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`}
                                    value={form.reservedUnits}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.reservedUnits && validationErrors.reservedUnits && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.reservedUnits}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="availableUnits" className="text-sm font-semibold dark:text-white">
                                    * Available
                                </label>
                                <input
                                    id="availableUnits"
                                    type="number"
                                    placeholder="15"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.availableUnits && validationErrors.availableUnits ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`}
                                    value={form.availableUnits}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.availableUnits && validationErrors.availableUnits && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.availableUnits}</div>
                                )}
                            </div>
                            {/* <div className="space-y-2">
                                <label htmlFor="views" className="text-sm font-semibold dark:text-white">
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
                            </div> */}
                            {/* <div className="space-y-2">
                                <label htmlFor="inquiries" className="text-sm font-semibold dark:text-white">
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
                            </div> */}
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
                                <label htmlFor="mainImageUrl" className="text-sm font-semibold dark:text-white">
                                    * Main Image
                                </label>
                                <div className="flex flex-col gap-2">
                                    <input
                                        id="mainImageUpload"
                                        type="file"
                                        accept="image/*"
                                        onChange={async (e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                const file = e.target.files[0];
                                                const uploadedUrl = await handleFileUpload(file, 'main image');
                                                if (uploadedUrl) {
                                                    setForm(prev => ({
                                                        ...prev,
                                                        mainImageUrl: uploadedUrl
                                                    }));
                                                }
                                            }
                                        }}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                                    />
                                    {form.mainImageUrl && (
                                        <div className="relative w-24 h-24 group">
                                            <img
                                                src={form.mainImageUrl}
                                                alt="Main image preview"
                                                className="w-24 h-24 object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setForm(prev => ({
                                                        ...prev,
                                                        mainImageUrl: ''
                                                    }));
                                                }}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {touched.mainImageUrl && validationErrors.mainImageUrl && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.mainImageUrl}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="galleryImages" className="text-sm font-semibold dark:text-white">
                                    * Gallery Images
                                </label>
                                <div className="flex flex-col gap-4">
                                    <input
                                        id="galleryImages"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                const files = Array.from(e.target.files);

                                                // Upload each file as it's selected
                                                files.forEach(async (file) => {
                                                    const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
                                                    const sanitized = file.type;

                                                    try {
                                                        // Get presigned URL
                                                        const presign = await getRequest(
                                                            getAxiosInstance('/api'),
                                                            `/api/upload_images?filename=${encodeURIComponent(safeFileName)}&mimetype=${encodeURIComponent(sanitized)}&folder=${encodeURIComponent(folderPath)}`
                                                        );


                                                        if (!presign || presign.status !== 'success' || !presign.url) {
                                                            toast.error(`Failed to get upload URL for ${safeFileName}`);
                                                            return;
                                                        }

                                                        // Upload the file
                                                        const uploadResp = await fetch(presign.url, {
                                                            method: 'PUT',
                                                            body: file,
                                                            headers: { 'Content-Type': sanitized },
                                                        });

                                                        if (!uploadResp.ok) {
                                                            toast.error(`Failed to upload ${safeFileName}`);
                                                            return;
                                                        }

                                                        // Get the public URL
                                                        const publicUrl = presign.url.split('?')[0];

                                                        // Add the public URL to the form's gallery images
                                                        setForm(prev => ({
                                                            ...prev,
                                                            galleryImages: prev.galleryImages
                                                                ? prev.galleryImages + ',' + publicUrl
                                                                : publicUrl
                                                        }));

                                                        // Also update the preview images
                                                        const fileWithPreview = file as FileWithPreview;
                                                        fileWithPreview.preview = publicUrl;
                                                        setSelectedGalleryImages(prev => [...prev, fileWithPreview]);

                                                        toast.success(`Successfully uploaded ${safeFileName}`);
                                                    } catch (error) {
                                                        toast.error(`Error uploading ${safeFileName}: ${error}`);
                                                    }
                                                });
                                            }
                                        }}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                                    />
                                    {selectedGalleryImages.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {selectedGalleryImages.map((file, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-24 h-24 object-cover rounded"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const removedImage = selectedGalleryImages[index];
                                                            setSelectedGalleryImages(prev => prev.filter((_, i) => i !== index));

                                                            // Remove the URL from the form's gallery images
                                                            if (removedImage.preview) {
                                                                setForm(prev => ({
                                                                    ...prev,
                                                                    galleryImages: prev.galleryImages
                                                                        .split(',')
                                                                        .filter(url => url.trim() !== removedImage.preview)
                                                                        .join(',')
                                                                }));
                                                            }
                                                        }}
                                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {touched.galleryImages && validationErrors.galleryImages && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.galleryImages}</div>
                                )}
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
                                    <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor={`floor-${idx}-name`} className="text-sm font-semibold dark:text-white">* Floor Name</label>
                                            <input
                                                id={`floor-${idx}-name`}
                                                data-field="name"
                                                placeholder="Floor Name"
                                                className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched[`floor-${idx}-name`] && validationErrors[`floor-${idx}-name`] ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'}`}
                                                value={floor.name}
                                                onChange={(e) => handleFloorChange(idx, e)}
                                                onBlur={() => handleFloorBlur(idx, 'name')}
                                            />
                                            {touched[`floor-${idx}-name`] && validationErrors[`floor-${idx}-name`] && (
                                                <div className="text-sm text-red-600 mt-1">{validationErrors[`floor-${idx}-name`]}</div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor={`floor-${idx}-floorNumber`} className="text-sm font-semibold dark:text-white">* Floor Number</label>
                                            <input
                                                id={`floor-${idx}-floorNumber`}
                                                data-field="floorNumber"
                                                type="number"
                                                placeholder="Floor Number"
                                                className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched[`floor-${idx}-floorNumber`] && validationErrors[`floor-${idx}-floorNumber`] ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'}`}
                                                value={floor.floorNumber}
                                                onChange={(e) => handleFloorChange(idx, e)}
                                                onBlur={() => handleFloorBlur(idx, 'floorNumber')}
                                            />
                                            {touched[`floor-${idx}-floorNumber`] && validationErrors[`floor-${idx}-floorNumber`] && (
                                                <div className="text-sm text-red-600 mt-1">{validationErrors[`floor-${idx}-floorNumber`]}</div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor={`floor-${idx}-floorPlanUrl`} className="text-sm font-semibold dark:text-white">Floor Plan</label>
                                            <div className="flex flex-col gap-2">
                                                <input
                                                    id={`floor-${idx}-floorPlanUpload`}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={async (e) => {
                                                        if (e.target.files && e.target.files[0]) {
                                                            const file = e.target.files[0];
                                                            const uploadedUrl = await handleFileUpload(file, `floor ${idx + 1} plan`);
                                                            if (uploadedUrl) {
                                                                setFloors((prev: Floor[]) => prev.map((f: Floor, i: number) =>
                                                                    i === idx ? { ...f, floorPlanUrl: uploadedUrl } : f
                                                                ));
                                                            }
                                                        }
                                                    }}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                />
                                                {floor.floorPlanUrl && (
                                                    <div className="relative w-24 h-24 group">
                                                        <img
                                                            src={floor.floorPlanUrl}
                                                            alt={`Floor ${idx + 1} plan preview`}
                                                            className="w-24 h-24 object-cover rounded"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setFloors(prev => prev.map((f, i) =>
                                                                    i === idx ? { ...f, floorPlanUrl: '' } : f
                                                                ));
                                                            }}
                                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            {touched[`floor-${idx}-floorPlanUrl`] && validationErrors[`floor-${idx}-floorPlanUrl`] && (
                                                <div className="text-sm text-red-600 mt-1">{validationErrors[`floor-${idx}-floorPlanUrl`]}</div>
                                            )}
                                        </div>                                        <div className="space-y-2">
                                            <label htmlFor={`floor-${idx}-totalUnits`} className="text-sm font-semibold dark:text-white">* Total Units</label>
                                            <input
                                                id={`floor-${idx}-totalUnits`}
                                                data-field="totalUnits"
                                                type="number"
                                                placeholder="Total Units"
                                                className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched[`floor-${idx}-totalUnits`] && validationErrors[`floor-${idx}-totalUnits`] ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'}`}
                                                value={floor.totalUnits}
                                                onChange={(e) => handleFloorChange(idx, e)}
                                                onBlur={() => handleFloorBlur(idx, 'totalUnits')}
                                            />
                                            {touched[`floor-${idx}-totalUnits`] && validationErrors[`floor-${idx}-totalUnits`] && (
                                                <div className="text-sm text-red-600 mt-1">{validationErrors[`floor-${idx}-totalUnits`]}</div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor={`floor-${idx}-minPrice`} className="text-sm font-semibold dark:text-white">Min Price</label>
                                            <input
                                                id={`floor-${idx}-minPrice`}
                                                data-field="minPrice"
                                                type="number"
                                                placeholder="Min Price"
                                                className="w-full p-2 border rounded outline-none dark:bg-dark   border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                value={floor.minPrice}
                                                onChange={(e) => handleFloorChange(idx, e)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor={`floor-${idx}-maxPrice`} className="text-sm font-semibold dark:text-white">Max Price</label>
                                            <input
                                                id={`floor-${idx}-maxPrice`}
                                                data-field="maxPrice"
                                                type="number"
                                                placeholder="Max Price"
                                                className="w-full p-2 border rounded outline-none dark:bg-dark   border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                value={floor.maxPrice}
                                                onChange={(e) => handleFloorChange(idx, e)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor={`floor-${idx}-pricePerSqFt`} className="text-sm font-semibold dark:text-white">Price Per SqFt</label>
                                            <input
                                                id={`floor-${idx}-pricePerSqFt`}
                                                data-field="pricePerSqFt"
                                                type="number"
                                                placeholder="Price Per SqFt"
                                                className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched[`floor-${idx}-pricePerSqFt`] && validationErrors[`floor-${idx}-pricePerSqFt`] ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'}`}
                                                value={floor.pricePerSqFt}
                                                onChange={(e) => handleFloorChange(idx, e)}
                                                onBlur={() => handleFloorBlur(idx, 'pricePerSqFt')}
                                            />
                                            {touched[`floor-${idx}-pricePerSqFt`] && validationErrors[`floor-${idx}-pricePerSqFt`] && (
                                                <div className="text-sm text-red-600 mt-1">{validationErrors[`floor-${idx}-pricePerSqFt`]}</div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor={`floor-${idx}-totalSquareFootage`} className="text-sm font-semibold dark:text-white">* Total Sqft</label>
                                            <input
                                                id={`floor-${idx}-totalSquareFootage`}
                                                data-field="totalSquareFootage"
                                                type="number"
                                                placeholder="Total Sqft"
                                                className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched[`floor-${idx}-totalSquareFootage`] && validationErrors[`floor-${idx}-totalSquareFootage`] ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'}`}
                                                value={floor.totalSquareFootage}
                                                onChange={(e) => handleFloorChange(idx, e)}
                                                onBlur={() => handleFloorBlur(idx, 'totalSquareFootage')}
                                            />
                                            {touched[`floor-${idx}-totalSquareFootage`] && validationErrors[`floor-${idx}-totalSquareFootage`] && (
                                                <div className="text-sm text-red-600 mt-1">{validationErrors[`floor-${idx}-totalSquareFootage`]}</div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor={`floor-${idx}-minSqftBuy`} className="text-sm font-semibold dark:text-white">Minimum Buy Sqft</label>
                                            <input
                                                id={`floor-${idx}-minSqftBuy`}
                                                data-field="minSqftBuy"
                                                type="number"
                                                placeholder="Minimum Buy Sqft"
                                                className="w-full p-2 border rounded outline-none dark:bg-dark   border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                value={floor.minSqftBuy || ""}
                                                onChange={(e) => handleFloorChange(idx, e)}
                                                onBlur={() => handleFloorBlur(idx, 'minSqftBuy')}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor={`floor-${idx}-maxSqftBuy`} className="text-sm font-semibold dark:text-white">Maximum Buy Sqft</label>
                                            <input
                                                id={`floor-${idx}-maxSqftBuy`}
                                                data-field="maxSqftBuy"
                                                type="number"
                                                placeholder="Maximum Buy Sqft"
                                                className="w-full p-2 border rounded outline-none dark:bg-dark   border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                value={floor.maxSqftBuy || ""}
                                                onChange={(e) => handleFloorChange(idx, e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="space-y-2">
                                            <label htmlFor={`floor-${idx}-description`} className="text-sm font-semibold dark:text-white">Description</label>
                                            <textarea
                                                id={`floor-${idx}-description`}
                                                data-field="description"
                                                placeholder="Description"
                                                className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched[`floor-${idx}-description`] && validationErrors[`floor-${idx}-description`] ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'}`}
                                                value={floor.description}
                                                onChange={(e) => handleFloorChange(idx, e)}
                                                onBlur={() => handleFloorBlur(idx, 'description')}
                                            />
                                            {touched[`floor-${idx}-description`] && validationErrors[`floor-${idx}-description`] && (
                                                <div className="text-sm text-red-600 mt-1">{validationErrors[`floor-${idx}-description`]}</div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor={`floor-${idx}-specifications`} className="text-sm font-semibold dark:text-white">Specifications (comma separated)</label>
                                            <textarea
                                                id={`floor-${idx}-specifications`}
                                                data-field="specifications"
                                                placeholder="Specifications (comma separated)"
                                                className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched[`floor-${idx}-specifications`] && validationErrors[`floor-${idx}-specifications`] ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'}`}
                                                value={floor.specifications}
                                                onChange={(e) => handleFloorSpecChange(idx, "specifications", e.target.value)}
                                                onBlur={() => handleFloorBlur(idx, 'specifications')}
                                            />
                                            {touched[`floor-${idx}-specifications`] && validationErrors[`floor-${idx}-specifications`] && (
                                                <div className="text-sm text-red-600 mt-1">{validationErrors[`floor-${idx}-specifications`]}</div>
                                            )}
                                            <label htmlFor={`floor-${idx}-features`} className="text-sm font-semibold dark:text-white mt-2">Features (comma separated)</label>
                                            <textarea
                                                id={`floor-${idx}-features`}
                                                data-field="features"
                                                placeholder="Features (comma separated)"
                                                className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched[`floor-${idx}-features`] && validationErrors[`floor-${idx}-features`] ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'}`}
                                                value={floor.features}
                                                onChange={(e) => handleFloorSpecChange(idx, "features", e.target.value)}
                                                onBlur={() => handleFloorBlur(idx, 'features')}
                                            />
                                            {touched[`floor-${idx}-features`] && validationErrors[`floor-${idx}-features`] && (
                                                <div className="text-sm text-red-600 mt-1">{validationErrors[`floor-${idx}-features`]}</div>
                                            )}
                                        </div>
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
                                <label htmlFor="tokenName" className="text-sm font-semibold dark:text-white">
                                    * Token Name
                                </label>
                                <input
                                    id="tokenName"
                                    placeholder="GlobeHouseToken"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.tokenName && validationErrors.tokenName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500'}`}
                                    value={form.tokenName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.tokenName && validationErrors.tokenName && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.tokenName}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="tokenSymbol" className="text-sm font-semibold dark:text-white">
                                    * Token Symbol
                                </label>
                                <input
                                    id="tokenSymbol"
                                    placeholder="GHT"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.tokenSymbol && validationErrors.tokenSymbol ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500'}`}
                                    value={form.tokenSymbol}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.tokenSymbol && validationErrors.tokenSymbol && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.tokenSymbol}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="tokenSupply" className="text-sm font-semibold dark:text-white">
                                    * Token Supply
                                </label>
                                <input
                                    id="tokenSupply"
                                    type="number"
                                    placeholder="1"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.tokenSupply && validationErrors.tokenSupply ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500'}`}
                                    value={form.tokenSupply}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.tokenSupply && validationErrors.tokenSupply && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.tokenSupply}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="pricePerToken" className="text-sm font-semibold dark:text-white">
                                    * Price Per Token (PKR)
                                </label>
                                <input
                                    id="pricePerToken"
                                    type="number"
                                    placeholder="120,000,000"
                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.pricePerToken && validationErrors.pricePerToken ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500'}`}
                                    value={form.pricePerToken}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.pricePerToken && validationErrors.pricePerToken && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.pricePerToken}</div>
                                )}
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label htmlFor="walletAddress" className="text-sm font-semibold dark:text-white">
                                    * Contract Address
                                </label>
                                <input
                                    id="walletAddress"
                                    placeholder="Contract Address"

                                    className={`w-full p-2 border rounded outline-none dark:bg-dark   ${touched.walletAddress && validationErrors.walletAddress ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500'}`}
                                    value={form.walletAddress}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.walletAddress && validationErrors.walletAddress && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.walletAddress}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* FAQs Section */}
                    <div className="backdrop-blur-sm rounded-lg shadow-lg border mt-8">
                        <div className="dark:text-white rounded-t-lg p-4">

                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                * FAQs
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                                    <div className="flex-1 space-y-2">
                                        <label className="text-sm font-semibold dark:text-white">* Question</label>
                                        <input
                                            placeholder="Enter FAQ question"
                                            className="w-full p-2 border border-gray-200 rounded dark:bg-dark focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={faq.question}
                                            onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                                            onBlur={() => handleFaqBlur(idx, 'question')}
                                        />
                                        {touched[`faq-${idx}-question`] && validationErrors[`faq-${idx}-question`] && (
                                            <div className="text-sm text-red-600 mt-1">{validationErrors[`faq-${idx}-question`]}</div>
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <label className="text-sm font-semibold dark:text-white">* Answer</label>
                                        <textarea
                                            placeholder="Enter FAQ answer"
                                            rows={2}
                                            className="w-full p-2 border border-gray-200 rounded dark:bg-dark focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={faq.answer}
                                            onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                                            onBlur={() => handleFaqBlur(idx, 'answer')}
                                        />
                                        {touched[`faq-${idx}-answer`] && validationErrors[`faq-${idx}-answer`] && (
                                            <div className="text-sm text-red-600 mt-1">{validationErrors[`faq-${idx}-answer`]}</div>
                                        )}
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
                            <h2 className="text-xl font-semibold mb-4 ">* Add Bank Details</h2>

                            {/* Bank Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 dark:text-white">
                                    * Bank Name
                                </label>
                                <select
                                    id="bankName"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-dark "
                                    value={form.bankDetails?.bankName || ""}
                                    onChange={handleBankDetailsChange}
                                    onBlur={() => handleBlur({ target: { id: 'bankName' } } as any)}
                                >
                                    <option value="">Select Bank</option>
                                    {banks.map((bank) => (
                                        <option key={bank.code} value={bank.name}>{bank.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Account Number */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 dark:text-white">* Account Number</label>
                                <input
                                    id="accountNumber"
                                    type="text"
                                    placeholder="1234567890123456"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-dark "
                                    value={form.bankDetails?.accountNumber || ""}
                                    onChange={handleBankDetailsChange}
                                    onBlur={() => handleBlur({ target: { id: 'accountNumber' } } as any)}
                                />
                                {touched.accountNumber && validationErrors.accountNumber && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.accountNumber}</div>
                                )}
                            </div>

                            {/* Account Title */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 dark:text-white">* Account Title</label>
                                <input
                                    id="accountTitle"
                                    type="text"
                                    placeholder="Account Title here"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-dark "
                                    value={form.bankDetails?.accountTitle || ""}
                                    onChange={handleBankDetailsChange}
                                    onBlur={() => handleBlur({ target: { id: 'accountTitle' } } as any)}
                                />
                                {touched.accountTitle && validationErrors.accountTitle && (
                                    <div className="text-sm text-red-600 mt-1">{validationErrors.accountTitle}</div>
                                )}
                            </div>

                            {/* IBAN */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 dark:text-white">
                                    * IBAN
                                </label>
                                <input
                                    id="iban"
                                    type="text"
                                    placeholder="PK36SCBL000000123456702"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-dark "
                                    value={form.bankDetails?.iban || ""}
                                    onChange={handleBankDetailsChange}
                                    onBlur={() => handleBlur({ target: { id: 'iban' } } as any)}
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
                                        <label className="text-sm font-semibold dark:text-white"> Document Upload</label>
                                        <div className="flex flex-col gap-2">
                                            <input
                                                type="file"
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                onChange={async (e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        const file = e.target.files[0];
                                                        const uploadedUrl = await handleFileUpload(file, `document ${idx + 1}`);
                                                        if (uploadedUrl) {
                                                            setDocuments((prev: string[]) => prev.map((d: string, i: number) =>
                                                                i === idx ? uploadedUrl : d
                                                            ));
                                                        }
                                                    }
                                                }}
                                            />
                                            {doc && (
                                                <div className="flex items-center gap-2">
                                                    <a href={doc} target="_blank" rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800 truncate">
                                                        {doc.split('/').pop()}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                        {touched[`document-${idx}`] && validationErrors[`document-${idx}`] && (
                                            <div className="text-sm text-red-600 mt-1">{validationErrors[`document-${idx}`]}</div>
                                        )}
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
                            disabled={loading || !isValid}
                        >
                            {loading ? "Creating..." : !isValid ? "Complete required fields" : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}