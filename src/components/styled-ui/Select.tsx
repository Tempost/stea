import { cn } from '@/utils/helpers';
import { forwardRef } from 'react';

export type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ className, ...props }, ref) => (
    <select
      className={cn(
        'select select-bordered select-primary w-full md:select-sm',
        className,
      )}
      {...props}
      ref={ref}
    />
  ),
);

Select.displayName = 'Select';
export default Select;
