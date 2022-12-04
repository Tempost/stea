import { trpc } from '@/utils/trpc';

interface CPProps {
  uid: string;
}

function ConfirmPoints({ uid }: CPProps) {
  const utils = trpc.useContext();
  const mutation = trpc.shows.update.useMutation({
    onSuccess() {
      utils.shows.invalidate();
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
      className={`btn-primary btn-sm btn ${mutation.error ? 'btn-error' : ''} ${
        mutation.isSuccess ? 'btn-success' : ''
      }`}
      onClick={onClick}
    >
      Confirm
    </button>
  );
}

export default ConfirmPoints;
