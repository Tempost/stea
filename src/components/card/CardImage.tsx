import { Image, ImageProps } from '@unpic/react';
import { forwardRef } from 'react';

const CardImage = forwardRef<HTMLDivElement, ImageProps>(
  ({ ...props }, ref) => {
    return (
      <figure
        className='relative'
        ref={ref}
      >
        <Image
          background='auto'
          {...props}
        />
      </figure>
    );
  },
);

CardImage.displayName = 'CardImage';
export default CardImage;
