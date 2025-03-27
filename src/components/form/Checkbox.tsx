import Root, { Props as RootProps } from '@/components/styled-ui/Checkbox';
import { forwardRef } from 'react';

interface Props extends RootProps {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }, ref) => (
    <label className='fieldset-label'>
      {label}
      <Root
        {...props}
        ref={ref}
      />
    </label>
  ),
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
