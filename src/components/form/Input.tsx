import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import Root, { Props as RootProps } from '@/components/styled-ui/Input';
import { cn } from '@/utils/helpers';

interface Props extends RootProps {
  id?: string;
  name: string;
  floating?: boolean;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { intent, size, className, floating = true, label, id, hidden, ...props },
    ref,
  ) => {
    const ctx = useFormContext();
    const state = ctx.getFieldState(props.name);

    id = id ?? props.name;

    if (state.error) {
      intent = 'error';
    }

    if (floating) {
      return (
        <label
          className={cn('floating-label w-full', className, { hidden: hidden })}
          aria-label={label}
        >
          {label && <span>{label}</span>}
          <Root
            id={id}
            intent={intent}
            size={size}
            placeholder={label}
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
          className={cn({ hidden: hidden }, className)}
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

Input.displayName = 'Input';
export default Input;
