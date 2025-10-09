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
  approveLoading: boolean;
  approveError: string | null;
  authError: string | null;
  declineLoading: boolean;
  declineError: string | null;
}

const initialState: TransactionPaymentState = {
  transactions: [],
  pagination: null,
  loading: false,
  error: null,
  approveLoading: false,
  approveError: null,
  authError: null,
  declineLoading: false,
  declineError: null,
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

// Async thunk for approving a transaction
// Async thunk for approving a transaction
export const approveTransaction = createAsyncThunk<
  TransactionPayment,
  { transactionId: string },
  { rejectValue: string }
>(
  'transactionPayment/approveTransaction',
  async ({ transactionId }, { rejectWithValue }) => {
    try {
      const axiosInstance = getAxiosInstance('/api');
      // ✅ Changed to PATCH for approval update
      const response = await axiosInstance.patch(`/api/transactions/${transactionId}/approve`);
      return response.data.data;
    } catch (err: any) {
      // Handle specific 403 error
      if (err.response?.status === 403) {
        return rejectWithValue('You are not authorized to approve transactions. Please contact your administrator.');
      }
      return rejectWithValue(err.response?.data?.message || 'Failed to approve transaction');
    }
  }
);

// Async thunk for declining a transaction
export const declineTransaction = createAsyncThunk<
  TransactionPayment,
  { transactionId: string },
  { rejectValue: string }
>(
  'transactionPayment/declineTransaction',
  async ({ transactionId }, { rejectWithValue }) => {
    try {
      const axiosInstance = getAxiosInstance('/api');
      const response = await axiosInstance.put(`/api/transactions/${transactionId}/decline`);
      return response.data.data;
    } catch (err: any) {
      if (err.response?.status === 403) {
        return rejectWithValue('You are not authorized to decline transactions. Please contact your administrator.');
      }
      return rejectWithValue(err.response?.data?.message || 'Failed to decline transaction');
    }
  }
);

const transactionPaymentSlice = createSlice({
  name: 'transactionPayment',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.approveError = null;
      state.authError = null;
      state.declineError = null;
    },
    clearAuthError: (state) => {
      state.authError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch transactions cases
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
      })

      // Approve transaction cases
      .addCase(approveTransaction.pending, (state) => {
        state.approveLoading = true;
        state.approveError = null;
      })
      .addCase(approveTransaction.fulfilled, (state, action) => {
        state.approveLoading = false;
        // Update the specific transaction in state
        const index = state.transactions.findIndex(
          (t) => t.transactionId === action.payload.transactionId
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(approveTransaction.rejected, (state, action) => {
        state.approveLoading = false;
        const errorMessage = action.payload as string;
        state.approveError = errorMessage;

        // Set auth error specifically for 403 errors
        if (errorMessage.includes('not authorized')) {
          state.authError = errorMessage;
        }
      })

      // Decline transaction cases
      .addCase(declineTransaction.pending, (state) => {
        state.declineLoading = true;
        state.declineError = null;
      })
      .addCase(declineTransaction.fulfilled, (state, action) => {
        state.declineLoading = false;
        // Update the specific transaction in state
        const index = state.transactions.findIndex(
          (t) => t.transactionId === action.payload.transactionId
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(declineTransaction.rejected, (state, action) => {
        state.declineLoading = false;
        const errorMessage = action.payload as string;
        state.declineError = errorMessage;

        // Set auth error specifically for 403 errors
        if (errorMessage.includes('not authorized')) {
          state.authError = errorMessage;
        }
      });
  },
});

export const { clearErrors, clearAuthError } = transactionPaymentSlice.actions;
export default transactionPaymentSlice.reducer;