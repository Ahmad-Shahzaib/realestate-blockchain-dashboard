import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';

interface CounterState {
    user: any,
    token: string,
    refreshToken: string
}

const initialState: CounterState = {
    user: {},
    token: '',
    refreshToken: ''
};

const authenticationSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {

    },
});

export const { } = authenticationSlice.actions;
export default authenticationSlice.reducer;
