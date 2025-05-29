import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Project Details",
};

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  // This would normally fetch data based on the ID
  const projectId = params.id;
  
  return (
    <>
      <Breadcrumb pageName={`Project Details: #${projectId}`} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Project Info */}
        <div className="lg:col-span-2 rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Globe Residency Apartments</h2>
              <p className="text-gray-500">Residential Project • Naya Nazimabad, Karachi</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                In Progress
              </span>
            </div>
          </div>
          
          <div className="relative h-[300px] rounded-lg overflow-hidden mb-6">
            <Image
              src="/images/cards/cards-01.png"
              alt="Globe Residency Apartments"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-sm">Completion</p>
              <p className="font-bold text-lg">60%</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-sm">Total Area</p>
              <p className="font-bold text-lg">12,490 sq.ft</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-sm">Units</p>
              <p className="font-bold text-lg">156</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-sm">Est. Completion</p>
              <p className="font-bold text-lg">March 2026</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Project Description</h3>
            <p className="text-gray-600 mb-3">
              Globe Residency Apartments is a premium residential complex located in the heart of Naya Nazimabad, Karachi. 
              The project consists of 156 luxury apartments spread across 14 floors with a total covered area of 12,490 sq.ft.
            </p>
            <p className="text-gray-600">
              The development offers modern amenities including a swimming pool, fitness center, 24/7 security, dedicated parking, 
              and landscaped gardens. Each apartment is designed with high-quality finishes and fixtures to provide an exceptional living experience.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Construction Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Foundation</span>
                  <span className="font-medium">100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Structure</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Interior Work</span>
                  <span className="font-medium">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Exterior Finishes</span>
                  <span className="font-medium">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Landscaping</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-3">Project Timeline</h3>
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              {/* Timeline items */}
              <div className="space-y-6">
                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Project Planning & Design</h4>
                    <p className="text-sm text-gray-500">Completed - June 2023</p>
                  </div>
                </div>
                
                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Site Preparation</h4>
                    <p className="text-sm text-gray-500">Completed - October 2023</p>
                  </div>
                </div>
                
                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Foundation Work</h4>
                    <p className="text-sm text-gray-500">Completed - February 2024</p>
                  </div>
                </div>
                
                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Structure & Framework</h4>
                    <p className="text-sm text-gray-500">In Progress - Expected: August 2025</p>
                  </div>
                </div>
                
                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Interior & Exterior Finishes</h4>
                    <p className="text-sm text-gray-500">Expected: January 2026</p>
                  </div>
                </div>
                
                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Project Completion</h4>
                    <p className="text-sm text-gray-500">Expected: March 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar - Investment Info */}
        <div className="lg:col-span-1">
          {/* Investment Stats */}
          <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark mb-6">
            <h3 className="text-lg font-bold mb-4">Investment Details</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Total Investment</span>
                  <span className="font-medium">$3.2 Million</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <div className="flex justify-between mt-1 text-sm">
                  <span className="text-gray-500">Raised: $2.4M</span>
                  <span className="text-gray-500">75%</span>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Investors</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Min. Investment</span>
                  <span className="font-medium">$10,000</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Expected Annual Return</span>
                  <span className="font-medium text-green-600">20%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Investment Period</span>
                  <span className="font-medium">5 years</span>
                </div>
              </div>
              
              <div className="pt-4">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Invest Now
                </button>
              </div>
            </div>
          </div>
          
          {/* Project Team */}
          <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark mb-6">
            <h3 className="text-lg font-bold mb-4">Project Team</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                  <Image
                    src="/images/user/user-01.png"
                    alt="Ahmed Khan"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <p className="font-medium">Ahmed Khan</p>
                  <p className="text-sm text-gray-500">Project Manager</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                  <Image
                    src="/images/user/user-02.png"
                    alt="Sana Malik"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <p className="font-medium">Sana Malik</p>
                  <p className="text-sm text-gray-500">Lead Architect</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                  <Image
                    src="/images/user/user-03.png"
                    alt="Farhan Ahmed"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <p className="font-medium">Farhan Ahmed</p>
                  <p className="text-sm text-gray-500">Construction Lead</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                  <Image
                    src="/images/user/user-04.png"
                    alt="Zainab Hasan"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <p className="font-medium">Zainab Hasan</p>
                  <p className="text-sm text-gray-500">Interior Designer</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Project Documents */}
          <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
            <h3 className="text-lg font-bold mb-4">Documents</h3>
            
            <div className="space-y-3">
              <a href="#" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 4v12h10V8.414L10.586 4H5zm5 .414L14.586 8H10V4.414zM3 2a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V7.414a1 1 0 00-.293-.707l-5-5A1 1 0 0012 2H3z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium">Project Proposal</p>
                  <p className="text-xs text-gray-500">PDF • 2.3 MB</p>
                </div>
              </a>
              
              <a href="#" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 4v12h10V8.414L10.586 4H5zm5 .414L14.586 8H10V4.414zM3 2a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V7.414a1 1 0 00-.293-.707l-5-5A1 1 0 0012 2H3z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium">Legal Documentation</p>
                  <p className="text-xs text-gray-500">DOCX • 1.8 MB</p>
                </div>
              </a>
              
              <a href="#" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 4v12h10V8.414L10.586 4H5zm5 .414L14.586 8H10V4.414zM3 2a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V7.414a1 1 0 00-.293-.707l-5-5A1 1 0 0012 2H3z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium">Financial Projections</p>
                  <p className="text-xs text-gray-500">XLSX • 956 KB</p>
                </div>
              </a>
              
              <a href="#" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 4v12h10V8.414L10.586 4H5zm5 .414L14.586 8H10V4.414zM3 2a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V7.414a1 1 0 00-.293-.707l-5-5A1 1 0 0012 2H3z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium">Construction Timeline</p>
                  <p className="text-xs text-gray-500">PDF • 1.2 MB</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
