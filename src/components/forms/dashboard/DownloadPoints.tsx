import { RowSelectionState } from '@tanstack/react-table';

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
    <button
      className='btn btn-primary btn-sm'
      disabled={disabled}
    >
      <a href={'/api/dashboard/download/points?' + searchParams}>{label}</a>
    </button>
  );
}
