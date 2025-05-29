import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Rewards Shop",
};

export default function RewardsShopPage() {
  // Sample rewards data
  const rewards = [
    {
      id: 1,
      name: "Premium Property Report",
      points: 500,
      category: "Digital",
      image: "/images/cards/cards-01.png"
    },
    {
      id: 2,
      name: "Site Visit Voucher",
      points: 1500,
      category: "Experience",
      image: "/images/cards/cards-01.png"
    },
    {
      id: 3,
      name: "Investment Fee Discount",
      points: 2000,
      category: "Financial",
      image: "/images/cards/cards-01.png"
    },
    {
      id: 4,
      name: "VIP DAO Membership (1 Month)",
      points: 5000,
      category: "Membership",
      image: "/images/cards/cards-01.png"
    }
  ];
  
  return (
    <>
      <Breadcrumb pageName="Rewards Shop" />
      
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold">Rewards Shop</h2>
            <p className="text-gray-500">Redeem your points for exclusive rewards</p>
          </div>
          
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <p className="text-sm text-gray-600">Your Points Balance</p>
            <p className="text-xl font-bold text-blue-600">3,250</p>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex space-x-2 mb-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">All Rewards</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">Digital</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">Experience</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">Financial</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward) => (
            <div key={reward.id} className="border rounded-lg overflow-hidden shadow-sm">
              <div className="h-40 bg-gray-200 relative">
                <Image
                  src={reward.image}
                  alt={reward.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {reward.category}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold">{reward.name}</h3>
                <div className="flex justify-between items-center mt-3">
                  <p className="font-semibold text-blue-600">{reward.points} points</p>
                  <button 
                    className={`px-3 py-1 rounded font-medium ${reward.points <= 3250 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                  >
                    {reward.points <= 3250 ? "Redeem" : "Not Enough Points"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <h3 className="font-bold mb-3">How to Earn More Points</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Complete your investment profile - 250 points</li>
            <li>Make your first investment - 500 points</li>
            <li>Refer a friend - 1000 points per successful referral</li>
            <li>Participate in DAO governance - 100 points per vote</li>
            <li>Hold investments for 6+ months - 750 points</li>
          </ul>
        </div>
      </div>
    </>
  );
}
