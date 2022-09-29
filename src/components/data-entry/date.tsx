import DatePicker from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';
import TextInput from './text-input';

interface DatePickerProps {
  name: string;
  placeholderText?: string;
  label?: string;
}

function ControlledDatePicker({
  label,
  placeholderText,
  name,
}: DatePickerProps) {
  const { control } = useFormContext();
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
              />
            }
          />
        );
      }}
    />
  );
}

export default ControlledDatePicker;
