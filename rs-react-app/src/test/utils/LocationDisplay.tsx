import { useLocation } from 'react-router';

export function LocationDisplay() {
  const location = useLocation();
  return <span data-testid="location">{location.search}</span>;
}
