import { cn } from '@/utils/helpers';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const buttonVariants = cva('btn', {
  variants: {
    variant: {
      default: '',
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      disabled: 'btn-disabled',
      ghost: 'btn-ghost',
      success: 'btn-succes',
      error: 'btn-error',
      link: 'btn-link',
    },
    size: {
      default: '',
      xs: 'btn-xs',
      sm: 'btn-sm',
      lg: 'btn-lg',
      xl: 'btn-xl',
    },
    join: {
      true: 'join-item',
      false: null,
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    join: false,
  },
});

export interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant, size, join, type, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, join, className }))}
      type={type ?? 'button'}
      {...props}
    />
  ),
);
Button.displayName = 'Button';

export { Button };
