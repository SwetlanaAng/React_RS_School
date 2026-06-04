import { useEffect, useRef, useState } from 'react';
import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import {
  clearSelectedForm,
  selectRHF,
  selectUncontrolled,
} from '../store/currentFormSlice';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalContainer, setModalContainer] = useState<HTMLDivElement | null>(
    null
  );
  const currentForm = useSelector((state: RootState) => state.currentForm);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setModalContainer(modalRef.current);
  }, []);

  return (
    <>
      {' '}
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
            <Button
              onClick={() => {
                dispatch(selectUncontrolled()); // вынести
                setIsModalOpen(true);
              }}
              type="button"
            >
              Uncontrolled Form
            </Button>
            <Button
              onClick={() => {
                dispatch(selectRHF());
                setIsModalOpen(true);
              }}
              type="button"
            >
              React Hook Form
            </Button>
          </div>
        </main>
      </div>
      <div ref={modalRef}></div>
      {modalContainer && (
        <Modal
          form={currentForm}
          container={modalContainer}
          onClose={() => {
            dispatch(clearSelectedForm());
            setIsModalOpen(false);
          }}
          isOpen={isModalOpen}
        >
          <h2>Важное уведомление</h2>
          <p>Этот текст отображается внутри портала!</p>
        </Modal>
      )}
    </>
  );
}
