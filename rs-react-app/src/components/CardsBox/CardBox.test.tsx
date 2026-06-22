import { render, screen } from '@testing-library/react';
import CardsBox from './CardsBox';
import { expect } from 'vitest';
import { mockCharacters } from '@/test/mockCharacters';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

describe('CardsBox', () => {
  it('renders CardsBox', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CardsBox characters={mockCharacters} />
        </Provider>
      </MemoryRouter>
    );

    const cardImg = screen.getByAltText('Rick Sanchez');
    const cardTitle = screen.getByText('Rick Sanchez');
    const cardImg2 = screen.getByAltText('Morty Smith');
    const cardTitle2 = screen.getByText('Morty Smith');

    expect(cardImg).toBeInTheDocument();
    expect(cardTitle).toBeInTheDocument();
    expect(cardImg2).toBeInTheDocument();
    expect(cardTitle2).toBeInTheDocument();
  });
});
