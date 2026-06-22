import { isCharacter, isResponseCharacter } from '@/utils/typeGuards';
import { mockCharacters } from '@/test/mockCharacters';
import { mockResponseCharacter } from '@/test/mockResponseCharacter';

describe('typeGuards', () => {
  it('validates response character shape', () => {
    expect(isResponseCharacter(mockResponseCharacter)).toBe(true);
    expect(isResponseCharacter(null)).toBe(false);
    expect(isResponseCharacter({ results: 'invalid' })).toBe(false);
  });

  it('validates character shape', () => {
    expect(isCharacter(mockCharacters[0])).toBe(true);
    expect(isCharacter({ id: 1 })).toBe(false);
  });
});
