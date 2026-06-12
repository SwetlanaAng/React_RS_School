import type { FormFields } from './Schemas';
import { fileToBase64 } from './fileToBase64';

export type SubmissionSource = 'uncontrolled' | 'rhf';

export interface FormSubmission {
  id: string;
  source: SubmissionSource;
  name: string;
  age: string;
  email: string;
  password: string;
  gender: string;
  agreement: boolean;
  image: string;
  country: string;
}

export async function buildSubmission(
  data: FormFields,
  source: SubmissionSource
): Promise<FormSubmission> {
  return {
    id: crypto.randomUUID(),
    source,
    name: data.name,
    age: data.age,
    email: data.email,
    password: data.password,
    gender: data.gender,
    agreement: data.agreement,
    country: data.country,
    image: await fileToBase64(data.image),
  };
}
