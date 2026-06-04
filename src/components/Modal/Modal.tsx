import { createPortal } from 'react-dom';
import Button from '../Button/Button';

export default function Modal({
  children,
  container,
  onClose,
  isOpen,
}: {
  children: React.ReactNode;
  container: HTMLDivElement;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <Button onClick={onClose} type="button">
          ×
        </Button>
        {children}
      </div>
    </div>,
    container
  );
}
