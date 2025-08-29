"use client";
import { useState } from "react";
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
    <div className="p-6 mx-auto max-w-6xl bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">


      {/* Tabs */}
      <div className="border-b border-gray-300 dark:border-gray-700 overflow-x-auto">
        <nav className="flex gap-4 text-sm font-medium text-gray-600 dark:text-gray-300 min-w-max">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-t-md transition ${activeTab === index
                ? "bg-white dark:bg-gray-800 text-[#003049] dark:text-white font-semibold border-b-2 border-[#00B894]"
                : "hover:text-[#00B894] dark:hover:text-[#00D2B6]"
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-colors">
        {activeTab === 0 && <PersonalDetails />}
        {activeTab === 1 && <MyAddresses />}
        {activeTab === 2 && <BankDetails />}
        {activeTab === 3 && <LegalAddress />}
        {activeTab === 4 && <SetPasswordSection />}
        {activeTab === 5 && <Notification />}
        {activeTab === 6 && <QRCodePage />}
      </div>
    </div>

  );
}
