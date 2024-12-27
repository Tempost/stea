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
      link: 'btn-link',
    },
    size: {
      default: '',
      xs: 'btn-xs',
      sm: 'btn-sm',
      lg: 'btn-lg',
      xl: 'btn-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
Button.displayName = 'Button';

export { Button };
