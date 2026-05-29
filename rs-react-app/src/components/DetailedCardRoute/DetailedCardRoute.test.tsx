import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, useLocation } from 'react-router';
import type { Character } from '../../shared/types';
import DetailedCardRoute from './DetailedCardRoute';
import { charactersApi } from '../../store/apiSlice';
import charactersReducer from '../../store/charactersSlice';
import { mockCharacters } from '../../test/mockCharacters';

function getFetchUrl(input: RequestInfo | URL): string {
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

function createTestStore() {
  return configureStore({
    reducer: {
      characters: charactersReducer,
      [charactersApi.reducerPath]: charactersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(charactersApi.middleware),
  });
}

function LocationDisplay() {
  const location = useLocation();

  return <span data-testid="location">{location.search}</span>;
}

function renderDetailedCardRoute(
  initialEntry: string,
  options?: { preloadCharacter?: Character }
) {
  const store = createTestStore();

  if (options?.preloadCharacter) {
    const character = options.preloadCharacter;
    void store.dispatch(
      charactersApi.util.upsertQueryData(
        'getOneCharacter',
        { id: character.id },
        character
      )
    );
  }

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <DetailedCardRoute />
        <LocationDisplay />
      </MemoryRouter>
    </Provider>
  );
}

describe('DetailedCardRoute', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders nothing when details param is missing', () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    renderDetailedCardRoute('/?page=1');

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Rick Sanchez')).not.toBeInTheDocument();
  });

  it('shows spinner while details are loading', async () => {
    const pendingResponse = new Promise<Response>(() => {
      // Intentionally never resolves — keeps loading state for the test.
    });
    const fetchMock = vi.fn(() => pendingResponse);
    vi.stubGlobal('fetch', fetchMock);

    renderDetailedCardRoute('/?page=1&details=1');

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      const [fetchInput] = fetchMock.mock.calls[0] as unknown as [
        RequestInfo | URL,
      ];
      expect(getFetchUrl(fetchInput)).toContain('/character/1');
    });
  });

  it('renders detailed card after character is loaded', async () => {
    const character = mockCharacters[0];
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = getFetchUrl(input);

      if (url.includes(`/character/${String(character.id)}`)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(character),
        } as Response);
      }

      return Promise.reject(new Error(`Unexpected fetch: ${url}`));
    });
    vi.stubGlobal('fetch', fetchMock);

    renderDetailedCardRoute('/?page=1&details=1');

    expect(await screen.findByText(character.name)).toBeInTheDocument();
    expect(screen.getByAltText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.location.name)).toBeInTheDocument();
  });

  it('removes details param when close button is clicked', async () => {
    const user = userEvent.setup();
    const character = mockCharacters[0];

    renderDetailedCardRoute('/?page=1&details=1', {
      preloadCharacter: character,
    });

    expect(await screen.findByText(character.name)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /close details/i }));

    expect(screen.getByTestId('location')).toHaveTextContent('?page=1');
  });
});
