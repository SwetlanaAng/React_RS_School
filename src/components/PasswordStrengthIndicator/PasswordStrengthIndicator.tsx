import {
  getPasswordStrength,
  passwordStrengthRules,
} from '../../Shared/passwordStrength';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export default function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const checks = getPasswordStrength(password);

  return (
    <ul className="space-y-1 text-sm text-slate-600" aria-live="polite">
      {passwordStrengthRules.map((rule) => {
        const isMet = checks[rule.key];

        return (
          <li
            key={rule.key}
            className={isMet ? 'text-teal-700' : 'text-slate-500'}
          >
            {isMet ? '✓' : '○'} {rule.label}
          </li>
        );
      })}
    </ul>
  );
}
