import { Form, useForm } from 'react-hook-form';
import Button from '../Button/Button';
import Input from '../Input/Input';
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
        error={errors.name}
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
        error={errors.age}
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
        error={errors.email}
      />
      <fieldset className={fieldsetClassName}>
        <legend className={legendClassName}>Gender</legend>
        <div className={radioGroupClassName}>
          <label htmlFor="male" className={radioLabelClassName}>
            <input
              {...register('gender')}
              type="radio"
              id="male"
              name="gender"
              value="male"
              className="accent-teal-600"
            />
            Male
          </label>
          <label htmlFor="female" className={radioLabelClassName}>
            <input
              {...register('gender')}
              type="radio"
              id="female"
              name="gender"
              value="female"
              className="accent-teal-600"
            />
            Female
          </label>
        </div>
      </fieldset>
      {errors.gender && (
        <div className="text-rose-600">{errors.gender.message}</div>
      )}
      <label htmlFor="agree" className={checkboxLabelClassName}>
        <input
          {...register('agreement')}
          type="checkbox"
          id="agree"
          className="h-4 w-4 accent-teal-600"
        />
        Terms & Conditions
      </label>
      {errors.agreement && (
        <div className="text-rose-600">{errors.agreement.message}</div>
      )}
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
