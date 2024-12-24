import { cn } from '@/utils/helpers';
import { FieldMeta } from '@tanstack/react-form';

interface FieldInfoProps extends React.HTMLAttributes<HTMLParagraphElement> {
  fieldMeta: FieldMeta | undefined;
}

const FieldInfo = ({ fieldMeta, className, ...props }: FieldInfoProps) =>
  fieldMeta ? (
    <>
      {fieldMeta.isTouched && fieldMeta.errors.length ? (
        <p
          className={cn('text-error', className)}
          {...props}
        >
          {fieldMeta.errors.join(',')}
        </p>
      ) : null}
    </>
  ) : null;

FieldInfo.displayName = 'FieldInfo';

export default FieldInfo;
