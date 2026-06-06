import { z } from 'zod';

const emailSchema = z.email('Must be a valid email address');
const nameSchema = z.string().regex(/^[A-Z][a-z]{0,50}$/, {
  message:
    'The first letter must be capitalized, and the remaining letters must be lowercase',
});
const ageSchema = z
  .string()
  .refine((str) => /^-?\d+(\.\d+)?$/.test(str) && Number(str) >= 0, {
    message: 'Must be a positive number',
  });
const passwordSchema = z.string().min(1, 'Password is required');
const confirmPasswordSchema = z.string().min(1, 'Please confirm your password');
const genderSchema = z.string().min(1, 'Choose your gender');
const agreementSchema = z.boolean().refine(Boolean, {
  message: 'Please accept the Terms & Conditions',
});

export const formSchema = z
  .object({
    name: nameSchema,
    age: ageSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    gender: genderSchema,
    agreement: agreementSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type FormFields = z.infer<typeof formSchema>;
