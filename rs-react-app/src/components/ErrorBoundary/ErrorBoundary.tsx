import { Component } from 'react';
import ErrorUI from '../ErrorUI/ErrorUI';
import Button from '../Button/Button';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<{
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  errorSwitcher: (error: boolean) => void;
}> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  onButtonClick() {
    this.setState({ hasError: false });
    this.props.errorSwitcher(false);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <ErrorUI errorMessage="Something went wrong">
            <Button type="button" onClick={this.onButtonClick.bind(this)}>
              Return
            </Button>
          </ErrorUI>
        </>
      );
    }

    return this.props.children;
  }
}
