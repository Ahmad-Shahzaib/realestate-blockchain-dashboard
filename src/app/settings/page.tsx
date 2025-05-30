"use client";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PersonalDetails from "./PersonalDetails";
import MyAddresses from "./MyAddresses";
import BankDetails from "./BankDetails";
import LegalAddress from "./LegalAddress";
import Notification from "./Notifications";
import SetPasswordSection from "./SetPasswordSection";
import QRCodePage from "./QRCodePage";


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
        {activeTab === 1 && <div><MyAddresses /></div>}
        {activeTab === 2 && <div><BankDetails /></div>}
        {activeTab === 3 && <div><LegalAddress /></div>}
        {activeTab === 4 && <div><SetPasswordSection /></div>}
        {activeTab === 5 && <div><Notification /></div>}
        {activeTab === 6 && <div><QRCodePage /></div>}
      </div>
    </div>
  );
}
