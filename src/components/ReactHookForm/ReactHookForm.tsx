import { Form, useForm } from 'react-hook-form';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormFields } from '../../Shared/Schemas';

export default function ReactHookForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: '',
      email: '',
      gender: 'male',
      agreement: false,
    },
  });
  const onSubmit = (data) => {
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
      <label htmlFor="name" className={labelClassName}>
        Name
        <input
          {...register('name')}
          id="name"
          type="text"
          name="name"
          placeholder="Your name"
          className={inputClassName}
        />
      </label>
      {errors.name && (
        <div className="text-rose-600">{errors.name.message}</div>
      )}
      <label htmlFor="age" className={labelClassName}>
        Age
        <input
          {...register('age')}
          id="age"
          type="number"
          name="age"
          placeholder="18"
          className={inputClassName}
        />
      </label>
      {errors.age && <div className="text-rose-600">{errors.age.message}</div>}
      <label htmlFor="email" className={labelClassName}>
        Email
        <input
          {...register('email')}
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          className={inputClassName}
        />
      </label>
      {errors.email && (
        <div className="text-rose-600">{errors.email.message}</div>
      )}
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
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
}
