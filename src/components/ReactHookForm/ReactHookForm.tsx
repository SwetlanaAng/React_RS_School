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

export default function ReactHookForm() {
  const { control, handleSubmit } = useForm();
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
          id="name"
          type="text"
          name="name"
          placeholder="Your name"
          className={inputClassName}
        />
      </label>
      <label htmlFor="age" className={labelClassName}>
        Age
        <input
          id="age"
          type="number"
          name="age"
          placeholder="18"
          className={inputClassName}
        />
      </label>
      <label htmlFor="email" className={labelClassName}>
        Email
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          className={inputClassName}
        />
      </label>
      <fieldset className={fieldsetClassName}>
        <legend className={legendClassName}>Gender</legend>
        <div className={radioGroupClassName}>
          <label htmlFor="male" className={radioLabelClassName}>
            <input
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
      <label htmlFor="agree" className={checkboxLabelClassName}>
        <input
          type="checkbox"
          id="agree"
          name="conditions"
          value="agree"
          className="h-4 w-4 accent-teal-600"
        />
        Terms & Conditions
      </label>
      <div className="flex justify-center pt-1">
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
}
