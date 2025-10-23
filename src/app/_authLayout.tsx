import { ResponsiveDashboardHeader } from '@/components/layout/Header';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authLayout')({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className='flex h-screen flex-col'>
      <ResponsiveDashboardHeader />
      <main className='p-4 sm:p-8 md:p-10 lg:p-16'>
        <Outlet />
      </main>
    </div>
  );
}
