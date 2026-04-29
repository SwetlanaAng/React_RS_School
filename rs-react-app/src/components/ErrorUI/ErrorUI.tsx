import { Component } from 'react';
import gif from './a6b2b4d8-520a-48df-aceb-e44b0f958919.gif';
type ErrorUIProps = { errorMessage: string; children?: React.ReactNode };
class ErrorUI extends Component<ErrorUIProps> {
  render() {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="mt-6 text-xl text-fuchsia-600">
          {' '}
          {this.props.errorMessage}
        </p>
        <img className="block" src={gif} alt="Error image" />
        {this.props.children}
      </div>
    );
  }
}

export default ErrorUI;
