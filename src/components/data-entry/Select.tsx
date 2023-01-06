import { ComponentProps, forwardRef } from 'react';
import { FormField, useFormField, UseFormFieldProps } from './FormField';

interface Props extends UseFormFieldProps, ComponentProps<'select'> {
  name: string;
}

const Select = forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const { formFieldProps, childProps } = useFormField(props);

  return (
    <FormField {...formFieldProps}>
      <select
        ref={ref}
        {...childProps}
      />
    </FormField>
  );
});

Select.displayName = 'Select';
export default Select;
