import { render, screen } from '@testing-library/react';
import CardsBox from './CardsBox';
import { expect } from 'vitest';
import { mockCharacters } from '../../tests/mockCharacters';

describe('CardsBox', () => {
  it('renders CardsBox', () => {
    render(<CardsBox characters={mockCharacters} />);
    const cardImg = screen.getByAltText('Rick Sanchez');
    expect(cardImg).toBeInTheDocument();
    const cardTitle = screen.getByText('Rick Sanchez');
    expect(cardTitle).toBeInTheDocument();
    const cardImg2 = screen.getByAltText('Morty Smith');
    expect(cardImg2).toBeInTheDocument();
    const cardTitle2 = screen.getByText('Morty Smith');
    expect(cardTitle2).toBeInTheDocument();
  });
});
