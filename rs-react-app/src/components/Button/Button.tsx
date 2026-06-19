'use client';
import Image from 'next/image';
import { buttonClassName } from '../../shared/classes';

interface ButtonProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type: 'submit' | 'button';
  loading?: boolean;
}

export default function Button({
  loading,
  children,
  className,
  ...buttonProps
}: ButtonProps) {
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
        <Image
          src="/buttonSpinner.svg"
          alt="spinner"
          width={24}
          height={24}
          className="mr-3 inline w-6 animate-spin"
        />
      ) : null}
      {children}
    </button>
  );
}
