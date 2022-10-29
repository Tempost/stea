import DatePicker from 'react-datepicker';
// import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { Controller, useFormContext } from 'react-hook-form';

import TextInput, { TextInputProps } from './TextInput';
// import { CalenderIcon, TrashIcon } from '../icons';
// calendarIcon = { CalenderIcon }
// clearIcon = { TrashIcon }
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps extends TextInputProps {
  placeholderText?: string;
  hidden?: boolean;
}

function ControlledDatePicker({
  placeholderText,
  name,
  hidden,
  error,
  label,
  altLabel,
}: DatePickerProps) {
  const { control } = useFormContext();
  return (
    <div className={`${hidden ? 'hidden' : ''} `}>
      <Controller
        name={name ?? ''}
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
                  altLabel={altLabel}
                  className='input-primary w-40'
                  error={error}
                />
              }
            />
          );
        }}
      />
    </div>
  );
}

export default ControlledDatePicker;
