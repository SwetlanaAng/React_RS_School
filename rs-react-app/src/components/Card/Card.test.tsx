import { render, screen } from '@testing-library/react';
import Card from './Card';
import { expect } from 'vitest';

describe('Card', () => {
  it('renders Card', () => {
    render(
      <Card
        name="Rick Sanchez"
        gender="Male"
        species="Human"
        status="Alive"
        image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
      />
    );
    const cardImg = screen.getByAltText('Rick Sanchez');
    expect(cardImg).toBeInTheDocument();
    const cardTitle = screen.getByText('Rick Sanchez');
    expect(cardTitle).toBeInTheDocument();
  });
});
