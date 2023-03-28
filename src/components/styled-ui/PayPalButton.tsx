import {
  PayPalButtons,
  PayPalButtonsComponentProps,
} from '@paypal/react-paypal-js';

interface ButtonProps extends PayPalButtonsComponentProps {}

function PayPalButton(props: ButtonProps) {
  return (
    <button className='w-full'>
      <PayPalButtons
        fundingSource='paypal'
        style={{
          layout: 'horizontal',
          color: 'blue',
          label: 'paypal',
          tagline: false,
        }}
        {...props}
      />
    </button>
  );
}

export default PayPalButton;
