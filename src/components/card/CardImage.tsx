import Image from 'next/image';
import { ComponentProps, forwardRef } from 'react';

export interface Props extends ComponentProps<typeof Image> {}

const CardImage = forwardRef<HTMLDivElement, Props>(({ ...props }, ref) => {
  return (
    <figure
      className='relative'
      ref={ref}
    >
      <Image {...props} />
    </figure>
  );
});

CardImage.displayName = 'CardImage';
export default CardImage;
