import { createPortal } from 'react-dom';
import type { currentFormState } from '../../store/currentFormSlice';
import UncontrolledForm from '../UncontrolledForm/UncontrolledForm';
import ReactHookForm from '../ReactHookForm/ReactHookForm';
import { useEffect } from 'react';

export default function Modal({
  children,
  container,
  onClose,
  isOpen,
  form,
}: {
  children: React.ReactNode;
  container: HTMLDivElement;
  isOpen: boolean;
  onClose: () => void;
  form: currentFormState;
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-teal-950/30 p-4 backdrop-blur-[2px]"
      role="dialog"
      onClick={onClose}
    >
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-teal-200 bg-white p-6 shadow-xl shadow-teal-200/70">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-teal-300 bg-purple-300 text-xl font-bold leading-none text-teal-700 shadow-md transition-colors duration-300 hover:bg-purple-700 hover:text-teal-300"
        >
          ×
        </button>

        <div className="mb-5 space-y-2 pr-10 text-left [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-teal-800 [&_p]:text-sm [&_p]:text-slate-600">
          {children}
        </div>

        <div className="rounded-xl border border-teal-100 bg-teal-50/50 p-4">
          {form.selectedForm && form.selectedForm === 'uncontrolled' ? (
            <UncontrolledForm />
          ) : (
            <ReactHookForm />
          )}
        </div>
      </div>
    </div>,
    container
  );
}
