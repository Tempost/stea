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
        card image-full shadow-lg bg-cyan-500 w-[20em] sm:w-[25em] md:w-[30em]
        hover:cursor-pointer hover:scale-[1.05] hover:shadow-2xl group
        transition-all ease-in-out delay-75'
      >
        <div className='h-[15em] sm:h-[20em] md:h-[25em] relative'>
          <Image
            layout='fill'
            src={img}
          />
        </div>

        <div
          className='card-body grid place-items-center text-2xl md:text-3xl font-semibold
          underline group-hover:font-semibold hover:scale-[1.10] delay-75 transition-all ease-in-out'
        >
          <p>{bodyText}</p>
        </div>
      </a>
    </NextLink>
  );
}
