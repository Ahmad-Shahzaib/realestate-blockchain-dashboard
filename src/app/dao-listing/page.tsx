import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DAO Listing",
};

export default function DAOListingPage() {
  // Sample DAO data
  const daoList = [
    {
      id: 1,
      name: "Globe Residency DAO",
      members: 24,
      totalInvestment: "$2.4M",
      location: "Karachi, Pakistan",
      projectType: "Residential",
      status: "Active"
    },
    {
      id: 2,
      name: "City Center Commercial DAO",
      members: 42,
      totalInvestment: "$5.8M",
      location: "Lahore, Pakistan",
      projectType: "Commercial",
      status: "Active"
    },
    {
      id: 3,
      name: "Sunset Hills Property DAO",
      members: 18,
      totalInvestment: "$1.2M",
      location: "Islamabad, Pakistan",
      projectType: "Mixed Use",
      status: "Funding"
    }
  ];

  return (
    <>

      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Available DAOs</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium">Filter</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">+ Create DAO</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {daoList.map((dao) => (
            <Link href={`/dao/${dao.id}`} key={dao.id}>
              <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-200 relative">
                  {/* Placeholder for project image */}
                  <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {dao.status}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{dao.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{dao.location} • {dao.projectType}</p>

                  <div className="flex justify-between text-sm mb-3">
                    <div>
                      <p className="text-gray-600">Members</p>
                      <p className="font-semibold">{dao.members}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Investment</p>
                      <p className="font-semibold">{dao.totalInvestment}</p>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-gray-100 rounded text-gray-800 font-medium hover:bg-gray-200 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
