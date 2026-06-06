import { configureStore } from '@reduxjs/toolkit';
import countriesSliceReducer from './countriesSlice';
import currentFormSliceReducer from './currentFormSlice';

export const store = configureStore({
  reducer: {
    currentForm: currentFormSliceReducer,
    countries: countriesSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
