import { cn } from '@/utils/helpers';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const inputVariants = cva('input w-full', {
  variants: {
    intent: {
      primary: 'input-primary',
      secondary: 'input-secondary',
      ghost: 'input-ghost',
      accent: 'input-accent',
      error: 'input-error',
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
    intent: 'primary',
    size: 'md',
  },
});

export interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, className, intent, size, ...props }, ref) => (
    <input
      className={cn(
        inputVariants({
          intent,
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
