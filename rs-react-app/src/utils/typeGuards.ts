import type { Character, ResponseCharacter } from '../shared/types';

export function isResponseCharacter(data: unknown): data is ResponseCharacter {
  return (
    typeof data === 'object' &&
    data !== null &&
    'results' in data &&
    Array.isArray((data as ResponseCharacter).results)
  );
}

export function isCharacter(data: unknown): data is Character {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'location' in data &&
    'status' in data &&
    'gender' in data &&
    'name' in data
  );
}
