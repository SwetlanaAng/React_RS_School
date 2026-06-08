import { configureStore } from '@reduxjs/toolkit';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import type { FormSubmission } from '../Shared/buildSubmission';
import { COUNTRIES } from '../Shared/countries';
import countriesSliceReducer from '../store/countriesSlice';
import currentFormSliceReducer from '../store/currentFormSlice';
import submissionsSliceReducer from '../store/submissionsSlice';
import Home from './Home';

vi.mock('../components/UncontrolledForm/UncontrolledForm', () => ({
  default: ({
    onSubmitSuccess,
  }: {
    onSubmitSuccess?: (submissionId: string) => void;
  }) => (
    <button
      type="button"
      onClick={() => {
        onSubmitSuccess?.('highlight-id');
      }}
    >
      Submit
    </button>
  ),
}));

const submissionAnna: FormSubmission = {
  id: '1',
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

const submissionBob: FormSubmission = {
  ...submissionAnna,
  id: '2',
  source: 'rhf',
  name: 'Bob',
  email: 'bob@example.com',
};

function renderHome(
  ui: ReactElement = <Home />,
  options?: { submissions?: FormSubmission[] }
) {
  const store = configureStore({
    reducer: {
      currentForm: currentFormSliceReducer,
      countries: countriesSliceReducer,
      submissions: submissionsSliceReducer,
    },
    preloadedState: {
      currentForm: { selectedForm: null },
      countries: { countries: COUNTRIES },
      submissions: { items: options?.submissions ?? [] },
    },
  });

  return {
    store,
    user: userEvent.setup(),
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}

async function openUncontrolledForm(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: 'Uncontrolled Form' }));
}

describe('Home', () => {
  it('renders page title and empty submissions message', () => {
    renderHome();

    expect(
      screen.getByRole('heading', { name: 'React Forms', level: 1 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Submissions', level: 2 })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'No submissions yet. Fill out a form to see your data here.'
      )
    ).toBeInTheDocument();
  });

  it('opens uncontrolled form modal and updates store', async () => {
    const { store, user } = renderHome();

    await openUncontrolledForm(user);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Uncontrolled form' })
    ).toBeInTheDocument();
    expect(store.getState().currentForm.selectedForm).toBe('uncontrolled');
    expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });

  it('opens React Hook Form modal and updates store', async () => {
    const { store, user } = renderHome();

    await user.click(screen.getByRole('button', { name: 'React Hook Form' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'React Hook Form' })
    ).toBeInTheDocument();
    expect(store.getState().currentForm.selectedForm).toBe('RHF');
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('closes modal and clears selected form', async () => {
    const { store, user } = renderHome();

    await openUncontrolledForm(user);
    await user.click(screen.getByRole('button', { name: 'Close modal' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(store.getState().currentForm.selectedForm).toBeNull();
  });

  it('renders submission cards with newest first', () => {
    renderHome(<Home />, {
      submissions: [submissionAnna, submissionBob],
    });

    const [newestCard, oldestCard] = screen.getAllByRole('article');

    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(within(newestCard).getByText('Bob')).toBeInTheDocument();
    expect(within(oldestCard).getByText('Anna')).toBeInTheDocument();
    expect(
      within(newestCard).getByRole('heading', { name: 'React Hook Form' })
    ).toBeInTheDocument();
    expect(
      within(oldestCard).getByRole('heading', { name: 'Uncontrolled form' })
    ).toBeInTheDocument();
  });

  it('closes modal and highlights matching submission card after success', () => {
    vi.useFakeTimers();

    const { store } = renderHome(<Home />, {
      submissions: [{ ...submissionAnna, id: 'highlight-id' }],
    });

    fireEvent.click(screen.getByRole('button', { name: 'Uncontrolled Form' }));
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(store.getState().currentForm.selectedForm).toBeNull();

    const card = screen.getByRole('article');
    expect(card).toHaveClass('border-purple-400');

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(card).toHaveClass('border-teal-200');
    expect(card).not.toHaveClass('border-purple-400');

    vi.useRealTimers();
  });
});
