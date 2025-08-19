"use client";

import React, { useState } from "react";
import Image from "next/image";

const portfolioData = [
  {
    id: 1,
    title: "Luxury Villa",
    category: "Residential",
    image: "https://picsum.photos/id/1018/600/400",
    location: "Islamabad, Pakistan",
  },
  {
    id: 2,
    title: "Corporate Office",
    category: "Commercial",
    image: "https://picsum.photos/id/1015/600/400",
    location: "Karachi, Pakistan",
  },
  {
    id: 3,
    title: "Modern Apartment",
    category: "Residential",
    image: "https://picsum.photos/id/1024/600/400",
    location: "Lahore, Pakistan",
  },
  {
    id: 4,
    title: "Shopping Mall",
    category: "Commercial",
    image: "https://picsum.photos/id/1016/600/400",
    location: "Rawalpindi, Pakistan",
  },
];

const Page = () => {
  const [filter, setFilter] = useState("All");

  const filteredData =
    filter === "All"
      ? portfolioData
      : portfolioData.filter((item) => item.category === filter);

  return (
    <div className="bg-gray-50 py-16 px-6 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">
          Our Real Estate Portfolio
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Explore our diverse real estate projects ranging from luxury homes to
          commercial spaces.
        </p>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-4 mb-10">
        {["All", "Residential", "Commercial"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all bg-white"
          >
            <div className="relative h-56 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.location}</p>
              <span className="mt-2 inline-block text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
