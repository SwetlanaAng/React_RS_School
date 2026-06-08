import type { ChangeEventHandler } from 'react';
import type { Path, UseFormRegister } from 'react-hook-form';
import {
  fieldsetClassName,
  legendClassName,
  radioGroupClassName,
  radioLabelClassName,
} from '../formStyles';
import type { FormFields } from '../../Shared/Schemas';
import FieldError from '../FieldError/FieldError';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: Path<FormFields>;
  legend: string;
  options: readonly RadioOption[];
  errorMessage?: string | null;
  register?: UseFormRegister<FormFields>;
  idPrefix?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function RadioGroup({
  name,
  legend,
  options,
  errorMessage,
  register,
  idPrefix = '',
  onChange,
}: RadioGroupProps) {
  const registration = register ? register(name) : null;

  return (
    <>
      <fieldset className={fieldsetClassName}>
        <legend className={legendClassName}>{legend}</legend>
        <div className={radioGroupClassName}>
          {options.map((option) => {
            const inputId = idPrefix
              ? `${idPrefix}-${option.value}`
              : option.value;

            return (
              <label
                key={option.value}
                htmlFor={inputId}
                className={radioLabelClassName}
              >
                <input
                  {...(registration ?? { name })}
                  type="radio"
                  id={inputId}
                  value={option.value}
                  className="accent-teal-600"
                  onChange={(event) => {
                    if (registration) {
                      void registration.onChange(event);
                    }
                    onChange?.(event);
                  }}
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>
      <FieldError message={errorMessage} />
    </>
  );
}
