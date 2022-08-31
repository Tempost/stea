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
}

function ControlledDatePicker({ register }: DatePickerProps) {
  const { control } = useFormContext();
  const { name } = register;

  return (
    <Controller
      name={name}
      control={control}
      render={props => {
        return (
          <DatePicker
            placeholderText='Date Of Birth'
            onChange={date => {
              props.field.onChange(date);
            }}
            selected={props.field.value}
            customInput={
              <TextInput
                className='input-sm input-primary'
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
