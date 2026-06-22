import { isResponseCharacter } from '@/utils/typeGuards';
import { ResponseCharacter } from './types';

export const BASE_URL = 'https://rickandmortyapi.com/api';

type CharactersResult =
  | { ok: true; data: ResponseCharacter }
  | { ok: false; error: string };
export async function getCharacters(
  search?: string,
  page?: number
): Promise<CharactersResult> {
  const url = new URL(`${BASE_URL}/character/`);

  if (search) {
    url.searchParams.set('name', search);
  }
  if (page) {
    url.searchParams.set('page', String(page));
  }

  const response = await fetch(url.toString(), {
    cache: 'force-cache',
    next: { revalidate: Number(process.env.NEXT_PUBLIC_CACHE_TTL) || 60 },
  });

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
