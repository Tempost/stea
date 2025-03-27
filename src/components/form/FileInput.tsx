import { forwardRef } from 'react';
import Root, { Props as RootProps } from '@/components/styled-ui/FileInput';

interface Props extends RootProps {
  label?: string;
}

const FileInput = forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }, ref) => (
    <>
      <label className='fieldset-label'>{label}</label>
      <Root
        {...props}
        ref={ref}
      />
    </>
  ),
);

FileInput.displayName = 'FileInput';
export default FileInput;
