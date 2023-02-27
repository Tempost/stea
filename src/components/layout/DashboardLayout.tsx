import { LayoutProps } from '@/types/common';
import { ResponsiveDashboardHeader } from './Header';

export function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className='flex h-screen flex-col'>
      <ResponsiveDashboardHeader />
      <main className='flex-grow bg-neutral-content p-4 sm:p-8 md:p-10 lg:p-16'>
        {children}
      </main>
    </div>
  );
}
