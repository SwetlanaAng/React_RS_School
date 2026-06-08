import type { FormSubmission } from '../Shared/buildSubmission';
import submissionsReducer, { addSubmission } from './submissionsSlice';

const submission: FormSubmission = {
  id: 'test-id',
  source: 'uncontrolled',
  name: 'Anna',
  age: '25',
  email: 'anna@example.com',
  password: 'Pass1!',
  gender: 'female',
  agreement: true,
  image: 'data:image/png;base64,abc',
  country: 'Poland',
};

describe('submissionsSlice', () => {
  it('adds submission to history', () => {
    const state = submissionsReducer(undefined, addSubmission(submission));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(submission);
  });

  it('keeps all submissions in one list', () => {
    const first = submissionsReducer(undefined, addSubmission(submission));
    const state = submissionsReducer(
      first,
      addSubmission({ ...submission, id: '2', source: 'rhf', name: 'Bob' })
    );

    expect(state.items).toHaveLength(2);
    expect(state.items[0]?.source).toBe('uncontrolled');
    expect(state.items[1]?.source).toBe('rhf');
  });
});
