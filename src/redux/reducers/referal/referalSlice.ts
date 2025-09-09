// referalSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ReferralService from "@/services/referal.service";

export type Referral = {
    level: number;
    percentage: number;
    description: string;
    isActive: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

interface ReferralState {
    referral: Referral | null;
    loading: boolean;
    error: string | null;
}

const initialState: ReferralState = {
    referral: null,
    loading: false,
    error: null,
};

// ✅ Thunks
export const fetchReferralCode = createAsyncThunk(
    "referral/fetchReferralCode",
    async (_, { rejectWithValue }) => {
        try {
            return await ReferralService.getReferralCode();
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to fetch referral code");
        }
    }
);

export const createReferral = createAsyncThunk(
    "referral/createReferral",
    async (formData: Partial<Referral>, { rejectWithValue }) => {
        try {
            return await ReferralService.createReferral(formData);
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to create referral");
        }
    }
);

// ✅ Slice
const referralSlice = createSlice({
    name: "referral",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReferralCode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReferralCode.fulfilled, (state, action) => {
                state.loading = false;
                state.referral = action.payload;
            })
            .addCase(fetchReferralCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createReferral.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReferral.fulfilled, (state, action) => {
                state.loading = false;
                state.referral = action.payload;
            })
            .addCase(createReferral.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// ✅ Export reducer + thunks
export default referralSlice.reducer;
// export { createReferral, fetchReferralCode };
