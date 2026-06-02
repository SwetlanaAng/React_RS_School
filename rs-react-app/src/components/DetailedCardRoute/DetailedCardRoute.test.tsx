import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router';
import { vi } from 'vitest';
import DetailedCardRoute from './DetailedCardRoute';
import { mockCharacters } from '../../test/mockCharacters';
import { getOneCharacter } from '../../services/apiService/apiService';

vi.mock('../../services/apiService/apiService', () => ({
  getOneCharacter: vi.fn(),
}));

function LocationDisplay() {
  const location = useLocation();

  return <span data-testid="location">{location.search}</span>;
}

function renderDetailedCardRoute(initialEntry: string) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <DetailedCardRoute />
      <LocationDisplay />
    </MemoryRouter>
  );
}

describe('DetailedCardRoute', () => {
  const mockedGetOneCharacter = vi.mocked(getOneCharacter);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when details param is missing', () => {
    renderDetailedCardRoute('/?page=1');

    expect(mockedGetOneCharacter).not.toHaveBeenCalled();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Rick Sanchez')).not.toBeInTheDocument();
  });

  it('shows spinner while details are loading', () => {
    mockedGetOneCharacter.mockReturnValue(new Promise(vi.fn()));

    renderDetailedCardRoute('/?page=1&details=1');

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders detailed card after character is loaded', async () => {
    const character = mockCharacters[0];
    mockedGetOneCharacter.mockResolvedValue(character);

    renderDetailedCardRoute('/?page=1&details=1');

    expect(await screen.findByText(character.name)).toBeInTheDocument();
    expect(screen.getByAltText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.location.name)).toBeInTheDocument();
  });

  it('removes details param when close button is clicked', async () => {
    const user = userEvent.setup();
    mockedGetOneCharacter.mockResolvedValue(mockCharacters[0]);

    renderDetailedCardRoute('/?page=1&details=1');

    await screen.findByText('Rick Sanchez');
    await user.click(screen.getByRole('button', { name: /close details/i }));

    expect(screen.getByTestId('location')).toHaveTextContent('?page=1');
  });
});
