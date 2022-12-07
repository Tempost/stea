import { trpc } from '@/utils/trpc';

interface CMProps {
  fullName: string;
}

function ConfirmMember({ fullName }: CMProps) {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(['member.update-member'], {
    onSuccess(input) {
      utils.invalidateQueries(['member.applicants']);
    },
  });

  function onClick() {
    mutation.mutate({
      fullName: fullName,
      confirmed: true,
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

export default ConfirmMember;
