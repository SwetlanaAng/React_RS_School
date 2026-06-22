import { mockCharacters } from '@/test/mockCharacters';
import type { ResponseCharacter } from '@/shared/types';

export const mockResponseCharacter: ResponseCharacter = {
  info: {
    count: mockCharacters.length,
    pages: 1,
    next: null,
    prev: null,
  },
  results: mockCharacters,
};
