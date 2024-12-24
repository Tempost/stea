import DatePicker from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';

import Input from '@/components/styled-ui/Input';
import 'react-datepicker/dist/react-datepicker.css';
import { AltLabel, Label } from '../styled-ui/Label';
import { cn } from '@/utils/helpers';

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
  const { control, getFieldState } = useFormContext();
  const state = getFieldState(name);

  return (
    <div className={cn({ hidden: hidden })}>
      <Controller
        name={name}
        control={control}
        render={props => (
          <>
            {label ? <Label>{label}</Label> : null}
            {state.error && <p className='text-error'>{state.error.message}</p>}
            <DatePicker
              showPopperArrow={false}
              placeholderText={placeholderText}
              onChange={(date: Date | null) => {
                props.field.onChange(date);
              }}
              selected={props.field.value}
              customInput={<Input />}
            />
            <AltLabel className='w-fit'>{labelAlt}</AltLabel>
          </>
        )}
      />
    </div>
  );
}

export default ControlledDatePicker;
