import DatePicker from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';

import Input from '@/components/styled-ui/Input';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  name: string;
  placeholderText?: string;
  hidden?: boolean;
  label?: string;
  labelAlt?: string;
}

function ControlledDatePicker({
  name,
  placeholderText,
  hidden,
  label,
  labelAlt,
}: DatePickerProps) {
  const { control } = useFormContext();
  return (
    <div className={`${hidden ? 'hidden' : ''} `}>
      <Controller
        name={name ?? ''}
        control={control}
        render={props => {
          return (
            <>
              <label className='label'>
                <span className='label-text'>{label}</span>
              </label>
              <DatePicker
                showPopperArrow={false}
                placeholderText={placeholderText}
                onChange={(date: Date) => {
                  props.field.onChange(date);
                }}
                selected={props.field.value}
                customInput={
                  <Input className='input-primary input-bordered input w-fit md:input-sm' />
                }
              />
              <label className='label'>
                <span className='label-text-alt'>{labelAlt}</span>
              </label>
            </>
          );
        }}
      />
    </div>
  );
}

export default ControlledDatePicker;
