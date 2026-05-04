import type { ResponseCharacter } from '../shared/types';

export function isResponseCharacter(data: unknown): data is ResponseCharacter {
  return (
    typeof data === 'object' &&
    data !== null &&
    'results' in data &&
    Array.isArray((data as ResponseCharacter).results)
  );
}
