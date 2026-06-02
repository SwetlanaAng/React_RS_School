import { render, screen } from '@testing-library/react';
import CardsBox from './CardsBox';
import { expect } from 'vitest';
import { mockCharacters } from '../../test/mockCharacters';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

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
    expect(cardImg).toBeInTheDocument();

    const cardTitle = screen.getByText('Rick Sanchez');
    expect(cardTitle).toBeInTheDocument();

    const cardImg2 = screen.getByAltText('Morty Smith');
    expect(cardImg2).toBeInTheDocument();

    const cardTitle2 = screen.getByText('Morty Smith');
    expect(cardTitle2).toBeInTheDocument();
  });
});
