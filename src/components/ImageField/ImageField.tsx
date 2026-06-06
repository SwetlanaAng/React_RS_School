import type { ChangeEventHandler } from 'react';
import type { Path, UseFormRegister } from 'react-hook-form';
import type { FormFields } from '../../Shared/Schemas';

interface ImageFieldProps {
  name: Path<FormFields>;
  label: string;
  id: string;
  classNameLabel: string;
  classNameInput: string;
  errorMessage?: string | null;
  register?: UseFormRegister<FormFields>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function ImageField({
  name,
  label,
  id,
  classNameLabel,
  classNameInput,
  errorMessage,
  register,
  onChange,
}: ImageFieldProps) {
  const registration = register
    ? register(name, {
        setValueAs: (fileList: FileList) =>
          fileList.length > 0 ? fileList[0] : new File([], ''),
      })
    : null;

  return (
    <>
      <label htmlFor={id} className={classNameLabel}>
        {label}
        <input
          {...(registration ?? { name })}
          id={id}
          type="file"
          accept="image/png,image/jpeg,.png,.jpg,.jpeg"
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
