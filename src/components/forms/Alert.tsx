import { ZodFieldErrors } from '@/types/common';
import { cn } from '@/utils/helpers';

function Alert<T>({
  message,
  visible,
}: {
  message?: string | ZodFieldErrors<T>;
  visible: boolean;
}) {
  return (
    <div
      className={cn('alert alert-error my-2 p-2 shadow-lg', {
        hidden: !visible,
      })}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6 flex-shrink-0 stroke-current'
        fill='none'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
      <span className='text-sm'>
        {typeof message === 'string' ? message : 'Fancy Errors soon'}
      </span>
    </div>
  );
}

export default Alert;
