import { ComponentProps, forwardRef } from 'react';
import { FormField, useFormField, UseFormFieldProps } from './FormField';

interface Props extends UseFormFieldProps, ComponentProps<'input'> {
  name: string;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { formFieldProps, childProps } = useFormField(props);

  return (
    <FormField {...formFieldProps}>
      <input
        ref={ref}
        {...childProps}
      />
    </FormField>
  );
});

Input.displayName = 'Input';
export default Input;
