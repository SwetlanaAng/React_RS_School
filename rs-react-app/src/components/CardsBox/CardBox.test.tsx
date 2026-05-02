import { render, screen } from '@testing-library/react';
import CardsBox from './CardsBox';
import { expect } from 'vitest';

describe('CardsBox', () => {
  it('renders CardsBox', () => {
    render(
      <CardsBox characters={[{
        id: 1,
        name: 'Rick Sanchez',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        type: 'Human',
        origin: {
          name: 'Earth',
          url: 'https://rickandmortyapi.com/api/origin/1',
        },
        location: {
          name: 'Earth',
          url: 'https://rickandmortyapi.com/api/location/1',
        },
        episode: ['https://rickandmortyapi.com/api/episode/1'],
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2026-01-01',
      }, {
        id: 2,
        name: 'Morty Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        type: 'Human',
        origin: {
          name: 'Earth',
          url: 'https://rickandmortyapi.com/api/origin/2',
        },
        location: {
          name: 'Earth',
          url: 'https://rickandmortyapi.com/api/location/2',
        },
        episode: ['https://rickandmortyapi.com/api/episode/2'],
        url: 'https://rickandmortyapi.com/api/character/2',
        created: '2026-01-01',
      }]}
      />
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