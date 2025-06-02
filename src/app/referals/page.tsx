import React from 'react'
import ReferalPage from "./ReferralPage"
import ReferralCard from './ReferralCard'

const page = () => {
    return (
        <div>
            <div className="flex justify-between items-center p-6 mb-6 custom-border shadow-md rounded-lg">
                <div><h1 className="text-2xl font-bold mb-4">My Referrals</h1>
                    <p className=" mb-6">Track your referrals and earnings.</p></div>
                <div><button className=' custom-border px-4 py-2 hover:bg-blue-light hover:text-white rounded '>Invite Freinds</button></div>
            </div>

            <ReferalPage />
            <ReferralCard />
        </div>
    )
}

export default page