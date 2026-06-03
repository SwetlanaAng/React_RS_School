import Button from '../components/Button/Button';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <main className="flex w-full max-w-md min-h-72 flex-col justify-center gap-4 rounded-2xl border-2 border-teal-200 bg-white p-8 text-center shadow-lg shadow-teal-100 sm:max-w-xl sm:min-h-80 sm:p-6">
        <h1 className="text-2xl font-bold tracking-tight text-teal-800 sm:text-3xl">
          React Forms
        </h1>
        <p className="mx-auto max-w-xl text-sm text-slate-600 sm:text-base">
          Compare two ways to handle forms in React. Open either form, fill in
          the fields, and submit to see how uncontrolled inputs and React Hook
          Form differ in validation and state.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button type="button">Uncontrolled Form</Button>
          <Button type="button">React Hook Form</Button>
        </div>
      </main>
    </div>
  );
}
