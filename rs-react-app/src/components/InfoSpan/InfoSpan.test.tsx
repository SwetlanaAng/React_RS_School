import { render, screen } from '@testing-library/react';
import InfoSpan from './InfoSpan';

describe('InfoSpan', () => {
  it('renders InfoSpan with text', () => {
    render(<InfoSpan text="Test" />);
    const infoSpan = screen.getByText('Test');
    expect(infoSpan).toBeInTheDocument();
  });
});
