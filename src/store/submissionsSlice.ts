import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSubmission } from '../Shared/buildSubmission';
import type { RootState } from './rootState';

export interface SubmissionsState {
  items: FormSubmission[];
}

const initialState: SubmissionsState = {
  items: [],
};

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<FormSubmission>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addSubmission } = submissionsSlice.actions;

export const selectSubmissions = (state: RootState) => state.submissions.items;

export default submissionsSlice.reducer;
