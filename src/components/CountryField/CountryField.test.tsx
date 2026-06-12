import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CountryField from './CountryField';

const defaultProps = {
  name: 'country' as const,
  label: 'Country',
  id: 'test-country',
  listId: 'test-country-list',
  countries: ['Poland', 'Germany'],
  placeholder: 'Start typing a country',
  classNameLabel: 'label-class',
  classNameInput: 'input-class',
};

describe('CountryField', () => {
  it('renders input connected to datalist', () => {
    render(<CountryField {...defaultProps} />);

    const input = screen.getByLabelText('Country');

    expect(input).toHaveAttribute('list', 'test-country-list');
    expect(input).toHaveAttribute('placeholder', 'Start typing a country');

    const datalist = document.getElementById('test-country-list');

    expect(datalist?.tagName).toBe('DATALIST');
    expect(datalist).toContainHTML('<option value="Poland"></option>');
    expect(datalist).toContainHTML('<option value="Germany"></option>');
  });

  it('shows error message', () => {
    render(
      <CountryField
        {...defaultProps}
        errorMessage="Select a country from the list"
      />
    );

    expect(
      screen.getByText('Select a country from the list')
    ).toBeInTheDocument();
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<CountryField {...defaultProps} onChange={handleChange} />);

    await user.type(screen.getByLabelText('Country'), 'Pol');

    expect(handleChange).toHaveBeenCalled();
  });
});
