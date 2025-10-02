
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAxiosInstance } from '@/lib/axios';

// Transaction and property types based on API response
export interface Transaction {
  id: string;
  _id?: string;
  propertyId: {
    _id: string;
    name: string;
    location: {
      address: string;
      city?: string;
      state?: string;
      country?: string;
      coordinates?: { latitude: number; longitude: number };
    };
  };
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  status: string;
  createdAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

interface LeadsState {
  transactions: Transaction[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
}

const initialState: LeadsState = {
  transactions: [],
  pagination: null,
  loading: false,
  error: null,
};

// Async thunk to fetch leads by customerId and page
export const fetchLeads = createAsyncThunk<
  { transactions: Transaction[]; pagination: Pagination },
  { customerId: string; page?: number },
  { rejectValue: string }
>(
  'leads/fetchLeads',
  async ({ customerId, page = 1 }, { rejectWithValue }) => {
    try {
      const axiosInstance = getAxiosInstance('/api');
      const response = await axiosInstance.get(`/api/transactions/customer/properties`, {
        params: { customerId, page },
      });
      // API returns { status, data: { transactions, pagination, ... } }
      const { transactions, pagination } = response.data.data;
      return { transactions, pagination };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch leads');
    }
  }
);

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default leadsSlice.reducer;
