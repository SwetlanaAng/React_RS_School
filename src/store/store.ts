import { configureStore } from '@reduxjs/toolkit';
import countriesSliceReducer from './countriesSlice';
import currentFormSliceReducer from './currentFormSlice';
import submissionsSliceReducer from './submissionsSlice';

export const store = configureStore({
  reducer: {
    currentForm: currentFormSliceReducer,
    countries: countriesSliceReducer,
    submissions: submissionsSliceReducer,
  },
});

export type { RootState } from './rootState';
export type AppDispatch = typeof store.dispatch;
