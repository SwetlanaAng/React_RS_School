import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';
import { expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import { mockCharacters } from '@/test/mockCharacters';
import { Provider } from 'react-redux';
import { toggleCharacter } from '@/store/charactersSlice';
import { createTestStore, type TestStore } from '@/test/utils/testUtils';
import { LocationDisplay } from '@/test/utils/LocationDisplay';

function renderCard(
  initialEntry: string,
  options?: { store?: TestStore; characterIndex?: number }
) {
  const character = mockCharacters[options?.characterIndex ?? 0];
  const store = options?.store ?? createTestStore();

  return {
    character,
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialEntry]}>
          <Card character={character} />
          <LocationDisplay />
        </MemoryRouter>
      </Provider>
    ),
  };
}

describe('Card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders Card', () => {
    const { character } = renderCard('/?page=1');

    expect(screen.getByAltText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.name)).toBeInTheDocument();
  });

  it('shows selected styles when character is in the store', () => {
    const store = createTestStore();
    const character = mockCharacters[0];
    store.dispatch(toggleCharacter(character));

    renderCard('/?page=1', { store });

    expect(
      screen.getByRole('checkbox', { name: `Select ${character.name}` })
    ).toBeChecked();
    expect(screen.getByAltText(character.name).parentElement).toHaveClass(
      'ring-fuchsia-400'
    );
  });

  it('toggles selection when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const { character } = renderCard('/?page=1');

    const checkbox = screen.getByRole('checkbox', {
      name: `Select ${character.name}`,
    });

    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByAltText(character.name).parentElement).toHaveClass(
      'ring-fuchsia-400'
    );

    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it('sets details param with name and page when both are in the URL', async () => {
    const user = userEvent.setup();
    const { character } = renderCard('/?name=Rick&page=2');

    await user.click(screen.getByAltText(character.name));

    expect(screen.getByTestId('location')).toHaveTextContent(
      '?name=Rick&page=2&details=1'
    );
  });

  it('sets details param with page only when search is missing', async () => {
    const user = userEvent.setup();
    const { character } = renderCard('/?page=2');

    await user.click(screen.getByAltText(character.name));

    expect(screen.getByTestId('location')).toHaveTextContent(
      '?page=2&details=1'
    );
  });

  it('defaults page to 1 when opening details without page in the URL', async () => {
    const user = userEvent.setup();
    const { character } = renderCard('/');

    await user.click(screen.getByAltText(character.name));

    expect(screen.getByTestId('location')).toHaveTextContent(
      '?page=1&details=1'
    );
  });
});
