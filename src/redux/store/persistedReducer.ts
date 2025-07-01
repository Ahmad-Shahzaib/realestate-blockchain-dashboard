import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userInfo', 'customer', 'project'], // add slices to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
