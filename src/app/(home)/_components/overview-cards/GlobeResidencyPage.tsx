export default function GlobeResidencyFormUI() {
    return (
        <main className="min-h-screen pt-4">
            <div className=" mx-auto  shadow-2xl rounded-2xl p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Globe Residency House</h1>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Property Info */}
                    <div>
                        <label className="block font-semibold  mb-1">Property Name</label>
                        <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="Globe Residency House" />
                    </div>

                    <div>
                        <label htmlFor="propertyType" className="block font-semibold  mb-1">Property Type</label>
                        <select id="propertyType" className="w-full border rounded-lg px-4 py-3">
                            <option>House</option>
                            <option>Apartment</option>
                        </select>
                    </div>

                    {/* Location Info */}
                    <div>
                        <label className="block font-semibold  mb-1">Address</label>
                        <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="Naya Nazimabad, Karachi" />
                    </div>

                    <div>
                        <label className="block font-semibold  mb-1">City</label>
                        <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="Karachi" />
                    </div>

                    <div>
                        <label className="block font-semibold  mb-1">State</label>
                        <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="Sindh" />
                    </div>

                    <div>
                        <label className="block font-semibold  mb-1">Country</label>
                        <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="Pakistan" />
                    </div>

                    {/* Area Info */}
                    <div>
                        <label className="block font-semibold  mb-1">Total Area (sq.ft)</label>
                        <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="12490" />
                    </div>

                    <div>
                        <label className="block font-semibold  mb-1">Round Area (sq.ft)</label>
                        <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="12490" />
                    </div>

                    {/* Development Info */}
                    <div>
                        <label className="block font-semibold  mb-1">Current Development Round</label>
                        <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="19" />
                    </div>

                    <div>
                        <label className="block font-semibold  mb-1">Total Rounds</label>
                        <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="21" />
                    </div>

                    <div>
                        <label className="block font-semibold  mb-1">Expected Completion Year</label>
                        <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="2026" />
                    </div>

                    {/* Token Info */}
                    <div>
                        <label className="block font-semibold  mb-1">Token Name</label>
                        <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="GlobeHouseToken" />
                    </div>

                    <div>
                        <label className="block font-semibold  mb-1">Token Symbol</label>
                        <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="GHT" />
                    </div>

                    <div>
                        <label className="block font-semibold  mb-1">Token Supply</label>
                        <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="1" />
                    </div>

                    <div>
                        <label className="block font-semibold  mb-1">Price Per Token (PKR)</label>
                        <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="120000000" />
                    </div>

                    {/* Wallet and Admin Info */}
                    <div>
                        <label className="block font-semibold  mb-1">Wallet Address</label>
                        <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="User's Phantom Wallet Address" />
                    </div>


                </form>

                <div className="mt-8 flex justify-end">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                        Submit
                    </button>
                </div>
            </div>
        </main>
    );
}
