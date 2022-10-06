import DatePicker from 'react-datepicker';
// import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { Controller, useFormContext } from 'react-hook-form';

import TextInput from './text-input';
// import { CalenderIcon, TrashIcon } from '../icons';
// calendarIcon = { CalenderIcon }
// clearIcon = { TrashIcon }
import 'react-datepicker/dist/react-datepicker.css';

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
            showPopperArrow={false}
            placeholderText={placeholderText}
            onChange={(date: Date) => {
              props.field.onChange(date);
            }}
            selected={props.field.value}
            customInput={
              <TextInput
                label={label}
                altLabel='Membership year runs from Dec 1st to Nov 30th of each show year.'
                className='input-primary w-40'
              />
            }
          />
        );
      }}
    />
  );
}

export default ControlledDatePicker;
