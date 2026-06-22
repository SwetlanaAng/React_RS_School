import { screen } from '@testing-library/react';
import DetailedCardServer from './DetailedCardServer';
import { mockCharacters } from '@/test/mockCharacters';
import {
  createMockJsonResponse,
  getFetchUrl,
  mockFetchError,
  renderWithProviders,
} from '@/test/utils/testUtils';
import en from '@/messages/en.json';

vi.mock('next-intl/server', () => ({
  getTranslations: async () => {
    return (key: keyof typeof en.errors) => en.errors[key];
  },
}));

describe('DetailedCardServer', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  async function renderDetailedCardServer(detailsId: number | null) {
    const ui = await DetailedCardServer({ detailsId });
    return renderWithProviders(<>{ui}</>, { searchParams: 'page=1' });
  }

  it('renders nothing when details param is missing', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const { container } = await renderDetailedCardServer(null);

    expect(fetchMock).not.toHaveBeenCalled();
    expect(container.querySelector('form')).not.toBeInTheDocument();
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

    await renderDetailedCardServer(character.id);

    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(screen.getByAltText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.location.name)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      `https://rickandmortyapi.com/api/character/${String(character.id)}`,
      expect.objectContaining({
        cache: 'force-cache',
      })
    );
  });

  it('shows error UI when character request fails', async () => {
    mockFetchError();

    await renderDetailedCardServer(1);

    expect(
      screen.getByText(en.errors.characterNotFound)
    ).toBeInTheDocument();
  });

  it('shows error UI when API response is invalid', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      createMockJsonResponse({ invalid: true })
    );

    await renderDetailedCardServer(1);

    expect(
      screen.getByText(en.errors.characterNotFound)
    ).toBeInTheDocument();
  });
});
