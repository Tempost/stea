import { PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';
import { AltLabel, Label } from '../styled-ui/Label';
import { cn } from '@/utils/helpers';

export interface UseFormFieldProps extends PropsWithChildren {
  id?: string;
  name: string;
  label?: string;
  altLabel?: string;
  labelStyle?: string;
}

export const useFormField = <TFieldProps extends UseFormFieldProps>(
  props: TFieldProps,
) => {
  const { label, name, altLabel, labelStyle, ...otherProps } = props;
  let { id } = props;

  if (!id) {
    id = name;
  }

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
    <div className='form-control w-full'>
      {label && (
        <Label
          htmlFor={id}
          aria-label={label}
          className={labelStyle}
        >
          {label}
        </Label>
      )}
      {children}
      {altLabel && (
        <AltLabel
          htmlFor={id}
          aria-label={altLabel}
          className='w-fit'
        >
          {altLabel}
        </AltLabel>
      )}
      {state.error && <p className='text-error'>{state.error.message}</p>}
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
    <div className='form-control flex-row'>
      {label && (
        <Label
          htmlFor={id}
          aria-label={label}
          className={cn(
            'cursor-pointer disabled:cursor-not-allowed',
            labelStyle,
          )}
        >
          {children}
          <span>{label}</span>
        </Label>
      )}
      {state.error && <p className='text-error'>{state.error.message}</p>}
    </div>
  );
};
