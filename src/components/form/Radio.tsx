import { forwardRef } from 'react';
import Root, { Props as RootProps } from '@/components/styled-ui/Radio';

export interface Props extends RootProps {
  id?: string;
  name: string;
  label?: string;
}

const Radio = forwardRef<HTMLInputElement, Props>(
  ({ id, intent, size, label, ...props }, ref) => (
    <label className='fieldset-label'>
      <Root
        {...props}
        intent={intent}
        size={size}
        id={id}
        ref={ref}
      />
      {label ? <span>{label}</span> : null}
    </label>
  ),
);

Radio.displayName = 'Radio';
export default Radio;
