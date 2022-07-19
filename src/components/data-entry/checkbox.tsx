import React from 'react';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface CheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string | JSX.Element;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => (
  <div className='flex items-center gap-2'>
    <label className='label' htmlFor='checkbox-input'>
      <span className='label-text'>{props.label}</span>
    </label>

    <input
      ref={ref}
      id='checkbox-input'
      type='checkbox'
      className={`checkbox checkbox-primary ${props.className}`}
      {...props}
    />

  </div>
))

Checkbox.displayName = 'Checkbox';
export default Checkbox;
