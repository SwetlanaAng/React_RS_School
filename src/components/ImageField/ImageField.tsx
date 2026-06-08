import type { ChangeEvent, ChangeEventHandler, Ref } from 'react';
import { Controller, type Control, type Path } from 'react-hook-form';
import type { FormFields } from '../../Shared/Schemas';
import FieldError from '../FieldError/FieldError';

interface ImageFieldProps {
  name: Path<FormFields>;
  label: string;
  id: string;
  classNameLabel: string;
  classNameInput: string;
  errorMessage?: string | null;
  control?: Control<FormFields>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function ImageField({
  name,
  label,
  id,
  classNameLabel,
  classNameInput,
  errorMessage,
  control,
  onChange,
}: ImageFieldProps) {
  const fileInput = (
    inputName: string,
    onFileChange: (event: ChangeEvent<HTMLInputElement>) => void,
    onBlur?: () => void,
    ref?: Ref<HTMLInputElement>
  ) => (
    <input
      name={inputName}
      ref={ref}
      id={id}
      type="file"
      accept="image/png,image/jpeg,.png,.jpg,.jpeg"
      className={classNameInput}
      onBlur={onBlur}
      onChange={(event) => {
        onFileChange(event);
        onChange?.(event);
      }}
    />
  );

  return (
    <>
      <label htmlFor={id} className={classNameLabel}>
        {label}
        {control ? (
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange: setFile, onBlur, name, ref } }) =>
              fileInput(
                name,
                (event) => {
                  const file = event.target.files?.[0];
                  setFile(file ?? new File([], ''));
                },
                onBlur,
                ref
              )
            }
          />
        ) : (
          fileInput(name, () => undefined)
        )}
      </label>
      <FieldError message={errorMessage} />
    </>
  );
}
