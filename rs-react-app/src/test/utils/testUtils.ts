import { configureStore } from '@reduxjs/toolkit';
import { charactersApi } from '@/store/apiSlice';
import charactersReducer from '@/store/charactersSlice';
import type { ResponseCharacter } from '@/shared/types';

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
      [charactersApi.reducerPath]: charactersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(charactersApi.middleware),
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
    .mockImplementation(() => new Promise(vi.fn));
}
