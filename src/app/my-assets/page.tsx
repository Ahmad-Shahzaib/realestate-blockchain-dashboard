import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Active Investments",
};

export default function ActiveInvestmentsPage() {
  return (
    <>
      <Breadcrumb pageName="Active Investments" />
      
      <div className="rounded-[10px] bg-background p-6 w-[95%] mx-auto shadow-1 border border-border">
        <h2 className="text-xl font-bold mb-4 text-text">Your Active Investments</h2>
        <p className="text-text/70 mb-8">
          Track and manage all your active real estate investments in one place.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Investment cards would go here */}
          <div className="border border-border rounded-lg p-4 shadow-sm bg-background">
            <h3 className="font-bold text-text">Sample Investment</h3>
            <p className="text-sm text-text/70">Investment details would appear here</p>
          </div>
        </div>
      </div>
    </>
  );
}
