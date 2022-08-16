import { forwardRef, useId, DetailedHTMLProps, SelectHTMLAttributes } from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectInputProps
  extends DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
  > {
  label?: string;
  labelStyle?: string;
  options: SelectOption[];
}

function capitalize(s: string) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const Select = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, label, labelStyle, options, ...props }, ref) => {
    const id = useId();

    return (
      <div>
        {label !== undefined && (
          <label
            className={`label flex-col ${labelStyle}`}
            htmlFor={`select-input${id}`}
            aria-label={label}
          >
            <span className='label-text self-start'>{label}</span>
          </label>
        )}

        <select
          ref={ref}
          id={`select-input${id}`}
          className={`select select-bordered ${className}`}
          {...props}
        >
          {options.map(item => {
            return (
              <option
                key={item.label}
                value={item.value}
              >
                {capitalize(item.value)}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
