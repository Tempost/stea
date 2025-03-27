import { cn } from '@/utils/helpers';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

const listRow = cva('list', {
  variants: {
    fillSpace: {
      true: 'list-col-grow',
      false: 'list-col-wrap',
    },
  },
});

export interface Props
  extends Omit<HTMLAttributes<HTMLLIElement>, 'style'>,
    VariantProps<typeof listRow> {}

const ListRow = forwardRef<HTMLLIElement, Props>(
  ({ className, fillSpace, ...props }, ref) => {
    return (
      <li
        {...props}
        className={cn(listRow({ fillSpace, className }))}
        ref={ref}
      />
    );
  },
);

ListRow.displayName = 'ListRow';
export default ListRow;
