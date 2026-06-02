import { getCharacters, getOneCharacter } from './apiService';
import { mockCharacters } from '../../test/mockCharacters';
describe('apiService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('gets characters from API', async () => {
    const mockFetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          results: mockCharacters,
        }),
    } as Response);

    const result = await getCharacters('');
    const requestUrl = mockFetch.mock.calls[0]?.[0];
    expect(requestUrl).toBeInstanceOf(URL);

    if (!(requestUrl instanceof URL)) {
      throw new Error('Expected fetch to be called with URL');
    }

    expect(requestUrl.toString()).toBe(
      'https://rickandmortyapi.com/api/character'
    );
    expect(result.results).toEqual(mockCharacters);
  });

  it('gets characters from API with search', async () => {
    const filteredCharacters = mockCharacters.filter((character) =>
      character.name.includes('Rick')
    );

    const mockFetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () =>
        Promise.resolve({
          results: filteredCharacters,
        }),
    } as Response);

    const result = await getCharacters('Rick');
    const requestUrl = mockFetch.mock.calls[0]?.[0];
    expect(requestUrl).toBeInstanceOf(URL);

    if (!(requestUrl instanceof URL)) {
      throw new Error('Expected fetch to be called with URL');
    }

    expect(requestUrl.toString()).toBe(
      'https://rickandmortyapi.com/api/character?name=Rick'
    );
    expect(result.results).toEqual(filteredCharacters);
  });

  it('throws error if API returns 404', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    await expect(getCharacters('')).rejects.toThrow(
      'Failed to fetch characters'
    );
  });
  it('throws error if status not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);
    await expect(getCharacters('')).rejects.toThrow(
      'Failed to fetch characters'
    );
  });

  it('gets one character from API by id', async () => {
    const character = mockCharacters[0];
    const mockFetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(character),
    } as Response);

    const result = await getOneCharacter(character.id);
    const requestUrl = mockFetch.mock.calls[0]?.[0];

    expect(requestUrl).toBeInstanceOf(URL);

    if (!(requestUrl instanceof URL)) {
      throw new Error('Expected fetch to be called with URL');
    }

    expect(requestUrl.toString()).toBe(
      'https://rickandmortyapi.com/api/character/1'
    );
    expect(result).toEqual(character);
  });

  it('throws error if one character request fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);

    await expect(getOneCharacter(1)).rejects.toThrow(
      'Failed to fetch this character'
    );
  });

  it('throws error if one character response is invalid', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ name: 'Invalid character' }),
    } as Response);

    await expect(getOneCharacter(1)).rejects.toThrow(
      'Failed to fetch this character'
    );
  });
});
