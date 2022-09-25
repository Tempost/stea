import { forwardRef, useId } from 'react';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface RadioProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string | JSX.Element;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, ...props }, ref) => {
    const id = useId();
    return (
      <div className='flex items-center justify-between w-full'>
        <label
          className='label'
          htmlFor={`radio-input${id}`}
        >
          <span className='label-text'>{label}</span>
        </label>

        <input
          ref={ref}
          id={`radio-input${id}`}
          type='radio'
          className={`radio md:radio-sm ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Radio.displayName = 'Radio';
export default Radio;
