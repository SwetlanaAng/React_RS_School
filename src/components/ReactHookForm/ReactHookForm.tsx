import { Form, useForm, useWatch } from 'react-hook-form';
import Button from '../Button/Button';
import CheckboxField from '../CheckboxField/CheckboxField';
import Input from '../Input/Input';
import PasswordStrengthIndicator from '../PasswordStrengthIndicator/PasswordStrengthIndicator';
import RadioGroup from '../RadioGroup/RadioGroup';
import { formClassName, inputClassName, labelClassName } from '../formStyles';
import { genderOptions } from '../../Shared/formOptions';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormFields } from '../../Shared/Schemas';

export default function ReactHookForm() {
  const {
    control,
    register,
    handleSubmit,
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
    },
  });

  const password = useWatch({ control, name: 'password', defaultValue: '' });

  const onSubmit = (data: FormFields) => {
    console.log(data);
  };

  return (
    <Form
      control={control}
      onSubmit={() => {
        handleSubmit(onSubmit);
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
