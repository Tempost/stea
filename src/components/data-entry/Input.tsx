import { forwardRef } from 'react';
import Root, { InputProps as RootProps } from '@/components/styled-ui/Input';
import { FormField, useFormField, UseFormFieldProps } from './FormField';

interface Props extends UseFormFieldProps, RootProps {
  name: string;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
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

Input.displayName = 'Form-Input';
export default Input;
