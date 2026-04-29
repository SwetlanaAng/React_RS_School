import { Component } from 'react';
/* interface ErrorBoundaryProps {
  children?: React.ReactNode;
  fallback: React.ReactNode;
} */
  interface State {
    hasError: boolean;
  }
export class ErrorBoundary extends Component<{children?: React.ReactNode, fallback?: React.ReactNode}> {
    state: State = { hasError: false };
    
  
    static getDerivedStateFromError(error: Error) {
        
      return { hasError: error };
    }

  
    render() {
      if (this.state.hasError) {
        
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }