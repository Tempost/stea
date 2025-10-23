import Card from '@/components/card/Card';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_publicLayout/_joinLayout')({
  component: JoinLayout,
});

function JoinLayout() {
  console.log(Route);
  return (
    <div className='bg-form-hero h-full grow bg-cover bg-center p-4 sm:p-8 md:p-10 lg:p-16'>
      <div className='grid h-full place-content-center'>
        <Card className='shadow-xl'>
          <Card.Body>
            <Outlet />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
