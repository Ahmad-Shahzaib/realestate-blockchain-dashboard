"use client"
import React from 'react'
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectService from '@/services/project.service';

// Define the Project type or import it from your models/types
type Coordinates = {
  latitude: number;
  longitude: number;
};

type Location = {
  address: string;
  city: string;
  state: string;
  country: string;
  coordinates: Coordinates;
};

type Developer = {
  name: string;
  description: string;
  logoUrl: string;
  website: string;
};

type Floor = {
  _id: string;
  name: string;
  description: string;
  floorNumber: number;
  floorPlanUrl: string;
  totalSquareFootage: number;
  totalUnits: number;
  availableUnits: number;
  soldUnits: number;
  reservedUnits: number;
  pricePerSqFt: number;
  minPrice: number;
  maxPrice: number;
  specifications: string[];
  features: string[];
  isTokenized: boolean;
  tokenId: string | null;
  mintAddress: string | null;
  ownerWalletAddress: string | null;
  tokenStatus: string;
  mintTransactionHash: string | null;
  remainingTotalSquareFootage: number;
  createdAt: string;
  updatedAt: string;
};

type Token = {
  name: string;
  symbol: string;
  supply: number;
  pricePerToken: number;
  walletAddress: string;
};

type FAQ = {
  _id: string;
  question: string;
  answer: string;
};

type BankDetails = {
  bankName: string;
  accountNumber: string;
  accountTitle: string;
  iban: string;
};

type Project = {
  _id: string;
  name: string;
  description: string;
  location: Location;
  apartments: any[];
  developer: Developer;
  status: string;
  category: string;
  subcategory: string;
  featured: boolean;
  startDate: string;
  completionDate: string;
  floors: Floor[];
  documents: string[];
  amenities: string[];
  mainImageUrl: string;
  galleryImages: string[];
  totalArea: number;
  sellableArea: number;
  totalUnits: number;
  soldUnits: number;
  reservedUnits: number;
  availableUnits: number;
  views: number;
  inquiries: number;
  roi: number;
  totalInvestment: number;
  token: Token;
  faqs: FAQ[];
  bankDetails: BankDetails;
  tokenizationEnabled: boolean;
  blockchainNetwork: string;
  smartContractAddress: string | null;
  tokenSymbol: string | null;
  createdBy: string;
  isActive: boolean;
  customerId: string;
  updates: any[];
  socialMediaLinks: string[];
  createdAt: string;
  updatedAt: string;
  apartmentCount: number;
};

