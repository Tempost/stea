import { FormHTMLAttributes } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import Checkbox from './Checkbox';
import Input from './Input';
import Radio from './Radio';
import Select from './Select';
import FileInput from './FileInput';

interface Props<T extends FieldValues>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: Props<T>) => (
  <FormProvider {...form}>
    <form
      role='form'
      onSubmit={form.handleSubmit(onSubmit)}
      {...props}
    >
      <fieldset
        className='fieldset'
        disabled={form.formState.isSubmitting}
        aria-disabled={form.formState.isSubmitting}
      >
        {children}
      </fieldset>
    </form>
  </FormProvider>
);

export default Object.assign(Form, {
  Input,
  Select,
  Radio,
  Checkbox,
  FileInput,
});
