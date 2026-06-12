import { createSlice } from '@reduxjs/toolkit';

export interface currentFormState {
  selectedForm: 'uncontrolled' | 'RHF' | null;
}

const initialState: currentFormState = {
  selectedForm: null,
};

const currentFormSlice = createSlice({
  name: 'form',
  initialState,

  reducers: {
    clearSelectedForm: (state) => {
      state.selectedForm = null;
    },
    selectUncontrolled: (state) => {
      state.selectedForm = 'uncontrolled';
    },
    selectRHF: (state) => {
      state.selectedForm = 'RHF';
    },
  },
});

export const { clearSelectedForm, selectUncontrolled, selectRHF } =
  currentFormSlice.actions;

export default currentFormSlice.reducer;
