import { isResponseCharacter } from '@/utils/typeGuards';
import { ResponseCharacter } from './types';

type CharactersResult =
  | { ok: true; data: ResponseCharacter }
  | { ok: false; error: string };
export async function getCharacters(page: number): Promise<CharactersResult> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${String(page)}`,
    { cache: 'no-store' }
  );
  if (!response.ok) {
    return {
      ok: false,
      error:
        'There is no matching characters or an error has occurred (4xx or 5xx)',
    };
  }
  const data: unknown = await response.json();
  if (!isResponseCharacter(data)) {
    return { ok: false, error: 'Invalid API response' };
  }
  return { ok: true, data };
}
