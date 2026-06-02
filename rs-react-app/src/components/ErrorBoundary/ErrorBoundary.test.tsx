import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import userEvent from '@testing-library/user-event';
import { Component } from 'react';
class TestWrapper extends Component<object, { error: boolean }> {
  state = { error: true };
  setError = (error: boolean) => {
    this.setState({ error });
  };

  render() {
    const ThrowError = () => {
      if (this.state.error) {
        throw new Error('Test');
      }
      return <h1>Normal content</h1>;
    };

    return (
      <ErrorBoundary errorSwitcher={this.setError}>
        <ThrowError />
      </ErrorBoundary>
    );
  }
}

describe('ErrorBoundary', () => {
  it('renders ErrorBoundary when error occurs', () => {
    render(<TestWrapper />);
    expect(screen.getByText('Something went wrong')).toBeVisible();
  });

  it('does not render ErrorBoundary when no error occurs', () => {
    const setError = vi.fn();
    render(
      <ErrorBoundary errorSwitcher={setError}>
        <h1>Nothing happens</h1>
      </ErrorBoundary>
    );
    expect(screen.getByText('Nothing happens')).toBeVisible();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('return button works', async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);
    const buttonElement = screen.getByRole('button', { name: /return/i });
    expect(buttonElement).toBeInTheDocument();
    await user.click(buttonElement);
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });
});
