import { confirmMember } from '@/app/(auth)/dashboard/applications/action';
import { Button } from '@/components/styled-ui/Button';
import { cn } from '@/utils/helpers';
import { useTransition } from 'react';

interface CMProps {
  fullName: string;
}

function ConfirmMember({ fullName }: CMProps) {
  const [pending, startTransition] = useTransition();

  function onClick() {
    startTransition(async () => {
      await confirmMember({ fullName, confirmed: true });
    });
  }

  return (
    <Button
      size='sm'
      variant='primary'
      className={cn({
        loading: pending,
      })}
      onClick={onClick}
    >
      Confirm
    </Button>
  );
}

export default ConfirmMember;
