import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js';

import PayPalButton from '../styled-ui/PayPalButton';

interface PointsPaymentProps {
  pointsCount: number;
}

function PointsPayment({ pointsCount }: PointsPaymentProps) {
  function createOrder(_: CreateOrderData, actions: CreateOrderActions) {}
  async function onApprove(_data: OnApproveData, actions: OnApproveActions) {}

  return (
    <div className='flex space-x-3 rounded-2xl border border-solid border-gray-400 bg-gray-100 p-5'>
      <PayPalButton />
      <h4 className='text-lg font-bold'>${pointsCount}</h4>
    </div>
  );
}

export default PointsPayment;
