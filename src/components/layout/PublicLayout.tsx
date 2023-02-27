import { LayoutProps } from '@/types/common';
import { useRouter } from 'next/router';
import Footer from './Footer';
import { ResponsiveHeader } from './Header';

export function PublicLayout({ children }: LayoutProps) {
  const router = useRouter();
  return (
    <div className='flex h-screen flex-col'>
      <ResponsiveHeader>
        <main
          className={`flex-grow bg-base-100 ${
            router.pathname === '/' ? '' : 'p-4 sm:p-8 md:p-10 lg:p-16'
          }`}
        >
          {children}
        </main>
        <Footer />
      </ResponsiveHeader>
    </div>
  );
}
