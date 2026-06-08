import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  FormSubmission,
  SubmissionPayload,
} from '../Shared/buildSubmission';

export interface SubmissionsState {
  uncontrolled: FormSubmission[];
  rhf: FormSubmission[];
}

const initialState: SubmissionsState = {
  uncontrolled: [],
  rhf: [],
};

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    addUncontrolledSubmission: (
      state,
      action: PayloadAction<SubmissionPayload>
    ) => {
      state.uncontrolled.push({
        id: crypto.randomUUID(),
        ...action.payload,
      });
    },
    addRhfSubmission: (state, action: PayloadAction<SubmissionPayload>) => {
      state.rhf.push({
        id: crypto.randomUUID(),
        ...action.payload,
      });
    },
  },
});

export const { addUncontrolledSubmission, addRhfSubmission } =
  submissionsSlice.actions;

export const selectUncontrolledSubmissions = (state: {
  submissions: SubmissionsState;
}) => state.submissions.uncontrolled;

export const selectRhfSubmissions = (state: {
  submissions: SubmissionsState;
}) => state.submissions.rhf;

export default submissionsSlice.reducer;
