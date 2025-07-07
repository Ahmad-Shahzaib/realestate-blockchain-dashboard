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


import KYCUploadInterface from "@/components/KYC/KYCUploadInterface";
import BankingInfoForm from "@/components/user/BankingInfoForm";
import TwoFactorAuthForm from "./TwoFactorAuthForm";


const tabs = [
  "Personal Details",
  "Address",
  "Bank Details",
  "Legal Information",
  "Change Password",
  "Notifications",
  "KYC",
  "Wallet Info",
  "Two Factor Authentication",
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-6 mx-auto bg-background border border-border text-text">
      <h1 className="text-2xl font-semibold mb-4 text-text">Settings</h1>
      <div className="flex lg:flex-row flex-col gap-8">
        {/* Tabs column */}
        <div className="border-l border-border max-w-xs min-w-[200px]">
          <nav className="flex lg:flex-col flex-row overflow-x-auto gap-2 text-sm font-medium text-text">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`text-left px-4 py-3 rounded-l-md transition w-full ${activeTab === index
                  ? "bg-background font-semibold border-l-4 border-primary text-primary"
                  : "hover:text-primary"
                  }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        {/* Tab content column */}
        <div className="flex-1">
          {activeTab === 0 && <div><PersonalDetails /></div>}
          {activeTab === 1 && <div><MyAddresses /></div>}
          {activeTab === 2 && <div><BankDetails /></div>}
          {activeTab === 3 && <div><LegalAddress /></div>}
          {activeTab === 4 && <div><SetPasswordSection /></div>}
          {activeTab === 5 && <div><Notification /></div>}
          {activeTab === 6 && <div><KYCUploadInterface /></div>}
          {activeTab === 7 && <div><QRCodePage /></div>}
          {activeTab === 8 && <div><TwoFactorAuthForm /></div>}
        </div>
      </div>
    </div>
  );
}
