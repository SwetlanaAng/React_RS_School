import type { Character, ResponseCharacter } from '../../shared/types';
import { isCharacter, isResponseCharacter } from '../../utils/typeGuards';

export const BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters(
  search?: string,
  page?: number,
  id?: number
): Promise<ResponseCharacter> {
  try {
    const url = new URL(`${BASE_URL}/character${id ? '/' + String(id) : ''}`);

    if (search) {
      url.searchParams.set('name', search);
    }
    if (page) {
      url.searchParams.set('page', String(page));
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Search failed');
    }
    const characters: unknown = await res.json();
    if (!isResponseCharacter(characters)) {
      throw new Error('Invalid API response');
    }
    return characters;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch characters');
  }
}

export async function getOneCharacter(id: number): Promise<Character> {
  try {
    const url = new URL(`${BASE_URL}/character/${String(id)}`);

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Search failed');
    }
    const character: unknown = await res.json();
    if (!isCharacter(character)) {
      throw new Error('Invalid API response');
    }
    return character;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch this character');
  }
}
