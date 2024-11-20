import { PropsWithChildren, ReactNode } from 'react';

interface ModalProps extends PropsWithChildren {
  buttonLabel?: ReactNode;
  onClick?: () => void;
  ok?: ReactNode;
  id: string;
}

function Modal({ buttonLabel, onClick, ok, id, children }: ModalProps) {
  return (
    <>
      <label
        htmlFor={id}
        className='btn btn-primary btn-sm'
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
