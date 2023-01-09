import { ComponentProps, forwardRef } from 'react';

export interface Props extends ComponentProps<'select'> {}

const Select = forwardRef<HTMLSelectElement, Props>((props, ref) => (
  <select
    className='select select-bordered'
    {...props}
    ref={ref}
  />
));

Select.displayName = 'Styled-Select';
export default Select;
