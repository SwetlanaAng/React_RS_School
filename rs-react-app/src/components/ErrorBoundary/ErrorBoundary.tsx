import { Component } from 'react';
import ErrorUI from '@/components/ErrorUI/ErrorUI';
import Button from '@/components/Button/Button';

interface State {
  hasError: boolean;
}

function isNavigationError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const digest = (error as Error & { digest?: string }).digest;

  return (
    typeof digest === 'string' &&
    (digest.startsWith('NEXT_REDIRECT') || digest.startsWith('NEXT_NOT_FOUND'))
  );
}

export class ErrorBoundary extends Component<{
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  errorSwitcher: (error: boolean) => void;
  errorMessage?: string;
  returnLabel?: string;
}> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown) {
    if (isNavigationError(error)) {
      return null;
    }

    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (isNavigationError(error)) {
      throw error;
    }
  }

  onButtonClick() {
    this.setState({ hasError: false });
    this.props.errorSwitcher(false);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorUI
          errorMessage={this.props.errorMessage ?? 'Something went wrong'}
        >
          <Button type="button" onClick={this.onButtonClick.bind(this)}>
            {this.props.returnLabel ?? 'Return'}
          </Button>
        </ErrorUI>
      );
    }

    return this.props.children;
  }
}
