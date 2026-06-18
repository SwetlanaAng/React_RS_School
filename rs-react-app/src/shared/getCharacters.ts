import { isResponseCharacter } from '@/utils/typeGuards';
import { ResponseCharacter } from './types';

export async function getCharacters(page: number): Promise<ResponseCharacter> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${String(page)}`,
    { cache: 'no-store' }
  );
  const data: unknown = await response.json();
  if (!isResponseCharacter(data)) {
    throw new Error('Invalid API response');
  }
  return data;
}
