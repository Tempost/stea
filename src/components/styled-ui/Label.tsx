import { cn } from '@/utils/helpers';
import { forwardRef } from 'react';

export interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  innerClassName?: React.LabelHTMLAttributes<HTMLLabelElement>['className'];
}

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
      className={cn('label w-fit rounded-md bg-info/25 p-0.5', className)}
      {...props}
    >
      <span className='label-text-alt text-sm md:text-xs'>{children}</span>
    </label>
  ),
);
AltLabel.displayName = 'Alt-Label';

export { Label, AltLabel };
