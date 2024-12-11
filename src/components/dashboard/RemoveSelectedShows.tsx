import { RowSelectionState } from '@tanstack/react-table';
import Modal from '@/components/styled-ui/Modal';
import { trpc } from '@/utils/trpc';

interface RemoveSelectedProps {
  showSelection: RowSelectionState;
  clearSelection: () => void;
}

function RemoveSelectedShows({
  showSelection,
  clearSelection,
}: RemoveSelectedProps) {
  const disableButton = Object.keys(showSelection).length === 0;
  const utils = trpc.useContext();
  const remove = trpc.shows.remove.useMutation({
    onSuccess() {
      utils.shows.invalidate();
      clearSelection();
    },
  });

  return (
    <Modal
      id='remove-shows'
      buttonLabel='Remove Show(s)'
      buttonClassName={`${disableButton ? 'btn-disabled' : ''}`}
      onClose={() => remove.reset()}
      ok={
        <button
          className={`btn btn-sm
            ${
              remove.isError
                ? 'btn-error'
                : remove.isSuccess
                ? 'btn-success'
                : ''
            }`}
          onClick={() => {
            remove.mutate(Object.keys(showSelection));
          }}
        >
          Confirm
        </button>
      }
    >
      <h3 className='text-lg font-bold'>
        Are you sure you wish to remove the selected show(s)?
      </h3>
    </Modal>
  );
}

export default RemoveSelectedShows;
