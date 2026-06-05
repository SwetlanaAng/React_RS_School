import type { Path, UseFormRegister } from 'react-hook-form';
import { checkboxLabelClassName } from '../formStyles';
import type { FormFields } from '../../Shared/Schemas';

interface CheckboxFieldProps {
  name: Path<FormFields>;
  id: string;
  label: string;
  errorMessage?: string | null;
  register?: UseFormRegister<FormFields>;
}

export default function CheckboxField({
  name,
  id,
  label,
  errorMessage,
  register,
}: CheckboxFieldProps) {
  return (
    <>
      <label htmlFor={id} className={checkboxLabelClassName}>
        <input
          {...(register ? register(name) : { name })}
          type="checkbox"
          id={id}
          className="h-4 w-4 accent-teal-600"
        />
        {label}
      </label>
      {errorMessage && <div className="text-rose-600">{errorMessage}</div>}
    </>
  );
}
