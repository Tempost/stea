import { PropsWithChildren, ReactNode } from 'react';

interface ModalProps extends PropsWithChildren {
  buttonLabel?: ReactNode;
  onClick?: () => void;
  ok?: ReactNode;
}
function Modal({ buttonLabel, onClick, ok, children }: ModalProps) {
  return (
    <>
      <label
        htmlFor='my-modal-6'
        className='modal-button btn-primary btn btn-sm'
      >
        {buttonLabel ?? 'Open'}
      </label>
      <input
        type='checkbox'
        id='my-modal-6'
        className='modal-toggle'
        onClick={onClick}
      />

      <div className='modal modal-bottom transition-all delay-75 sm:modal-middle'>
        <div className='modal-box overflow-visible'>
          {children}
          <div className='modal-action'>
            {ok ?? <button className='btn-sm btn'>Ok</button>}

            <label
              htmlFor='my-modal-6'
              className='btn-sm btn'
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
