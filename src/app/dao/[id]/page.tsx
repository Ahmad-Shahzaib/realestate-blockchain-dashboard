import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "DAO Details",
};

export default function DAODetailsPage({ params }: { params: { id: string } }) {
  // This would normally fetch data based on the ID
  const daoId = params.id;

  return (
    <>


      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - DAO info */}
          <div className="md:w-2/3">
            <div className="relative h-60 rounded-lg overflow-hidden mb-6">
              <Image
                src="/images/cards/cards-01.png"
                alt="Globe Residency DAO"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                Active
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-2">Globe Residency DAO #{daoId}</h1>
            <p className="text-gray-600 mb-4">Residential Property Investment in Karachi, Pakistan</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-sm">Members</p>
                <p className="font-bold text-lg">24</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-sm">Total Raised</p>
                <p className="font-bold text-lg">$2.4M</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-sm">Target</p>
                <p className="font-bold text-lg">$3.2M</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-sm">Completion</p>
                <p className="font-bold text-lg">75%</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3">About This DAO</h2>
              <p className="text-gray-600">
                This DAO was created to collectively invest in the Globe Residency Apartments project,
                a premium residential complex in Naya Nazimabad, Karachi. The project consists of 156 apartments
                across 14 floors with a total area of 12,490 sq.ft.
              </p>
              <p className="text-gray-600 mt-3">
                Members of this DAO receive proportional ownership rights to the property,
                quarterly dividend payments from rental income, and voting rights on property management decisions.
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3">Key Metrics</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Funding Progress</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Construction Progress</span>
                    <span className="font-medium">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Occupancy Rate</span>
                    <span className="font-medium">0% (Under Construction)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: "0%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Investment options */}
          <div className="md:w-1/3">
            <div className="sticky top-6 border rounded-lg p-5 shadow-sm">
              <h2 className="text-lg font-bold mb-4 text-center">Join This DAO</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Investment Amount (USD)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="5,000"
                  min="1000"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum investment: $1,000</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tokens</span>
                  <span className="font-medium">50</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Ownership</span>
                  <span className="font-medium">0.15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Est. Annual Return</span>
                  <span className="font-medium text-green-600">20%</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3">
                Invest Now
              </button>

              <button className="w-full bg-white border border-blue-600 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Add to Watchlist
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                By investing, you agree to the <a href="#" className="text-blue-600">terms and conditions</a> of this DAO.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
