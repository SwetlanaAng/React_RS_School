import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';
import Modal from './Modal';

function renderModal(
  props: Partial<{
    isOpen: boolean;
    onClose: () => void;
    form: { selectedForm: 'uncontrolled' | 'RHF' | null };
  }> = {}
) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const onClose = props.onClose ?? vi.fn();

  const view = renderWithProviders(
    <Modal
      container={container}
      isOpen={props.isOpen ?? true}
      onClose={onClose}
      form={props.form ?? { selectedForm: 'uncontrolled' }}
    >
      <h2 id="modal-title">Test modal</h2>
      <p>Modal description</p>
    </Modal>
  );

  return { ...view, container, onClose };
}

describe('Modal', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('does not render when closed', () => {
    renderModal({ isOpen: false });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders portal content when open', () => {
    renderModal();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test modal')).toBeInTheDocument();
    expect(screen.getByText('Modal description')).toBeInTheDocument();
  });

  it('has accessibility attributes', () => {
    renderModal();

    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('closes on Escape key', async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when clicking overlay', async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();

    await user.click(screen.getByRole('dialog'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when clicking modal content', async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();

    await user.click(screen.getByText('Modal description'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes when close button is clicked', async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();

    await user.click(screen.getByRole('button', { name: 'Close modal' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders UncontrolledForm when uncontrolled is selected', () => {
    renderModal({ form: { selectedForm: 'uncontrolled' } });

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });

  it('renders ReactHookForm when RHF is selected', () => {
    renderModal({ form: { selectedForm: 'RHF' } });

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });
});
