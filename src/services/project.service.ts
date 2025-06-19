import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Define interfaces for the API response data
export interface ProjectLocation {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface ProjectStats {
  availableUnits: number;
}

export interface Project {
  _id: string;
  name: string;
  status: string;
  category: string;
  featured: boolean;
  mainImageUrl: string;
  location: ProjectLocation;
  priceRange: PriceRange;
  stats: ProjectStats;
}

export interface ApiResponse {
  status: string;
  data: Project[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ProjectPayload {
  name: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  developer: {
    name: string;
    description: string;
    logoUrl: string;
    website: string;
  };
  status: string;
  category: string;
  subcategory: string;
  featured: boolean;
  startDate: string;
  completionDate: string;
  floors: Array<{
    name: string;
    description: string;
    floorNumber: number;
    floorPlanUrl: string;
    totalUnits: number;
    pricePerSqFt: number;
    minPrice: number;
    maxPrice: number;
    specifications: string[];
    features: string[];
  }>;
  mainImageUrl: string;
  galleryImages: string[];
  totalArea: number;
  priceRange: {
    min: number;
    max: number;
  };
}

const API_BASE_URL = 'http://localhost:5000/api';

// Create Axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    //  get token from cookies
    const tokenRow = document.cookie.split('; ').find(row => row.startsWith('token='));
    const token = tokenRow ? tokenRow.split('=')[1] : '';
    // If token exists, set it in the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('Request sent:', (config.method ?? 'GET').toUpperCase(), config.url, config);
    return config;
  },
  (error: AxiosError) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(  
  (response: AxiosResponse) => {
    console.log('Response received:', response.config.method?.toUpperCase(), response.config.url, response.data);
    return response;
  },
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out:', error.message);
      return Promise.reject(new Error('Request timed out. API server may be down.'));
    }
    if (error.response) {
      console.error('Response error:', error.response.status, error.response.data);
      // Handle specific status codes
      if (error.response.status === 401) {
        // Example: Handle unauthorized access
        console.error('Unauthorized access - redirecting to login');
        // Optionally trigger a redirect or logout
      } else if (error.response.status === 404) {
        console.error('Resource not found');
      }
    } else if (!error.response) {
      console.error('Network error:', error.message);
      return Promise.reject(new Error('Network error. Please check your connection or if the API server is running.'));
    }
    return Promise.reject(error);
  }
);

/**
 * Service for handling project-related API requests
 */
export const ProjectService = {
  /**
   * Fetch all projects
   * @returns Promise with the API response
   */
  getAllProjects: async (): Promise<ApiResponse> => {
    try {
      const response = await api.get('/projects');
      return response.data;
    } catch (error: any) {
      throw error; // Error already handled by interceptor
    }
  },

  /**
   * Fetch a specific project by ID
   * @param id Project ID
   * @returns Promise with the project data
   */
  getProjectById: async (id: string): Promise<Project> => {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data.data;
    } catch (error: any) {
      throw error; // Error already handled by interceptor
    }
  },

  /**
   * Find a project by ID from a list of projects
   * @param projects List of projects
   * @param id Project ID to find
   * @returns The found project or undefined
   */
  findProjectById: (projects: Project[], id: string): Project | undefined => {
    return projects.find(project => project._id === id);
  },

  /**
   * Create a new project
   * @param payload Project data
   * @returns Promise with the created project data
   */
  createProject: async (payload: ProjectPayload) => {
    try {
      const response = await api.post('/projects', payload);
      return response.data;
    } catch (error: any) {
      throw error; // Error already handled by interceptor
    }
  },
};

export default ProjectService;