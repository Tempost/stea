import { PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';

export interface UseFormFieldProps extends PropsWithChildren {
  name: string;
  label?: string;
  altLabel?: string;
}

export const useFormField = <TProps extends UseFormFieldProps>(
  props: TProps
) => {
  const { label, name, altLabel, ...otherProps } = props;
  const id = name;

  return {
    formFieldProps: { id, name, label, altLabel },
    childProps: { ...otherProps, id, name },
  };
};

interface Props extends UseFormFieldProps {
  id: string;
}

const FormField = ({ children, name, id, label, altLabel }: Props) => {
  const ctx = useFormContext();
  const state = ctx.getFieldState(name);

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          aria-label={label}
        >
          <span className='label-text self-start'>{label}</span>
        </label>
      )}
      {children}
      {state.error && <p className='text-error'>{state.error.message}</p>}
      {altLabel && (
        <label
          htmlFor={`text-input${id}`}
          aria-label={label}
        >
          <span className='label-text-alt'>{altLabel}</span>
        </label>
      )}
    </div>
  );
};

export default FormField;

// label style
// className={`label flex-col ${labelStyle}`}

// alt label style
// className={`label-text-alt w-fit rounded-sm bg-info/25 p-0.5 ${labelStyle}`}
