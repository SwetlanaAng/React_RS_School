import { render, screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';
import App from '../App';
import { mockCharacters } from '@/test/mockCharacters';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/contexts/ThemeContext/ThemeContextProvider';
import { charactersApi } from '@/store/apiSlice';
import {
  createMockSuccessResponse,
  createTestStore,
  getFetchUrl,
  mockFetchError,
  mockFetchSuccess,
  mockPendingFetch,
} from '@/test/utils/testUtils';

const mockInfo = {
  count: mockCharacters.length,
  pages: 2,
  next: 'https://rickandmortyapi.com/api/character?page=2',
  prev: null,
};

const mockPage1: typeof mockCharacters = [mockCharacters[0]];
const mockPage2: typeof mockCharacters = [mockCharacters[1]];

describe('App', () => {
  function renderApp(testStore = createTestStore()) {
    return render(
      <MemoryRouter>
        <ThemeProvider>
          <Provider store={testStore}>
            <App />
          </Provider>
        </ThemeProvider>
      </MemoryRouter>
    );
  }

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('renders App', () => {
    mockFetchSuccess({ info: mockInfo, results: mockCharacters });

    renderApp();

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Error Button' })
    ).toBeInTheDocument();
  });

  it('renders App with cards from API', async () => {
    const testStore = createTestStore();
    void testStore.dispatch(
      charactersApi.util.upsertQueryData(
        'getCharacters',
        { search: '', page: 1 },
        { info: mockInfo, results: mockCharacters }
      )
    );

    renderApp(testStore);

    expect(await screen.findByAltText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('shows spinner while characters are loading', () => {
    mockPendingFetch();

    renderApp();

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error UI when API request fails', async () => {
    mockFetchError();

    renderApp();

    expect(
      await screen.findByText(/there is no matching characters/i)
    ).toBeInTheDocument();
  });

  it('reuses cached list data without a second fetch', async () => {
    const fetchMock = mockFetchSuccess({
      info: mockInfo,
      results: mockCharacters,
    });
    const testStore = createTestStore();

    const { unmount } = renderApp(testStore);

    await screen.findByAltText('Rick Sanchez');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    unmount();

    renderApp(testStore);

    await screen.findByAltText('Rick Sanchez');

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('refetches when refresh button invalidates cache', async () => {
    const fetchMock = mockFetchSuccess({
      info: mockInfo,
      results: mockCharacters,
    });
    const user = userEvent.setup();

    renderApp();

    await screen.findByAltText('Rick Sanchez');

    expect(fetchMock).toHaveBeenCalledTimes(1);

    await user.click(
      screen.getByRole('button', { name: /cache invalidation and refetch/i })
    );

    await waitFor(() => {
      expect(fetchMock.mock.calls.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('caches pagination pages separately', async () => {
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = getFetchUrl(input);
      if (url.includes('page=1')) {
        return Promise.resolve(
          createMockSuccessResponse({
            info: { ...mockInfo, pages: 2, next: 'page2', prev: null },
            results: mockPage1,
          })
        );
      }
      if (url.includes('page=2')) {
        return Promise.resolve(
          createMockSuccessResponse({
            info: {
              ...mockInfo,
              pages: 2,
              next: null,
              prev: 'page1',
            },
            results: mockPage2,
          })
        );
      }
      return Promise.reject(new Error(`Unexpected fetch: ${url}`));
    });
    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();

    renderApp();

    await screen.findByAltText('Rick Sanchez');

    expect(fetchMock).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: '2' }));

    await screen.findByAltText('Morty Smith');

    expect(fetchMock).toHaveBeenCalledTimes(2);

    await user.click(screen.getByRole('button', { name: '1' }));

    await screen.findByAltText('Rick Sanchez');

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('fetches characters by submitted search value', async () => {
    const fetchMock = mockFetchSuccess({ info: mockInfo, results: [] });

    renderApp();

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Search...'), 'Rick');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem('search')).toBe('Rick');

    expect(fetchMock).toHaveBeenCalled();
    const lastFetchInput = fetchMock.mock.calls.at(-1)?.[0];
    if (lastFetchInput === undefined) {
      throw new Error('Expected fetch to have been called with a URL');
    }
    const requestUrl = getFetchUrl(lastFetchInput);

    expect(requestUrl).toBe(
      'https://rickandmortyapi.com/api/character?name=Rick&page=1'
    );
  });

  it('shows error UI when error button clicked', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    mockFetchSuccess({ info: mockInfo, results: [] });

    renderApp();

    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /error button/i }));

    expect(
      await screen.findByText(/Something went wrong/i)
    ).toBeInTheDocument();

    consoleError.mockRestore();
  });
});
