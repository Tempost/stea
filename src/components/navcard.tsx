import NextLink, { LinkProps } from 'next/link';
import Image from 'next/image';

export interface NavCardProps extends LinkProps {
  img: string; // TODO: Better type for this?
  bodyText: React.ReactNode;
}

export default function NavCard({ img, bodyText, ...props }: NavCardProps) {
  return (
    <NextLink {...props}>
      <a
        className='
        card image-full shadow-lg w-[20em] sm:w-[25em] md:w-[30em]
        h-[15em] sm:h-[20em] md:h-[25em]
        hover:cursor-pointer hover:scale-[1.05] hover:shadow-2xl group
        transition-all ease-in-out delay-75 duration-300'
      >
        <figure>
          <Image
            layout='fill'
            src={img}
          />
        </figure>

        <div
          className='card-body grid place-items-center text-2xl md:text-3xl font-semibold
          underline group-hover:font-bold hover:text-3xl hover:md:text-4xl delay-75 duration-300 transition-all ease-in-out'
        >
          <p>{bodyText}</p>
        </div>
      </a>
    </NextLink>
  );
}
