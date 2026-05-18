import { Link } from 'react-router';
import { buttonClassName } from '../shared/classes';
import notFoundImage from '../assets/404.png';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-fuchsia-50 px-4">
      <section
        role="status"
        className="flex w-full max-w-4xl flex-col items-center rounded-3xl border border-teal-100 bg-white px-8 py-12 text-center shadow-xl"
      >
        <h1 className="text-2xl font-bold text-teal-700">
          Oops! The page was not found
        </h1>
        <img
          src={notFoundImage}
          alt="404"
          className="my-8 w-full max-w-2xl object-contain
          "
        />
        <Link to="/" className={buttonClassName}>
          Return to home page
        </Link>
      </section>
    </main>
  );
}
