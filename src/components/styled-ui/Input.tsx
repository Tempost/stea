import { cn } from '@/utils/helpers';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const inputVariants = cva('input input-bordered w-full md:input-sm', {
  variants: {
    variant: {
      default: 'input-primary',
      secondary: 'input-secondary',
      disabled: 'input-disabled',
    },
    size: {
      xs: 'input-xs',
      sm: 'input-sm',
      md: 'input-md',
      lg: 'input-lg',
      xl: 'input-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, className, variant, size, ...props }, ref) => (
    <input
      className={cn(
        inputVariants({
          variant,
          size,
          className,
        }),
      )}
      {...props}
      id={id}
      ref={ref}
    />
  ),
);

Input.displayName = 'Input';

export default Input;
