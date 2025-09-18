"use client";
import React, { useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const Page = () => {
  const [activeTab, setActiveTab] = useState('overview');


  const projectsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Projects Completed",
        data: [8, 12, 15, 18, 22, 25, 20, 28, 32, 35, 38, 42],
        backgroundColor: "rgba(0, 184, 148, 0.8)",
        borderColor: "#00B894",
        borderWidth: 2,
        borderRadius: 8,
      },
      {
        label: "Client Satisfaction %",
        data: [85, 88, 92, 89, 95, 94, 96, 97, 98, 96, 99, 98],
        backgroundColor: "rgba(0, 48, 73, 0.6)",
        borderColor: "#003049",
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const skillsData = {
    labels: ["Happy Clients", "Project Completed", "Highly Recomend", "UI/UX Design", "Cloud Services", "Social Media Management"],
    datasets: [
      {
        data: [95, 88, 82, 90, 78, 85],
        backgroundColor: [
          "#00B894",
          "#00D2B6",
          "#003049",
          "#219EBC",
          "#8ECAE6",
          "#FFB703",
        ],
        borderWidth: 0,
      },
    ],
  };

  const revenueData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Revenue ($K)",
        data: [45, 68, 82, 95],
        borderColor: "#00B894",
        backgroundColor: "rgba(0, 184, 148, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#00B894",
        pointBorderColor: "#003049",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  const projects = [
    {
      id: 1,
      title: "Real Estate Marketplace Platform",
      description: "Developed a large-scale property marketplace similar to Zameen.com. Features included advanced property search with filters, location-based results using interactive maps, agent onboarding, CRM integration, and secure online payments.",
      tech: ["Next.js", "Node.js", "MongoDB", "ElasticSearch", "Stripe", "AWS"],
      status: "Completed",
      client: "Urban Properties",
      duration: "12 months",
      value: "$120,000"
    },
    {
      id: 2,
      title: "Property Rental & Management System",
      description: "Built a rental property management system with tenant verification, digital lease agreements, rent payment gateway, landlord dashboards, and automated notifications.",

      status: "In Progress",
      client: "MetroRentals",
      duration: "8 months",
      value: "$75,000"
    },
    {
      id: 3,
      title: "Commercial Property Auction Platform",
      description: "Developed an online auction system for commercial properties with live bidding, escrow payments, real-time updates, and commission tracking for agents.",

      status: "Completed",
      client: "BizEstate",
      duration: "7 months",
      value: "$90,000"
    },
    {
      id: 4,
      title: "Smart Housing Society Portal",
      description: "Created a digital portal for housing communities to manage residents, maintenance requests, online fee payments, facility bookings, and smart security integrations (IoT-enabled access control).",

      status: "Completed",
      client: "GreenValley Housing",
      duration: "6 months",
      value: "$65,000"
    },
    {
      id: 5,
      title: "Property Analytics & Insights Dashboard",
      description: "Built a real-time analytics dashboard for real estate investors with property price trends, heatmaps, ROI calculators, and predictive analytics powered by AI/ML models.",

      status: "Completed",
      client: "EstateAnalytics",
      duration: "5 months",
      value: "$80,000"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO at TechCorp",
      content: "Exceptional work quality and attention to detail. Delivered beyond our expectations.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Director at MedFirst",
      content: "Professional, reliable, and technically outstanding. Highly recommended.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] dark:from-gray-900 dark:via-gray-950 dark:to-black">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#003049] to-[#00B894] bg-clip-text text-transparent dark:text-white">
                Alex Rodriguez
              </h1>
            </div>
            <div className="flex gap-4">
              {['overview', 'projects'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${activeTab === tab
                    ? 'bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-lg'
                    : 'text-gray-600 hover:text-[#00B894] hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {activeTab === 'overview' && (
          <>
            {/* Enhanced Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Projects Completed', value: '127', change: '+12%' },
                { title: 'Happy Clients', value: '89', change: '+8%' },
                { title: 'Years Experience', value: '5.2', change: '+1.2%' },
                { title: 'Technologies', value: '24', change: '+6' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#00B894]/30 dark:bg-gray-900 dark:border-gray-800"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">
                      {item.change}
                    </span>
                  </div>
                  <h3 className="text-[#003049] font-semibold text-lg mb-1 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-4xl font-bold text-black dark:text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <h2 className="text-2xl font-bold text-[#003049] mb-6 dark:text-white">
                  Revenue Growth
                </h2>
                <Line
                  data={revenueData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top', labels: { color: '#fff' } },
                    },
                    scales: {
                      y: { beginAtZero: true, ticks: { color: '#fff' } },
                      x: { ticks: { color: '#fff' } },
                    },
                  }}
                />
              </div>
              <div className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <h2 className="text-2xl font-bold text-[#003049] mb-6 dark:text-white">
                  Monthly Performance
                </h2>
                <Bar
                  data={projectsData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top', labels: { color: '#fff' } },
                    },
                    scales: {
                      y: { beginAtZero: true, ticks: { color: '#fff' } },
                      x: { ticks: { color: '#fff' } },
                    },
                  }}
                />
              </div>
            </div>
          </>
        )}

        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#00B894]/30 dark:bg-gray-900 dark:border-gray-800"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#003049] dark:text-white">
                    {project.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'Completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed dark:text-gray-300">
                  {project.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-[#003049] dark:text-white">
                        Client:
                      </span>
                      <p className="text-gray-600 dark:text-gray-400">
                        {project.client}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-[#003049] dark:text-white">
                        Duration:
                      </span>
                      <p className="text-gray-600 dark:text-gray-400">
                        {project.duration}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#00B894]">
                    {project.value}
                  </span>
                  <button className="px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>

  );
};

export default Page;