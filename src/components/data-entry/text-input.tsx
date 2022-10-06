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
      <>
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
            className={`input input-bordered w-full md:input-sm ${
              error && 'input-error border-2'
            } ${className}`}
            type='text'
            {...props}
          />
        </div>

        {altLabel && (
          <label
            className={`label-text-alt bg-neutral/10 rounded-sm p-0.5 w-fit ${labelStyle}`}
            htmlFor={`text-input${id}`}
            aria-label={label}
          >
            <span className='label-text-alt'>{altLabel}</span>
          </label>
        )}
      </>
    );
  }
);

TextInput.displayName = 'Text-Input';
export default TextInput;
