'use client';
import { Button } from '@/components/styled-ui/Button';
import { cn } from '@/utils/helpers';
import { usePathname, useRouter } from 'next/navigation';

function TableSelect() {
  const router = useRouter();
  const path = usePathname();

  const memberSelected = path?.endsWith('members');
  const horseSelected = path?.endsWith('horses');
  const ownersSelected = path?.endsWith('owners');
  const ridersSelected = path?.endsWith('riders');
  const showsSelected = path?.endsWith('shows');
  const boardmembersSelected = path?.endsWith('boardmembers');

  return (
    <div className='flex w-full flex-col gap-10'>
      <div
        className='join mx-auto'
        //@ts-expect-error wtf does this even mean
        onClick={e => router.push(`/dashboard/tables/${e.target.value}`)}
      >
        <Button
          className={cn('join-item lg:btn-md', {
            'btn-primary': memberSelected && !boardmembersSelected,
          })}
          size='sm'
          value='members'
        >
          Members
        </Button>
        <Button
          className={cn('join-item lg:btn-md', {
            'btn-primary': horseSelected,
          })}
          value='horses'
        >
          Horses
        </Button>
        <Button
          className={cn('join-item lg:btn-md', {
            'btn-primary': ownersSelected,
          })}
          value='owners'
        >
          Owners
        </Button>
        <Button
          className={cn('join-item lg:btn-md', {
            'btn-primary': ridersSelected,
          })}
          value='riders'
        >
          Riders
        </Button>
        <Button
          className={cn('join-item lg:btn-md', {
            'btn-primary': showsSelected,
          })}
          value='shows'
        >
          Shows
        </Button>
        <Button
          className={cn('join-item lg:btn-md', {
            'btn-primary': boardmembersSelected,
          })}
          value='boardmembers'
        >
          Board Members
        </Button>
      </div>
    </div>
  );
}

export default TableSelect;
