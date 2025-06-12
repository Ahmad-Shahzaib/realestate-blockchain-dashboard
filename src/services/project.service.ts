
// Project Service for API calls

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

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Service for handling project-related API requests
 */
export const ProjectService = {
  /**
   * Fetch all projects
   * @returns Promise with the API response
   */  getAllProjects: async (): Promise<ApiResponse> => {
    try {
      console.log('Fetching all projects from:', `${API_BASE_URL}/projects`);
      
      // Adding timeout to the fetch to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization headers if needed
        },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Projects API Response:', data);
      return data;
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      
      // Handle specific error types
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. API server may be down.');
      } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your connection or if the API server is running.');
      }
      
      throw error;
    }
  },

  /**
   * Fetch a specific project by ID
   * @param id Project ID
   * @returns Promise with the project data
   */  getProjectById: async (id: string): Promise<Project> => {
    try {
      console.log(`Fetching project with ID ${id} from:`, `${API_BASE_URL}/projects/${id}`);
      
      // Adding timeout to the fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization headers if needed
        },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(`Project ${id} API Response:`, result);
      return result.data;
    } catch (error: any) {
      console.error(`Error fetching project with ID ${id}:`, error);
      
      // Handle specific error types
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. API server may be down.');
      } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your connection or if the API server is running.');
      }
      
      throw error;
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
  }
};

export default ProjectService;