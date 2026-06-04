import { configureStore } from '@reduxjs/toolkit';
import currentFormSliceReducer from './currentFormSlice';

export const store = configureStore({
  reducer: {
    currentForm: currentFormSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
