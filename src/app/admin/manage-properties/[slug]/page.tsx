"use client";
import React, { useEffect } from 'react'
import { Metadata } from "next";
import { useAppDispatch } from '@/redux/hooks';
import { fetchCustomers } from '@/redux/reducers/customerslice/customerSlice';
import GlobeResidencyPage from '@/app/home2/_components/overview-cards/GlobeResidencyPage';
import { useParams } from 'next/navigation';
import ProjectService from '@/services/project.service';


const page = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    // params.slug may be string | string[] | undefined depending on route
    const rawSlug:any = params?.slug;
    const [project, setProject] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    console.log('Raw Slug:', rawSlug);
    useEffect(() => {
        dispatch(fetchCustomers({ page: 1, limit: 50, search: '', status: '' }));
    }, [dispatch]);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                if (!rawSlug) {
                    throw new Error('Project id not found in route');
                }
                const projectData = await ProjectService.getProjectById(rawSlug);
                console.log("Fetched project data:", projectData);
                setProject(projectData);
                setLoading(false);
            } catch (err: any) {
                setError(err.message || "Failed to fetch project details.");
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [rawSlug]);
    return (
        <div>
            <GlobeResidencyPage project={project}
            rawSlug={rawSlug}
            
            />
        </div>
    )
}

export default page
