import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardsBox from './CardsBox';
import { mockCharacters } from '@/test/mockCharacters';
import { renderWithProviders } from '@/test/utils/testUtils';

const clearDetailsActionMock = vi.hoisted(() => vi.fn());
const selectDetailsActionMock = vi.hoisted(() => vi.fn());

vi.mock('@/app/actions/searchActions', () => ({
  clearDetailsAction: clearDetailsActionMock,
  selectDetailsAction: selectDetailsActionMock,
}));

describe('CardsBox', () => {
  beforeEach(() => {
    clearDetailsActionMock.mockReset();
  });

  it('renders CardsBox', () => {
    renderWithProviders(<CardsBox characters={mockCharacters} />);

    expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByAltText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('calls clearDetailsAction when background is clicked', async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(
      <CardsBox characters={mockCharacters} />,
      { searchParams: 'name=Rick&page=2&details=1' }
    );

    const background = container.querySelector('.mx-1.my-4.rounded-2xl');

    expect(background).toBeInstanceOf(HTMLElement);
    if (!(background instanceof HTMLElement)) {
      throw new Error('Expected cards background to be rendered');
    }

    await user.click(background);

    expect(clearDetailsActionMock).toHaveBeenCalledTimes(1);
  });

  it('does not clear details when a card is clicked', async () => {
    const user = userEvent.setup();

    renderWithProviders(<CardsBox characters={mockCharacters} />, {
      searchParams: 'page=1&details=1',
    });

    await user.click(screen.getByAltText('Rick Sanchez'));

    expect(clearDetailsActionMock).not.toHaveBeenCalled();
  });
});
