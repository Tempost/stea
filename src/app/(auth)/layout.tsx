import { ResponsiveDashboardHeader } from '@/components/layout/Header';
import { LayoutProps } from '@/types/common';

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className='flex h-screen flex-col'>
      <ResponsiveDashboardHeader />
      <main className='flex-grow p-4 sm:p-8 md:p-10 lg:p-16'>{children}</main>
    </div>
  );
}

export const metadata = {
  title: 'Dashboard',
  description:
    'Dashboard for board members to manage stea data and upload points',
};
