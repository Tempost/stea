import { useRouter } from 'next/router';
import { PublicHeader, DashboardHeader } from './header';
import Footer from './footer';

export function PublicLayout({ children }: any) {
  const router = useRouter();
  return (
    <div className='flex flex-col h-screen'>
      <PublicHeader />
      <main
        className={`flex-grow bg-neutral-content ${
          router.pathname === '/' ? '' : 'p-20'
        }`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function DashboardLayout({ children }: any) {
  return (
    <div className='flex flex-col h-screen'>
      <DashboardHeader />
      <main className='flex-grow bg-neutral-content mt-16'>{children}</main>
    </div>
  );
}
