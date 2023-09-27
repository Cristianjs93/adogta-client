import { configureStore } from '@reduxjs/toolkit';
import generalReducer from './slices/generalSlice';

const store = configureStore({
  reducer: {
    general: generalReducer,
  },
});

export default store;
