import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../config/apiUrls';
import { getAxiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';

export interface Customer {
  _id: number;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  primaryAddress: string;
  secondaryAddress: string;
  nationalId: string;
  profilePicture: File | null;
  accountStatus: string;
  dateOfRegistration: string;
  preferredContactMethod: string;
  occupation: string;
  annualIncome: string;
  investmentExperience: string;
  riskTolerance: string;
  kycStatus: string;
  amlStatus: string;
  walletAddress: string;
  referralCode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  notes: string;
}

interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
};

export const fetchCustomers = createAsyncThunk(
  'customer/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const base = process.env.API_BASE_URL || BASE_URL || '';
      const url = `${base.replace(/\/$/, '')}/users/customers`;
      const response = await axios.get(url);
      // expected response shape: { status: 'success', data: [...] }
      // prefer response.data.data when present, otherwise response.data
      const payload = response.data?.data ?? response.data;
      return payload;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch customers');
    }
  }
);

export const addCustomer = createAsyncThunk(
  'customer/addCustomer',
  async (customer: any, { rejectWithValue }) => {
    try {

      const response:any = await getAxiosInstance('/api/auth').post("/api/auth/register", customer);
      if(response.data.status === 'success'){
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.push(action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default customerSlice.reducer;
