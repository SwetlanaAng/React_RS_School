interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type: 'submit' | 'button';
  disabled: boolean;
  className?: string;
}

export default function Button({
  children,
  className,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      className={`rounded-xl border-2 border-teal-300 bg-purple-300 px-6 py-3 font-bold text-teal-700 shadow-md transition-colors duration-300 hover:bg-purple-700 hover:text-teal-300${className ? ` ${className}` : ''}`}
    >
      {children}
    </button>
  );
}
