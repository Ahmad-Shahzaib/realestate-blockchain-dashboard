import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <>
      <Breadcrumb pageName="Settings" />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-[10px] shadow-1 p-4 dark:bg-gray-dark">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Settings</h3>
            <nav className="space-y-1">
              <a href="#account" className="block px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium">
                Account
              </a>
              <a href="#security" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
                Security
              </a>
              <a href="#notifications" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
                Notifications
              </a>
              <a href="#wallet" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
                Wallet Settings
              </a>
              <a href="#kyc" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
                KYC Verification
              </a>
              <a href="#preferences" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
                Preferences
              </a>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-3 space-y-6">
          {/* Account Settings */}
          <div id="account" className="bg-white rounded-[10px] shadow-1 p-6 dark:bg-gray-dark">
            <h2 className="text-xl font-bold mb-4">Account Settings</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="John"
                    defaultValue="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Doe"
                    defaultValue="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="john@example.com"
                  defaultValue="john.doe@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="+1 (555) 123-4567"
                  defaultValue="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={4}
                  placeholder="Tell us about yourself"
                  defaultValue="Real estate investor with a focus on residential properties. Blockchain enthusiast since 2017."
                ></textarea>
              </div>
              
              <div className="pt-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          
          {/* Security Settings */}
          <div id="security" className="bg-white rounded-[10px] shadow-1 p-6 dark:bg-gray-dark">
            <h2 className="text-xl font-bold mb-4">Security Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Change Password</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input 
                      type="password" 
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="pt-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Two-Factor Authentication</h3>
                <p className="text-gray-600 mb-3">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Currently disabled</p>
                  </div>
                  <button className="bg-green-500 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-green-600 transition-colors">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Notifications Settings */}
          <div id="notifications" className="bg-white rounded-[10px] shadow-1 p-6 dark:bg-gray-dark">
            <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive email updates about your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Investment Updates</p>
                  <p className="text-sm text-gray-500">Receive updates about your investments</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">DAO Governance</p>
                  <p className="text-sm text-gray-500">Receive notifications about voting and governance</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Marketing & Promotions</p>
                  <p className="text-sm text-gray-500">Receive marketing communications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="pt-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
