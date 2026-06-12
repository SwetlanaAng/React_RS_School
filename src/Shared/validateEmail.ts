export function isValidEmail(email: string): boolean {
  const parts = email.split('@');

  if (parts.length !== 2) {
    return false;
  }

  const localPart = parts[0];
  const domainPart = parts[1];

  if (!localPart) {
    return false;
  }

  if (domainPart.length === 0 || !domainPart.includes('.')) {
    return false;
  }

  return true;
}
