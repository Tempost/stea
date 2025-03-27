'use client';
import { Button } from '@/components/styled-ui/Button';
import { cn } from '@/utils/helpers';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

function TableSelect() {
  const path = usePathname();
  const basePath = '/dashboard/directory';

  const memberSelected = path?.endsWith('members');
  const horseSelected = path?.endsWith('horses');
  const ownersSelected = path?.endsWith('owners');
  const ridersSelected = path?.endsWith('riders');
  const showsSelected = path?.endsWith('shows');
  const boardmembersSelected = path?.endsWith('boardmembers');

  return (
    <div className='flex w-full flex-col gap-10'>
      <div className='join mx-auto'>
        <NextLink href={`${basePath}/members`}>
          <Button
            className={cn('join-item lg:btn-md', {
              'btn-primary': memberSelected && !boardmembersSelected,
            })}
            size='sm'
          >
            Members
          </Button>
        </NextLink>
        <NextLink href={`${basePath}/horses`}>
          <Button
            className={cn('join-item lg:btn-md', {
              'btn-primary': horseSelected,
            })}
            size='sm'
          >
            Horses
          </Button>
        </NextLink>
        <NextLink href={`${basePath}/owners`}>
          <Button
            className={cn('join-item lg:btn-md', {
              'btn-primary': ownersSelected,
            })}
            size='sm'
          >
            Owners
          </Button>
        </NextLink>
        <NextLink href={`${basePath}/riders`}>
          <Button
            className={cn('join-item lg:btn-md', {
              'btn-primary': ridersSelected,
            })}
            size='sm'
          >
            Riders
          </Button>
        </NextLink>
        <NextLink href={`${basePath}/shows`}>
          <Button
            className={cn('join-item lg:btn-md', {
              'btn-primary': showsSelected,
            })}
            size='sm'
          >
            Shows
          </Button>
        </NextLink>
        <NextLink href={`${basePath}/boardmembers`}>
          <Button
            className={cn('join-item lg:btn-md', {
              'btn-primary': boardmembersSelected,
            })}
            size='sm'
          >
            Board Members
          </Button>
        </NextLink>
      </div>
    </div>
  );
}

export default TableSelect;
