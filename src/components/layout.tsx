import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';

import { DashboardHeader, ResponsiveHeader } from './header';
import Footer from './footer';
import { updateFormState } from '@/utils/atoms';
import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';

export function PublicLayout({ children }: any) {
  const router = useRouter();
  return (
    <div className='flex flex-col h-screen'>
      <ResponsiveHeader>
      <main
        className={`flex-grow bg-neutral-content 
                    ${router.pathname === '/' ? '' : 'p-4 sm:p-8 md:p-10 lg:p-16'}`}
      >
        {children}
      </main>
      <Footer />
      </ResponsiveHeader>
    </div>
  );
}

export function DashboardLayout({ children }: any) {
  return (
    <div className='flex flex-col h-screen'>
      <DashboardHeader />
      <main className='flex-grow bg-neutral-content p-4 sm:p-8 md:p-10 lg:p-16'>{children}</main>
    </div>
  );
}

const initOptions: ReactPayPalScriptOptions = {
  'client-id': process.env.NEXT_PUBLIC_SANDBOX_CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
  'data-react-paypal-script-id': 'paypal-button',
};

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
        <div className='card w-fit bg-base-100 shadow-[0_0_10px_0_rgba(0,0,0,0.3)] p-5 md:p-8'>
          {showReturn && returnButton}
          <PayPalScriptProvider options={initOptions}>
            {children}
          </PayPalScriptProvider>
        </div>
      </div>
    </PublicLayout>
  );
}
