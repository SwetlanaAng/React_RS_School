import charactersReducer, {
  clearAllSelected,
  toggleCharacter,
} from './charactersSlice';
import { mockCharacters } from '@/test/mockCharacters';

describe('charactersSlice', () => {
  it('returns initial state', () => {
    const state = charactersReducer(undefined, { type: 'unknown' });

    expect(state.selected).toEqual([]);
  });

  it('adds and removes selected character', () => {
    const stateWithCharacter = charactersReducer(
      undefined,
      toggleCharacter(mockCharacters[0])
    );

    expect(stateWithCharacter.selected).toEqual([mockCharacters[0]]);

    const stateWithoutCharacter = charactersReducer(
      stateWithCharacter,
      toggleCharacter(mockCharacters[0])
    );

    expect(stateWithoutCharacter.selected).toEqual([]);
  });

  it('clears all selected characters', () => {
    const state = {
      selected: mockCharacters,
    };

    const nextState = charactersReducer(state, clearAllSelected());

    expect(nextState.selected).toEqual([]);
  });
});
