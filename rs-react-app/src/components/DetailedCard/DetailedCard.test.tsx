import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailedCard from './DetailedCard';
import { mockCharacters } from '../../test/mockCharacters';

describe('DetailedCard', () => {
  const character = mockCharacters[0];

  it('renders character details', () => {
    render(<DetailedCard {...character} onClose={vi.fn()} />);

    expect(screen.getByAltText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.location.name)).toBeInTheDocument();
    expect(screen.getByText(character.gender)).toBeInTheDocument();
    expect(screen.getByText(character.species)).toBeInTheDocument();
    expect(screen.getByText(character.status)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<DetailedCard {...character} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: /close details/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
