import { render, screen } from '@testing-library/react';
import Card from './Card';
import { expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import { mockCharacters } from '../../test/mockCharacters';

describe('Card', () => {
  it('renders Card', () => {
    render(
      <MemoryRouter>
        <Card character={mockCharacters[0]} />
      </MemoryRouter>
    );
    const cardImg = screen.getByAltText('Rick Sanchez');
    expect(cardImg).toBeInTheDocument();
    const cardTitle = screen.getByText('Rick Sanchez');
    expect(cardTitle).toBeInTheDocument();
  });
});
