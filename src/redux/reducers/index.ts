import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  // Add more reducers here
});

export default rootReducer;
