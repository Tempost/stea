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
        card shadow-lg bg-cyan-500 w-[60vw] sm:w-[50vw] md:w-[40vw] hover:cursor-pointer hover:scale-[1.05]
        hover:shadow-2xl transition-all ease-in-out delay-75 image-full'
      >
        <div className='h-[25vh] sm:h-[30vh] relative'>
          <Image
            layout='fill'
            src={img}
          />
        </div>

        <div
          className='card-body grid place-items-center text-2xl md:text-3xl font-semibold
          underline hover:font-extrabold hover:scale-[1.10] delay-75 transition-all ease-in-out'
        >
          <p>{bodyText}</p>
        </div>
      </a>
    </NextLink>
  );
}
