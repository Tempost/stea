import { cn } from '@/utils/helpers';
import { cva, VariantProps } from 'class-variance-authority';
import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

const checkbox = cva('checkbox', {
  variants: {
    intent: {
      primary: 'checkbox-primary',
      secondary: 'checkbox-secondary',
      accent: 'checkbox-accent',
      neutral: 'checkbox-neutral',
      success: 'checkbox-success',
      warning: 'checkbox-warning',
      error: 'checkbox-error',
    },
    size: {
      xs: 'checkbox-xs',
      sm: 'checkbox-sm',
      md: 'checkbox-md',
      lg: 'checkbox-lg',
      xl: 'checkbox-xl',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

export interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkbox> {}

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ intent, size, className, ...props }, ref) => (
    <input
      ref={ref}
      type='checkbox'
      className={cn(checkbox({ intent, size, className }))}
      {...props}
    />
  ),
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
