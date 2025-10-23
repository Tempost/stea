import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_publicLayout/scholarship')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className='p-4 sm:p-8 md:p-10 lg:p-16'></div>;
}
