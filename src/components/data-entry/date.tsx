import DatePicker from 'react-datepicker';
import {
  Controller,
  useFormContext,
  UseFormRegisterReturn,
} from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';
import TextInput from './text-input';

interface DatePickerProps {
  register: UseFormRegisterReturn;
  placeholderText?: string;
  label?: string;
}

function ControlledDatePicker({
  register,
  label,
  placeholderText,
}: DatePickerProps) {
  const { control, formState: { errors }} = useFormContext();
  const { name } = register;

  return (
    <Controller
      name={name}
      control={control}
      render={props => {
        return (
          <DatePicker
            placeholderText={placeholderText}
            onChange={date => {
              props.field.onChange(date);
            }}
            selected={props.field.value}
            customInput={
              <TextInput
                label={label}
                className='input-primary'
                error={errors[name]}
                {...register}
              />
            }
          />
        );
      }}
    />
  );
}

export default ControlledDatePicker;
