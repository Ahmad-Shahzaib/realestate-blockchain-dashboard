import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAxiosInstance } from '@/lib/axios';

// Types based on the API response for transaction payments
export interface Payment {
  paymentId: string;
  paymentType: string;
  paymentSlip: string;
  status: string;
  amount: number;
  currency: string;
  paymentDate: string;
}

export interface TransactionPayment {
  transactionId: string;
  propertyId: string;
  propertyName: string;
  propertyDescription: string;
  propertyMainImageUrl: string;
  propertyLocation: {
    coordinates: {
      latitude: number;
      longitude: number;
    };
    address: string;
    city: string;
    state: string;
    country: string;
  };
  userId: string;
  userName: string;
  userEmail: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  totalPrice: number;
  totalSquareFeet: number;
  status: string;
  type: string;
  paymentSuccess: boolean;
  createdAt: string;
  updatedAt: string;
  payments: Payment[];
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

interface TransactionPaymentState {
  transactions: TransactionPayment[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionPaymentState = {
  transactions: [],
  pagination: null,
  loading: false,
  error: null,
};

// Async thunk to fetch transaction payments by customerId and page
export const fetchTransactionPayments = createAsyncThunk<
  { transactions: TransactionPayment[]; pagination: Pagination },
  { customerId: string; page?: number; limit?: number },
  { rejectValue: string }
>(
  'transactionPayment/fetchTransactionPayments',
  async ({ customerId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const axiosInstance = getAxiosInstance('/api');
      const response = await axiosInstance.get(`/api/transactions/customer/properties-with-payments`, {
        params: { customerId, page, limit },
      });
      // API returns { status, data: { transactions, pagination, ... } }
      const { transactions, pagination } = response.data.data;
      return { transactions, pagination };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch transaction payments');
    }
  }
);

const transactionPaymentSlice = createSlice({
  name: 'transactionPayment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTransactionPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transactionPaymentSlice.reducer;
