'use client';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';
import Image from 'next/image';

export default function ReferralCard() {
    const referralLink = 'https://id.daoproptech.com/?refCode=XYZ';

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        alert('Referral link copied!');
    };

    return (
        <div className="my-4 mx-auto border border-border rounded-md shadow-sm p-6 bg-background">
            <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Left Image */}
                <div className="w-48">
                    <Image
                        src="/referral-image.png" // replace with actual image path
                        alt="Invite"
                        width={192}
                        height={192}
                        className="w-full"
                    />
                </div>

                {/* Right Section */}
                <div className="flex-1">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-text">
                        <span>Invite Friends Now</span>
                    </h2>
                    <p className="text-sm text-text/70 mt-1">Your Referral Link</p>

                    {/* Referral Input */}
                    <div className="flex mt-2 items-center border border-border rounded overflow-hidden bg-background">
                        <input
                            type="text"
                            placeholder='https://id.daoproptech.com/?refCode=XYZ'
                            readOnly
                            value={referralLink}
                            className="flex-1 px-3 py-2 text-sm outline-none bg-background text-text"
                        />
                        <button
                            onClick={handleCopy}
                            className="bg-gradient-to-r from-background-gradientFrom via-background-gradientVia to-background-gradientTo px-4 py-2 text-sm font-semibold text-text hover:opacity-90"
                        >
                            Copy
                        </button>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-4">
                        <button className="text-text hover:scale-110" title="Share on Facebook">
                            <FaFacebookF size={18} />
                        </button>
                        <button className="text-text hover:scale-110" title="Share on Twitter">
                            <FaTwitter size={18} />
                        </button>
                        <button className="text-text hover:scale-110" title="Share on WhatsApp">
                            <FaWhatsapp size={18} />
                        </button>
                        <button className="text-text hover:scale-110" title="Share via Email">
                            <FaEnvelope size={18} />
                        </button>
                    </div>

                    {/* Invite QR Button */}
                    <button className="mt-4 bg-background border border-border text-text px-4 py-2 rounded text-sm font-medium hover:bg-gradient-to-r hover:from-background-gradientFrom hover:via-background-gradientVia hover:to-background-gradientTo hover:text-text">
                        See Invite QR
                    </button>
                </div>
            </div>

            <hr className="my-6" />

            {/* Description Section */}
            <div className="text-sm text-text">
                <p className="font-semibold text-base mb-2">Boost Your Rewards by Sharing with Friends!</p>

                <p className="font-semibold">For You:</p>
                <ul className="list-disc pl-6 mb-4">
                    <li>
                        <span className="font-semibold">Earn More with Each Transaction:</span> Earn up to 5%, 2%, and 1% in DPTR Tokens on your friends&apos; invested amounts during their first, second, and third purchases.
                    </li>
                    <li>
                        <span className="font-semibold">Bonus for Signups:</span> Receive 0.3 DPTR Tokens for each friend who signs up and makes their first investment.
                    </li>
                </ul>

                <p className="font-semibold">For Your Friends:</p>
                <ul className="list-disc pl-6 mb-4">
                    <li>
                        <span className="font-semibold">Welcome Discount:</span> Your friends receive 5% of their invested amount back in DPTR Tokens on their first transaction.
                    </li>
                </ul>

                <p><span className="font-semibold">Conversion Rate:</span> 1 DPTR Token equals 1000 PKR.</p>
                <p className="text-xs mt-2 text-text/70">
                    <span className="font-semibold">Note:</span> To qualify for rewards, your friend must make their first investment within 60 days of signing up.
                </p>
                <p className="mt-2 text-text/80">
                    Ready to start sharing? Click the icons above or copy your referral link and spread the word!<br />
                    For full details, please refer to our{' '}
                    <a href="#" className="text-blue-400 underline">Terms and Conditions</a>.
                </p>
            </div>
        </div>
    );
}
