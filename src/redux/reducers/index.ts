import { combineReducers } from '@reduxjs/toolkit';
import userInfoReducer from './userinfoslice/userInfoSlice';
import customerReducer from './customerslice/customerSlice';
import projectReducer from './projectslice/projectSlice';

const rootReducer = combineReducers({

    userInfo: userInfoReducer,
    customer: customerReducer,
    project: projectReducer,

    // Add more reducers here
});

export default rootReducer;
