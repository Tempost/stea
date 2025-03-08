import { ComponentProps, useEffect, useState } from 'react';
import Input from '../styled-ui/Input';

interface DebounceArgs {
  value: string | number;
  onChange(value: string | number): void;
  debounce?: number;
}

// A debounced input react component, taken from tan stack table exmaples
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 100,
  ...props
}: DebounceArgs & ComponentProps<typeof Input>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]); // eslint-disable-line

  return (
    <Input
      {...props}
      type='text'
      value={value}
      onChange={e => setValue(e.target.value)}
    />
    // <input
    //   {...props}
    //   value={value}
    //   onChange={e => setValue(e.target.value)}
    // />
  );
}

export default DebouncedInput;
