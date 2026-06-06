import type { ChangeEventHandler } from 'react';
import type { Path, UseFormRegister } from 'react-hook-form';
import type { FormFields } from '../../Shared/Schemas';

interface InputProps {
  name: Path<FormFields>;
  label: string;
  type: string;
  placeholder: string;
  classNameLabel: string;
  classNameInput: string;
  id: string;
  errorMessage?: string | null;
  register?: UseFormRegister<FormFields>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function Input({
  name,
  label,
  type,
  placeholder,
  classNameLabel,
  classNameInput,
  id,
  errorMessage,
  register,
  onChange,
}: InputProps) {
  const registration = register ? register(name) : null;

  return (
    <>
      <label htmlFor={id} className={classNameLabel}>
        {label}
        <input
          {...(registration ?? { name })}
          id={id}
          type={type}
          placeholder={placeholder}
          className={classNameInput}
          onChange={(event) => {
            if (registration) {
              void registration.onChange(event);
            }
            onChange?.(event);
          }}
        />
      </label>
      {errorMessage && <div className="text-rose-600">{errorMessage}</div>}
    </>
  );
}
