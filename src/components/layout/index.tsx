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
import IsAuth from '@/components/auth';

function PublicLayout({ children }: LayoutProps) {
  const router = useRouter();
  return (
    <div className='flex h-screen flex-col'>
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

function DashboardLayout({ children }: LayoutProps) {
  return (
    <IsAuth>
      <div className='flex h-screen flex-col'>
        <DashboardHeader />
        <main className='flex-grow bg-neutral-content p-4 sm:p-8 md:p-10 lg:p-16'>
          {children}
        </main>
      </div>
    </IsAuth>
  );
}

const initOptions: ReactPayPalScriptOptions = {
  'client-id':
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
  'data-react-paypal-script-id': 'paypal-button',
};

function FormLayout({ children }: LayoutProps) {
  const router = useRouter();
  const update = useSetAtom(updateFormState);

  const showReturn = !router.asPath.endsWith('join');

  const returnButton = (
    <button
      className='btn-link btn-sm btn self-end'
      onClick={() => {
        update({ type: 'RESET' });
        router.back();
      }}
    >
      return
    </button>
  );

  return (
    <div className='flex h-screen flex-col'>
      <ResponsiveHeader>
        <main className='flex-grow bg-base-100 bg-form-hero bg-cover bg-center p-4 sm:p-8 md:p-10 lg:p-16'>
          <div className='grid h-full place-content-center'>
            <div className='card w-fit bg-base-100 p-5 shadow-[0_0_10px_0_rgba(0,0,0,0.3)] md:p-8'>
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

export { PublicLayout, DashboardLayout, FormLayout };
