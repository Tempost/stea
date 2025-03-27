import { cn } from '@/utils/helpers';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';
import ListRow from './ListRow';

const list = cva('list', {
  variants: {
    style: {
      disc: 'list-disc',
      decimal: 'list-decimal',
      none: 'list-none',
    },
    position: {
      inside: 'list-inside',
      outside: 'list-outside',
    },
  },
});

export interface Props
  extends Omit<HTMLAttributes<HTMLUListElement>, 'style'>,
    VariantProps<typeof list> {}

const List = forwardRef<HTMLUListElement, Props>(
  ({ className, style, position, ...props }, ref) => {
    return (
      <ul
        {...props}
        className={cn(list({ style, position, className }))}
        ref={ref}
      />
    );
  },
);

List.displayName = 'List';
export default Object.assign(List, {
  Row: ListRow,
});
