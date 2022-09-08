import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

interface PaymentProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  amountOwed: number;
}

function PayPalButton({ amountOwed, ...props }: PaymentProps) {
  return (
    <button
      className='w-full'
      {...props}
    >
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
            application_context: {
              shipping_preference: 'NO_SHIPPING',
            },
            purchase_units: [
              {
                amount: { value: amountOwed.toString(), currency_code: 'USD' },
                description: 'STEA registration',
              },
            ],
          });
        }}
      />
    </button>
  );
}

export default PayPalButton;
