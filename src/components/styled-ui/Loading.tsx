import { cn } from '@/utils/helpers';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

const loadingVariants = cva('loading', {
  variants: {
    variant: {
      dots: 'loading-dots',
      spinner: 'loading-spinner',
      ring: 'loading-ring',
      ball: 'loading-ball',
      bars: 'loading-bars',
      infinity: 'loading-infinity',
    },
    size: {
      xs: 'loading-xs',
      sm: 'loading-sm',
      md: 'loading-md',
      lg: 'loading-lg',
    },
  },
  defaultVariants: {
    variant: 'dots',
    size: 'md',
  },
});

export interface Props
  extends React.DetailedHTMLProps<
      HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    VariantProps<typeof loadingVariants> {}

const Loading = forwardRef<HTMLSpanElement, Props>(
  ({ className, variant, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(loadingVariants({ className, variant, size }))}
      {...props}
    ></span>
  ),
);

Loading.displayName = 'Loading';
export default Loading;
