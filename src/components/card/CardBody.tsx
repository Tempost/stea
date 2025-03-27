import { cn } from '@/utils/helpers';
import { forwardRef, HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {}

const CardBody = forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        {...props}
        className={cn('card-body', className)}
        ref={ref}
      />
    );
  },
);

CardBody.displayName = 'CardBody';
export default CardBody;
