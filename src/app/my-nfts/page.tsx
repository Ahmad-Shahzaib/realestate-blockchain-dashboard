"use client";

import React from "react";

const IncomeStreamPage = () => {
  // Dummy income data
  const streams = [
    { id: 1, source: "Rental Property", amount: "$1,200", frequency: "Monthly", status: "Active" },
    { id: 2, source: "Stock Dividends", amount: "$300", frequency: "Quarterly", status: "Active" },
    { id: 3, source: "Freelance Projects", amount: "$2,500", frequency: "Monthly", status: "Active" },
    { id: 4, source: "Side Business", amount: "$900", frequency: "Monthly", status: "Paused" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] dark:bg-dark transition-colors">
      {/* Header */}
      <header className="text-black pt-3 px-8 dark:bg-dark">
        <h1 className="text-2xl font-bold">Income Streams</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-10">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Total Income", value: "$4,900" },
            { title: "Active Streams", value: "3" },
            { title: "Paused Streams", value: "1" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl shadow-md bg-white border border-gray-100 
                     hover:shadow-xl transition 
                     dark:bg-[#1B263B] dark:border-gray-700"
            >
              <h3 className="text-[#003049] font-semibold text-lg dark:text-white">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-700 dark:text-gray-200">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Income Streams Table */}
        <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-100 dark:bg-[#1B263B] dark:border-gray-700">
          <h2 className="text-xl font-bold text-[#003049] mb-6 dark:text-white">
            Income Stream Details
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#00B894] to-[#00D2B6] text-white dark:from-[#003049] dark:to-[#003049]">
                  <th className="text-left py-3 px-4 rounded-tl-xl">#</th>
                  <th className="text-left py-3 px-4">Source</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Frequency</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4 rounded-tr-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {streams.map((stream, index) => (
                  <tr
                    key={stream.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition 
                           dark:border-gray-700 dark:hover:bg-[#243447]"
                  >
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{index + 1}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{stream.source}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{stream.amount}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{stream.frequency}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${stream.status === "Active"
                        ? "text-green-600 dark:text-green-400"
                        : "text-yellow-600 dark:text-yellow-400"
                        }`}
                    >
                      {stream.status}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="px-4 py-2 rounded-xl font-semibold 
                               bg-gradient-to-r from-[#00B894] to-[#00D2B6] 
                               text-white shadow-md hover:opacity-90 transition 
                               dark:from-[#003049] dark:to-[#003049]"
                      >
                        Manage
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

export default IncomeStreamPage;
