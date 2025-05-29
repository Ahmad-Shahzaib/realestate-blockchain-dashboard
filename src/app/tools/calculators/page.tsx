import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculators",
};

export default function CalculatorsPage() {
  return (
    <>
      <Breadcrumb pageName="Calculators" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ROI Calculator */}
        <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
          <h2 className="text-xl font-bold mb-4">ROI Calculator</h2>
          <p className="text-gray-500 mb-6">Calculate potential returns on your real estate investments</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Initial Investment ($)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="10000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Annual Return (%)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="12"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Investment Period (Years)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="5"
              />
            </div>
            
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Calculate ROI
            </button>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Results:</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500">Total Return</p>
                  <p className="font-bold text-lg">$17,623.42</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ROI</p>
                  <p className="font-bold text-lg">76.23%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mortgage Calculator */}
        <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
          <h2 className="text-xl font-bold mb-4">Mortgage Calculator</h2>
          <p className="text-gray-500 mb-6">Estimate your monthly mortgage payments</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Value ($)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="250000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment ($)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="50000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="5.5"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (Years)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="30"
              />
            </div>
            
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Calculate Payment
            </button>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Monthly Payment:</h3>
              <p className="font-bold text-2xl">$1,136.53</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
