import { cn } from '@/utils/helpers';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const inputFileVariants = cva('file-input w-full', {
  variants: {
    variant: {
      primary: 'file-input-primary',
      secondary: 'file-input-secondary',
      disabled: 'file-input-disabled',
      ghost: 'file-input-ghost',
    },
    size: {
      xs: 'file-input-xs',
      sm: 'file-input-sm',
      md: 'file-input-md',
      lg: 'file-input-lg',
      xl: 'file-input-xl',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'xs',
  },
});

export interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputFileVariants> {}

const FileInput = forwardRef<HTMLInputElement, Props>(
  ({ id, className, variant, size, ...props }, ref) => (
    <input
      className={cn(
        inputFileVariants({
          variant,
          size,
          className,
        }),
      )}
      {...props}
      id={id}
      ref={ref}
    />
  ),
);

FileInput.displayName = 'FileInput';

export default FileInput;
