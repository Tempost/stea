import { Button } from '@/components/styled-ui/Button';
import { RowSelectionState } from '@tanstack/react-table';
import NextLink from 'next/link';

interface DownloadPointsProps {
  year: number;
  showSelection: RowSelectionState;
}

export default function DownloadPoints({
  year,
  showSelection,
}: DownloadPointsProps) {
  const disabled = Object.keys(showSelection).length > 1;
  let label = 'Download Year';
  const searchParams = new URLSearchParams();

  if (!disabled && Object.keys(showSelection).length !== 0) {
    label = 'Download Selected';
    searchParams.set('show', Object.keys(showSelection)[0]);
  } else {
    searchParams.set('year', year.toString());
  }

  return (
    <NextLink href={'/api/dashboard/download/points?' + searchParams}>
      <Button
        size='sm'
        variant='primary'
        disabled={disabled}
      >
        {label}
      </Button>
    </NextLink>
  );
}
