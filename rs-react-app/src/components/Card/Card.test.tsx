import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';
import { mockCharacters } from '@/test/mockCharacters';
import { toggleCharacter } from '@/store/charactersSlice';
import {
  createTestStore,
  renderWithProviders,
  type TestStore,
} from '@/test/utils/testUtils';

const selectDetailsActionMock = vi.hoisted(() => vi.fn());

vi.mock('@/app/actions/searchActions', () => ({
  selectDetailsAction: selectDetailsActionMock,
}));

function renderCard(
  searchParams = 'page=1',
  options?: { store?: TestStore; characterIndex?: number }
) {
  const character = mockCharacters[options?.characterIndex ?? 0];
  const store = options?.store ?? createTestStore();

  return {
    character,
    store,
    ...renderWithProviders(<Card character={character} />, {
      store,
      searchParams,
    }),
  };
}

describe('Card', () => {
  beforeEach(() => {
    selectDetailsActionMock.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders Card', () => {
    const { character } = renderCard('page=1');

    expect(screen.getByAltText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.name)).toBeInTheDocument();
  });

  it('shows selected styles when character is in the store', () => {
    const store = createTestStore();
    const character = mockCharacters[0];
    store.dispatch(toggleCharacter(character));

    renderCard('page=1', { store });

    expect(
      screen.getByRole('checkbox', { name: `Select ${character.name}` })
    ).toBeChecked();
    expect(screen.getByAltText(character.name).closest('form')).toHaveClass(
      'ring-fuchsia-400'
    );
  });

  it('toggles selection when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const { character } = renderCard('page=1');

    const checkbox = screen.getByRole('checkbox', {
      name: `Select ${character.name}`,
    });

    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByAltText(character.name).closest('form')).toHaveClass(
      'ring-fuchsia-400'
    );

    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it('includes name, page and detailsId in the form', () => {
    const { character } = renderCard('name=Rick&page=2');

    expect(screen.getByDisplayValue(String(character.id))).toBeInTheDocument();
    expect(screen.getByDisplayValue('Rick')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  it('defaults page to 1 when page is missing in the URL', () => {
    const { container } = renderCard('');

    const pageInput = container.querySelector('input[name="page"]');

    expect(pageInput).toHaveValue('1');
  });

  it('submits selectDetailsAction when card is clicked', async () => {
    const user = userEvent.setup();
    const { character } = renderCard('name=Rick&page=2');

    await user.click(screen.getByAltText(character.name));

    expect(selectDetailsActionMock).toHaveBeenCalledTimes(1);
  });
});
