"use client";
import { useRouter } from "next/navigation";
import { TrendingUp, DollarSign, Download, CheckCircle2 } from "lucide-react";

// Sample dashboard metrics data
const dashboardMetrics = [
  {
    title: "$30200",
    subtitle: "Total Investment ",
    color: "bg-orange-100",
    textColor: "text-orange-500",
    icon: DollarSign,

    lastUpdate: "2:15 am"
  },
  {
    title: "290+",
    subtitle: "Total Projects ",
    color: "bg-green-100",
    textColor: "text-green-500",
    icon: TrendingUp,

    lastUpdate: "2:15 am"
  },
  {
    title: "145",
    subtitle: "Completed Projects",
    color: "bg-red-100",
    textColor: "text-red-500",
    icon: CheckCircle2,

    lastUpdate: "2:15 am"
  },
  {
    title: "50",
    subtitle: "Working Projects ",
    color: "bg-cyan-100",
    textColor: "text-cyan-500",
    icon: Download,
    lastUpdate: "2:15 am"
  }
];

;

export function ProjectCards() {
  const router = useRouter();

  const handleNavigateToGlobeResidency = () => {
    router.push('/globe-residency');
  };

  return (
    <div className="space-y-6 shadow-md p-4 rounded-md">
      {/* Header with Add Project Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Project Dashboard</h2>
        <button
          onClick={handleNavigateToGlobeResidency}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <span className="mr-2">+</span>
          Add Project
        </button>
      </div>

      {/* Dashboard Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardMetrics.map((metric, index) => (
          <div key={index} className={`${metric.color} rounded-xl shadow-sm p-5`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-2xl">{metric.title}</h3>
                <p className="text-gray-600 text-sm">{metric.subtitle}</p>
              </div>

            </div>
            <div className="flex items-center mt-3 text-xs text-gray-500">
              <span className="flex items-center">
                <metric.icon size={14} className="mr-1" />
                update: {metric.lastUpdate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
