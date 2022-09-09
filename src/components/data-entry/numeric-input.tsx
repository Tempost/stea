import { forwardRef, useId } from 'react';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface NumericInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  labelStyle?: string;
  inputSize?: string;
  error?: FieldError;
}

const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  ({ className, label, labelStyle, inputSize, error, ...props }, ref) => {
    const id = useId();

    return (
      <div className={`${inputSize ? inputSize : 'w-full'}`}>
        {label !== undefined && (
          <label
            className={`label flex-col ${labelStyle}`}
            htmlFor={`numeric-input${id}`}
            aria-label={label}
          >
            <span className='label-text self-start'>{label}</span>
          </label>
        )}

        <input
          ref={ref}
          id={`numeric-input${id}`}
          className={`input input-bordered w-full ${
            error && 'input-error border-2'
          } ${className}`}
          type='text'
          {...props}
        />
      </div>
    );
  }
);

NumericInput.displayName = 'Numeric-Input';
export default NumericInput;
