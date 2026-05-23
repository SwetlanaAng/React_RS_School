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
    addCharacter: (state, action: PayloadAction<Character>) => {
      state.selected.push(action.payload);
      console.log(state.selected);
    },
  },
});
export const { addCharacter, clearAllSelected } = charactersSlice.actions;
export default charactersSlice.reducer;
