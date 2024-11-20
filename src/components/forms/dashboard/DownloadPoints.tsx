interface DownloadPointsProps {
  uid: string;
}

export default function DownloadPoints({ uid }: DownloadPointsProps) {
  return (
    <a
      className='btn btn-secondary btn-xs'
      href={
        '/api/dashboard/download/points/show?' +
        new URLSearchParams({ show: uid })
      }
    >
      Download
    </a>
  );
}
