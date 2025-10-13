"use client";

import React, { useState, useEffect } from "react";
import { Building2, MapPin, Calendar, Filter, Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import SearchInput from '@/common/Input';
import ProjectService, { Project as ApiProject, ApiResponse } from '@/services/project.service';
import { getUserProfile } from '@/services/user.services';
import { useRouter } from 'next/navigation';

type Project = {
  id: number | string;
  name: string;
  totalUnits: number;
  totalInvestor: number;
  totalSqft: number;
  location: string;
  status: string;
};

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const recordsPerPage = 8;
  const [customerId, setCustomerId] = useState<string | null>(null);
  const router = useRouter();
  const normalizeStatus = (apiStatus: string): string => {
    if (apiStatus.toLowerCase().includes("pending")) return "Pending";
    if (apiStatus.toLowerCase().includes("completed")) return "Completed";
    if (apiStatus.toLowerCase().includes("progress")) return "In Progress";
    return apiStatus;
  };

  const fetchProjects = async () => {
    if (!customerId) return;
    try {
      setLoading(true);
      const response: ApiResponse = await ProjectService.getAllProjects(
        currentPage,
        recordsPerPage,
        searchQuery,
        customerId
      );

      const projectData = Array.isArray(response.data) ? response.data : [response.data];

      const formattedProjects: Project[] = projectData
        .filter((project: ApiProject) => project.customerId === customerId)
        .map((project: ApiProject) => ({
          id: project._id || `project-${Math.random()}`,
          name: project.name || "Unknown Project",
          totalUnits: project.totalUnits || 0,
          totalInvestor: project.totalInvestment || 0,
          totalSqft: project.totalArea || 0,
          location: `${project.location?.city || ""}, ${project.location?.state || ""}`.trim() || "Unknown Location",
          status: normalizeStatus(project.status || "Pending"),
        }));

      setProjects(formattedProjects);
      setTotalPages(response.pagination?.pages || Math.ceil(formattedProjects.length / recordsPerPage));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch projects for this customer. Please try again.");
      console.error("Error fetching projects:", err);
      setProjects([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        setCustomerId(res.data.user.id || res.data.user._id || null);
      } catch (err) {
        setCustomerId(null);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (customerId) {
      fetchProjects();
    }
  }, [customerId, currentPage, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id: number | string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        setLoading(true);
        // await ProjectService.deleteProject(id.toString());
        setProjects(projects.filter((project) => project.id !== id));
        setSelectedProject(null);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to delete project.");
        console.error("Error deleting project:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleView = (project: Project) => {
    // setSelectedProject(project);
    router.push(`/customer/projects/${project.id}`);
  };

  const filteredProjects = projects.filter(
    (project) =>
      (project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "All" || project.status === statusFilter)
  );

  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + recordsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-dark">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#ECF0F1] dark:bg-dark-2 dark:border-dark-4">
        <div className="mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-[#00B894] p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#2C3E50] dark:text-gray-2">Project Details</h1>
                <p className="text-[#34495E] dark:text-gray-4 mt-1">
                  View and manage project records
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 dark:bg-dark-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <SearchInput
                placeholder="Search by project name or location"
                value={searchQuery}
                onChange={handleSearch}
                icon={<Search className="h-5 w-5 text-[#34495E] dark:text-gray-3" />}
              />
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-[#34495E] dark:text-gray-3" />
              <div className="flex bg-[#ECF0F1] dark:bg-dark-3 rounded-lg p-1">
                {["All", "Completed", "In Progress", "Pending"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${statusFilter === status
                      ? "bg-white dark:bg-dark-4 text-[#3498DB] shadow-sm"
                      : "text-[#34495E] dark:text-gray-3 hover:text-[#2C3E50] dark:hover:text-gray-2"
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-dark-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2">
              Project Information ({filteredProjects.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            {(!customerId || loading) ? (
              <div className="text-center text-[#34495E] dark:text-gray-3">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-600 dark:text-red-400">
                {error}
                <button
                  onClick={fetchProjects}
                  className="ml-4 px-4 py-2 bg-[#3498DB] text-white rounded-md hover:bg-[#2980B9]"
                >
                  Retry
                </button>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#ECF0F1] dark:border-dark-4">
                    <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                      Project Name
                    </th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                      Total Units
                    </th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                      Total Investors
                    </th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                      Total Sqft
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
                  {paginatedProjects.length > 0 ? (
                    paginatedProjects.map((project) => (
                      <tr
                      onClick={()=>{
                        handleView(project);
                      }}
                        key={project.id}
                        className="hover:bg-[#ECF0F1] dark:hover:bg-dark-3 transition-colors"
                      >
                        <td className="py-4 px-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#00B894] rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                              {project.name[0]}
                            </div>
                            <div>
                              <p className="font-semibold text-[#2C3E50] dark:text-gray-2">{project.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{project.totalUnits}</td>
                        <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{project.totalInvestor}</td>
                        <td className="py-4 px-2 font-semibold text-[#2C3E50] dark:text-gray-2">
                          {project.totalSqft.toLocaleString()}
                        </td>
                        <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">{project.location}</td>
                        <td className="py-4 px-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === "Completed"
                              ? "bg-[#E8F8F5] text-[#27AE60] dark:bg-green-600/20 dark:text-green-400"
                              : project.status === "In Progress"
                                ? "bg-[#E8F8F5] text-[#3498DB] dark:bg-blue-600/20 dark:text-blue-400"
                                : "bg-[#F5F7FA] text-yellow-600 dark:bg-dark-3 dark:text-yellow-400"
                              }`}
                          >
                            {project.status}
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(project)}
                              className="bg-[#E8F8F5] dark:bg-dark-3 dark:text-white text-[#3498DB] px-3 py-1 rounded-lg text-sm hover:bg-[#D1F2EB] dark:hover:bg-dark-4 transition-colors"
                            >
                              <Eye className="h-4 w-4 inline mr-1" /> View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-4 px-2 text-center text-[#34495E] dark:text-gray-4">
                        No projects found for this customer.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-[#34495E] dark:text-gray-4">
                Showing {startIndex + 1} to {Math.min(startIndex + recordsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg ${currentPage === 1
                    ? "text-[#A1B1C3] dark:text-gray-5 cursor-not-allowed"
                    : "text-[#2C3E50] dark:text-gray-2 hover:bg-[#ECF0F1] dark:hover:bg-dark-3"
                    }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === page
                      ? "bg-[#3498DB] text-white"
                      : "text-[#34495E] dark:text-gray-3 hover:bg-[#ECF0F1] dark:hover:bg-dark-3"
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg ${currentPage === totalPages
                    ? "text-[#A1B1C3] dark:text-gray-5 cursor-not-allowed"
                    : "text-[#2C3E50] dark:text-gray-2 hover:bg-[#ECF0F1] dark:hover:bg-dark-3"
                    }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 flex items-center justify-center p-4 z-50 "
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-white dark:bg-dark-2 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 rounded-t-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-[#00B894] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      {selectedProject.name[0]}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#2C3E50] dark:text-gray-2">
                        {selectedProject.name}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-[#34495E] dark:text-gray-3 hover:text-[#2C3E50] dark:hover:text-gray-2 text-xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#F5F7FA] dark:bg-dark-3 rounded-lg p-4">
                    <p className="text-sm text-[#34495E] dark:text-gray-3 mb-1">Total Units</p>
                    <p className="text-2xl font-bold text-[#2C3E50] dark:text-gray-2">{selectedProject.totalUnits}</p>
                  </div>
                  <div className="bg-[#F5F7FA] dark:bg-dark-3 rounded-lg p-4">
                    <p className="text-sm text-[#34495E] dark:text-gray-3 mb-1">Status</p>
                    <p
                      className={`text-2xl font-bold ${selectedProject.status === "Completed"
                        ? "text-[#27AE60]"
                        : selectedProject.status === "In Progress"
                          ? "text-[#3498DB]"
                          : "text-yellow-600"
                        }`}
                    >
                      {selectedProject.status}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-gray-2 mb-4">Project Details</h3>
                  <div className="space-y-3">
                    <div className="bg-[#F5F7FA] dark:bg-dark-3 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[#2C3E50] dark:text-gray-2">
                          {selectedProject.name}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedProject.status === "Completed"
                            ? "bg-[#E8F8F5] text-[#27AE60] dark:bg-green-600/20 dark:text-green-400"
                            : selectedProject.status === "In Progress"
                              ? "bg-[#E8F8F5] text-[#3498DB] dark:bg-blue-600/20 dark:text-blue-400"
                              : "bg-[#F5F7FA] text-yellow-600 dark:bg-dark-3 dark:text-yellow-400"
                            }`}
                        >
                          {selectedProject.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[#34495E] dark:text-gray-3">
                          Location: <span className="font-semibold">{selectedProject.location}</span>
                        </p>
                        <p className="text-[#34495E] dark:text-gray-3">
                          Total Sqft: <span className="font-semibold">{selectedProject.totalSqft.toLocaleString()}</span>
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-[#34495E] dark:text-gray-3">
                          Total Investors: <span className="font-semibold">{selectedProject.totalInvestor}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4">
                  <button
                    onClick={() => handleDelete(selectedProject.id)}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="bg-[#00B894] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#009c7d] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;