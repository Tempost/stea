import { forwardRef } from 'react';

import Root, { Props as RootProps } from '@/components/styled-ui/Radio';
import { RadioFormField, useFormField, UseFormFieldProps } from './FormField';

interface Props extends UseFormFieldProps, RootProps {
  name: string;
}

const Radio = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { formFieldProps, childProps } = useFormField(props);

  return (
    <RadioFormField {...formFieldProps}>
      <Root
        {...childProps}
        ref={ref}
      />
    </RadioFormField>
  );
});

Radio.displayName = 'Form-Radio';
export default Radio;
