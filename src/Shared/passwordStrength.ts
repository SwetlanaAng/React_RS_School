export interface PasswordStrengthChecks {
  hasNumber: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasSpecialChar: boolean;
}

export function getPasswordStrength(password: string): PasswordStrengthChecks {
  return {
    hasNumber: /\d/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
  };
}

export const passwordStrengthRules: {
  key: keyof PasswordStrengthChecks;
  label: string;
}[] = [
  { key: 'hasNumber', label: '1 number' },
  { key: 'hasUppercase', label: '1 uppercase letter' },
  { key: 'hasLowercase', label: '1 lowercase letter' },
  { key: 'hasSpecialChar', label: '1 special character' },
];
