import { Link } from 'react-router';
import logo from '../assets/morty-smith.png';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-teal-100 px-5 py-3">
      <Link to="/" className="">
        <img src={logo} alt="Morty" className="h-12 w-auto object-contain" />
      </Link>

      <Link to="/about" className="">
        About
      </Link>
    </header>
  );
}
