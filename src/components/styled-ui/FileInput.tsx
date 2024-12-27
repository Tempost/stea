import { cn } from '@/utils/helpers';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const inputFileVariants = cva('file-input w-full md:file-input-md', {
  variants: {
    variant: {
      default: 'file-input-primary',
      secondary: 'file-input-secondary',
      disabled: 'file-input-disabled',
      ghost: 'file-input-ghost',
    },
    size: {
      xs: 'file-input-xs',
      sm: 'file-input-sm',
      lg: 'file-input-lg',
      xl: 'file-input-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
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
