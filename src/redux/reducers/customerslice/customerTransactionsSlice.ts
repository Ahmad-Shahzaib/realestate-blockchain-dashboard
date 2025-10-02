import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionService, Transaction } from '@/services/transaction.service';


interface CustomerTransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerTransactionsState = {
  transactions: [],
  loading: false,
  error: null,
};

export const fetchTransactionsByCustomer = createAsyncThunk(
  'customer/fetchTransactionsByCustomer',
  async (
    { customerId, page = 1, limit = 8 }: { customerId: string; page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await TransactionService.getTransactionsByCustomerId(customerId, { page, limit });
      return res.data.transactions || [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch transactions');
    }
  }
);

const customerTransactionsSlice = createSlice({
  name: 'customerTransactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsByCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsByCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionsByCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default customerTransactionsSlice.reducer;
