import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioGroup from './RadioGroup';

const options = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
] as const;

describe('RadioGroup', () => {
  it('renders legend and radio options', () => {
    render(
      <RadioGroup
        name="gender"
        legend="Gender"
        options={options}
        idPrefix="test"
      />
    );

    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toHaveAttribute('id', 'test-male');
  });

  it('shows error message', () => {
    render(
      <RadioGroup
        name="gender"
        legend="Gender"
        options={options}
        errorMessage="Choose your gender"
      />
    );

    expect(screen.getByText('Choose your gender')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <RadioGroup
        name="gender"
        legend="Gender"
        options={options}
        onChange={handleChange}
      />
    );

    await user.click(screen.getByLabelText('Female'));

    expect(handleChange).toHaveBeenCalled();
  });
});
