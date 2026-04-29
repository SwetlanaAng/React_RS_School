import { Component } from 'react';
interface ButtonProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type: 'submit' | 'button';
  loading?: boolean;
}
class Button extends Component<ButtonProps> {
  svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline w-6 animate-spin fill-teal-700 mr-3"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
        data-original="#000000"
      />
    </svg>
  );

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
            ? `${className} ${buttonClassName} cursor-not-allowed`
            : `${className} ${buttonClassName}`
        }
      >
        {loading ? this.svg : null}
        {children}
      </button>
    );
  }
}

export default Button;
