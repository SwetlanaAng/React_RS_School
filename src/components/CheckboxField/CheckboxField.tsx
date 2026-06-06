import type { ChangeEventHandler } from 'react';
import type { Path, UseFormRegister } from 'react-hook-form';
import { checkboxLabelClassName } from '../formStyles';
import type { FormFields } from '../../Shared/Schemas';

interface CheckboxFieldProps {
  name: Path<FormFields>;
  id: string;
  label: string;
  errorMessage?: string | null;
  register?: UseFormRegister<FormFields>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function CheckboxField({
  name,
  id,
  label,
  errorMessage,
  register,
  onChange,
}: CheckboxFieldProps) {
  const registration = register ? register(name) : null;

  return (
    <>
      <label htmlFor={id} className={checkboxLabelClassName}>
        <input
          {...(registration ?? { name })}
          type="checkbox"
          id={id}
          className="h-4 w-4 accent-teal-600"
          onChange={(event) => {
            if (registration) {
              void registration.onChange(event);
            }
            onChange?.(event);
          }}
        />
        {label}
      </label>
      {errorMessage && <div className="text-rose-600">{errorMessage}</div>}
    </>
  );
}
