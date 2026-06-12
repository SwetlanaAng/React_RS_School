import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Character } from '../shared/types';

interface CharactersState {
  selected: Character[];
}

const initialState: CharactersState = {
  selected: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,

  reducers: {
    clearAllSelected: (state) => {
      state.selected = [];
    },
    toggleCharacter: (state, action: PayloadAction<Character>) => {
      const selectedIndex = state.selected.findIndex((item) => {
        return item.id === action.payload.id;
      });

      if (selectedIndex === -1) {
        state.selected.push(action.payload);
      } else {
        state.selected.splice(selectedIndex, 1);
      }
    },
  },
});

export const { toggleCharacter, clearAllSelected } = charactersSlice.actions;
export default charactersSlice.reducer;
