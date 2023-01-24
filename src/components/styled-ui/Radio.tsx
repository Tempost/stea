import { ComponentProps, forwardRef } from 'react';

export interface Props extends ComponentProps<'input'> {
  name: string;
}

const Radio = forwardRef<HTMLInputElement, Props>(({ id, ...props }, ref) => (
  <input
    className='radio-primary radio'
    {...props}
    id={id}
    ref={ref}
    type='radio'
  />
));

Radio.displayName = 'Styled-Radio';
export default Radio;
