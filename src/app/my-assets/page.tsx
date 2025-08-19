import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export const metadata: Metadata = {
  title: "Active Investments"
};


export default function ActiveInvestmentsPage() {
  return (
    <>
      {/* <Breadcrumb pageName="Active Investments" /> */}
      <div className="rounded-[10px] bg-background p-6 w-[95%] mx-auto shadow-1 border border-themebgColor">
        <h2 className="text-xl font-bold mb-4 text-black">Your Active Investments</h2>
        <p className="text-black/70 mb-8">
          Track and manage all your active real estate investments in one place.
        </p>
        {/* Example input and button usage */}
        <div className="flex gap-4 mb-8">
          <Input placeholder="Search investments..." className="flex-1" />
          <Button>Search</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Investment cards would go here */}
          <div className="border themebgColor rounded-lg p-4 shadow-sm bg-background">
            <h3 className="font-bold text-black">Sample Investment</h3>
            <p className="text-sm text-black/70">Investment details would appear here</p>
          </div>
        </div>
      </div>
    </>
  );
}
