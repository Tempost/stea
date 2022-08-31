import { forwardRef, useId } from 'react';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface RadioProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string | JSX.Element;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const id = useId();
  return (
    <div className='flex items-center justify-between w-full'>
      <label
        className='label'
        htmlFor={`radio-input${id}`}
      >
        <span className='label-text'>{props.label}</span>
      </label>

      <span className='px-[8px]'>
        <input
          ref={ref}
          id={`radio-input${id}`}
          type='radio'
          className={`${props.className}`}
          {...props}
        />
      </span>
    </div>
  );
});

Radio.displayName = 'Radio';
export default Radio;
