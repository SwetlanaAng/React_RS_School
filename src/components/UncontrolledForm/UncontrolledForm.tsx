import { useState, type SubmitEvent } from 'react';
import Button from '../Button/Button';
import CheckboxField from '../CheckboxField/CheckboxField';
import Input from '../Input/Input';
import RadioGroup from '../RadioGroup/RadioGroup';
import { formClassName, inputClassName, labelClassName } from '../formStyles';
import { genderOptions } from '../../Shared/formOptions';
import { formSchema, type FormFields } from '../../Shared/Schemas';

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
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = (data: FormFields): boolean => {
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
      return false;
    }

    setFieldErrors({});
    return true;
  };

  const clearFieldError = (field: keyof FormFields) => {
    if (!wasSubmitted) return;

    setFieldErrors((prev) => {
      if (!(field in prev)) return prev;
      return Object.fromEntries(
        Object.entries(prev).filter(([key]) => key !== field)
      );
    });
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setWasSubmitted(true);
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      name: getFormString(formData, 'name'),
      age: getFormString(formData, 'age'),
      email: getFormString(formData, 'email'),
      gender: getFormString(formData, 'gender'),
      agreement: formData.has('agreement'),
    };

    const isValid = validateForm(data);
    if (!isValid) return;

    form.reset();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      <Input
        name="name"
        label="Name"
        id="uc-name"
        type="text"
        placeholder="Your name"
        classNameLabel={labelClassName}
        classNameInput={inputClassName}
        onChange={() => {
          clearFieldError('name');
        }}
        errorMessage={getMessage(fieldErrors, 'name')}
      />
      <Input
        name="age"
        label="Age"
        id="uc-age"
        type="number"
        placeholder="18"
        classNameLabel={labelClassName}
        classNameInput={inputClassName}
        errorMessage={getMessage(fieldErrors, 'age')}
      />
      <Input
        name="email"
        label="Email"
        id="uc-email"
        type="email"
        placeholder="you@example.com"
        classNameLabel={labelClassName}
        classNameInput={inputClassName}
        errorMessage={getMessage(fieldErrors, 'email')}
      />
      <RadioGroup
        name="gender"
        legend="Gender"
        options={genderOptions}
        idPrefix="uc"
        errorMessage={getMessage(fieldErrors, 'gender')}
      />
      <CheckboxField
        name="agreement"
        id="uc-agree"
        label="Terms & Conditions"
        errorMessage={getMessage(fieldErrors, 'agreement')}
      />
      <div className="flex justify-center pt-1">
        <Button disabled={false} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
