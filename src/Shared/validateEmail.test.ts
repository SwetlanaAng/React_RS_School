import { isValidEmail } from './validateEmail';

describe('isValidEmail', () => {
  it('accepts email with one @, non-empty local part and dotted domain', () => {
    expect(isValidEmail('anna@example.com')).toBe(true);
    expect(isValidEmail('a@b.co')).toBe(true);
  });

  it('rejects value without exactly one @', () => {
    expect(isValidEmail('anna.example.com')).toBe(false);
    expect(isValidEmail('anna@@example.com')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
  });

  it('rejects empty local part', () => {
    expect(isValidEmail('@example.com')).toBe(false);
  });

  it('rejects domain without a dot', () => {
    expect(isValidEmail('anna@localhost')).toBe(false);
  });
});
