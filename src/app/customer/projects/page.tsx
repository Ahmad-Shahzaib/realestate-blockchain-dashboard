"use client";

import React, { useState } from "react";

import { FaEye, FaEdit } from "react-icons/fa";


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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedProject, setEditedProject] = useState<Project | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
    setSelectedProject(null); // Close modal if open
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
        [e.target.name]: e.target.value,
      });
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-dark-2 p-6">
      <div className="rounded-2xl shadow-md bg-white dark:bg-dark-2 border border-gray-100 dark:border-gray-700">
        {/* Header */}
        <div className="p-6 bg-[#00D2B6] dark:bg-dark-2 rounded-t-2xl">
          <h1 className="text-2xl font-bold text-white">Customer Projects</h1>
          <p className="text-gray-200">View and manage your projects</p>
        </div>

        {/* Search Input */}
        <div className="p-6">
          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by project name or location..."
              className="w-1/4 float-end p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-2 text-[#003049] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2B6]"
            />
          </div>

          {/* Projects Table */}
          <h2 className="text-xl font-bold text-[#003049] dark:text-white mb-4">Project Information</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F7FA] dark:bg-dark-2 text-[#003049] dark:text-gray-200">
                  <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Project Name</th>
                  <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Total Units</th>
                  <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Total Investors</th>
                  <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Total Sqft</th>
                  <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Location</th>
                  <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Status</th>
                  <th className="px-4 py-2 font-medium border-b border-gray-200 dark:border-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-dark-2">
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{project.name}</td>
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{project.totalUnits}</td>
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{project.totalInvestor}</td>
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{project.totalSqft.toLocaleString()}</td>
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{project.location}</td>
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${project.status === "Completed"
                            ? "bg-[#F5F7FA] dark:bg-dark-2 text-[#00B894]"
                            : project.status === "In Progress"
                              ? "bg-[#F5F7FA] dark:bg-dark-2 text-[#00D2B6]"
                              : "bg-[#F5F7FA] dark:bg-dark-2 text-yellow-600"
                            }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => handleView(project)}
                          className="text-[#00D2B6] hover:text-[#00D2B6] mr-3"
                          title="View"
                        >
                          <FaEye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(project)}
                          className="text-[#00D2B6] hover:text-[#00D2B6] mr-3"
                          title="Edit"
                        >
                          <FaEdit className="w-5 h-5" />
                        </button>

                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">
                      No projects found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 flex items-center justify-center p-4  bg-opacity-50">
          <div className="bg-white dark:bg-dark-2 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-700">
            <div className="p-6 bg-[#F5F7FA] dark:bg-dark-2 rounded-t-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#003049] dark:text-white">
                  {isEditMode ? "Edit Project" : "Project Details"}
                </h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white dark:bg-dark-2 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Project Name</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="name"
                      value={editedProject?.name || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-2 text-[#003049] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2B6]"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-[#003049] dark:text-white">{selectedProject.name}</p>
                  )}
                </div>
                <div className="bg-white dark:bg-dark-2 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Units</p>
                  {isEditMode ? (
                    <input
                      type="number"
                      name="totalUnits"
                      value={editedProject?.totalUnits || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-2 text-[#003049] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2B6]"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-[#003049] dark:text-white">{selectedProject.totalUnits}</p>
                  )}
                </div>
                <div className="bg-white dark:bg-dark-2 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Investors</p>
                  {isEditMode ? (
                    <input
                      type="number"
                      name="totalInvestor"
                      value={editedProject?.totalInvestor || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-2 text-[#003049] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2B6]"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-[#003049] dark:text-white">{selectedProject.totalInvestor}</p>
                  )}
                </div>
                <div className="bg-white dark:bg-dark-2 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Sqft</p>
                  {isEditMode ? (
                    <input
                      type="number"
                      name="totalSqft"
                      value={editedProject?.totalSqft || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-2 text-[#003049] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2B6]"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-[#003049] dark:text-white">{selectedProject.totalSqft.toLocaleString()}</p>
                  )}
                </div>
                <div className="bg-white dark:bg-dark-2 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Location</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="location"
                      value={editedProject?.location || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-2 text-[#003049] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2B6]"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-[#003049] dark:text-white">{selectedProject.location}</p>
                  )}
                </div>
                <div className="bg-white dark:bg-dark-2 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                  {isEditMode ? (
                    <select
                      name="status"
                      value={editedProject?.status || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-2 text-[#003049] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2B6]"
                    >
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  ) : (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${selectedProject.status === "Completed"
                        ? "bg-[#F5F7FA] dark:bg-dark-2 text-[#00B894]"
                        : selectedProject.status === "In Progress"
                          ? "bg-[#F5F7FA] dark:bg-dark-2 text-[#00D2B6]"
                          : "bg-[#F5F7FA] dark:bg-dark-2 text-yellow-600"
                        }`}
                    >
                      {selectedProject.status}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4">
                {isEditMode ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-[#00D2B6] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#00B894] transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="bg-gray-300 text-[#003049] px-6 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="bg-[#00D2B6] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#00B894] transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;