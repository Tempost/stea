import { PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';

export interface UseFormFieldProps extends PropsWithChildren {
  name: string;
  label?: string;
  altLabel?: string;
  labelStyle?: string;
}

export const useFormField = <TProps extends UseFormFieldProps>(
  props: TProps
) => {
  const { label, name, altLabel, labelStyle, ...otherProps } = props;
  const id = name;

  return {
    formFieldProps: { id, name, label, labelStyle, altLabel },
    childProps: { ...otherProps, id, name },
  };
};

interface Props extends UseFormFieldProps {
  id: string;
}

export const FormField = ({
  children,
  name,
  id,
  label,
  labelStyle,
  altLabel,
}: Props) => {
  const ctx = useFormContext();
  const state = ctx.getFieldState(name);

  return (
    <div className='form-control w-full max-w-xs'>
      {label && (
        <label
          htmlFor={id}
          aria-label={label}
          className={`label ${labelStyle}`}
        >
          <span className='label-text'>{label}</span>
        </label>
      )}
      {children}
      {state.error && <p className='text-error'>{state.error.message}</p>}
      {altLabel && (
        <label
          htmlFor={id}
          aria-label={altLabel}
          className={`label-text-alt w-fit rounded-md bg-info/25 p-0.5 ${labelStyle}`}
        >
          <span className='label-text-alt'>{altLabel}</span>
        </label>
      )}
    </div>
  );
};

export const RadioFormField = ({
  children,
  name,
  id,
  label,
  labelStyle,
}: Props) => {
  const ctx = useFormContext();
  const state = ctx.getFieldState(name);

  return (
    <div className='form-control'>
      {label && (
        <label
          htmlFor={id}
          aria-label={label}
          className={`label cursor-pointer ${labelStyle}`}
        >
          <span className='label-text'>{label}</span>
          {children}
        </label>
      )}
      {state.error && <p className='text-error'>{state.error.message}</p>}
    </div>
  );
};
