import { cn } from '@/utils/helpers';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const selectVariants = cva('select w-full', {
  variants: {
    intent: {
      primary: 'select-primary',
      secondary: 'select-secondary',
      ghost: 'select-ghost',
      accent: 'select-accent',
      error: 'select-error',
    },
    size: {
      xs: 'select-xs',
      sm: 'select-sm',
      md: 'select-md',
      lg: 'select-lg',
      xl: 'select-xl',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});
export interface Props
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ id, className, intent, size, ...props }, ref) => (
    <select
      className={cn(
        selectVariants({
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

Select.displayName = 'Select';
export default Select;
