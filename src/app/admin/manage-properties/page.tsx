"use client";

import React, { useState, useEffect } from 'react';
import { Building2, Edit2, Eye } from 'lucide-react';
import SearchInput from '@/common/Input';
import ProjectService, { Project as ApiProject, ApiResponse } from '@/services/project.service';
import { useRouter } from 'next/navigation';
import Button from '@/common/Button';

interface ComponentProject {
    id: number | string;
    title: string;
    investment: number;
    toUnit: number;
    toSqft: number;
    location: string;
    status?: 'pending' | 'approved' | 'declined' | string;
}

const Page = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const [projects, setProjects] = useState<ComponentProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<ComponentProject | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editForm, setEditForm] = useState<ComponentProject | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<{
        total: number;
        page: number;
        limit: number;
        pages: number;
    } | null>(null);

    const itemsPerPage = 10; // Matches API's default limit

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response: ApiResponse = await ProjectService.getAllProjects(currentPage, itemsPerPage, searchTerm);

            const projectData = Array.isArray(response.data) ? response.data : [response.data];

            const formattedProjects: ComponentProject[] = projectData.map((project: ApiProject, index: number) => ({
                id: project._id || `project-${index}`,
                title: project.name || 'Unknown Project',
                investment: project.totalInvestment || 0,
                toUnit: project.availableUnits || project.stats?.availableUnits || 0,
                toSqft: project.totalArea || 0,
                location: `${project.location?.city || ''}, ${project.location?.state || ''}`.trim() || 'Unknown Location',
                status: project.status || 'pending',
            }));

            setProjects(formattedProjects);
            setPagination(response.pagination || {
                total: projectData.length,
                page: 1,
                limit: itemsPerPage,
                pages: Math.ceil(projectData.length / itemsPerPage),
            });
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch projects. Please try again later.');
            console.error('Error fetching projects:', err);
            setProjects([]);
            setPagination(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [currentPage, searchTerm]);

    // Ensure currentPage is within bounds
    useEffect(() => {
        if (pagination && currentPage > pagination.pages && pagination.pages > 0) {
            setCurrentPage(pagination.pages);
        }
    }, [pagination, currentPage]);

    // Reset to first page when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleEdit = (project: ComponentProject) => {
        setEditForm({ ...project });
        setIsEditModalOpen(true);
    };

    const handleViewDetails = (project: ComponentProject) => {
        router.push(`/admin/project/${project.id}`);
    };

    const closeViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedProject(null);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditForm(null);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editForm) return;

        try {
            // ProjectPayload typing doesn't include some fields like totalInvestment/stats used by the API,
            // cast to any to avoid TS errors and send the minimal update fields the backend expects.
            await ProjectService.updateProject(editForm.id.toString(), {
                name: editForm.title,
                status: editForm.status || 'pending',
                totalArea: editForm.toSqft,
                totalInvestment: editForm.investment,
                stats: { availableUnits: editForm.toUnit },
                location: {
                    city: editForm.location.split(', ')[0] || '', state: editForm.location.split(', ')[1] || '',
                    address: '',
                    country: '',
                    coordinates: {
                        latitude: 0,
                        longitude: 0
                    }
                },
            } as any);
            await fetchProjects(); // Refresh projects after update
            closeEditModal();
        } catch (err: any) {
            console.error('Error updating project:', err);
            setError(err.message || 'Failed to update project. Please try again.');
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!editForm) return;
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name]: name === 'investment' || name === 'toUnit' || name === 'toSqft'
                ? parseFloat(value) || 0
                : value,
        });
    };

    // Change status via approve/decline buttons
    const handleChangeStatus = async (project: ComponentProject, status: 'approved' | 'declined') => {
        try {
            await ProjectService.updateProject(project.id.toString(), { status } as any);
            // Optimistically update list by refetching
            await fetchProjects();
        } catch (err: any) {
            console.error('Error updating project status:', err);
            setError(err.message || 'Failed to update project status. Please try again.');
        }
    };

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
                            Projects ({pagination?.total || 0})
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
                                        <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                            Status
                                        </th>
                                        <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#ECF0F1] dark:divide-dark-4">
                                    {projects.length > 0 ? (
                                        projects.map((project) => (
                                            <tr
                                                onClick={() => handleViewDetails(project)}
                                                key={project.id}
                                                className="hover:bg-[#ECF0F1] dark:hover:bg-dark-3 transition-colors"
                                            >
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{project.title}</td>
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">
                                                    {project.investment ? `${project.investment.toLocaleString()}` : '0'}
                                                </td>
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{project.toUnit}</td>
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">
                                                    {project.toSqft ? project.toSqft.toLocaleString() : 'N/A'}
                                                </td>
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{project.location}</td>
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">
                                                    <span className={`px-2 py-1 rounded-full text-sm ${project.status === 'approved' ? 'bg-green-100 text-green-800' : project.status === 'declined' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {project.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            onClick={() => handleEdit(project)}

                                                        >
                                                            <Edit2 className="h-5 w-5" />
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleViewDetails(project)}
                                                            className=""
                                                        >
                                                            <Eye className="h-5 w-5" />
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleChangeStatus(project, 'approved')}
                                                        >
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleChangeStatus(project, 'declined')}
                                                        >
                                                            Decline
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="py-4 px-2 text-center text-[#34495E] dark:text-gray-4">
                                                No projects found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                        {/* Pagination */}
                        {pagination && pagination.total > 0 && (
                            <div className="flex items-center justify-between mt-6">
                                <p className="text-sm text-[#34495E] dark:text-gray-3">
                                    Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{" "}
                                    <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of{" "}
                                    <span className="font-medium">{pagination.total}</span> results
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="px-3 py-2 text-sm border border-[#ECF0F1] dark:border-dark-4 rounded-lg hover:bg-[#ECF0F1] dark:hover:bg-dark-3 disabled:opacity-50 text-[#34495E] dark:text-gray-3"
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                    {Array.from({ length: pagination.pages }, (_, i) => (
                                        <button
                                            key={i + 1}
                                            className={`px-3 py-2 text-sm rounded-lg ${currentPage === i + 1
                                                ? 'bg-[#00B894] text-white'
                                                : 'border border-[#ECF0F1] dark:border-dark-4 hover:bg-[#ECF0F1] dark:hover:bg-dark-3 text-[#34495E] dark:text-gray-3'
                                                }`}
                                            onClick={() => setCurrentPage(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        className="px-3 py-2 text-sm border border-[#ECF0F1] dark:border-dark-4 rounded-lg hover:bg-[#ECF0F1] dark:hover:bg-dark-3 disabled:opacity-50 text-[#34495E] dark:text-gray-3"
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.pages))}
                                        disabled={currentPage === pagination.pages || pagination.pages === 0}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* View Details Modal */}
            {isViewModalOpen && selectedProject && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-dark-2 rounded-lg p-6 max-w-lg w-full mx-4">
                        <h2 className="text-2xl font-bold text-[#2C3E50] dark:text-gray-2 mb-4">
                            Project Details
                        </h2>
                        <div className="space-y-4">
                            <p className="text-[#34495E] dark:text-gray-3">
                                <span className="font-semibold">Title:</span> {selectedProject.title}
                            </p>
                            <p className="text-[#34495E] dark:text-gray-3">
                                <span className="font-semibold">Total Investment:</span> {selectedProject.investment ? `${selectedProject.investment.toLocaleString()}` : '0'}
                            </p>
                            <p className="text-[#34495E] dark:text-gray-3">
                                <span className="font-semibold">Available Units:</span> {selectedProject.toUnit}
                            </p>
                            <p className="text-[#34495E] dark:text-gray-3">
                                <span className="font-semibold">Total Sqft:</span> {selectedProject.toSqft ? selectedProject.toSqft.toLocaleString() : 'N/A'}
                            </p>
                            <p className="text-[#34495E] dark:text-gray-3">
                                <span className="font-semibold">Location:</span> {selectedProject.location}
                            </p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeViewModal}
                                className="px-4 py-2 bg-[#3498DB] text-white rounded-md hover:bg-[#2980B9] transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Project Modal */}
            {isEditModalOpen && editForm && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-dark-2 rounded-lg p-6 max-w-lg w-full mx-4">
                        <h2 className="text-2xl font-bold text-[#2C3E50] dark:text-gray-2 mb-4">
                            Edit Project
                        </h2>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={editForm.title}
                                    onChange={handleEditChange}
                                    className="mt-1 w-full p-2 border border-[#ECF0F1] dark:border-dark-4 rounded-md dark:bg-dark-3 dark:text-gray-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">
                                    Total Investment
                                </label>
                                <input
                                    type="number"
                                    name="investment"
                                    value={editForm.investment}
                                    onChange={handleEditChange}
                                    className="mt-1 w-full p-2 border border-[#ECF0F1] dark:border-dark-4 rounded-md dark:bg-dark-3 dark:text-gray-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">
                                    Available Units
                                </label>
                                <input
                                    type="number"
                                    name="toUnit"
                                    value={editForm.toUnit}
                                    onChange={handleEditChange}
                                    className="mt-1 w-full p-2 border border-[#ECF0F1] dark:border-dark-4 rounded-md dark:bg-dark-3 dark:text-gray-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">
                                    Total Sqft
                                </label>
                                <input
                                    type="number"
                                    name="toSqft"
                                    value={editForm.toSqft}
                                    onChange={handleEditChange}
                                    className="mt-1 w-full p-2 border border-[#ECF0F1] dark:border-dark-4 rounded-md dark:bg-dark-3 dark:text-gray-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={editForm.location}
                                    onChange={handleEditChange}
                                    className="mt-1 w-full p-2 border border-[#ECF0F1] dark:border-dark-4 rounded-md dark:bg-dark-3 dark:text-gray-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={editForm.status || 'pending'}
                                    onChange={handleEditChange}
                                    className="mt-1 w-full p-2 border border-[#ECF0F1] dark:border-dark-4 rounded-md dark:bg-dark-3 dark:text-gray-2"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="declined">Declined</option>
                                </select>
                            </div>
                            <div className="mt-6 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="px-4 py-2 bg-gray-300 text-[#34495E] rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#3498DB] text-white rounded-md hover:bg-[#2980B9] transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;