import { ComponentProps, forwardRef } from 'react';

export interface Props extends ComponentProps<'input'> {}

const Input = forwardRef<HTMLInputElement, Props>(({ id, ...props }, ref) => (
  <input
    className='input-bordered input'
    {...props}
    id={id}
    ref={ref}
  />
));

Input.displayName = 'Styled-Input';

export default Input;
