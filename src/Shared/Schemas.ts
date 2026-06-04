import { z } from 'zod';
const emailSchema = z.email('Must be a valid email address');
const nameSchema = z.string().regex(/^[A-Z][a-z]{0,50}$/, {
  message:
    'The first letter must be capitalized, and the remaining letters must be lowercase',
});
const ageSchema = z.refine(
  (str: string) => /^-?\d+(\.\d+)?$/.test(str) && Number(str) >= 0,
  {
    message: 'Must be a positive number',
  }
);
const genderSchema = z.string('Choose your gender');
const agreementSchema = z.refine((val) => val === true, {
  message: 'Please accept the Terms & Conditions',
});
export const formSchema = z.object({
  name: nameSchema,
  age: ageSchema,
  email: emailSchema,
  gender: genderSchema,
  agreement: agreementSchema,
});
export type FormFields = z.infer<typeof formSchema>;
