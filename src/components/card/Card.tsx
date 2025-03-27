import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/utils/helpers';
import CardActions from './CardAction';
import CardBody from './CardBody';
import CardImage from './CardImage';
import CardTitle from './CardTitle';

const card = cva('card', {
  variants: {
    variant: {
      normal: 'card-normal',
      compact: 'card-compact',
      side: 'card-side',
    },
    size: {
      xs: 'card-xs',
      sm: 'card-sm',
      md: 'card-md',
      lg: 'card-lg',
      xl: 'card-xl',
    },
    imageFull: {
      true: 'image-full',
      false: null,
    },
    border: {
      true: 'border border-gray-200',
      false: null,
    },
  },
  defaultVariants: {
    variant: 'normal',
    imageFull: false,
    border: true,
  },
});

export interface Props
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof card> {}

const Card = forwardRef<HTMLDivElement, Props>(
  ({ variant, size, imageFull, border, className, ...props }, ref) => {
    return (
      <div
        aria-label='Card'
        {...props}
        className={cn(card({ variant, size, imageFull, border, className }))}
        ref={ref}
      />
    );
  },
);

Card.displayName = 'Card';

export default Object.assign(Card, {
  Actions: CardActions,
  Body: CardBody,
  Title: CardTitle,
  Image: CardImage,
});
