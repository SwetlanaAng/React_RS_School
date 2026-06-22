import { getCharacters } from '@/shared/getCharacters';
import { mockResponseCharacter } from '@/test/mockResponseCharacter';
import {
  createMockJsonResponse,
  getFetchUrl,
} from '@/test/utils/testUtils';

describe('getCharacters', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches characters with search and page params', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(createMockJsonResponse(mockResponseCharacter));

    const result = await getCharacters('Rick', 2);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.results).toHaveLength(2);
    }

    expect(getFetchUrl(fetchMock.mock.calls[0][0])).toBe(
      'https://rickandmortyapi.com/api/character/?name=Rick&page=2'
    );
    expect(fetchMock).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=Rick&page=2',
      expect.objectContaining({ cache: 'force-cache' })
    );
  });

  it('returns charactersNotFound when response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(null, { status: 404 })
    );

    const result = await getCharacters('Unknown');

    expect(result).toEqual({ ok: false, error: 'charactersNotFound' });
  });

  it('returns invalidApiResponse for unexpected payload', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      createMockJsonResponse({ invalid: true })
    );

    const result = await getCharacters();

    expect(result).toEqual({ ok: false, error: 'invalidApiResponse' });
  });
});
