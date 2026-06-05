import { useState, type SubmitEvent } from 'react';
import Button from '../Button/Button';
import {
  checkboxLabelClassName,
  fieldsetClassName,
  formClassName,
  inputClassName,
  labelClassName,
  legendClassName,
  radioGroupClassName,
  radioLabelClassName,
} from '../formStyles';
import { formSchema } from '../../Shared/Schemas';

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

function getMessage(
  fieldErrors: Record<string, string>,
  field: string
): string | null {
  return fieldErrors[field] ?? null;
}

export default function UncontrolledForm() {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      name: getFormString(formData, 'name'),
      age: getFormString(formData, 'age'),
      email: getFormString(formData, 'email'),
      gender: getFormString(formData, 'gender'),
      agreement: formData.has('agreement'),
    };

    const result = formSchema.safeParse(data);
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0]);
        if (!nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});
    form.reset();
    console.log(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      <label htmlFor="uc-name" className={labelClassName}>
        Name
        <input
          id="uc-name"
          type="text"
          name="name"
          placeholder="Your name"
          className={inputClassName}
        />
      </label>
      {getMessage(fieldErrors, 'name') && (
        <div className="text-rose-600">{getMessage(fieldErrors, 'name')}</div>
      )}
      <label htmlFor="uc-age" className={labelClassName}>
        Age
        <input
          id="uc-age"
          type="number"
          name="age"
          placeholder="18"
          className={inputClassName}
        />
      </label>
      {getMessage(fieldErrors, 'age') && (
        <div className="text-rose-600">{getMessage(fieldErrors, 'age')}</div>
      )}
      <label htmlFor="uc-email" className={labelClassName}>
        Email
        <input
          id="uc-email"
          type="email"
          name="email"
          placeholder="you@example.com"
          className={inputClassName}
        />
      </label>
      {getMessage(fieldErrors, 'email') && (
        <div className="text-rose-600">{getMessage(fieldErrors, 'email')}</div>
      )}
      <fieldset className={fieldsetClassName}>
        <legend className={legendClassName}>Gender</legend>
        <div className={radioGroupClassName}>
          <label htmlFor="uc-male" className={radioLabelClassName}>
            <input
              type="radio"
              id="uc-male"
              name="gender"
              value="male"
              className="accent-teal-600"
            />
            Male
          </label>
          <label htmlFor="uc-female" className={radioLabelClassName}>
            <input
              type="radio"
              id="uc-female"
              name="gender"
              value="female"
              className="accent-teal-600"
            />
            Female
          </label>
        </div>
      </fieldset>
      {getMessage(fieldErrors, 'gender') && (
        <div className="text-rose-600">{getMessage(fieldErrors, 'gender')}</div>
      )}
      <label htmlFor="uc-agree" className={checkboxLabelClassName}>
        <input
          type="checkbox"
          id="uc-agree"
          name="agreement"
          className="h-4 w-4 accent-teal-600"
        />
        Terms & Conditions
      </label>
      {getMessage(fieldErrors, 'agreement') && (
        <div className="text-rose-600">
          {getMessage(fieldErrors, 'agreement')}
        </div>
      )}
      <div className="flex justify-center pt-1">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
