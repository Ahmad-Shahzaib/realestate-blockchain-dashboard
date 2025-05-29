import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income Stream",
};

export default function IncomeStreamPage() {
  return (
    <>
      <Breadcrumb pageName="Income Stream" />
      
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        <h2 className="text-xl font-bold mb-4">Your Income Streams</h2>
        <p className="text-gray-500 mb-8">
          Monitor all passive income from your real estate NFT investments.
        </p>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Income stream cards would go here */}
          <div className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold">Monthly Rental Income</h3>
              <span className="text-green-500 font-bold">+$1,250</span>
            </div>
            <p className="text-sm text-gray-500">From Globe Residency Apartments</p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
            </div>
            <div className="mt-2 flex justify-between text-xs">
              <span>Last payout: May 15, 2025</span>
              <span>Next payout: Jun 15, 2025</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
