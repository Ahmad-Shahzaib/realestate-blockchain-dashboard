import React from 'react'
import ReferalPage from "./ReferralPage"
import ReferralCard from './ReferralCard'

const page = () => {
  return (
    <div className="bg-background min-h-screen p-4">
      <div className="flex justify-between items-center p-6 mb-6 border border-border shadow-md rounded-lg bg-background">
        <div>
          <h1 className="text-2xl font-bold mb-4 text-text">My Referrals</h1>
          <p className="mb-6 text-text/70">Track your referrals and earnings.</p>
        </div>
        <div>
          <button className='border border-border px-4 py-2 rounded bg-background text-text hover:bg-gradient-to-r hover:from-background-gradientFrom hover:via-background-gradientVia hover:to-background-gradientTo hover:text-text'>Invite Friends</button>
        </div>
      </div>

      <ReferalPage />
      <ReferralCard />
    </div>
  )
}

export default page