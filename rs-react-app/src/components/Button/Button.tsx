import { Component } from 'react';
import buttonSpinner from '../../assets/buttonSpinner.svg';
interface ButtonProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type: 'submit' | 'button';
  loading?: boolean;
}
class Button extends Component<ButtonProps> {
  render() {
    const { loading, children, className, ...buttonProps } = this.props;
    const buttonClassName =
      'rounded-xl border-2 border-teal-300 bg-purple-300 px-6 py-3 font-bold text-teal-700 shadow-md transition-colors duration-300 hover:bg-purple-700 hover:text-teal-300';

    return (
      <button
        {...buttonProps}
        disabled={loading}
        className={
          loading
            ? `${className ?? ''} ${buttonClassName} cursor-not-allowed`
            : `${className ?? ''} ${buttonClassName}`
        }
      >
        {loading ? (
          <img
            src={buttonSpinner}
            alt="spinner"
            className="mr-3 inline w-6 animate-spin"
          />
        ) : null}
        {children}
      </button>
    );
  }
}

export default Button;
