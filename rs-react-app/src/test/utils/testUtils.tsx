import { configureStore } from '@reduxjs/toolkit';
import { render, type RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import type { ReactElement, ReactNode } from 'react';
import charactersReducer from '@/store/charactersSlice';
import type { ResponseCharacter } from '@/shared/types';
import en from '@/messages/en.json';
import {
  resetNavigationMocks,
  setMockSearchParams,
} from '@/test/mocks/next-navigation';

export function getFetchUrl(input: RequestInfo | URL): string {
  if (typeof input === 'string') {
    return input;
  }

  if (input instanceof URL) {
    return input.href;
  }

  if (input instanceof Request) {
    return input.url;
  }

  return String(input);
}

export function createTestStore() {
  return configureStore({
    reducer: {
      characters: charactersReducer,
    },
  });
}

export type TestStore = ReturnType<typeof createTestStore>;

export function createMockJsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function createMockSuccessResponse(body: ResponseCharacter) {
  return createMockJsonResponse(body);
}

export function createMockErrorResponse(status = 500) {
  return new Response(null, { status, statusText: 'Server Error' });
}

export function mockFetchSuccess(body: ResponseCharacter) {
  return vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(() => Promise.resolve(createMockSuccessResponse(body)));
}

export function mockFetchError(status = 500) {
  return vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(() => Promise.resolve(createMockErrorResponse(status)));
}

export function mockPendingFetch() {
  return vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(() => new Promise(vi.fn()));
}

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  store?: TestStore;
  searchParams?: string;
  locale?: 'en' | 'ru';
}

export function renderWithProviders(
  ui: ReactElement,
  {
    store = createTestStore(),
    searchParams = '',
    locale = 'en',
    ...options
  }: RenderWithProvidersOptions = {}
) {
  resetNavigationMocks();
  setMockSearchParams(searchParams);

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <NextIntlClientProvider locale={locale} messages={en}>
        <Provider store={store}>{children}</Provider>
      </NextIntlClientProvider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}
