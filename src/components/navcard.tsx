import NextLink, { LinkProps } from 'next/link';
import Image from 'next/image';

export interface NavCardProps extends LinkProps {
  img: string;
  bodyText: React.ReactNode;
}

export default function NavCard({ img, bodyText, ...props }: NavCardProps) {
  return (
    <NextLink {...props}>
      <span
        className='
        group container image-full card h-[15em] w-[20em] shadow-lg
        transition-all delay-75 duration-300
        ease-in-out hover:scale-[1.05] hover:cursor-pointer hover:shadow-2xl
        '
      >
        <figure className='relative'>
          <Image
            src={img}
            alt='Background image for card'
            fill
            sizes='100vw, 50vw'
          />
        </figure>

        <div
          className='card-body grid place-items-center text-2xl font-semibold underline
          transition-all delay-75 duration-300 ease-in-out hover:text-3xl group-hover:font-bold md:text-3xl hover:md:text-4xl'
        >
          <p>{bodyText}</p>
        </div>
      </span>
    </NextLink>
  );
}
