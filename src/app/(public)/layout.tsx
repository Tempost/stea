import Footer from '@/components/layout/Footer';
import { ResponsiveHeader } from '@/components/layout/Header';
import { LayoutProps } from '@/types/common';
import '@/styles/globals.css';

export default function Public({ children }: LayoutProps) {
  return (
    <div className='flex h-screen flex-col'>
      <ResponsiveHeader>
        <main className={`flex-grow bg-base-100`}>{children}</main>
        <Footer />
      </ResponsiveHeader>
    </div>
  );
}

export const metadata = {
  title: 'STEA',
  description:
    'Website for information and events surrounding the South Texas Eventing Association.',
};
