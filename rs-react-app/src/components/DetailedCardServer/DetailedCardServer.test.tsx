import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import type { Character } from '@/shared/types';
import DetailedCardRoute from './DetailedCardServer';
import { charactersApi } from '@/store/apiSlice';
import { mockCharacters } from '@/test/mockCharacters';
import {
  createTestStore,
  getFetchUrl,
  createMockJsonResponse,
  type TestStore,
  mockFetchError,
} from '@/test/utils/testUtils';
import { LocationDisplay } from '@/test/utils/LocationDisplay';

function renderDetailedCardRoute(
  initialEntry: string,
  options?: { preloadCharacter?: Character; store?: TestStore }
) {
  const store = options?.store ?? createTestStore();

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
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockReturnValue(new Promise(vi.fn));

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
        return Promise.resolve(createMockJsonResponse(character));
      }

      return Promise.reject(new Error(`Unexpected fetch: ${url}`));
    });
    vi.stubGlobal('fetch', fetchMock);

    renderDetailedCardRoute('/?page=1&details=1');

    expect(await screen.findByText(character.name)).toBeInTheDocument();
    expect(screen.getByAltText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.location.name)).toBeInTheDocument();
  });

  it('reuses cached character without a second fetch', async () => {
    const character = mockCharacters[0];
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = getFetchUrl(input);
      if (url.includes(`/character/${String(character.id)}`)) {
        return Promise.resolve(createMockJsonResponse(character));
      }
      return Promise.reject(new Error(`Unexpected fetch: ${url}`));
    });
    vi.stubGlobal('fetch', fetchMock);

    const testStore = createTestStore();
    const { unmount } = renderDetailedCardRoute('/?page=1&details=1', {
      store: testStore,
    });

    await screen.findByText(character.name);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    unmount();

    renderDetailedCardRoute('/?page=1&details=1', { store: testStore });

    await screen.findByText(character.name);

    expect(fetchMock).toHaveBeenCalledTimes(1);
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

  it('shows error UI when character request fails', async () => {
    mockFetchError();

    renderDetailedCardRoute('/?page=1&details=1');

    expect(
      await screen.findByText(/there is no character or an error has occurred/i)
    ).toBeInTheDocument();
  });
});
