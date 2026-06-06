import { z } from 'zod';
import { COUNTRIES } from './countries';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from './ValidateImageFile';

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
const imageSchema = z
  .instanceof(File, { message: 'Image is required' })
  .refine((file) => file.size > 0, {
    message: 'Image is required',
  })
  .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
    message: 'Only PNG and JPEG images are allowed',
  })
  .refine((file) => file.size <= MAX_IMAGE_SIZE, {
    message: 'Image must be smaller than 5 MB',
  });
const countrySchema = z
  .string()
  .min(1, 'Country is required')
  .refine((value) => (COUNTRIES as readonly string[]).includes(value), {
    message: 'Select a country from the list',
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
    image: imageSchema,
    country: countrySchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type FormFields = z.infer<typeof formSchema>;
