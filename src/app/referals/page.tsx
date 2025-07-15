import React from 'react'
import ReferalPage from "./ReferralPage"
import ReferralCard from './ReferralCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const page = () => {
  return (
    <div className="bg-background min-h-screen p-6">
      <div className="flex justify-between items-center p-6 mb-6 border border-themebgColor shadow-md rounded-lg bg-background">
        <div>
          <h1 className="text-2xl font-bold mb-4 text-black">My Referrals</h1>
          <p className="mb-6 text-black/70">Track your referrals and earnings.</p>
        </div>
        <div>
          <Button className="border border-themebgColor px-4 py-2 rounded-[10px]">Invite Friends</Button>
        </div>
      </div>

      {/* Example Input usage below, adjust as needed for your actual input fields */}
      <div className="mb-6">
        <Input className="border border-themebgColor text-black" placeholder="Enter referral code" />
      </div>

      <ReferalPage />
      <ReferralCard />
    </div>
  )
}

export default page