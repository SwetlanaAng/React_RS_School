import { ApiService } from './apiService';
import { mockCharacters } from '../../test/mockCharacters';
describe('apiService', () => {
  const service = new ApiService();
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('gets characters from API', async () => {
    const mockFetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: mockCharacters,
      }),
    } as Response);
    const result = await service.getCharacters('');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character'
    );
    expect(result).toEqual(mockCharacters);
  });
  it('gets characters from API with search', async () => {
    const filteredCharacters = mockCharacters.filter((character) =>
      character.name.includes('Rick')
    );

    const mockFetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: filteredCharacters,
      }),
    } as Response);
    const result = await service.getCharacters('Rick');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=Rick'
    );
    expect(result).toEqual(filteredCharacters);
  });
  it('throws error if API returns 404', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    await expect(service.getCharacters('')).rejects.toThrow(
      'Failed to fetch characters'
    );
  });
  it('throws error if status not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);
    await expect(service.getCharacters('')).rejects.toThrow(
      'Failed to fetch characters'
    );
  });
});
