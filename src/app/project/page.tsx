import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  // Sample project data
  const projects = [
    {
      id: 1,
      name: "Globe Residency Apartments",
      type: "Residential",
      location: "Naya Nazimabad, Karachi",
      status: "In Progress",
      completion: "60%",
      investment: "$2.4M / $3.2M",
      date: "March 2026"
    },
    {
      id: 2,
      name: "City Center Commercial Plaza",
      type: "Commercial",
      location: "Gulberg, Lahore",
      status: "In Progress",
      completion: "35%",
      investment: "$4.2M / $8.5M",
      date: "July 2027"
    },
    {
      id: 3,
      name: "Sunset Hills Villas",
      type: "Residential",
      location: "DHA Phase 8, Karachi",
      status: "Planning",
      completion: "10%",
      investment: "$0.8M / $5.5M",
      date: "December 2027"
    },
    {
      id: 4,
      name: "Tech Innovation Hub",
      type: "Commercial",
      location: "Blue Area, Islamabad",
      status: "In Progress",
      completion: "75%",
      investment: "$6.3M / $7.1M",
      date: "October 2025"
    }
  ];
  
  return (
    <>
      <Breadcrumb pageName="Projects" />
      
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold">All Projects</h2>
            <p className="text-gray-500">Manage and track all real estate projects</p>
          </div>
          
          <div className="flex mt-4 md:mt-0">
            <div className="relative mr-2">
              <input
                type="text"
                placeholder="Search projects..."
                className="px-4 py-2 pr-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              + New Project
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Investment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Est. Completion
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{project.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{project.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{project.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${project.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' : 
                        project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: project.completion }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">{project.completion}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{project.investment}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{project.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href={`/project/${project.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                      View
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-4 py-3">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> results
          </div>
          <div className="flex">
            <button className="px-3 py-1 border rounded-md mr-2 bg-gray-50 text-gray-400 cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 border rounded-md bg-gray-50 text-gray-400 cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
