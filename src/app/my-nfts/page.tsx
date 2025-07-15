
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Income Stream",
};

export default function IncomeStreamPage() {
  return (
    <>
      {/* <Breadcrumb pageName="Income Stream" /> */}

      <div className="rounded-[10px] bg-background p-6 shadow-1 border border-themebgColor w-[95%] mx-auto">
        <h2 className="text-xl font-bold mb-4 text-black">Your Income Streams</h2>
        <p className="text-black/70 mb-8">
          Monitor all passive income from your real estate NFT investments.
        </p>

        <div className="grid grid-cols-1 gap-4">
          {/* Income stream cards would go here */}
          <div className="border border-themebgColor rounded-lg p-4 shadow-sm bg-background">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-black">Monthly Rental Income</h3>
              <span className="text-black font-bold">+$1,250</span>
            </div>
            <p className="text-sm text-black/70">From Globe Residency Apartments</p>
            <div className="mt-3 w-full bg-background rounded-full h-3 border border-themebgColor">
              <div className="bg-background h-2.5 rounded-full" style={{ width: "70%" }}></div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-black/60">
              <span>Last payout: May 15, 2025</span>
              <span>Next payout: Jun 15, 2025</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Input placeholder="Enter amount" className="flex-1" />
              <Button>Withdraw</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
