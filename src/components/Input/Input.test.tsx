import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

const defaultProps = {
  name: 'name' as const,
  label: 'Name',
  type: 'text',
  placeholder: 'Your name',
  classNameLabel: 'label-class',
  classNameInput: 'input-class',
  id: 'test-name',
};

describe('Input', () => {
  it('renders label connected to input', () => {
    render(<Input {...defaultProps} />);

    const input = screen.getByLabelText('Name');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-name');
    expect(input).toHaveAttribute('name', 'name');
    expect(input).toHaveAttribute('placeholder', 'Your name');
  });

  it('shows error message', () => {
    render(<Input {...defaultProps} errorMessage="Name is required" />);

    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input {...defaultProps} onChange={handleChange} />);

    await user.type(screen.getByLabelText('Name'), 'A');

    expect(handleChange).toHaveBeenCalled();
  });
});
