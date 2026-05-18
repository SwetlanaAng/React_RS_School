import { render, screen } from '@testing-library/react';
import Card from './Card';
import { expect } from 'vitest';
import { MemoryRouter } from 'react-router';

describe('Card', () => {
  it('renders Card', () => {
    render(
      <MemoryRouter>
        <Card
          name="Rick Sanchez"
          id={2}
          image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        />
      </MemoryRouter>
    );
    const cardImg = screen.getByAltText('Rick Sanchez');
    expect(cardImg).toBeInTheDocument();
    const cardTitle = screen.getByText('Rick Sanchez');
    expect(cardTitle).toBeInTheDocument();
  });
});
