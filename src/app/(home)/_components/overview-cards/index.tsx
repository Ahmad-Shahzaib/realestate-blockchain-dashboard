"use client";
import { compactFormat } from "@/lib/format-number";
import { getOverviewData } from "../../fetch";
import { OverviewCard } from "./card";
import * as icons from "./icons";
import { useState } from "react";
import { IoHome } from "react-icons/io5";
import { FaConnectdevelop } from "react-icons/fa";
import { MdOutlineSignalCellularAlt2Bar } from "react-icons/md";

import { FaCalendarAlt } from "react-icons/fa";



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

  const renderCards = () => {
    switch (activeTab) {
      case "residential":
        return Array(2).fill(<OverviewCard />);
      case "commercial":
        return Array(3).fill(<OverviewCard />);
      case "plots":
        return Array(1).fill(<OverviewCard />);
      default:
        return Array(4).fill(<OverviewCard />);
    }
  };

  return (
    <>
      <div className="w-full  mx-auto px-2 sm:px-6 lg:px-4 mb-6 border-b border-gray-4 pb-2">
        <h1 className="text-2xl font-bold text-black ">Projects</h1>
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