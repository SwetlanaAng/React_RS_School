import { useState, type SubmitEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Button from '../Button/Button';
import CheckboxField from '../CheckboxField/CheckboxField';
import CountryField from '../CountryField/CountryField';
import ImageField from '../ImageField/ImageField';
import Input from '../Input/Input';
import PasswordStrengthIndicator from '../PasswordStrengthIndicator/PasswordStrengthIndicator';
import RadioGroup from '../RadioGroup/RadioGroup';
import { formClassName, inputClassName, labelClassName } from '../formStyles';
import { genderOptions } from '../../Shared/formOptions';
import { buildSubmission } from '../../Shared/buildSubmission';
import { formSchema, type FormFields } from '../../Shared/Schemas';
import { selectCountries } from '../../store/countriesSlice';
import { addSubmission } from '../../store/submissionsSlice';

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

function getFormFile(formData: FormData, key: string): File {
  const value = formData.get(key);
  return value instanceof File ? value : new File([], '');
}

function getMessage(
  fieldErrors: Record<string, string>,
  field: string
): string | null {
  return fieldErrors[field] ?? null;
}

interface UncontrolledFormProps {
  onSubmitSuccess?: (submissionId: string) => void;
}

export default function UncontrolledForm({
  onSubmitSuccess,
}: UncontrolledFormProps) {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [password, setPassword] = useState('');

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

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWasSubmitted(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: getFormString(formData, 'name'),
      age: getFormString(formData, 'age'),
      email: getFormString(formData, 'email'),
      password: getFormString(formData, 'password'),
      confirmPassword: getFormString(formData, 'confirmPassword'),
      gender: getFormString(formData, 'gender'),
      agreement: formData.has('agreement'),
      image: getFormFile(formData, 'image'),
      country: getFormString(formData, 'country'),
    };

    const isValid = validateForm(data);
    if (!isValid) return;

    const submission = await buildSubmission(data, 'uncontrolled');
    dispatch(addSubmission(submission));

    form.reset();
    setPassword('');
    setWasSubmitted(false);
    setFieldErrors({});
    onSubmitSuccess?.(submission.id);
  };

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
      className={formClassName}
    >
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
        onChange={() => {
          clearFieldError('age');
        }}
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
        onChange={() => {
          clearFieldError('email');
        }}
        errorMessage={getMessage(fieldErrors, 'email')}
      />
      <Input
        name="password"
        label="Password"
        id="uc-password"
        type="password"
        placeholder="Enter password"
        classNameLabel={labelClassName}
        classNameInput={inputClassName}
        onChange={(event) => {
          setPassword(event.target.value);
          clearFieldError('password');
        }}
        errorMessage={getMessage(fieldErrors, 'password')}
      />
      <PasswordStrengthIndicator password={password} />
      <Input
        name="confirmPassword"
        label="Confirm password"
        id="uc-confirm-password"
        type="password"
        placeholder="Repeat password"
        classNameLabel={labelClassName}
        classNameInput={inputClassName}
        onChange={() => {
          clearFieldError('confirmPassword');
        }}
        errorMessage={getMessage(fieldErrors, 'confirmPassword')}
      />
      <ImageField
        name="image"
        label="Image"
        id="uc-image"
        classNameLabel={labelClassName}
        classNameInput={inputClassName}
        onChange={() => {
          clearFieldError('image');
        }}
        errorMessage={getMessage(fieldErrors, 'image')}
      />
      <CountryField
        name="country"
        label="Country"
        id="uc-country"
        listId="uc-country-list"
        countries={countries}
        placeholder="Start typing a country"
        classNameLabel={labelClassName}
        classNameInput={inputClassName}
        onChange={() => {
          clearFieldError('country');
        }}
        errorMessage={getMessage(fieldErrors, 'country')}
      />
      <RadioGroup
        name="gender"
        legend="Gender"
        options={genderOptions}
        idPrefix="uc"
        onChange={() => {
          clearFieldError('gender');
        }}
        errorMessage={getMessage(fieldErrors, 'gender')}
      />
      <CheckboxField
        name="agreement"
        id="uc-agree"
        label="Terms & Conditions"
        onChange={() => {
          clearFieldError('agreement');
        }}
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
