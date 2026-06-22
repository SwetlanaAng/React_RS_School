import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm';
import { renderWithProviders } from '@/test/utils/testUtils';

const searchActionMock = vi.hoisted(() => vi.fn());
const saveSearchMock = vi.hoisted(() => vi.fn());

vi.mock('@/app/actions/searchActions', () => ({
  searchAction: searchActionMock,
}));

vi.mock('@/hooks/useStorage', () => ({
  useStorage: () => ({
    saveSearch: saveSearchMock,
  }),
}));

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react');

  return {
    ...actual,
    useActionState: (
      action: (prevState: null, formData: FormData) => Promise<null>,
      initialState: null
    ) => {
      const formAction = (formData: FormData) => {
        void action(initialState, formData);
      };

      return [initialState, formAction, false] as const;
    },
  };
});

describe('SearchForm', () => {
  beforeEach(() => {
    searchActionMock.mockReset();
    saveSearchMock.mockReset();
  });

  it('renders SearchForm', () => {
    renderWithProviders(<SearchForm />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('uses search value from URL as default input value', () => {
    renderWithProviders(<SearchForm />, { searchParams: 'name=Rick' });

    expect(screen.getByPlaceholderText('Search...')).toHaveValue('Rick');
  });

  it('calls searchAction and saveSearch when form is submitted', async () => {
    const user = userEvent.setup();

    renderWithProviders(<SearchForm />);

    await user.type(screen.getByPlaceholderText('Search...'), 'Rick');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(searchActionMock).toHaveBeenCalledTimes(1);
    expect(saveSearchMock).toHaveBeenCalledWith('Rick');
  });

  it('trims whitespace from submitted search value', async () => {
    const user = userEvent.setup();

    renderWithProviders(<SearchForm />);

    await user.type(screen.getByPlaceholderText('Search...'), '  Rick  ');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(saveSearchMock).toHaveBeenCalledWith('Rick');
  });
});
