import { DeepKeys } from '@tanstack/react-form';
import { ReactNode, Ref } from 'react';
import Select from '@/components/styled-ui/Select';
import FieldInfo from '@/components/form/FieldInfo';
import { Label } from '@/components/styled-ui/Label';
import { FormReturnType } from '@/types/common';

interface SelectFieldProps<TForm, TName extends DeepKeys<TForm>, TFormValidator>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'form' | 'name'> {
  name: TName;
  label?: string | ReactNode;
  placeholder?: string;
  form: FormReturnType<TForm, TFormValidator>;
  options: Array<ReactNode>;
  ref?: Ref<HTMLSelectElement>;
}

const SelectField = <TForm, TName extends DeepKeys<TForm>, TFormValidator>({
  name,
  label,
  form,
  options,
  ref,
  ...props
}: SelectFieldProps<TForm, TName, TFormValidator>) => (
  <form.Field name={name}>
    {field => (
      <div className='form-control'>
        {label ? <Label htmlFor={String(name)}>{label}</Label> : null}
        <Select
          id={String(name)}
          onChange={e => field.handleChange(e.target.value as any)}
          onBlur={field.handleBlur}
          {...props}
          ref={ref}
        >
          {options}
        </Select>
        <FieldInfo fieldMeta={field.state.meta} />
      </div>
    )}
  </form.Field>
);

SelectField.displayName = 'SelectField';

export default SelectField;
