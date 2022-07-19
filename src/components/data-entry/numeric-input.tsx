import { forwardRef, useId } from 'react';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface NumericInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  labelStyle?: string;
  inputSize?: string;
}

const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>
  (({
    className,
    label,
    labelStyle,
    inputSize,
    ...props
  },
    ref) => {
    const id = useId();

    return (
      <div className={`${inputSize ? inputSize : 'w-full'}`}>
        {
          label !== undefined &&
          <label
            className={`label flex-col ${labelStyle}`}
            htmlFor={`numeric-input${id}`}
            aria-label={label}
          >
            <span className='label-text self-start'>{label}</span>
          </label>
        }

        <input
          ref={ref}
          id={`numeric-input${id}`}
          className={`input input-bordered w-full ${className}`}
          type='text'
          {...props}
        />

      </div>
    );
  })

NumericInput.displayName = 'Numeric-Input';
export default NumericInput;
