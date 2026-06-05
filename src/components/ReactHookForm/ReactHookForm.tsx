import { Form, useForm } from 'react-hook-form';
import Button from '../Button/Button';
import CheckboxField from '../CheckboxField/CheckboxField';
import Input from '../Input/Input';
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
      gender: '',
      agreement: false,
    },
  });
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
