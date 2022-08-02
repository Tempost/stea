import { PublicHeader, DashboardHeader } from './header';
import Footer from './footer';

export function PublicLayout({ children }: any) {
  return (
    <div className='flex flex-col h-screen'>
      <Public Header />
      <main className='flex-grow bg-neutral-content'>{children}</main>
      <Footer />
    </div>
  );
}

export function DashboardLayout({ children }: any) {
  return (
    <div className='flex flex-col h-screen'>
      <DashboardHeader />
      <main className='flex-grow bg-neutral-content'>{children}</main>
    </div>
  );
}
