"use client";

import React, { useState } from "react";
import { Building2, MapPin, Calendar, Filter, Search, ChevronLeft, ChevronRight, Eye, Edit } from 'lucide-react';
import SearchInput from '@/common/Input'; // Assuming this is the same SearchInput component

type Project = {
  id: number;
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedProject, setEditedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "E-commerce Website",
      totalUnits: 10,
      totalInvestor: 12,
      totalSqft: 5000,
      location: "New York, NY",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Real Estate App",
      totalUnits: 25,
      totalInvestor: 12,
      totalSqft: 12000,
      location: "Miami, FL",
      status: "Completed",
    },
    {
      id: 3,
      name: "Portfolio Website",
      totalUnits: 5,
      totalInvestor: 12,
      totalSqft: 2000,
      location: "Austin, TX",
      status: "Pending",
    },
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
    setSelectedProject(null);
  };

  const handleView = (project: Project) => {
    setSelectedProject(project);
    setIsEditMode(false);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setEditedProject({ ...project });
    setIsEditMode(true);
  };

  const handleSave = () => {
    if (editedProject) {
      setProjects(
        projects.map((project) =>
          project.id === editedProject.id ? editedProject : project
        )
      );
      setSelectedProject(editedProject);
      setIsEditMode(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (editedProject) {
      setEditedProject({
        ...editedProject,
        [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
      });
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      (project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "All" || project.status === statusFilter)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / recordsPerPage);
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
                          <button
                            onClick={() => handleEdit(project)}
                            className="bg-[#E8F8F5] dark:bg-dark-3 dark:text-white text-[#3498DB] px-3 py-1 rounded-lg text-sm hover:bg-[#D1F2EB] dark:hover:bg-dark-4 transition-colors"
                          >
                            <Edit className="h-4 w-4 inline mr-1" /> Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-4 px-2 text-center text-[#34495E] dark:text-gray-4">
                      No projects found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-dark-2 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 rounded-t-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-[#00B894] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      {selectedProject.name[0]}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#2C3E50] dark:text-gray-2">
                        {isEditMode ? "Edit Project" : selectedProject.name}
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
                    {isEditMode ? (
                      <input
                        type="number"
                        name="totalUnits"
                        value={editedProject?.totalUnits || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-lg border border-[#ECF0F1] dark:border-dark-4 bg-white dark:bg-dark-2 text-[#2C3E50] dark:text-gray-2 focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                      />
                    ) : (
                      <p className="text-2xl font-bold text-[#2C3E50] dark:text-gray-2">{selectedProject.totalUnits}</p>
                    )}
                  </div>
                  <div className="bg-[#F5F7FA] dark:bg-dark-3 rounded-lg p-4">
                    <p className="text-sm text-[#34495E] dark:text-gray-3 mb-1">Status</p>
                    {isEditMode ? (
                      <select
                        name="status"
                        value={editedProject?.status || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-lg border border-[#ECF0F1] dark:border-dark-4 bg-white dark:bg-dark-2 text-[#2C3E50] dark:text-gray-2 focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                      >
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                      </select>
                    ) : (
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
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#2C3E50] dark:text-gray-2 mb-4">Project Details</h3>
                  <div className="space-y-3">
                    <div className="bg-[#F5F7FA] dark:bg-dark-3 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[#2C3E50] dark:text-gray-2">
                          {isEditMode ? (
                            <input
                              type="text"
                              name="name"
                              value={editedProject?.name || ""}
                              onChange={handleInputChange}
                              className="w-full p-2 rounded-lg border border-[#ECF0F1] dark:border-dark-4 bg-white dark:bg-dark-2 text-[#2C3E50] dark:text-gray-2 focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                            />
                          ) : (
                            selectedProject.name
                          )}
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
                          Location:{" "}
                          {isEditMode ? (
                            <input
                              type="text"
                              name="location"
                              value={editedProject?.location || ""}
                              onChange={handleInputChange}
                              className="w-full p-2 rounded-lg border border-[#ECF0F1] dark:border-dark-4 bg-white dark:bg-dark-2 text-[#2C3E50] dark:text-gray-2 focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                            />
                          ) : (
                            <span className="font-semibold">{selectedProject.location}</span>
                          )}
                        </p>
                        <p className="text-[#34495E] dark:text-gray-3">
                          Total Sqft:{" "}
                          {isEditMode ? (
                            <input
                              type="number"
                              name="totalSqft"
                              value={editedProject?.totalSqft || ""}
                              onChange={handleInputChange}
                              className="w-full p-2 rounded-lg border border-[#ECF0F1] dark:border-dark-4 bg-white dark:bg-dark-2 text-[#2C3E50] dark:text-gray-2 focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                            />
                          ) : (
                            <span className="font-semibold">{selectedProject.totalSqft.toLocaleString()}</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-[#34495E] dark:text-gray-3">
                          Total Investors:{" "}
                          {isEditMode ? (
                            <input
                              type="number"
                              name="totalInvestor"
                              value={editedProject?.totalInvestor || ""}
                              onChange={handleInputChange}
                              className="w-full p-2 rounded-lg border border-[#ECF0F1] dark:border-dark-4 bg-white dark:bg-dark-2 text-[#2C3E50] dark:text-gray-2 focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                            />
                          ) : (
                            <span className="font-semibold">{selectedProject.totalInvestor}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4">
                  {isEditMode ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-[#00B894] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#009c7d] transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="bg-[#ECF0F1] dark:bg-dark-3 text-[#34495E] dark:text-gray-3 px-6 py-2 rounded-lg font-medium hover:bg-[#D1E9E4] dark:hover:bg-dark-4 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
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