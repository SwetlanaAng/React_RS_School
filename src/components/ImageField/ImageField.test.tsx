import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageField from './ImageField';

const defaultProps = {
  name: 'image' as const,
  label: 'Image',
  id: 'test-image',
  classNameLabel: 'label-class',
  classNameInput: 'input-class',
};

describe('ImageField', () => {
  it('renders file input with accept attribute', () => {
    render(<ImageField {...defaultProps} />);

    const input = screen.getByLabelText('Image');

    expect(input).toHaveAttribute('type', 'file');
    expect(input).toHaveAttribute('name', 'image');
    expect(input).toHaveAttribute(
      'accept',
      'image/png,image/jpeg,.png,.jpg,.jpeg'
    );
  });

  it('shows error message', () => {
    render(<ImageField {...defaultProps} errorMessage="Image is required" />);

    expect(screen.getByText('Image is required')).toBeInTheDocument();
  });

  it('calls onChange when file is uploaded', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const file = new File(['image'], 'photo.png', { type: 'image/png' });

    render(<ImageField {...defaultProps} onChange={handleChange} />);

    await user.upload(screen.getByLabelText('Image'), file);

    expect(handleChange).toHaveBeenCalled();
  });
});
