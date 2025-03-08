import { cn } from '@/utils/helpers';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const selectVariants = cva(
  'select select-bordered select-primary w-full md:select-sm',
  {
    variants: {
      variant: {
        default: 'select-primary',
        secondary: 'select-secondary',
        disabled: 'select-disabled',
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
      variant: 'default',
      size: 'md',
    },
  },
);
export interface Props
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ id, className, variant, size, ...props }, ref) => (
    <select
      className={cn(
        selectVariants({
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

Select.displayName = 'Select';
export default Select;
