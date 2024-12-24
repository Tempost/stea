import { DeepKeys } from '@tanstack/react-form';
import Input, { InputProps } from '@/components/styled-ui/Input';
import { AltLabel, Label } from '@/components/styled-ui/Label';
import { ReactNode, Ref } from 'react';
import { FormReturnType } from '@/types/common';
import FieldInfo from '@/components/form/FieldInfo';

interface InputFieldProps<TForm, TName extends DeepKeys<TForm>, TFormValidator>
  extends Omit<InputProps, 'form' | 'name'> {
  name: TName;
  label?: string | ReactNode;
  altlabel?: string | ReactNode;
  form: FormReturnType<TForm, TFormValidator>;
  ref?: Ref<HTMLInputElement>;
}

const InputField = <TForm, TName extends DeepKeys<TForm>, TFormValidator>({
  name,
  label,
  form,
  altlabel,
  ...props
}: InputFieldProps<TForm, TName, TFormValidator>) => (
  <form.Field name={name}>
    {field => (
      <div className='form-control'>
        {label ? <Label htmlFor={String(name)}>{label}</Label> : null}
        <Input
          id={String(name)}
          defaultValue={
            props.type === 'numeric' ? undefined : (field.state.value as string)
          }
          onChange={e => {
            if (props.type === 'numeric') {
              field.handleChange(Number.parseInt(e.target.value) as any);
            } else {
              field.handleChange(e.target.value as any);
            }
          }}
          onBlur={field.handleBlur}
          {...props}
        />
        {altlabel ? <AltLabel>{altlabel}</AltLabel> : null}
        <FieldInfo fieldMeta={field.state.meta} />
      </div>
    )}
  </form.Field>
);

InputField.displayName = 'InputField';

export default InputField;
