import DatePicker from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';

import Input from './Input';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
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
                <Input
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
