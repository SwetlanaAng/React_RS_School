import authorImage from '../assets/author.png';
export default function About() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-fuchsia-50 p-4 transition-colors duration-300 dark:bg-slate-950">
      <section
        role="status"
        className="flex w-full max-w-4xl flex-col items-center rounded-3xl border border-teal-100 bg-white px-8 py-12 text-center shadow-xl transition-colors duration-300 dark:border-teal-800 dark:bg-slate-900 dark:shadow-teal-950"
      >
        <div className="text-2xl text-teal-700 dark:text-teal-100">
          <span>
            This application was created by{' '}
            <a
              className="text-yellow-400 cursor-pointer dark:text-yellow-300"
              href="https://github.com/SwetlanaAng"
              target="_blank"
              rel="noreferrer"
            >
              Svetlana Angeliuk
            </a>{' '}
            as part of the{' '}
            <a
              className="text-yellow-400 cursor-pointer dark:text-yellow-300"
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noreferrer"
            >
              RS School React Course
            </a>
            . It allows users to search for Rick and Morty characters
          </span>
        </div>
        <img
          src={authorImage}
          alt="author"
          className="my-8 w-full max-w-md object-contain"
        />
      </section>
    </main>
  );
}
