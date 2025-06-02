import React from 'react';

const Referrals: React.FC = () => {
    return (
        <div className=" p-6 custom-border rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <div className="">
                    <p>VERIFIED SIGNUPS</p>
                    <p className="text-2xl font-bold ">0</p>
                </div>
                <div className="">
                    <p>INVESTORS</p>
                    <p className="text-2xl font-bold ">0</p>
                </div>
                <div className="">
                    <p>TOTAL DPTR EARNED</p>
                    <p className="text-2xl font-bold text-blue-400">0 DPTR</p>
                </div>
                <div className="">
                    <p>REDEEMED</p>
                    <p className="text-2xl font-bold text-red-400">0 DPTR</p>
                </div>
            </div>
            <div className="mb-4">
                <p className=" flex items-center">
                    <span className="mr-2">ⓘ</span>
                    DPTR is a DAO PropTech Rewards Token. When you invest with DAO PropTech, you can use DPTR tokens to buy products from our upcoming rewards shop page, purchase area, or be cashed out.
                </p>
            </div>
            <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between  font-semibold mb-2">
                    <p>NAME</p>
                    <p>SIGN UP DATE</p>
                    <p>STATUS</p>
                    <p>EARNED DPTRS</p>
                </div>
                <div className="text-center py-6">
                    <div className="inline-block p-3 bg-gray-100 rounded-full">
                        <span className="text-gray-500">👤</span>
                    </div>
                    <p className=" font-medium mt-4">You don&apos;t have any referral yet.</p>
                    <p className="text-gray-500 mt-2">
                        Get commission and reward DPTRs by inviting your friends & family to join DAO Bloc.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Referrals;