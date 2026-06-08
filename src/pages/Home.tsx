import { useRef, useState } from 'react';
import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import SubmissionCard from '../components/SubmissionCard/SubmissionCard';
import {
  clearSelectedForm,
  selectRHF,
  selectUncontrolled,
} from '../store/currentFormSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectSubmissions } from '../store/submissionsSlice';

const HIGHLIGHT_DURATION_MS = 3000;

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const highlightTimerRef = useRef<number | null>(null);
  const [modalContainer, setModalContainer] = useState<HTMLDivElement | null>(
    null
  );
  const currentForm = useAppSelector((state) => state.currentForm);
  const submissions = useAppSelector(selectSubmissions);
  const dispatch = useAppDispatch();

  const submissionCards = [...submissions].reverse();

  const handleCloseModal = () => {
    dispatch(clearSelectedForm());
    setIsModalOpen(false);
  };

  const handleSubmitSuccess = (submissionId: string) => {
    if (highlightTimerRef.current !== null) {
      window.clearTimeout(highlightTimerRef.current);
    }

    setHighlightedId(submissionId);
    handleCloseModal();

    highlightTimerRef.current = window.setTimeout(() => {
      setHighlightedId(null);
      highlightTimerRef.current = null;
    }, HIGHLIGHT_DURATION_MS);
  };

  return (
    <>
      <div className="min-h-screen p-4">
        <main className="mx-auto flex w-full max-w-4xl flex-col gap-8">
          <section className="flex flex-col items-center gap-4 rounded-2xl border-2 border-teal-200 bg-white p-8 text-center shadow-lg shadow-teal-100">
            <h1 className="text-2xl font-bold tracking-tight text-teal-800 sm:text-3xl">
              React Forms
            </h1>
            <p className="mx-auto max-w-xl text-sm text-slate-600 sm:text-base">
              Compare two ways to handle forms in React. Open either form, fill
              in the fields, and submit to see how uncontrolled inputs and React
              Hook Form differ in validation and state.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                disabled={false}
                onClick={() => {
                  dispatch(selectUncontrolled());
                  setIsModalOpen(true);
                }}
                type="button"
              >
                Uncontrolled Form
              </Button>
              <Button
                disabled={false}
                onClick={() => {
                  dispatch(selectRHF());
                  setIsModalOpen(true);
                }}
                type="button"
              >
                React Hook Form
              </Button>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-teal-800">Submissions</h2>
            {submissionCards.length === 0 ? (
              <p className="text-sm text-slate-600">
                No submissions yet. Fill out a form to see your data here.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {submissionCards.map((submission) => (
                  <SubmissionCard
                    key={submission.id}
                    submission={submission}
                    isHighlighted={submission.id === highlightedId}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
      <div ref={setModalContainer}></div>
      {modalContainer && (
        <Modal
          form={currentForm}
          container={modalContainer}
          onClose={handleCloseModal}
          onSubmitSuccess={handleSubmitSuccess}
          isOpen={isModalOpen}
        >
          <h2 id="modal-title">
            {currentForm.selectedForm &&
            currentForm.selectedForm === 'uncontrolled'
              ? 'Uncontrolled form'
              : 'React Hook Form'}
          </h2>
          <p>Please, fill out and submit the form </p>
        </Modal>
      )}
    </>
  );
}
