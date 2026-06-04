import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import type { currentFormState } from '../../store/currentFormSlice';
import UncontrolledForm from '../UncontrolledForm/UncontrolledForm';
import ReactHookForm from '../ReactHookForm/ReactHookForm';

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
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <Button onClick={onClose} type="button">
          ×
        </Button>
        {children}
        {form.selectedForm && form.selectedForm === 'uncontrolled' ? (
          <UncontrolledForm />
        ) : (
          <ReactHookForm />
        )}
      </div>
    </div>,
    container
  );
}
