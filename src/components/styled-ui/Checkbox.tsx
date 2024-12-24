import { cn } from '@/utils/helpers';
import { forwardRef } from 'react';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type CheckboxProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      id='checkbox-input'
      type='checkbox'
      className={cn('checkbox checkbox-primary md:checkbox-sm', className)}
      {...props}
    />
  ),
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
