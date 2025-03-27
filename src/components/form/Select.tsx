import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/utils/helpers';
import Root, { Props as RootProps } from '@/components/styled-ui/Select';

interface Props extends RootProps {
  id?: string;
  name: string;
  floating?: boolean;
  label?: string;
}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ intent, size, className, floating = true, label, id, ...props }, ref) => {
    const ctx = useFormContext();
    const state = ctx.getFieldState(props.name);

    id = id ?? props.name;

    if (state.error) {
      intent = 'error';
    }

    if (floating) {
      return (
        <label
          className={cn('floating-label w-full', className)}
          aria-label={label}
        >
          {label && <span>{label}</span>}
          <Root
            id={id}
            intent={intent}
            size={size}
            {...props}
            ref={ref}
          />
          {state.error && <p className='text-error'>{state.error.message}</p>}
        </label>
      );
    }

    return (
      <div className='w-full'>
        <label
          className={className}
          aria-label={label}
        >
          {label && <span className='label'>{label}</span>}
          <Root
            id={id}
            intent={intent}
            size={size}
            {...props}
            ref={ref}
          />
        </label>
        {state.error && <p className='text-error'>{state.error.message}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';
export default Select;
