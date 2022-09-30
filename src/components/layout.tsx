import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';
import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';

import { DashboardHeader, ResponsiveHeader } from './header';
import Footer from './footer';
import { updateFormState } from '@/utils/atoms';
import { LayoutProps } from '@/types/common';
import IsAuth from './auth';

export function PublicLayout({ children }: LayoutProps) {
  const router = useRouter();
  return (
    <div className='flex flex-col h-screen'>
      <ResponsiveHeader>
        <main
          className={`flex-grow bg-base-100 
                    ${
                      router.pathname === '/'
                        ? ''
                        : 'p-4 sm:p-8 md:p-10 lg:p-16'
                    }`}
        >
          {children}
        </main>
        <Footer />
      </ResponsiveHeader>
    </div>
  );
}

export function DashboardLayout({ children }: LayoutProps) {
  return (
    <IsAuth>
      <div className='flex flex-col h-screen'>
        <DashboardHeader />
        <main className='flex-grow bg-neutral-content p-4 sm:p-8 md:p-10 lg:p-16'>
          {children}
        </main>
      </div>
    </IsAuth>
  );
}

const initOptions: ReactPayPalScriptOptions = {
  'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
  'data-react-paypal-script-id': 'paypal-button',
};

export function FormLayout({ children }: LayoutProps) {
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
    <div className='flex flex-col h-screen'>
      <ResponsiveHeader>
        <main className='flex-grow bg-base-100 p-4 sm:p-8 md:p-10 lg:p-16 bg-form-hero bg-center bg-cover'>
          <div className='grid place-content-center h-full'>
            <div className='card w-fit bg-base-100 shadow-[0_0_10px_0_rgba(0,0,0,0.3)] p-5 md:p-8'>
              <PayPalScriptProvider options={initOptions}>
                {showReturn && returnButton}
                {children}
              </PayPalScriptProvider>
            </div>
          </div>
        </main>
        <Footer />
      </ResponsiveHeader>
    </div>
  );
}
