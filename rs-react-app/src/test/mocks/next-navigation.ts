import { vi } from 'vitest';

export const mockPush = vi.fn();
export const mockReplace = vi.fn();
export const mockRefresh = vi.fn();
export const redirectMock = vi.fn(() => {
  const error = new Error('NEXT_REDIRECT');
  (error as Error & { digest: string }).digest = 'NEXT_REDIRECT;replace;/en;307;';
  throw error;
});

let searchParams = new URLSearchParams();

export function setMockSearchParams(query = '') {
  const normalized = query.startsWith('?') ? query.slice(1) : query;
  searchParams = new URLSearchParams(normalized);
}

export function getMockSearchParams() {
  return searchParams;
}

export function resetNavigationMocks() {
  mockPush.mockReset();
  mockReplace.mockReset();
  mockRefresh.mockReset();
  redirectMock.mockReset();
  redirectMock.mockImplementation(() => {
    const error = new Error('NEXT_REDIRECT');
    (error as Error & { digest: string }).digest =
      'NEXT_REDIRECT;replace;/en;307;';
    throw error;
  });
  setMockSearchParams('');
}

export function useSearchParams() {
  return searchParams;
}

export function useRouter() {
  return {
    push: mockPush,
    replace: mockReplace,
    refresh: mockRefresh,
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  };
}

export function usePathname() {
  return '/';
}

export function useParams() {
  return { locale: 'en' };
}

export function redirect() {
  redirectMock();
}
