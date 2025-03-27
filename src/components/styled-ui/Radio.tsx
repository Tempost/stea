import { cn } from '@/utils/helpers';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, InputHTMLAttributes } from 'react';

const radio = cva('radio', {
  variants: {
    intent: {
      primary: 'radio-primary',
      neutral: 'radio-neutral',
      secondary: 'radio-secondary',
      accent: 'radio-accent',
      success: 'radio-success',
      warning: 'radio-warning',
      info: 'radio-info',
      error: 'radio-error',
    },
    size: {
      xs: 'radio-xs',
      sm: 'radio-sm',
      md: 'radio-md',
      lg: 'radio-lg',
      xl: 'radio-xl',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

export interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof radio> {}

const Radio = forwardRef<HTMLInputElement, Props>(
  ({ id, intent, size, className, ...props }, ref) => (
    <input
      className={cn(radio({ intent, size, className }))}
      {...props}
      id={id}
      ref={ref}
      type='radio'
    />
  ),
);

Radio.displayName = 'Radio';
export default Radio;
