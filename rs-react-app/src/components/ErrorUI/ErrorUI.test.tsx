import { render, screen } from '@testing-library/react';
import ErrorUI from './ErrorUI';
describe('ErrorUI', () => {
  it('renders ErrorUI with img and message', () => {
    render(<ErrorUI errorMessage="Error Message" />);
    const img = screen.getByAltText('Error image');
    const errorMessage = screen.getByText('Error Message');
    expect(img).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });
});
