"use client";

import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import SearchInput from '@/common/Input';
import ProjectService, { Project as ApiProject, ApiResponse } from '@/services/project.service';

interface ComponentProject {
    id: number | string;
    title: string;
    investment: any;
    toUnit: any;
    toSqft: number;
    location: string;
}

const Page = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [projects, setProjects] = useState<ComponentProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response: ApiResponse = await ProjectService.getAllProjects();

            // Ensure data is an array
            const projectData = Array.isArray(response.data) ? response.data : [response.data];

            const formattedProjects: ComponentProject[] = projectData.map((project: ApiProject, index: number) => ({
                id: project._id || `project-${index}`,
                title: project.name || 'Unknown Project',
                investment: project.totalInvestment || 0, // Use totalInvestment
                toUnit: project.availableUnits || 0,
                toSqft: project.totalArea || 0,
                location: `${project.location?.city || ''}, ${project.location?.state || ''}`.trim() || 'Unknown Location',
            }));

            setProjects(formattedProjects);
            setError(null);
        } catch (err: any) {
            setError('Failed to fetch projects. Please try again later.');
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F5F7FA] dark:bg-dark">
            <div className="bg-white shadow-sm border-b border-[#ECF0F1] dark:bg-dark-2 dark:border-dark-4">
                <div className="mx-auto px-6 py-6">
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#00B894] p-2 rounded-lg">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#2C3E50] dark:text-gray-2">Manage Projects</h1>
                            <p className="text-[#34495E] dark:text-gray-4 mt-1">
                                View and manage all customer projects
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 dark:bg-dark-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1 max-w-md">
                            <SearchInput
                                placeholder="Search by project title or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<Building2 className="h-5 w-5 text-[#34495E] dark:text-gray-3" />}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-dark-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2">
                            Projects ({filteredProjects.length})
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="text-center text-[#34495E] dark:text-gray-3">Loading...</div>
                        ) : error ? (
                            <div className="text-center text-red-600 dark:text-red-400">
                                {error}
                                <button
                                    onClick={fetchProjects}
                                    className="ml-4 px-4 py-2 bg-[#3498DB] text-white rounded-md"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[#ECF0F1] dark:border-dark-4">
                                        <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                            Project Title
                                        </th>
                                        <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                            Total Investment
                                        </th>
                                        <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                            To Unit
                                        </th>
                                        <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                            To Sqft
                                        </th>
                                        <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                            Location
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#ECF0F1] dark:divide-dark-4">
                                    {filteredProjects.length > 0 ? (
                                        filteredProjects.map((project) => (
                                            <tr
                                                key={project.id}
                                                className="hover:bg-[#ECF0F1] dark:hover:bg-dark-3 transition-colors"
                                            >
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{project.title}</td>
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">
                                                    {project.investment ? `$${project.investment.toLocaleString()}` : '0'}
                                                </td>
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{project.toUnit}</td>
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">
                                                    {project.toSqft ? project.toSqft.toLocaleString() : 'N/A'}
                                                </td>
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{project.location}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="py-4 px-2 text-center text-[#34495E] dark:text-gray-4">
                                                No projects found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;