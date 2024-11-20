import { LayoutProps } from '@/types/common';
import { updateFormState } from '@/utils/atoms';
import {
  ReactPayPalScriptOptions,
  PayPalScriptProvider,
} from '@paypal/react-paypal-js';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import Footer from './Footer';
import { ResponsiveHeader } from './Header';

const initOptions: ReactPayPalScriptOptions = {
  'client-id':
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID,
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
