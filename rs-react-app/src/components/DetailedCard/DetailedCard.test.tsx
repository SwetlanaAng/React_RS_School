import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailedCard from './DetailedCard';
import { mockCharacters } from '@/test/mockCharacters';
import { renderWithProviders } from '@/test/utils/testUtils';

const clearDetailsActionMock = vi.hoisted(() => vi.fn());

vi.mock('@/app/actions/searchActions', () => ({
  clearDetailsAction: clearDetailsActionMock,
}));

describe('DetailedCard', () => {
  const character = mockCharacters[0];

  beforeEach(() => {
    clearDetailsActionMock.mockReset();
  });

  it('renders character details', () => {
    renderWithProviders(<DetailedCard {...character} />, {
      searchParams: 'page=1&name=Rick',
    });

    expect(screen.getByAltText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.location.name)).toBeInTheDocument();
    expect(screen.getByText(character.gender)).toBeInTheDocument();
    expect(screen.getByText(character.species)).toBeInTheDocument();
    expect(screen.getByText(character.status)).toBeInTheDocument();
  });

  it('includes current search params in hidden form fields', () => {
    renderWithProviders(<DetailedCard {...character} />, {
      searchParams: 'name=Rick&page=2',
    });

    expect(screen.getByDisplayValue('Rick')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  it('submits clearDetailsAction when close button is clicked', async () => {
    const user = userEvent.setup();

    renderWithProviders(<DetailedCard {...character} />, {
      searchParams: 'page=1',
    });

    await user.click(screen.getByRole('button', { name: /close details/i }));

    expect(clearDetailsActionMock).toHaveBeenCalledTimes(1);
  });
});
