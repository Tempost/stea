import { ComponentProps, useEffect, useRef, useState } from 'react';
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, onChange, debounce]);

  return (
    <Input
      {...props}
      type='search'
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}

export default DebouncedInput;
