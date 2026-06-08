import type { ChangeEventHandler } from 'react';
import type { Path, UseFormRegister } from 'react-hook-form';
import type { FormFields } from '../../Shared/Schemas';
import FieldError from '../FieldError/FieldError';

interface CountryFieldProps {
  name: Path<FormFields>;
  label: string;
  id: string;
  listId: string;
  countries: readonly string[];
  placeholder: string;
  classNameLabel: string;
  classNameInput: string;
  errorMessage?: string | null;
  register?: UseFormRegister<FormFields>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function CountryField({
  name,
  label,
  id,
  listId,
  countries,
  placeholder,
  classNameLabel,
  classNameInput,
  errorMessage,
  register,
  onChange,
}: CountryFieldProps) {
  const registration = register ? register(name) : null;

  return (
    <>
      <label htmlFor={id} className={classNameLabel}>
        {label}
        <input
          {...(registration ?? { name })}
          id={id}
          type="text"
          list={listId}
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
      <datalist id={listId}>
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      <FieldError message={errorMessage} />
    </>
  );
}
