import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('About', () => {
  it('renders information about the app and author', () => {
    render(<About />);

    expect(
      screen.getByText(/this application was created by/i)
    ).toBeInTheDocument();
    expect(screen.getByText('Svetlana Angeliuk')).toBeInTheDocument();
    expect(
      screen.getByText(/search for Rick and Morty characters/i)
    ).toBeInTheDocument();
  });

  it('renders author and course links', () => {
    render(<About />);

    const authorLink = screen.getByRole('link', {
      name: 'Svetlana Angeliuk',
    });
    const courseLink = screen.getByRole('link', {
      name: 'RS School React Course',
    });

    expect(authorLink).toHaveAttribute(
      'href',
      'https://github.com/SwetlanaAng'
    );
    expect(authorLink).toHaveAttribute('target', '_blank');
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(courseLink).toHaveAttribute('target', '_blank');
  });

  it('renders author image', () => {
    render(<About />);

    expect(screen.getByAltText('author')).toBeInTheDocument();
  });
});
