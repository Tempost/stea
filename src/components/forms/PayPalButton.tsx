import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import {
  PayPalScriptProvider,
  PayPalButtons,
  ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';

const initOptions: ReactPayPalScriptOptions = {
  'client-id': process.env.NEXT_PUBLIC_SANDBOX_CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
  'data-react-paypal-script-id': 'paypal-button',
};

interface PaymentProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  amountOwed: number;
}

function PayPalButton({ amountOwed, ...props }: PaymentProps) {
  return (
    <button
      className='w-full'
      {...props}
    >
      <PayPalScriptProvider options={initOptions}>
        <PayPalButtons
          fundingSource='paypal'
          style={{
            layout: 'horizontal',
            color: 'blue',
            label: 'paypal',
            tagline: false,
          }}
          createOrder={(data, actions) => {
            console.log('paypal data', data);
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [{
                amount: { value: '1.00', currency_code: 'USD' },
                description: 'STEA registration'
              }]
            })
          }}
        />
      </PayPalScriptProvider>
    </button>
  );
}

export default PayPalButton;
