import {
  PayPalScriptProvider,
  PayPalButtons,
  ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';

const initOptions: ReactPayPalScriptOptions = {
  'client-id': 'test',
  currency: 'USD',
  intent: 'capture',
  'data-react-paypal-script-id': 'paypal-button',
};

function PayPalButton() {
  return (
    <button
      className='mt-8 w-full'
      type='submit'
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
        />
      </PayPalScriptProvider>
    </button>
  );
}

export default PayPalButton;
