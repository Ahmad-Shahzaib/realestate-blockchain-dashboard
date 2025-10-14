import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ProjectPayload } from '@/services/project.service';
import ProjectService from '@/services/project.service';
import toast from 'react-hot-toast';

interface ProjectState {
  projects: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

export const createProject = createAsyncThunk(
  'project/createProject',
  async (payload: ProjectPayload | any, { rejectWithValue }) => {
    try {
      const response = await ProjectService.createProject(payload);
      if (response.status == 'success') {
        toast.success('Project created successfully!');
      }
      return response;
    } catch (error: any) {
      toast.error(error.message || 'Failed to create project');
      return rejectWithValue(error.message || 'Failed to create project');
    }
  }
);
// updateProject

export const updateProject = createAsyncThunk(

  'project/updateProject',
  async ({ id, payload }: { id: string; payload: Partial<ProjectPayload> }, { rejectWithValue }) => {
    try {
      const response = await ProjectService.updateProject(id, payload);
      if (response) {
        toast.success('Project updated successfully!');
      }
      return response;
    } catch (error: any) {
      toast.error(error.message || 'Failed to update project');
      return rejectWithValue(error.message || 'Failed to update project');
    }
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default projectSlice.reducer;
