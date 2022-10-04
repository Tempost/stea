// import DatePicker from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-date-picker/dist/entry.nostyle';


import TextInput from './text-input';
import { CalenderIcon, TrashIcon } from '../icons';

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
            calendarIcon={CalenderIcon}
            clearIcon={TrashIcon}
            onChange={(date: Date) => {
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
