import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';


const Referrals: React.FC = () => {
    return (
        <div className=" mx-auto p-8 bg-white border border-gray-200 rounded-2xl shadow-xl">
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 flex flex-col items-center">
                    <p className="text-xs font-semibold text-blue-600 mb-1">VERIFIED SIGNUPS</p>
                    <p className="text-3xl font-extrabold text-blue-900">0</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 flex flex-col items-center">
                    <p className="text-xs font-semibold text-green-600 mb-1">INVESTORS</p>
                    <p className="text-3xl font-extrabold text-green-900">0</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 flex flex-col items-center">
                    <p className="text-xs font-semibold text-purple-600 mb-1">TOTAL DPTR EARNED</p>
                    <p className="text-3xl font-extrabold text-purple-900">0 DPTR</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 flex flex-col items-center">
                    <p className="text-xs font-semibold text-yellow-600 mb-1">REDEEMED</p>
                    <p className="text-3xl font-extrabold text-yellow-900">0 DPTR</p>
                </div>
            </div>

            {/* Info Section */}
            <div className="mb-6">
                <div className="flex items-center text-gray-600 bg-blue-50 rounded-lg px-4 py-3">
                    <span className="mr-3 text-lg text-blue-500">ⓘ</span>
                    <span className="text-sm">
                        DPTR is a DAO PropTech Rewards Token. When you invest with DAO PropTech, you can use DPTR tokens to buy products from our upcoming rewards shop page, purchase area, or be cashed out.
                    </span>
                </div>
            </div>

            {/* Table Section */}
            <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-4 font-semibold mb-4 text-gray-700 text-sm">
                    <p className="text-center">NAME</p>
                    <p className="text-center">SIGN UP DATE</p>
                    <p className="text-center">STATUS</p>
                    <p className="text-center">EARNED DPTRS</p>
                </div>
                <div className="flex flex-col items-center py-8">
                    <div className="inline-block p-4 bg-gray-50 rounded-full border border-gray-200 shadow-sm">
                        <span className="text-3xl text-gray-400">👤</span>
                    </div>
                    <p className="font-semibold mt-5 text-gray-800 text-lg">No referrals yet</p>
                    <p className="text-gray-500 mt-2 text-sm max-w-md text-center">
                        Get commission and reward DPTRs by inviting your friends & family to join DAO Bloc.
                    </p>
                </div>
            </div>

            {/* Invite Section */}
            <div className="mt-8 flex flex-col md:flex-row gap-3 items-center">
                <Input
                    placeholder="Invite by email"
                    className="flex-1 border border-themebgColor rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <Button className=" font-semibold px-6 py-2 rounded-lg shadow transition">
                    Send Invite
                </Button>
            </div>
        </div>
    );
};

export default Referrals;