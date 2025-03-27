import { cn } from '@/utils/helpers';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, ReactNode } from 'react';
import { Error, Info, InfoColor, Success, Warning } from '../icons';

const alert = cva('alert shadow-sm py-1 px-2', {
  variants: {
    intent: {
      outline: 'alert-outline',
      dash: 'alert-dash',
      soft: 'alert-soft',
    },
    type: {
      info: 'alert-info',
      success: 'alert-success',
      warning: 'alert-warning',
      error: 'alert-error',
    },
    direction: {
      vertical: 'alert-vertical',
      horizontal: 'alert-horizontal',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  defaultVariants: {
    type: 'info',
    direction: 'horizontal',
  },
});

type AlertVariant = VariantProps<typeof alert>;

const iconElement = {
  default: InfoColor,
  info: Info,
  warning: Warning,
  success: Success,
  error: Error,
};

export interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    AlertVariant {
  hidden?: boolean;
  message?: string | ReactNode;
  icon?: keyof typeof iconElement;
}

const Alert = forwardRef<HTMLDivElement, Props>(
  (
    {
      intent,
      type,
      icon = 'default',
      size,
      direction,
      hidden = true,
      className,
      message,
      ...props
    },
    ref,
  ) => (
    <div
      role='alert'
      ref={ref}
      className={cn(alert({ intent, size, type, direction, className }), {
        hidden: !hidden,
      })}
      {...props}
    >
      {iconElement[icon]}
      <span>{message}</span>
    </div>
  ),
);

Alert.displayName = 'Alert';

export default Alert;