const page = () => {
  // read dynamic route params using useParams
  const params = useParams();
  // params.slug may be string | string[] | undefined depending on route
  const rawSlug = params?.slug;
  const projectId = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null); // State for user role
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        if (!projectId) {
          throw new Error('Project id not found in route');
        }
        const projectData = await ProjectService.getProjectById(projectId);
        console.log("Fetched project data:", projectData);
        setProject(projectData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch project details.");
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-xl">Project not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="relative h-96">
          <img
            src={project.mainImageUrl}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${project.status === 'pending_approval' ? 'bg-yellow-100 text-yellow-800' :
              project.status === 'approved' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
              {project.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {project.category}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {project.subcategory}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {project.totalUnits} Units
              </div>
              <div className="text-sm text-gray-500">
                {project.availableUnits} Available
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-semibold">{project.totalArea}</div>
              <div className="text-sm text-gray-500">Total Area (sqft)</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{project.sellableArea}</div>
              <div className="text-sm text-gray-500">Sellable Area (sqft)</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{project.roi}%</div>
              <div className="text-sm text-gray-500">Expected ROI</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{project.totalInvestment}</div>
              <div className="text-sm text-gray-500">Total Investment</div>
            </div>
          </div>
        </div>
      </div>

      {/* Location and Property Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Location Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Location</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-gray-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <div className="font-medium">Address</div>
                <div className="text-gray-600">{project.location.address}</div>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 text-gray-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <div>
                <div className="font-medium">City</div>
                <div className="text-gray-600">{project.location.city}</div>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 text-gray-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="font-medium">State & Country</div>
                <div className="text-gray-600">{project.location.state}, {project.location.country}</div>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 text-gray-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <div>
                <div className="font-medium">Coordinates</div>
                <div className="text-gray-600">
                  {project.location.coordinates.latitude}°N, {project.location.coordinates.longitude}°E
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Specifications */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Property Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Status</div>
              <div className="font-medium capitalize">{project.status.replace('_', ' ')}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Category</div>
              <div className="font-medium capitalize">{project.category} - {project.subcategory}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Start Date</div>
              <div className="font-medium">{new Date(project.startDate).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Completion Date</div>
              <div className="font-medium">{new Date(project.completionDate).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Units Status</div>
              <div className="font-medium">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  Available: {project.availableUnits}
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                  Reserved: {project.reservedUnits}
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-500"></span>
                  Sold: {project.soldUnits}
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Project Stats</div>
              <div className="font-medium">
                <div>Views: {project.views}</div>
                <div>Inquiries: {project.inquiries}</div>
                <div>ROI: {project.roi}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Information */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Developer Information</h2>
        <div className="flex items-start gap-6">
          {/* <div className="w-32 h-32 flex-shrink-0">
            <img
              src={project.developer.logoUrl}
              alt={project.developer.name}
              className="w-full h-full object-contain rounded-lg bg-gray-50 p-2"
            />
          </div> */}
          <div className="flex-grow">
            <h3 className="text-xl font-semibold mb-2">{project.developer.name}</h3>
            <p className="text-gray-600 mb-4">{project.developer.description}</p>
            <a
              href={project.developer.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Visit Website
            </a>
          </div>
        </div>
      </div>

      {/* Floor Plans */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Floor Plans</h2>
        <div className="space-y-8">
          {project.floors.map((floor) => (
            <div key={floor._id} className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{floor.name}</h3>
                  <p className="text-gray-600">{floor.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    Floor {floor.floorNumber}
                  </div>
                  <div className="text-sm text-gray-500">
                    {floor.totalSquareFootage} sq ft
                  </div>
                </div>
              </div>

              {/* Floor Plan Image */}
              <div className="mb-6">
                <img
                  src={floor.floorPlanUrl}
                  alt={`Floor plan for ${floor.name}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Floor Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Units Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Units:</span>
                      <span>{floor.totalUnits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span>{floor.availableUnits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sold:</span>
                      <span>{floor.soldUnits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reserved:</span>
                      <span>{floor.reservedUnits}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Pricing</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per sq ft:</span>
                      <span>${floor.pricePerSqFt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min Price:</span>
                      <span>${floor.minPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Price:</span>
                      <span>${floor.maxPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Token Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tokenized:</span>
                      <span>{floor.isTokenized ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="capitalize">{floor.tokenStatus.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specifications and Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Specifications</h4>
                  <ul className="list-disc list-inside space-y-2">
                    {floor.specifications.map((spec, index) => (
                      <li key={index} className="text-gray-600">{spec}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Features</h4>
                  <ul className="list-disc list-inside space-y-2">
                    {floor.features.map((feature, index) => (
                      <li key={index} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tokenization Details */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tokenization Details</h2>
          <div className={`px-4 py-2 rounded-full text-sm font-semibold ${project.tokenizationEnabled
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
            }`}>
            {project.tokenizationEnabled ? 'Enabled' : 'Disabled'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Blockchain Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Blockchain Details</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Network</div>
                <div className="font-medium capitalize">{project.blockchainNetwork}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Smart Contract Address</div>
                <div className="font-medium">
                  {project.smartContractAddress || 'Not deployed yet'}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Token Symbol</div>
                <div className="font-medium">
                  {project.tokenSymbol || 'Not assigned'}
                </div>
              </div>
            </div>
          </div>

          {/* Token Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Token Details</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Token Name</div>
                <div className="font-medium">{project.token.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Symbol</div>
                <div className="font-medium">{project.token.symbol}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Supply</div>
                  <div className="font-medium">{project.token.supply} tokens</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Price Per Token</div>
                  <div className="font-medium">${project.token.pricePerToken}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Wallet Address</div>
                <div className="font-medium break-all">
                  {project.token.walletAddress}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Bank Name</div>
              <div className="font-medium">{project.bankDetails.bankName}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Account Title</div>
              <div className="font-medium">{project.bankDetails.accountTitle}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Account Number</div>
              <div className="font-medium">{project.bankDetails.accountNumber}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">IBAN</div>
              <div className="font-medium">{project.bankDetails.iban}</div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      {project.faqs.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {project.faqs.map((faq) => (
              <details key={faq._id} className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                  <h3 className="font-medium text-lg pr-6">{faq.question}</h3>
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 group-open:transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="mt-4 px-4 text-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* Document [] */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 mt-4" >
        <h2 className="text-2xl font-bold mb-4">Project Documents</h2>
        {project.documents.length === 0 ? (
          <div className="text-gray-500">No documents available.</div>
        ) : (
          <ul className="list-disc list-inside space-y-2">
            {project.documents.map((docUrl, index) => {
              const fileName = docUrl.split('/').pop();
              return (
                <li key={index}>
                  <a
                    href={docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {fileName || `Document ${index + 1}`}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>


    </div>
  )
}

export default page
