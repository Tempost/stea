import { forwardRef } from 'react';
import type { ReactNode, DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface CheckboxProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string | ReactNode;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => (
  <>
    {props.label ? (
      <div className='flex items-center gap-2'>
        <label
          className='label'
          htmlFor='checkbox-input'
        >
          <span className='label-text'>{props.label}</span>
        </label>

        <input
          ref={ref}
          id='checkbox-input'
          type='checkbox'
          className={`checkbox checkbox-primary md:checkbox-sm ${props.className}`}
          {...props}
        />
      </div>
    ) : (
      <input
        ref={ref}
        id='checkbox-input'
        type='checkbox'
        className={`checkbox checkbox-primary md:checkbox-sm ${props.className}`}
        {...props}
      />
    )}
  </>
));

Checkbox.displayName = 'Checkbox';
export default Checkbox;
