import { Form, useForm, useWatch } from 'react-hook-form';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { buildSubmission } from '../../Shared/buildSubmission';
import { formSchema, type FormFields } from '../../Shared/Schemas';
import { selectCountries } from '../../store/countriesSlice';
import { addSubmission } from '../../store/submissionsSlice';

interface ReactHookFormProps {
  onSubmitSuccess?: (submissionId: string) => void;
}

export default function ReactHookForm({ onSubmitSuccess }: ReactHookFormProps) {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);

  const {
    control,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      agreement: false,
      image: new File([], ''),
      country: '',
    },
  });

  const password = useWatch({ control, name: 'password', defaultValue: '' });

  return (
    <Form
      control={control}
      onSubmit={async ({ data }) => {
        const submission = await buildSubmission(data, 'rhf');
        dispatch(addSubmission(submission));
        reset();
        onSubmitSuccess?.(submission.id);
      }}
      className={formClassName}
    >
      <Input
        name="name"
        label="Name"
        id="name"
        type="text"
        placeholder="Your name"
        classNameLabel={labelClassName}
        classNameInput={inputClassName}
        register={register}
        errorMessage={errors.name?.message}
      />
      <Input
        name="age"
        label="Age"
        id="age"
        type="number"
        placeholder="18"
        classNameLabel={labelClassName}
        classNameInput={inputClassName}
        register={register}
        errorMessage={errors.age?.message}
      />
      <Input
        name="email"
        label="Email"
        id="email"
        type="email"
        placeholder="you@example.com"
        classNameLabel={labelClassName}
        classNameInput={inputClassName}
        register={register}
        errorMessage={errors.email?.message}
      />
      <Input
        name="password"
        label="Password"
        id="password"
        type="password"
        placeholder="Enter password"
        classNameLabel={labelClassName}
        classNameInput={inputClassName}
        register={register}
        errorMessage={errors.password?.message}
      />
      <PasswordStrengthIndicator password={password} />
      <Input
        name="confirmPassword"
        label="Confirm password"
        id="confirm-password"
        type="password"
        placeholder="Repeat password"
        classNameLabel={labelClassName}
        classNameInput={inputClassName}
        register={register}
        errorMessage={errors.confirmPassword?.message}
      />
      <ImageField
        name="image"
        label="Image"
        id="image"
        classNameLabel={labelClassName}
        classNameInput={inputClassName}
        control={control}
        errorMessage={errors.image?.message}
      />
      <CountryField
        name="country"
        label="Country"
        id="country"
        listId="rhf-country-list"
        countries={countries}
        placeholder="Start typing a country"
        classNameLabel={labelClassName}
        classNameInput={inputClassName}
        register={register}
        errorMessage={errors.country?.message}
      />
      <RadioGroup
        name="gender"
        legend="Gender"
        options={genderOptions}
        register={register}
        errorMessage={errors.gender?.message}
      />
      <CheckboxField
        name="agreement"
        id="agree"
        label="Terms & Conditions"
        register={register}
        errorMessage={errors.agreement?.message}
      />
      <div className="flex justify-center pt-1">
        <Button
          disabled={!isValid}
          className={
            !isValid
              ? 'cursor-not-allowed bg-red-100 hover:bg-red-100 hover:text-teal-700'
              : ''
          }
          type="submit"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}
