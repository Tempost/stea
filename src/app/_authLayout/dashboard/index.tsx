import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authLayout/dashboard/')({
  component: Dashboard,
});

function Dashboard() {
  return (
    <p className='grid h-full place-content-center'>Welcome board members!</p>
  );
}
