import { trpc } from '@/utils/trpc';

interface CPProps {
  uid: string;
}

function ConfirmPoints({ uid }: CPProps) {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(['shows.update'], {
    onSuccess(input) {
      utils.invalidateQueries(['shows.get-shows']);
    },
  });

  function onClick() {
    mutation.mutate({
      uid: uid,
      patch: {
        reviewed: true,
      },
    });
  }

  return (
    <button
      className={`btn-primary btn-sm btn ${mutation.error ? 'btn-error' : ''} ${mutation.isSuccess ? 'btn-success' : ''}`}
      onClick={onClick}
    >
      Confirm
    </button>
  );
}

export default ConfirmPoints;
