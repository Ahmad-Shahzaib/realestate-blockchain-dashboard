export default function QubeLahore() {
    return (
        <div className="">
            <div className="flex space-x-6">
                {/* Qube Lahore Section */}
                <div className="w-3/4 p-6 bg-white rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Qube Lahore</h2>
                    <p className="text-gray-600 text-sm mb-6">
                        Qube harmoniously inculcates a secure environment, equipped with all the principal features that prompt an integrated lifestyle. This project has been well constructed with amenities that offer luxury and comfort. It functions as a multipurpose, state-of-the-art lifestyle complex, enabling people and businesses to grow. The Corporate offices at Qube encompasses dynamic conditions for maximum productivity. Spanning over 22,000 sqft, it features exceptional rentable and saleable commercial spaces.
                    </p>
                    <button className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-indigo-700">
                        Download Handbook
                    </button>
                </div>

                {/* Investment & Rental Returns Section */}
                <div className="w-1/4 p-6 bg-white rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Investment & Rental Returns</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="area" className="text-gray-600 text-sm font-medium">
                                Area to Own
                            </label>
                            <span className="text-gray-600 text-sm font-medium">@ 28,000 PKR / sq.ft.</span>
                        </div>
                        <input
                            type="text"
                            id="area"
                            placeholder=""
                            className="w-full p-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                        <button className="w-full bg-gray-400 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-500">
                            Calculate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}