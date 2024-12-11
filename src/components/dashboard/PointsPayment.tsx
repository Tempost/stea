import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js';

import PayPalButton from '../styled-ui/PayPalButton';

interface PointsPaymentProps {
  pointsCount: number;
  approveHandler: () => void;
}

function PointsPayment({ pointsCount, approveHandler }: PointsPaymentProps) {
  function createOrder(_: CreateOrderData, actions: CreateOrderActions) {
    return actions.order.create({
      intent: 'CAPTURE',
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      },
      purchase_units: [
        {
          amount: {
            value: pointsCount.toString(),
            currency_code: 'USD',
          },
          description: 'Show points submission',
        },
      ],
    });
  }

  async function onApprove(_data: OnApproveData, actions: OnApproveActions) {
    return actions.order!.capture().then(() => {
      approveHandler();
    });
  }

  return (
    <div className='flex space-x-3 rounded-2xl border border-solid border-gray-400 bg-gray-100 p-5'>
      <PayPalButton
        createOrder={createOrder}
        onApprove={onApprove}
      />
      <h4 className='text-lg font-bold'>${pointsCount}</h4>
    </div>
  );
}

export default PointsPayment;
