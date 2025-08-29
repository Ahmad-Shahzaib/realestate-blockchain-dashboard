import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DAO Bot",
};

export default function DAOBotPage() {
  return (
    <>


      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">DAO Assistant Bot</h2>
            <p className="text-gray-500">
              Get instant answers to your questions about DAOs, investments, and real estate blockchain technology.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg h-96 p-4 mb-4 overflow-y-auto">
            {/* Chat messages would appear here */}
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 rounded-lg p-3 max-w-xs md:max-w-md">
                <p className="text-gray-800">Hello! I'm your DAO assistant. How can I help you today?</p>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type your message here..."
              className="flex-1 border rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-3 rounded-r-lg">
              Send
            </button>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-2">Suggested questions:</h3>
            <div className="flex flex-wrap gap-2">
              <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                How do DAOs work?
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                What's the minimum investment?
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                How are profits distributed?
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
