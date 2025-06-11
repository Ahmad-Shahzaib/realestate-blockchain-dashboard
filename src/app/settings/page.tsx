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

      <h1 className="text-2xl font-semibold  mb-4">Settings</h1>

      <div className="border-b border-gray-300">
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-gray-600">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-t-md transition ${activeTab === index
                ? "bg-white  font-semibold"
                : "hover:text-blue-500"
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6 ">
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
