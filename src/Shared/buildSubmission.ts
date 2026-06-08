import type { FormFields } from './Schemas';
import { fileToBase64 } from './fileToBase64';

export interface FormSubmission {
  id: string;
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  agreement: boolean;
  image: string;
  country: string;
}

export type SubmissionPayload = Omit<FormSubmission, 'id'>;

export async function buildSubmission(
  data: FormFields
): Promise<SubmissionPayload> {
  return {
    name: data.name,
    age: data.age,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
    gender: data.gender,
    agreement: data.agreement,
    country: data.country,
    image: await fileToBase64(data.image),
  };
}
