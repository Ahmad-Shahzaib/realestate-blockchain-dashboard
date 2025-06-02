"use client";
import { compactFormat } from "@/lib/format-number";
import { OverviewCard } from "../../app/(home)/_components/overview-cards/card";
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

export function OverviewCards() {
    const [activeTab, setActiveTab] = useState("all");

    const renderCards = () => {
        switch (activeTab) {
            case "residential":
                return Array(2).fill(null).map((_, index) => (
                    <OverviewCard key={index} initialImageIndex={index} />
                ));
            case "commercial":
                return Array(3).fill(null).map((_, index) => (
                    <OverviewCard key={index} initialImageIndex={index} />
                ));
            case "plots":
                return Array(1).fill(null).map((_, index) => (
                    <OverviewCard key={index} initialImageIndex={index} />
                ));
            default:
                return Array(4).fill(null).map((_, index) => (
                    <OverviewCard key={index} initialImageIndex={index} />
                ));
        }
    };

    return (
        <>
            <div className="w-full  mx-auto px-2 sm:px-6 lg:px-4 mb-6 border-b custom-border pb-2">
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

export default function ProjectPage() {
    return <OverviewCards />;
}

