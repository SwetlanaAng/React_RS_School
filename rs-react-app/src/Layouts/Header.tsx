import { Link } from 'react-router';
import logo from '../assets/morty-smith.png';
import light from '../assets/light.png';
import dark from '../assets/dark.png';
import { useTheme } from '../hooks/useTheme';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="flex items-center justify-between bg-teal-100 px-5 py-3">
      <Link to="/" className="">
        <img src={logo} alt="Morty" className="h-12 w-auto object-contain" />
      </Link>
      <div className="flex items-center gap-3">
        <Link to="/about" className="">
          About
        </Link>
        <button type="button" onClick={toggleTheme}>
          <img
            src={theme === 'light' ? dark : light}
            alt="Sun"
            className="h-8 w-auto object-contain cursor-pointer"
          />{' '}
        </button>
      </div>
    </header>
  );
}
