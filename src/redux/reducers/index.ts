import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import userInfoReducer from './userInfoSlice';

const rootReducer = combineReducers({
    counter: counterReducer,
    userInfo: userInfoReducer,

    // Add more reducers here
});

export default rootReducer;
