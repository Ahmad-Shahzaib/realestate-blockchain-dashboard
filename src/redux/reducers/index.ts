import { combineReducers } from '@reduxjs/toolkit';
import userInfoReducer from './userinfoslice/userInfoSlice';
import customerReducer from './customerslice/customerSlice';
import customerTransactionsReducer from './customerslice/customerTransactionsSlice';
import projectReducer from './projectslice/projectSlice';
import leadsReducer from '../leadsSlice';
import transactionPaymentReducer from '../transactionPaymentSlice';

const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    customer: customerReducer,
    project: projectReducer,
    customerTransactions: customerTransactionsReducer,
    leads: leadsReducer,
    transactionPayment: transactionPaymentReducer,
    // Add more reducers here
});

export default rootReducer;
