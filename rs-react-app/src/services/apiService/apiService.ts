import type { Character } from '../../shared/types';
import { isResponseCharacter } from '../../utils/typeGuards';

export class ApiService {
  private readonly BASE_URL = 'https://rickandmortyapi.com/api';

  public async getCharacters(search: string): Promise<Character[]> {
    try {
      let url = `${this.BASE_URL}/character`;
      if (search) {
        url += `/?name=${search}`;
      }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Search failed');
      }
      const characters: unknown = await res.json();
      if (!isResponseCharacter(characters)) {
        throw new Error('Invalid API response');
      }
      return characters.results;
    } catch {
      throw new Error('Failed to fetch characters');
    }
  }
}
