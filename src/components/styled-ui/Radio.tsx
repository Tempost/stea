import { cn } from '@/utils/helpers';
import { forwardRef } from 'react';

export type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Radio = forwardRef<HTMLInputElement, Props>(
  ({ id, className, ...props }, ref) => (
    <input
      className={cn('radio radio-primary', className)}
      {...props}
      id={id}
      ref={ref}
      type='radio'
    />
  ),
);

Radio.displayName = 'Radio';
export default Radio;
