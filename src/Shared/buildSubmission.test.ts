import type { FormFields } from './Schemas';
import { buildSubmission } from './buildSubmission';
import * as fileToBase64Module from './fileToBase64';

const formData: FormFields = {
  name: 'Anna',
  age: '25',
  email: 'anna@example.com',
  password: 'Pass1!',
  confirmPassword: 'Pass1!',
  gender: 'female',
  agreement: true,
  image: new File(['image'], 'photo.png', { type: 'image/png' }),
  country: 'Poland',
};

describe('buildSubmission', () => {
  beforeEach(() => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValue(
      '00000000-0000-4000-8000-000000000001'
    );
    vi.spyOn(fileToBase64Module, 'fileToBase64').mockResolvedValue(
      'data:image/png;base64,mock'
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('builds submission with id, source and form fields', async () => {
    const submission = await buildSubmission(formData, 'uncontrolled');

    expect(submission).toEqual({
      id: '00000000-0000-4000-8000-000000000001',
      source: 'uncontrolled',
      name: 'Anna',
      age: '25',
      email: 'anna@example.com',
      password: 'Pass1!',
      gender: 'female',
      agreement: true,
      country: 'Poland',
      image: 'data:image/png;base64,mock',
    });
  });

  it('sets source to rhf when provided', async () => {
    const submission = await buildSubmission(formData, 'rhf');

    expect(submission.source).toBe('rhf');
  });

  it('converts image file to base64', async () => {
    await buildSubmission(formData, 'uncontrolled');

    expect(fileToBase64Module.fileToBase64).toHaveBeenCalledWith(
      formData.image
    );
  });

  it('does not include confirmPassword in submission', async () => {
    const submission = await buildSubmission(formData, 'uncontrolled');

    expect(submission).not.toHaveProperty('confirmPassword');
  });
});
