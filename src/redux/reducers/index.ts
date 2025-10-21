import { combineReducers } from '@reduxjs/toolkit';
import userInfoReducer from './userinfoslice/userInfoSlice';
import customerReducer from './customerslice/customerSlice';
import customerTransactionsReducer from './customerslice/customerTransactionsSlice';
import projectReducer from './projectslice/projectSlice';
import leadsReducer from '../leadsSlice';
import transactionPaymentReducer from '../transactionPaymentSlice';
import { PURGE } from 'redux-persist';

// Combine all slices
const appReducer = combineReducers({
  userInfo: userInfoReducer,
  customer: customerReducer,
  project: projectReducer,
  customerTransactions: customerTransactionsReducer,
  leads: leadsReducer,
  transactionPayment: transactionPaymentReducer,
  // Add more reducers here
});

// ✅ Root reducer that can reset all slices
const rootReducer = (state: any, action: any) => {
  // When RESET_ALL or PURGE is dispatched, clear all state
  if (action.type === 'RESET_ALL' || action.type === PURGE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
