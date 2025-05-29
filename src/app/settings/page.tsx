"use client";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PersonalDetails from "./PersonalDetails";


const tabs = [
  "Personal Details",
  "Address",
  "Bank Details",
  "Legal Information",
  "Change Password",
  "Notifications",
  "Wallet Info",
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-6 mx-auto">

      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h1>

      <div className="border-b border-gray-200">
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-gray-600">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-t-md transition ${activeTab === index
                ? "bg-white text-blue-600 border-b-2 border-blue-600 font-semibold"
                : "hover:text-blue-500"
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
        {/* Tab Content */}
        {activeTab === 0 && <div><PersonalDetails /></div>}
        {activeTab === 1 && <div>Address content here.</div>}
        {activeTab === 2 && <div>Bank Details content here.</div>}
        {activeTab === 3 && <div>Legal Information content here.</div>}
        {activeTab === 4 && <div>Change Password form here.</div>}
        {activeTab === 5 && <div>Notification settings here.</div>}
        {activeTab === 6 && <div>Wallet Info and transactions here.</div>}
      </div>
    </div>
  );
}
