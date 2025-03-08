import {
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { Button } from './Button';

interface ModalProps<T> extends PropsWithChildren {
  buttonLabel?: ReactNode;
  onClick?: () => void;
  ok?: ReactNode;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  id: string;
  buttonClassName?: HTMLAttributes<T>['className'];
}

function Modal<T>({
  buttonClassName,
  buttonLabel,
  onClick,
  onClose,
  ok,
  id,
  children,
}: ModalProps<T>) {
  return (
    <>
      <Button
        variant='primary'
        size='sm'
        className={buttonClassName}
        onClick={() => {
          const dialog = document.getElementById(id) as HTMLDialogElement;
          dialog.showModal();
          if (onClick) onClick();
        }}
      >
        {buttonLabel ?? 'Open'}
      </Button>
      <dialog
        id={id}
        className='modal modal-bottom transition-all delay-75 sm:modal-middle'
      >
        <div className='modal-box overflow-visible'>
          {children}
          <div className='modal-action'>
            {ok}

            <Button
              size='sm'
              onClick={event => {
                const dialog = document.getElementById(id) as HTMLDialogElement;
                dialog.close();
                if (onClose) onClose(event);
              }}
            >
              Close
            </Button>
          </div>
        </div>
        <form
          method='dialog'
          className='modal-backdrop'
        >
          <button></button>
        </form>
      </dialog>
    </>
  );
}

export default Modal;
