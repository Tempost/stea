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
        card shadow-lg bg-cyan-500 w-[75vw] lg:w-[40vw] hover:cursor-pointer hover:scale-[1.05]
        hover:shadow-2xl transition-all ease-linear'
      >
        <div className='h-64 md:h-96 relative'>
          <Image
            width={100}
            height={100}
            layout='fill'
            src={img}
          />
        </div>

        <div className='card-body text-center text-2xl font-bold'>
          {bodyText}
        </div>
      </a>
    </NextLink>
  );
}
