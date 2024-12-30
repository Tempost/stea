import { Button } from '@/components/styled-ui/Button';
import Modal from '@/components/styled-ui/Modal';
import { cn } from '@/utils/helpers';
import { RowSelectionState } from '@tanstack/react-table';
import { useState, useTransition } from 'react';
import { ActionState, remove } from './action';

interface RemoveSelectedProps {
  showSelection: RowSelectionState;
  clearSelection: () => void;
}

const initialState: ActionState = {
  message: '',
  error: false,
};

function RemoveSelectedShows({
  showSelection,
  clearSelection,
}: RemoveSelectedProps) {
  const disableButton = Object.keys(showSelection).length === 0;
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState(initialState);

  return (
    <Modal
      id='remove-shows'
      buttonLabel='Remove Show(s)'
      buttonClassName={cn({ 'btn-disabled': disableButton })}
      ok={
        <Button
          className={cn({
            loading: pending,
            'btn-error': state.error,
            'btn-success': state.message === 'Success',
          })}
          size='sm'
          onClick={() => {
            startTransition(async () => {
              const res = await remove(Object.keys(showSelection));

              if (res.error === false && res.message === 'Success') {
                clearSelection();
              }
              setState(res);
            });
          }}
        >
          Confirm
        </Button>
      }
    >
      <h3 className='text-lg font-bold'>
        Are you sure you wish to remove the selected show(s)?
      </h3>
    </Modal>
  );
}

export default RemoveSelectedShows;
