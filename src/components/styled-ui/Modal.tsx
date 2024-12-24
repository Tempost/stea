import { cn } from '@/utils/helpers';
import {
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from 'react';

interface ModalProps<T> extends PropsWithChildren {
  buttonLabel?: ReactNode;
  onClick?: () => void;
  ok?: ReactNode;
  onClose?: MouseEventHandler<HTMLLabelElement>;
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
      <label
        htmlFor={id}
        className={cn('btn btn-primary btn-sm', buttonClassName)}
      >
        {buttonLabel ?? 'Open'}
      </label>
      <input
        id={id}
        type='checkbox'
        className='modal-toggle'
        onClick={onClick}
      />

      <div className='modal modal-bottom transition-all delay-75 sm:modal-middle'>
        <div className='modal-box overflow-visible'>
          {children}
          <div className='modal-action'>
            {ok ?? <button className='btn btn-sm'>Ok</button>}

            <label
              htmlFor={id}
              className='btn btn-sm'
              onClick={onClose}
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
