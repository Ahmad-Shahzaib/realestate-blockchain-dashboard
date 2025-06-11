import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isAuthenticated: boolean;
    user: {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
    } | null;
}

const initialState: UserState = {
    isAuthenticated: false,
    user: null,
};

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState['user']>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
