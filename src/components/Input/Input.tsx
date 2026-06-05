import type { FieldErrors, Path, UseFormRegister } from 'react-hook-form';
import type { FormFields } from '../../Shared/Schemas';

interface InputProps {
  name: Path<FormFields>;
  label: string;
  type: string;
  placeholder: string;
  classNameLabel: string;
  classNameInput: string;
  id: string;
  error?: FieldErrors<FormFields>[Path<FormFields>];
  register: UseFormRegister<FormFields>;
}

export default function Input({
  name,
  label,
  type,
  placeholder,
  classNameLabel,
  classNameInput,
  id,
  error,
  register,
}: InputProps) {
  return (
    <>
      <label htmlFor={id} className={classNameLabel}>
        {label}
        <input
          {...register(name)}
          id={id}
          type={type}
          placeholder={placeholder}
          className={classNameInput}
        />
      </label>
      {error && <div className="text-rose-600">{error.message}</div>}
    </>
  );
}
