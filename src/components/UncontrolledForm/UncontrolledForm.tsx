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

export default function UncontrolledForm() {
  return (
    <form className={formClassName}>
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
      <label htmlFor="uc-agree" className={checkboxLabelClassName}>
        <input
          type="checkbox"
          id="uc-agree"
          name="conditions"
          value="agree"
          className="h-4 w-4 accent-teal-600"
        />
        Terms & Conditions
      </label>
      <div className="flex justify-center pt-1">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
