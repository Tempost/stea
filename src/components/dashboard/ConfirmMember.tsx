import { trpc } from '@/utils/trpc';

interface CMProps {
  fullName: string;
}

function ConfirmMember({ fullName }: CMProps) {
  const utils = trpc.useContext();
  const update = trpc.members.dashboardUpdate.useMutation({
    onSuccess() {
      utils.members.invalidate();
    },
  });

  function onClick() {
    update.mutate({
      fullName: fullName,
      confirmed: true,
    });
  }

  return (
    <button
      className={`btn btn-primary btn-sm ${update.error ? 'btn-error' : ''} ${
        update.isSuccess ? 'btn-success' : ''
      }`}
      onClick={onClick}
    >
      Confirm
    </button>
  );
}

export default ConfirmMember;
