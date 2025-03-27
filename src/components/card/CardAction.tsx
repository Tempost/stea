import { cn } from '@/utils/helpers';
import { forwardRef, HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {}

const CardActions = forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        {...props}
        className={cn('card-actions', className)}
        ref={ref}
      />
    );
  },
);

CardActions.displayName = 'CardActions';
export default CardActions;
