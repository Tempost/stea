import { forwardRef } from 'react';

import Root, { Props as RootProps } from '@/components/styled-ui/Select';
import { FormField, useFormField, UseFormFieldProps } from './FormField';

interface Props extends UseFormFieldProps, RootProps {
  name: string;
}

const Select = forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const { formFieldProps, childProps } = useFormField(props);

  return (
    <FormField {...formFieldProps}>
      <Root
        {...childProps}
        ref={ref}
      />
    </FormField>
  );
});

Select.displayName = 'Form-Select';
export default Select;
