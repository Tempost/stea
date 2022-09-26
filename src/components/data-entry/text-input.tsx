import { forwardRef, useId } from 'react';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface TextInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  labelStyle?: string;
  altLabel?: string;
  inputSize?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  name?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { className, label, labelStyle, altLabel, inputSize, error, ...props },
    ref
  ) => {
    const id = useId();

    return (
      <div className={`${inputSize ? inputSize : 'w-full'}`}>
        {label && (
          <label
            className={`label flex-col ${labelStyle}`}
            htmlFor={`text-input${id}`}
            aria-label={label}
          >
            <span className='label-text self-start'>{label}</span>
          </label>
        )}

        <input
          ref={ref}
          id={`text-input${id}`}
          className={`input input-bordered md:input-sm w-full ${
            error && 'input-error border-2'
          } ${className}`}
          type='text'
          {...props}
        />

        {altLabel && (
          <label
            className={`label-text-alt ${labelStyle}`}
            htmlFor={`text-input${id}`}
            aria-label={label}
          >
            <span className='label-text-alt'>{altLabel}</span>
          </label>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'Text-Input';
export default TextInput;
