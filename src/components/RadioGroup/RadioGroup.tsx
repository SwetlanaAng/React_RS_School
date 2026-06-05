import type { Path, UseFormRegister } from 'react-hook-form';
import {
  fieldsetClassName,
  legendClassName,
  radioGroupClassName,
  radioLabelClassName,
} from '../formStyles';
import type { FormFields } from '../../Shared/Schemas';

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
}

export default function RadioGroup({
  name,
  legend,
  options,
  errorMessage,
  register,
  idPrefix = '',
}: RadioGroupProps) {
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
                  {...(register ? register(name) : { name })}
                  type="radio"
                  id={inputId}
                  value={option.value}
                  className="accent-teal-600"
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>
      {errorMessage && <div className="text-rose-600">{errorMessage}</div>}
    </>
  );
}
