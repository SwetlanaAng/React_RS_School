import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './charactersSlice';
import { charactersApi } from './apiSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
