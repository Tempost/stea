import Footer from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_publicLayout')({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <div className='flex h-screen flex-col'>
      <Header />
      <main className='grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
