import { configureStore } from '@reduxjs/toolkit';
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import countriesSliceReducer from '../store/countriesSlice';
import currentFormSliceReducer from '../store/currentFormSlice';

export function createTestStore() {
  return configureStore({
    reducer: {
      currentForm: currentFormSliceReducer,
      countries: countriesSliceReducer,
    },
  });
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const store = createTestStore();

  return {
    store,
    ...render(ui, {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      ...options,
    }),
  };
}
