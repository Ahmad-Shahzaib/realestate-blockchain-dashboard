import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAxiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';

interface CustomerState {
  customers: any[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  pagination: null,
  loading: false,
  error: null,
};

export const fetchCustomers = createAsyncThunk(
  'customer/fetchCustomers',
  async (
    { page = 1, limit = 50, search = '', status = 'all' }: { page?: number; limit?: number; search?: string; status?: string },
    { rejectWithValue }
  ) => {
    try {
      const instance = getAxiosInstance('/api');
      const query = `/api/users/customers?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}${status !== 'all' ? `&status=${status}` : ''
        }&_=${Date.now()}`;
      const response = await instance.get(query);
      console.log('API Response:', response.data); // Debug log

      // Normalize response to ensure customers is an array
      const data = response.data?.data ?? response.data;
      const customers = Array.isArray(data?.customers)
        ? data.customers
        : Array.isArray(data?.users)
          ? data.users
          : Array.isArray(data)
            ? data
            : [];
      const pagination = data?.pagination || { total: customers.length, page: 1, limit: 20, pages: Math.ceil(customers.length / 20) };

      return { customers, pagination };
    } catch (error: any) {
      console.error('Fetch Customers Error:', error); // Debug log
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch customers');
    }
  }
);

export const addCustomer = createAsyncThunk(
  'customer/addCustomer',
  async (customer: any, { rejectWithValue }) => {
    try {
      const response: any = await getAxiosInstance('/api/auth').post('/api/auth/register', customer);
      if (response.data.status === 'success') {
        toast.success('Customer added successfully!');
      }
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add customer');
      return rejectWithValue(error.response?.data?.message || 'Failed to add customer');
    }
  }
);

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    resetPage: (state) => {
      state.pagination = { ...state.pagination, page: 1 } as any;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.customers || [];
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.customers = []; // Ensure customers is an array on error
      })
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.push(action.payload);
        if (state.pagination) {
          state.pagination.total += 1;
          state.pagination.pages = Math.ceil(state.pagination.total / state.pagination.limit);
        }
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetPage } = customerSlice.actions;
export default customerSlice.reducer;