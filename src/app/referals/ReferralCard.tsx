'use client';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';
import Image from 'next/image';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export default function ReferralCard() {
    const referralLink = 'https://id.daoproptech.com/?refCode=XYZ';

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        alert('Referral link copied!');
    };

    return (
        <div className="my-4 mx-auto border border-themebgColor rounded-md shadow-sm p-6 bg-background">
            <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Left Image */}
                <div className="w-48">
                    <Image
                        src="https://fastly.clutch.ca/assets/stc_location_wolfedale_1.jpg" // replace with actual image path
                        alt="Invite"
                        width={192}
                        height={292}
                        className="w-full"
                    />
                </div>

                {/* Right Section */}
                <div className="flex-1">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-text">
                        <span>Invite Friends Now</span>
                    </h2>
                    <p className="text-sm text-black mt-1">Your Referral Link</p>

                    {/* Referral Input */}
                    <div className="flex mt-2 items-center border border-themebgColor rounded overflow-hidden bg-background">
                        <Input
                            type="text"
                            placeholder={referralLink}
                            readOnly
                            value={referralLink}
                            className="flex-1 px-3 py-2 text-sm outline-none bg-background text-black border-none"
                        />
                        <Button
                            onClick={handleCopy}
                            className="px-4 py-2 text-sm font-semibold text-black bg-background border-none hover:opacity-90"
                        >
                            <FiCopy className="inline mr-1" /> Copy
                        </Button>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-4">
                        <Button variant="ghost" className="text-black hover:scale-110" title="Share on Facebook">
                            <FaFacebookF size={18} />
                        </Button>
                        <Button variant="ghost" className="text-black hover:scale-110" title="Share on Twitter">
                            <FaTwitter size={18} />
                        </Button>
                        <Button variant="ghost" className="text-black hover:scale-110" title="Share on WhatsApp">
                            <FaWhatsapp size={18} />
                        </Button>
                        <Button variant="ghost" className="text-black hover:scale-110" title="Share via Email">
                            <FaEnvelope size={18} />
                        </Button>
                    </div>

                    {/* Invite QR Button */}
                    <Button className="mt-4  border border-themebgColor px-4 py-2 rounded text-sm font-medium hover:opacity-90">
                        See Invite QR
                    </Button>
                </div>
            </div>

            <hr className="my-6" />

            {/* Description Section - Enhanced Design */}
            <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-lg p-6 shadow-md mt-6">
                <div className="mb-4 flex items-center gap-2">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="text-blue-500"><path d="M12 2v20m10-10H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p className="font-bold text-xl text-blue-700">Boost Your Rewards by Sharing with Friends!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
                        <p className="font-semibold text-blue-600 mb-2 flex items-center gap-1">
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="inline text-blue-400"><path d="M12 2v20m10-10H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            For You
                        </p>
                        <ul className="list-disc pl-5 text-black/80 space-y-2">
                            <li>
                                <span className="font-semibold text-purple-700">Earn More with Each Transaction:</span> <span className="text-black">Earn up to <span className="bg-purple-100 px-1 rounded">5%</span>, <span className="bg-purple-100 px-1 rounded">2%</span>, and <span className="bg-purple-100 px-1 rounded">1%</span> in <span className="font-bold">DPTR Tokens</span> on your friends' invested amounts during their first, second, and third purchases.</span>
                            </li>
                            <li>
                                <span className="font-semibold text-purple-700">Bonus for Signups:</span> <span className="text-black">Receive <span className="bg-blue-100 px-1 rounded">0.3 DPTR Tokens</span> for each friend who signs up and makes their first investment.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-100 shadow-sm">
                        <p className="font-semibold text-purple-600 mb-2 flex items-center gap-1">
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="inline text-purple-400"><path d="M12 2v20m10-10H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            For Your Friends
                        </p>
                        <ul className="list-disc pl-5 text-black/80 space-y-2">
                            <li>
                                <span className="font-semibold text-blue-700">Welcome Discount:</span> <span className="text-black">Your friends receive <span className="bg-blue-100 px-1 rounded">5%</span> of their invested amount back in <span className="font-bold">DPTR Tokens</span> on their first transaction.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-6 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex items-center gap-2 text-black/80">
                        <span className="font-semibold text-blue-700">Conversion Rate:</span>
                        <span className="bg-blue-100 px-2 py-1 rounded text-black font-medium">1 DPTR Token = 1000 PKR</span>
                    </div>
                    <div className="text-xs text-black/70">
                        <span className="font-semibold text-purple-700">Note:</span> To qualify for rewards, your friend must make their first investment within <span className="bg-purple-100 px-1 rounded">60 days</span> of signing up.
                    </div>
                </div>

                <div className="mt-6 text-black/80 text-sm">
                    <span className="font-semibold text-blue-700">Ready to start sharing?</span> Click the icons above or copy your referral link and spread the word!<br />
                    For full details, please refer to our{' '}
                    <a href="#" className="text-blue-600 underline hover:text-blue-800 transition">Terms and Conditions</a>.
                </div>
            </div>
        </div>
    );
}
