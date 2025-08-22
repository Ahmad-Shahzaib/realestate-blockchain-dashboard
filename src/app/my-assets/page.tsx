"use client";

import React from "react";

const ActiveInvestmentsPage = () => {
  // Dummy investment data
  const investments = [
    {
      id: 1,
      name: "Tech Startup A",
      amount: "$5,000",
      returns: "12%",
      status: "Active",
    },
    {
      id: 2,
      name: "Real Estate Fund",
      amount: "$10,000",
      returns: "8%",
      status: "Active",
    },
    {
      id: 3,
      name: "Green Energy Project",
      amount: "$3,500",
      returns: "15%",
      status: "Completed",
    },
    {
      id: 4,
      name: "E-commerce Venture",
      amount: "$7,200",
      returns: "10%",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] dark:bg-dark">
      {/* Header */}
      <header className="bg-[#00B894] text-white py-4 px-8 dark:bg-dark">
        <h1 className="text-2xl font-bold">Active Investments</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-100 dark:bg-dark dark:border-gray-700">
          <h2 className="text-xl font-bold text-[#003049] mb-6 dark:text-white">
            Investment Portfolio
          </h2>

          {/* Investment Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white dark:from-[#003049] dark:to-[#003049]">
                  <th className="text-left py-3 px-4 rounded-tl-xl">#</th>
                  <th className="text-left py-3 px-4">Investment Name</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Returns</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4 rounded-tr-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((inv, index) => (
                  <tr
                    key={inv.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition dark:border-gray-700 dark:hover:bg-[#2A2A2A]"
                  >
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {inv.name}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {inv.amount}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {inv.returns}
                    </td>
                    <td
                      className={`py-3 px-4 font-semibold ${inv.status === "Active"
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                        }`}
                    >
                      {inv.status}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="px-4 py-2 rounded-xl font-semibold 
                      bg-gradient-to-r from-[#00B894] to-[#00D2B6] 
                      text-white shadow-md hover:opacity-90 transition 
                      dark:from-[#005F73] dark:to-[#0A9396]"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

  );
};

export default ActiveInvestmentsPage;
