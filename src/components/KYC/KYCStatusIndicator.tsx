import React from "react";

export type KYCStatus = "pending" | "in_review" | "approved" | "rejected";

const statusMap = {
  pending: {
    label: "Pending",
    color: "bg-yellow-400 text-yellow-900",
  },
  in_review: {
    label: "In Review",
    color: "bg-blue-400 text-blue-900",
  },
  approved: {
    label: "Approved",
    color: "bg-green-500 text-white",
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-500 text-white",
  },
};

export const KYCStatusIndicator: React.FC<{ status: KYCStatus }> = ({ status }) => {
  const { label, color } = statusMap[status];
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>{label}</span>
  );
};
