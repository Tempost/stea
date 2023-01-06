import { ComponentProps, forwardRef } from 'react';
import { RadioFormField, useFormField, UseFormFieldProps } from './FormField';

interface Props extends UseFormFieldProps, ComponentProps<'input'> {
  name: string;
}

const Radio = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { formFieldProps, childProps } = useFormField(props);

  return (
    <RadioFormField {...formFieldProps}>
      <input
        type='radio'
        ref={ref}
        {...childProps}
      />
    </RadioFormField>
  );
});

Radio.displayName = 'Radio';
export default Radio;
