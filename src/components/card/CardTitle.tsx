import { cn } from '@/utils/helpers';
import { ElementType, forwardRef, HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  tag?: ElementType;
}

const CardTitle = forwardRef<HTMLDivElement, Props>(
  ({ className, tag = 'div', ...props }, ref) => {
    const Tag = tag;

    return (
      <Tag
        {...props}
        className={cn('card-title', className)}
        ref={ref}
      />
    );
  },
);

CardTitle.displayName = 'CardTitle';
export default CardTitle;
