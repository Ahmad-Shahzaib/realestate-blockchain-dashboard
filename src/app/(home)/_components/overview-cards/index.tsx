"use client";
// import { compactFormat } from "@/lib/format-number";
import { getOverviewData } from "../../fetch";
import { OverviewCard } from "./card";
import * as icons from "./icons";
import { useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { FaConnectdevelop } from "react-icons/fa";
import { MdOutlineSignalCellularAlt2Bar } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import type { JSX, SVGProps } from "react";
import ProjectService, { Project } from "@/services/project.service";
import property1 from "../../../../../public/images/cards/image1.jpg";
import property2 from "../../../../../public/images/cards/image2.jpg";
import property3 from "../../../../../public/images/cards/image3.jpg";

type PropsType = {
  label?: string;
  data?: {
    value: number | string;
    growthRate: number;
  };
  Icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  initialImageIndex?: number;
  projectId?: string;
  item?: Project;
};



const tabs = [
  {
    id: "all", label: "Home", icon: IoHome
  },
  {
    id: "residential", label: "Development", icon: FaConnectdevelop
  },
  {
    id: "commercial", label: "Mature", icon: MdOutlineSignalCellularAlt2Bar
  },
  {
    id: "plots", label: "Up Comming", icon: FaCalendarAlt
  },
];

export function OverviewCardsGroup() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const defaultImages = [property1, property2, property3];
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectImages, setProjectImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await ProjectService.getAllProjects();

        if (response && response.data && response.data.length > 0) {
          setProjects(response.data);
          console.log("Projects fetched successfully:", response.data);

        } else {
          console.warn("No projects found in the API response");
          setError("No projects available. Please check back later.");
          setProjectImages(defaultImages.map(img => img.src));
        }
      } catch (err: any) {
        console.error("Failed to fetch projects:", err);
        setError(err.message || "Failed to load projects. Please try again later.");
        setProjectImages(defaultImages.map(img => img.src));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const renderCards = () => {
    switch (activeTab) {
      case "residential":
        return projects.map((project, index) => (
          <OverviewCard key={index} initialImageIndex={index} item={project} />
        ));
      case "commercial":
        return projects.map((project, index) => (
          <OverviewCard key={index} initialImageIndex={index} item={project} />
        ));
      case "plots":
        return projects.map((project, index) => (
          <OverviewCard key={index} initialImageIndex={index} item={project} />
        ));
      default:
        return Array(1).fill(null).map((_, index) => (
          <OverviewCard key={index} initialImageIndex={index} />
        ));
    }
  };

  return (
    <>
      <div className="w-full  mx-auto px-2 sm:px-6 lg:px-4 mb-6  pb-2 ">
        <h1 className="text-2xl font-bold  ">Projects</h1>
      </div>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-4">
        {/* Tabs */}

        <div className="flex space-x-4 mb-6 overflow-x-auto ">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 text-lg font-medium rounded-lg whitespace-nowrap ${activeTab === tab.id
                ? "bg-black text-white"
                : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
            >
              <tab.icon className="w-6 h-6 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid gap-2 sm:gap-6 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {renderCards()}
        </div>
      </div>
    </>
  );
}