import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import userInfoReducer from './userInfoSlice';
import customerReducer from './customerSlice';
import projectReducer from './projectSlice';

const rootReducer = combineReducers({
    counter: counterReducer,
    userInfo: userInfoReducer,
    customer: customerReducer,
    project: projectReducer,

    // Add more reducers here
});

export default rootReducer;
