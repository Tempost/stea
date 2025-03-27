import { cn } from '@/utils/helpers';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { JSX } from 'react/jsx-runtime';

export interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  innerClassName?: React.LabelHTMLAttributes<HTMLLabelElement>['className'];
}

const labelVariants = cva('', {
  variants: {
    floating: {
      true: 'floating-label',
      false: 'label',
    },
  },
  defaultVariants: {
    floating: false,
  },
});

export interface NewProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  label: JSX.Element;
}

const NewLabel = forwardRef<HTMLLabelElement, NewProps>(
  ({ className, floating, label, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(labelVariants({ floating, className }))}
        {...props}
      >
        <span>{label}</span>
      </label>
    );
  },
);
NewLabel.displayName = 'Label';

const Label = forwardRef<HTMLLabelElement, Props>(
  ({ className, children, innerClassName, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('label', className)}
      {...props}
    >
      <span className={cn('label-text flex gap-2', innerClassName)}>
        {children}
      </span>
    </label>
  ),
);
Label.displayName = 'Label';

const AltLabel = forwardRef<HTMLLabelElement, Props>(
  ({ className, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('label bg-info/25 w-fit rounded-md p-0.5', className)}
      {...props}
    >
      <span className='label-text-alt text-sm md:text-xs'>{children}</span>
    </label>
  ),
);
AltLabel.displayName = 'Alt-Label';

export { Label, AltLabel };
