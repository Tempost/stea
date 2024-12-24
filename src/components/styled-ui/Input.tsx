import { cn } from '@/utils/helpers';
import { forwardRef } from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, ...props }, ref) => (
    <input
      className={cn(
        'input input-bordered input-primary w-full md:input-sm',
        className,
      )}
      {...props}
      id={id}
      ref={ref}
    />
  ),
);

Input.displayName = 'Input';

export default Input;
