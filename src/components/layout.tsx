import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';

import { PublicHeader, DashboardHeader } from './header';
import Footer from './footer';
import { updateFormState } from '@/utils/atoms';

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

export function FormLayout({ children }: any) {
  const router = useRouter();
  const update = useSetAtom(updateFormState);

  const showReturn = !router.asPath.endsWith('join');

  const returnButton = (
    <button
      className='btn btn-link btn-sm self-end'
      onClick={() => {
        update({ type: 'RESET' });
        router.back();
      }}
    >
      return
    </button>
  );

  return (
    <PublicLayout>
      <div className='grid place-content-center h-full bg-opacity-50'>
        <div className='card w-fit bg-base-100 shadow-[0_0_10px_0_rgba(0,0,0,0.3)] p-8'>
          {showReturn && returnButton}
          {children}
        </div>
      </div>
    </PublicLayout>
  );
}
